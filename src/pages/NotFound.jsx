import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { SITE_CONTAINER } from '../styles/container';

// Rendered for any path that doesn't match a real page (old bookmarked
// links, outdated Google results, mistyped URLs, etc). Before this route
// existed, React Router simply rendered nothing here, so visitors who
// landed on a stale/incorrect link saw a blank page with just the header
// and footer and no way to get in touch. This gives them the phone number
// and a way back into the site instead of a dead end.
export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page Not Found | Dedham Airport Taxi & Livery';

    // The server always returns HTTP 200 for unknown paths (required so the
    // React app can load and render this route client-side), so add a
    // noindex tag ourselves to stop these stale/incorrect URLs from being
    // indexed or resurfaced by search engines.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    document.head.appendChild(meta);

    return () => {
      document.title = previousTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <section className="py-[90px] max-[600px]:py-[60px] bg-[#f9faff]">
      <div className={`${SITE_CONTAINER} text-center max-w-[640px]`}>
        <p className="text-[#00646a] text-[16px] font-medium mb-2">404</p>
        <h1 className="text-[34px] max-[600px]:text-[28px] text-[#00646a] mb-4">
          We couldn't find that page
        </h1>
        <p className="text-[16px] font-medium text-[#61696c] mb-8">
          The page you're looking for may have moved or no longer exists. You can head back
          to the homepage, book a ride, or call us directly and we'll take care of you.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg text-[16px] px-8 py-4 bg-[#137172] hover:bg-[#0f5a5b] text-white transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg text-[16px] px-8 py-4 border-[1.5px] border-[#137172] text-[#137172] hover:bg-[#137172] hover:text-white transition-colors"
          >
            Book a Ride
          </Link>
        </div>
        <a
          href="tel:+17817778033"
          className="inline-flex items-center gap-2 text-[#2C3E50] text-[16px] font-medium hover:text-[#00646a]"
        >
          <Phone size={18} />
          781-777-8033
        </a>
      </div>
    </section>
  );
}
