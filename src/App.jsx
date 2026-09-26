import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import { trackEvent } from './lib/analytics';
import Home from './pages/Home';

// Every other route is lazy so the homepage's initial JS download doesn't
// include, e.g., the Contact page's EmailJS client — that bundle is only
// fetched once someone actually navigates there.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Safety = lazy(() => import('./pages/Safety'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // gtag's initial `config` call already reports the first page load, so
    // skip it here and only send page_view for client-side route changes
    // (this SPA never triggers a full reload, so GA4 wouldn't see them
    // otherwise).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Deferred so the new page's own effect (which sets document.title)
    // has already run by the time this reads it, regardless of effect order.
    const timer = setTimeout(() => {
      trackEvent('page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

// Delegated click listener so every tel: link on the site (navbar, footer,
// contact page, 404 page) reports a call-intent event without each one
// needing its own onClick handler.
function CallTracking() {
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a[href^="tel:"]');
      if (!link) return;

      trackEvent('phone_call_click', {
        phone_number: link.getAttribute('href').replace('tel:', ''),
        page_path: window.location.pathname,
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CallTracking />
      <div className="sticky top-0 z-[100]">
        <PromoBanner />
        <Navbar />
      </div>
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
