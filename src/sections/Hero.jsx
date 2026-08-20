import { Link } from 'react-router-dom';
import hero from '../assets/images/real-suburban-terminal.png';
import { SITE_CONTAINER } from '../styles/container';
import { BTN_TEAL, BTN_OUTLINE } from '../styles/buttons';

export default function Hero() {
  return (
    <section
      className="min-h-[650px] max-[1080px]:min-h-[590px] max-[600px]:min-h-[560px] bg-cover bg-center max-[600px]:bg-[58%_center] grid place-items-center text-off-white"
      style={{ backgroundImage: `linear-gradient(rgba(3,14,17,.50),rgba(3,14,17,.67)),url(${hero})` }}
    >
      <div className={`${SITE_CONTAINER} flex flex-col items-center gap-6 text-center`}>
        <h1 className="font-bold text-[64px] max-[768px]:text-[44px] max-[600px]:text-[38px] max-[380px]:text-[32px] leading-[1.125] max-[600px]:leading-tight tracking-[-0.96px] text-off-white whitespace-nowrap max-[768px]:whitespace-normal">
          Premium Transportation in<br />Dedham
        </h1>
        <p className="max-w-[672px] text-[24px] max-[600px]:text-[16px] leading-[1.17] text-off-white">
          Experience reliable, comfortable, and professional livery services for airport transfers, corporate travel, and special occasions.
        </p>
        <div className="flex gap-4 items-center pt-4 max-[600px]:flex-col max-[600px]:w-full">
          <Link className={`${BTN_TEAL} max-[600px]:w-full`} to="/contact">Book a Ride</Link>
          <Link className={`${BTN_OUTLINE} max-[600px]:w-full`} to="/services">View Our Fleet</Link>
        </div>
      </div>
    </section>
  );
}
