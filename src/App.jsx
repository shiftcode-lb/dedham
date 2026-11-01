import { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import Footer from './components/Footer';
import StickyActionBar from './components/StickyActionBar';
import { trackAdsConversion, trackEvent } from './lib/analytics';
import Home from './pages/Home';
import { landingPages } from './data/landingPages';

// Every other route is lazy so the homepage's initial JS download doesn't
// include, e.g., the Contact page's EmailJS client — that bundle is only
// fetched once someone actually navigates there.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Safety = lazy(() => import('./pages/Safety'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const HubPage = lazy(() => import('./pages/HubPage'));
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

// Where on the page a tel:/sms: link sits, for the `location` event param.
function linkLocation(link) {
  if (link.dataset.trackLocation) return link.dataset.trackLocation;
  if (link.closest('footer')) return 'footer';
  if (link.closest('header')) return 'header';
  return 'body';
}

// Delegated click listener so every tel: and sms: link on the site reports
// a call/text-intent event without each one needing its own onClick handler.
// `phone_call_click` is the older event name, kept so existing GA4/Ads
// reports keep working alongside `click_to_call`.
function CallTracking() {
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a[href^="tel:"], a[href^="sms:"]');
      if (!link) return;

      const href = link.getAttribute('href');
      const location = linkLocation(link);

      if (href.startsWith('sms:')) {
        trackEvent('click_to_text', { location, page_path: window.location.pathname });
        return;
      }

      trackEvent('click_to_call', { location, page_path: window.location.pathname });
      trackEvent('phone_call_click', {
        phone_number: href.replace('tel:', ''),
        page_path: window.location.pathname,
      });
      trackAdsConversion('phoneCall');
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <div className="max-[767px]:pb-[calc(60px+env(safe-area-inset-bottom))]">
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
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/service-areas" element={<HubPage path="/service-areas" />} />
            <Route path="/routes" element={<HubPage path="/routes" />} />
            {landingPages.map((page) => (
              <Route key={page.path} path={page.path} element={<LandingPage page={page} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <StickyActionBar />
    </div>
  );
}
