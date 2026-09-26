import Hero from '../sections/Hero';
import HomeServices from '../sections/HomeServices';
import LocationCoverage from '../sections/LocationCoverage';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';

import chauffeurImg from '../assets/images/real-mercedes-chauffeur-small.webp';

import SchemaMarkup from '../components/SchemaMarkup';
import PageMeta from '../components/PageMeta';
import { homeSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dedham Airport Taxi & Car Service | Logan Airport Transportation"
        description="Book reliable Dedham airport taxi and car service to Boston Logan Airport. Professional airport transportation, private rides, corporate travel, and local car service in Dedham, MA."
        path="/"
      />
      <SchemaMarkup schema={homeSchema} />
      <Hero />

      <section className="py-20 bg-off-white">
        <div
          className={`${SITE_CONTAINER} flex max-[1080px]:flex-col gap-20 max-[1080px]:gap-10 items-center`}
        >
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-semibold text-[32px] text-turquoise leading-[1.25] tracking-[-0.32px]">
              Reliable Airport Taxi & Livery Service
              <br />
              in Dedham, MA
            </h2>

            <p className="text-[16px] text-charcoal leading-[1.56]">
              Dedham Airport Taxi & Livery provides reliable airport transportation
              between Dedham, Boston Logan International Airport, and destinations
              throughout Greater Boston. Our professional chauffeurs provide
              comfortable, on-time transportation for airport transfers, local rides,
              corporate travel, and special events.
            </p>

            <div className="flex items-center border-l-4 border-brown pl-5">
              <strong className="font-bold text-[32px] text-turquoise leading-[1.25] tracking-[-0.32px] whitespace-nowrap">150+</strong>

              <span className="pl-4 font-medium text-[14px] text-muted leading-[1.5]">
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
              alt="Dedham Airport Taxi professional chauffeur providing airport car service"
            />
          </div>
        </div>
      </section>

      <HomeServices />

      <Testimonials home />

      <LocationCoverage />

      <FAQ />
    </>
  );
}
