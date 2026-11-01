import { Link } from 'react-router-dom';
import { MessageSquare, Phone, CalendarCheck } from 'lucide-react';
import { SMS_HREF, TEL_HREF } from '../data/business';

const itemClasses =
  'flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-white no-underline';

// Fixed Call / Text / Book bar for phones. App adds matching bottom padding
// so it never covers the footer.
export default function StickyActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-[100] flex min-[768px]:hidden bg-turquoise-dark shadow-[0_-2px_10px_rgba(0,0,0,0.2)] pb-[env(safe-area-inset-bottom)]"
    >
      <a className={itemClasses} href={TEL_HREF} data-track-location="sticky_bar" aria-label="Call 781-777-8033">
        <Phone size={20} aria-hidden="true" />
        Call
      </a>
      <a
        className={`${itemClasses} border-x border-white/25`}
        href={SMS_HREF}
        data-track-location="sticky_bar"
        aria-label="Text 781-777-8033"
      >
        <MessageSquare size={20} aria-hidden="true" />
        Text
      </a>
      <Link className={itemClasses} to="/contact/" aria-label="Book a ride">
        <CalendarCheck size={20} aria-hidden="true" />
        Book
      </Link>
    </nav>
  );
}
