import { Clock3, MapPin, Phone, Plane } from 'lucide-react';
import ServiceAreas from './ServiceAreas';
import { SITE_CONTAINER } from '../styles/container';

export default function LocationCoverage() {
  return (
    <section className="bg-[#0d1316] text-white pt-[58px] pb-[42px] max-[600px]:pt-12 max-[600px]:pb-9">
      <div
        className={`${SITE_CONTAINER} grid grid-cols-[1fr_1.15fr] max-[1024px]:grid-cols-1 gap-14 max-[1024px]:gap-[38px] items-start`}
      >
        <div className="h-[430px] max-[1024px]:h-[390px] max-[600px]:h-[330px] relative border border-white/15">
          <iframe
            className="w-full h-full border-0 [filter:grayscale(.32)_contrast(1.05)_brightness(.80)]"
            title="Map of Dedham Airport Taxi & Livery"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-71.228%2C42.218%2C-71.125%2C42.286&layer=mapnik&marker=42.247%2C-71.166"
            loading="lazy"
          />
          <div className="absolute left-[18px] top-[18px] max-[600px]:left-[10px] max-[600px]:top-[10px] bg-[rgba(18,27,31,0.94)] p-[16px_18px] w-[235px] max-[600px]:w-[215px] text-[10px]">
            <div className="flex gap-[9px] py-2 border-b border-white/[.08] [&_svg]:text-[#61b2b0] [&_svg]:flex-none">
              <MapPin size={16} />
              <span>
                <small className="block text-[#78bbb9] text-[8px] mb-[3px]">MAIN OFFICE</small>
                3 Allied Dr Ste 303<br />Dedham, MA 02026
              </span>
            </div>
            <div className="flex gap-[9px] py-2 border-b border-white/[.08] [&_svg]:text-[#61b2b0] [&_svg]:flex-none">
              <Phone size={15} />
              <span>781-777-8033</span>
            </div>
            <div className="flex gap-[9px] py-2 [&_svg]:text-[#61b2b0] [&_svg]:flex-none">
              <Plane size={15} />
              <span>
                <small className="block text-[#78bbb9] text-[8px] mb-[3px]">PRIMARY HUB</small>
                Boston Logan International (BOS)
              </span>
            </div>
          </div>
        </div>
        <ServiceAreas />
      </div>
      <div className={`${SITE_CONTAINER} mt-6 flex gap-2 items-center text-[10px] text-[#7ad0c6]`}>
        <Clock3 size={14} />
        <span>24/7 Service availability</span>
      </div>
    </section>
  );
}
