import { Link } from 'react-router-dom';
import hero from '../assets/images/real-suburban-terminal.webp';
import { SITE_CONTAINER } from '../styles/container';
import { BTN_TEAL, BTN_OUTLINE } from '../styles/buttons';

export default function Hero() {
  return (
    <section className="relative min-h-[650px] max-[1080px]:min-h-[590px] max-[600px]:min-h-[560px] grid place-items-center text-off-white overflow-hidden">

      {/* LCP Hero Image */}
      <img
        src={hero}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center max-[600px]:object-[58%_center]"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(3,14,17,.50)] to-[rgba(3,14,17,.67)]"
        aria-hidden="true"
      />

      {/* Hero Content */}
      <div
        className={`${SITE_CONTAINER} relative z-10 flex flex-col items-center gap-6 text-center`}
      >
        <h1 className="font-bold text-[64px] max-[768px]:text-[44px] max-[600px]:text-[38px] max-[380px]:text-[32px] leading-[1.125] max-[600px]:leading-tight tracking-[-0.96px] text-off-white whitespace-nowrap max-[768px]:whitespace-normal">
          Dedham Airport Taxi &<br />
          Car Service
        </h1>

        <p className="max-w-[672px] text-[24px] max-[600px]:text-[16px] leading-[1.17] text-off-white">
          Reliable airport transportation from Dedham to Boston Logan Airport,
          with professional car service for airport transfers, corporate travel,
          and special occasions.
        </p>

        <div className="flex gap-4 items-center pt-4 max-[600px]:flex-col max-[600px]:w-full">
          <Link
            className={`${BTN_TEAL} max-[600px]:w-full`}
            to="/contact"
          >
            Book a Ride
          </Link>

          <Link
            className={`${BTN_OUTLINE} max-[600px]:w-full`}
            to="/services"
          >
            View Our Fleet
          </Link>
        </div>
      </div>
    </section>
  );
}