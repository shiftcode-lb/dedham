import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/dedham-official-logo.jpg';
import { SITE_CONTAINER } from '../styles/container';

const navItems = [
  ['HOME', '/'],
  ['ABOUT', '/about'],
  ['SERVICES', '/services'],
  ['CONTACT', '/contact'],
  ['SAFETY', '/safety'],
  ['TERMS & CONDITIONS', '/terms'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname]);

  const handleLogoClick = (event) => {
    setOpen(false);
    if (location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-[100] border-b border-[#e4e8e8] bg-white h-[78px] max-[1080px]:h-[74px] max-[600px]:h-[68px]">
      <div className={`${SITE_CONTAINER} flex items-center justify-between h-[78px] max-[1080px]:h-[74px] max-[600px]:h-[68px]`}>
        <Link
          className="flex items-center h-full max-w-full overflow-hidden w-[155px] max-[1080px]:w-[145px] max-[768px]:w-[132px] max-[600px]:w-[122px] max-[390px]:w-[114px] max-[360px]:w-[110px]"
          to="/"
          onClick={handleLogoClick}
          aria-label="Dedham Airport Taxi & Livery home"
        >
          <img
            className="block w-full h-auto object-contain object-left max-h-[64px] max-[1080px]:max-h-[56px] max-[600px]:max-h-[48px]"
            src={logo}
            alt="Dedham Airport Taxi & Livery"
          />
        </Link>

        <nav
          className="hidden min-[1081px]:flex min-[1081px]:absolute min-[1081px]:left-1/2 min-[1081px]:-translate-x-1/2 items-center gap-[18px] whitespace-nowrap"
          aria-label="Primary navigation"
        >
          {navItems.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="relative h-full flex items-center text-[14px] tracking-[0.08em] text-[#394246] after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-turquoise after:scale-x-0 after:transition-transform after:duration-200 [&.active]:text-turquoise-dark [&.active]:after:scale-x-100"
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          className="hidden min-[1081px]:inline-flex items-center justify-center bg-turquoise text-white text-[11px] tracking-[0.08em] py-[12px] px-[18px] whitespace-nowrap"
          to="/contact"
        >
          BOOK NOW
        </Link>

        <button
          className="min-[1081px]:hidden grid place-items-center bg-transparent border-0 text-[#174f51] p-2 cursor-pointer"
          type="button"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`min-[1081px]:hidden fixed inset-x-0 bg-[rgba(249,247,245,0.99)] transition-transform duration-[250ms] z-[99] top-[74px] max-[600px]:top-[68px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex flex-col p-[28px_26px] max-[768px]:p-[24px_22px] max-[390px]:px-[18px]"
          aria-label="Mobile navigation"
        >
          {navItems.map(([label, to]) => (
            <NavLink
              key={to}
              className="block text-[13px] font-semibold py-[15px] px-1 border-b border-[#dfe4e4] text-center max-[768px]:text-[12px] [&.active]:text-turquoise"
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            className="mt-[22px] bg-turquoise text-white text-center text-[11px] py-[13px] block"
            to="/contact"
            onClick={() => setOpen(false)}
          >
            BOOK NOW
          </Link>
        </nav>
      </div>
    </header>
  );
}
