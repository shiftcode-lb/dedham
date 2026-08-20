import Hero from '../sections/Hero';
import HomeServices from '../sections/HomeServices';
import LocationCoverage from '../sections/LocationCoverage';
import Testimonials from '../sections/Testimonials';

import chauffeurImg from '../assets/images/real-mercedes-chauffeur.png';

import SchemaMarkup from '../components/SchemaMarkup';
import { homeSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={homeSchema} />
      <Hero />

      <section className="py-20 bg-off-white">
        <div
          className={`${SITE_CONTAINER} flex max-[1080px]:flex-col gap-20 max-[1080px]:gap-10 items-center`}
        >
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-semibold text-[32px] text-turquoise leading-[1.25] tracking-[-0.32px]">
              Dedham's Most Reliable Livery
              <br />
              Service
            </h2>

            <p className="text-[18px] text-charcoal leading-[1.56]">
              Providing airport and local transportation services, our taxi and
              livery service ensures safe and efficient rides for all customers.
              With a focus on reliability and customer satisfaction, we strive
              to exceed expectations.
            </p>

            <div className="flex items-center border-l-4 border-brown pl-5">
              <strong className="font-bold text-[32px] text-turquoise leading-[1.25] tracking-[-0.32px] whitespace-nowrap">150+</strong>

              <span className="pl-4 text-[16px] text-muted leading-[1.5]">
                Reliable service
                <br />
                Safe and efficient
              </span>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] border border-[#c8b3a0] rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover object-[center_56%]"
              src={chauffeurImg}
              alt="Professional chauffeur opening a vehicle door"
            />
          </div>
        </div>
      </section>

      <HomeServices />

      <Testimonials home />

      <LocationCoverage />
    </>
  );
}
