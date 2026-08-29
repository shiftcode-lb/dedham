import { Link } from 'react-router-dom';

import mainImg from '../assets/images/real-mercedes-side.png';
import detailImg from '../assets/images/real-mercedes-chauffeur.png';

import Testimonials from '../sections/Testimonials';

import SchemaMarkup from '../components/SchemaMarkup';
import { aboutSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';
import { BTN_BROWN } from '../styles/buttons';

export default function About() {
  return (
    <>
      <SchemaMarkup schema={aboutSchema} />
      <section className="py-[76px] pb-[82px] max-[600px]:py-[55px] bg-[#f8f9fc]">
        <div
          className={`${SITE_CONTAINER} grid grid-cols-[.72fr_1.28fr] max-[1080px]:grid-cols-1 gap-[68px] max-[1024px]:gap-[45px] items-center`}
        >
          <div>
            <h1 className="text-[48px] max-[600px]:text-[39px] leading-[1.06] tracking-[-0.045em] mb-[27px]">
              Reliable Luxury
              <br />
              Taxi &amp; Livery
              <br />
              Service
            </h1>

            <p className="text-[16px] font-medium text-[#697174] max-w-[390px] mb-[30px]">
              We offer airport and local transportation services. Experience safe
              and comfortable rides with our professional drivers. Book your ride
              now and take 25% off on your first ride!
            </p>

            <Link className={BTN_BROWN} to="/contact">
              Reserve a Vehicle
            </Link>
          </div>

          <div className="relative pb-[54px] max-[600px]:pb-[38px]">
            <img
              className="w-full h-[470px] max-[600px]:h-[310px] object-cover object-[center_54%]"
              src={mainImg}
              alt="Luxury vehicle in city"
            />

            <img
              className="absolute left-[-48px] bottom-0 w-[175px] h-[150px] max-[600px]:w-[130px] max-[600px]:h-[105px] object-cover border-[10px] max-[600px]:border-[7px] border-[#f8f9fc] object-[72%_center]"
              src={detailImg}
              alt="Professional chauffeur detail"
            />
          </div>
        </div>
      </section>

      <section className="py-[75px] max-[600px]:py-[55px] bg-[#eef0f6]">
        <div
          className={`${SITE_CONTAINER} grid grid-cols-[.85fr_1.1fr_.55fr] max-[1080px]:grid-cols-1 gap-[72px] max-[1024px]:gap-[38px] max-[600px]:gap-6`}
        >
          <div className="flex gap-4 items-start">
            <span className="w-9 h-[2px] bg-turquoise mt-[11px]" />
            <h2 className="text-[17px] text-[#166668] tracking-[0.16em]">ABOUT US</h2>
          </div>

          <div>
            <p className="text-[16px] font-medium text-[#2C3E50]">
              For over a decade, Dedham Livery has set the standard for executive
              transport and reliable airport transfers. We believe that a journey
              should be as calm and structured as the destination.
            </p>

            <p className="text-[16px] font-medium text-[#2C3E50]">
              Our modern corporate aesthetic reflects our operational philosophy:
              minimal friction, high precision, and an unwavering commitment to
              client prestige.
            </p>
          </div>

          <div className="max-[1080px]:flex max-[1080px]:gap-[35px] max-[600px]:flex-col max-[600px]:gap-0">
            <div className="border-l-2 border-turquoise pl-4 mb-[30px] max-[1080px]:min-w-[160px]">
              <strong className="block text-[35px] text-[#237b7b] leading-none">15+</strong>
              <span className="text-[12px] text-[#2C3E50] font-medium tracking-[0.05em]">YEARS OF EXCELLENCE</span>
            </div>

            <div className="border-l-2 border-turquoise pl-4 mb-[30px] max-[1080px]:min-w-[160px]">
              <strong className="block text-[35px] text-brown leading-none">24/7</strong>
              <span className="text-[12px] text-[#2C3E50] font-medium tracking-[0.05em]">CONCIERGE DISPATCH</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
