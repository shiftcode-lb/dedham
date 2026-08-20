import { Link } from 'react-router-dom';

import { services } from '../data/services';

import SchemaMarkup from '../components/SchemaMarkup';
import { servicesSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

const customTitles = [
  'Point to Point Transportation',
  'Night Out',
  'Hourly Limo',
];

const customText = [
  'Reliable and convenient local and airport transportation. We are committed to providing the best possible experience of your ride from A to B, whether it’s a simple corporate transfer, Prom, or a night out on the town.',
  'If you are planning a night out on the town, We can make the event safe and fun. Leave your car keys at home and let us get you where you want to go.',
  'Hourly car service is perfect for special occasions where you have multiple destinations or need a driver to wait for your party between events or destinations.',
];

const buttons = [
  'BOOK POINT TO POINT',
  'RESERVE FOR TONIGHT',
  'REQUEST HOURLY RATE',
];

// Mobile-only background positions per panel (desktop always uses center 55%,
// since a later rule in the original design overrode the per-panel desktop
// positions anyway).
const mobilePositions = [
  'max-[600px]:bg-[58%_center]',
  'max-[600px]:bg-center',
  'max-[600px]:bg-center',
];

export default function Services() {
  return (
    <section className="bg-[#091417]">
      <SchemaMarkup schema={servicesSchema} />
      {services.map((service, index) => {
        const alignRight = index === 1;
        return (
          <article
            key={service.title}
            className={`min-h-[500px] max-[1080px]:min-h-[480px] max-[600px]:min-h-[520px] bg-cover bg-no-repeat bg-[center_55%] ${mobilePositions[index]}`}
            style={{
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(3, 16, 19, 0.78),
                  rgba(3, 16, 19, 0.48)
                ),
                url(${service.image})
              `,
            }}
          >
            <div className={`${SITE_CONTAINER} min-h-[500px] max-[1080px]:min-h-[480px] max-[600px]:min-h-[520px] flex items-center`}>
              <div
                className={`w-[65%] max-[1080px]:w-[70%] max-[600px]:w-full max-w-[850px] text-white max-[600px]:m-0 max-[600px]:py-[44px] max-[600px]:text-left ${
                  alignRight ? 'ml-auto text-right max-[600px]:ml-0' : ''
                }`}
              >
                <span className="block mb-3 text-[38px] max-[1080px]:text-[34px] max-[600px]:text-[30px] leading-none font-bold text-[#8fc7c5] [text-shadow:0_2px_6px_rgba(0,0,0,0.65)]">
                  0{index + 1}
                </span>

                <h1 className="mb-[18px] text-[48px] max-[1080px]:text-[42px] max-[600px]:text-[36px] leading-[1.08] tracking-[-0.04em] text-white whitespace-nowrap max-[600px]:whitespace-normal [text-shadow:0_2px_8px_rgba(0,0,0,0.65)]">
                  {customTitles[index]}
                </h1>

                <p
                  className={`max-w-[560px] max-[600px]:max-w-[480px] mb-[25px] text-[13px] max-[1080px]:text-[12px] max-[600px]:text-[12px] leading-[1.65] font-medium text-white max-[600px]:ml-0 [text-shadow:0_2px_6px_rgba(0,0,0,0.85)] ${
                    alignRight ? 'ml-auto max-[600px]:ml-0' : ''
                  }`}
                >
                  {customText[index]}
                </p>

                <Link
                  className="min-w-[190px] max-[1080px]:min-w-[185px] max-[600px]:min-w-[190px] min-h-[46px] max-[1080px]:min-h-[45px] max-[600px]:min-h-[46px] px-[22px] inline-flex items-center justify-center bg-[rgba(3,16,19,0.45)] border border-[#8fc7c5] rounded-[3px] text-[#b9e2e0] text-[10px] font-semibold tracking-[0.05em] backdrop-blur-[2px] transition-colors duration-200 hover:bg-[#2a7778] hover:border-[#2a7778] hover:text-white"
                  to="/contact"
                >
                  {buttons[index]}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
