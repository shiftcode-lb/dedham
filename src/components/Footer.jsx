import { Link, NavLink } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { SITE_CONTAINER } from '../styles/container';

const linkClasses =
  'flex gap-2 items-start text-[10px] text-[#c5cecf] my-[7px] no-underline [&.active]:text-[#65b3b0]';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-[47px] pb-[38px] border-t border-turquoise">
      <div
        className={`${SITE_CONTAINER} grid grid-cols-3 gap-[40px] max-[768px]:grid-cols-1 max-[768px]:gap-[30px]`}
      >
        {/* Left section */}
        <div className="justify-self-start">
          <Link
            className="font-display text-[15px] font-bold text-[#2A6E6F] inline-block mb-[14px]"
            to="/"
          >
            Dedham Airport Taxi &amp; Livery
          </Link>

          <p className="text-[10px] text-[#bcc4c6] max-w-[330px]">
            Providing premium, reliable, and professional transportation
            services in Dedham and the Greater Boston area.
          </p>

          <small className="text-[10px] text-[#96a0a3]">
            © 2026 Dedham Airport Taxi &amp; Livery.  <a href="https://shiftcode.org" target="_blank" rel="noopener noreferrer" style={{ color: '#65b3b0', textDecoration: 'underline' }}>
              ShiftCode
            </a>.
          </small>
        </div>

        {/* Center section */}
        <div className="justify-self-center max-[768px]:justify-self-start">
          <h4 className="text-[9px] text-white tracking-[0.08em] mb-3">
            QUICK LINKS
          </h4>

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
        </div>

        {/* Right section */}
        <div className="justify-self-end max-[768px]:justify-self-start">
          <h4 className="text-[9px] text-white tracking-[0.08em] mb-3">
            CONTACT US
          </h4>

          <a
            className={`${linkClasses} [&_svg]:text-[#65b3b0] [&_svg]:flex-none`}
            href="tel:+17817778033"
          >
            <Phone size={13} />
            <span>781-777-8033</span>
          </a>

          <a
            className={`${linkClasses} [&_svg]:text-[#65b3b0] [&_svg]:flex-none`}
            href="mailto:dedhamairporttaxi@gmail.com"
          >
            <Mail size={13} />
            <span>dedhamairporttaxi@gmail.com</span>
          </a>

          <div
            className={`${linkClasses} [&_svg]:text-[#65b3b0] [&_svg]:flex-none`}
          >
            <MapPin size={13} />

            <span>
              3 Allied Dr Ste 303
              <br />
              Dedham, MA 02026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}