import { Link, NavLink } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SITE_CONTAINER } from '../styles/container';

const linkClasses =
  'flex gap-2.5 items-center text-sm text-[#c5cecf] hover:text-[#65b3b0] transition-colors no-underline [&.active]:text-[#65b3b0]';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-14 pb-10 border-t border-turquoise">
      <div
        className={`${SITE_CONTAINER} grid grid-cols-3 gap-10 max-[768px]:grid-cols-1 max-[768px]:gap-8 items-stretch`}
      >
        {/* Left section */}
        <div className="justify-self-start flex flex-col justify-between h-full">
          <div>
            <Link
              className="font-display text-lg font-bold text-[#2A6E6F] inline-block mb-3 hover:opacity-90 transition-opacity"
              to="/"
            >
              Dedham Airport Taxi &amp; Livery
            </Link>

            <p className="text-xs sm:text-sm leading-relaxed text-[#bcc4c6] max-w-[330px] mb-4">
              Providing premium, reliable, and professional transportation
              services in Dedham and the Greater Boston area.
            </p>
          </div>

          <p className="text-xs text-[#96a0a3] mt-auto">
            © 2026 Dedham Airport Taxi &amp; Livery. Developed by{' '}
            <a
              href="https://shiftcode.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#65b3b0] underline hover:opacity-80 transition-opacity"
            >
              ShiftCode
            </a>
            .
          </p>
        </div>

        {/* Center section */}
        <div className="justify-self-center max-[768px]:justify-self-start flex flex-col h-full">
          <h2 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
            Quick Links
          </h2>

          <nav className="flex flex-col space-y-2.5">
            <NavLink className={linkClasses} to="/" end>
              Home
            </NavLink>

            <NavLink className={linkClasses} to="/about">
              About
            </NavLink>

            <NavLink className={linkClasses} to="/services">
              Services
            </NavLink>

            <NavLink className={linkClasses} to="/contact">
              Contact
            </NavLink>

            <NavLink className={linkClasses} to="/safety">
              Safety
            </NavLink>

            <NavLink className={linkClasses} to="/terms">
              Terms and Conditions
            </NavLink>
          </nav>
        </div>

        {/* Right section */}
        <div className="justify-self-end max-[768px]:justify-self-start flex flex-col h-full">
          <h2 className="text-xs font-semibold text-white tracking-wider uppercase mb-4">
            Contact Us
          </h2>

          <div className="flex flex-col space-y-3">
            <a
              className={`${linkClasses} [&_svg]:text-[#65b3b0] [&_svg]:flex-none`}
              href="tel:+17817778033"
            >
              <Phone size={16} />
              <span>781-777-8033</span>
            </a>

            <a
              className={`${linkClasses} [&_svg]:text-[#65b3b0] [&_svg]:flex-none`}
              href="mailto:dedhamairporttaxi@gmail.com"
            >
              <Mail size={16} />
              <span>dedhamairporttaxi@gmail.com</span>
            </a>

            <div
              className={`${linkClasses} items-start [&_svg]:text-[#65b3b0] [&_svg]:flex-none [&_svg]:mt-0.5`}
            >
              <MapPin size={16} />

              <span>
                3 Allied Dr Ste 303
                <br />
                Dedham, MA 02026
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}