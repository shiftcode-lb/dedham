import { MapPin } from 'lucide-react';
import { serviceAreas } from '../data/serviceAreas';

export default function ServiceAreas() {
  return (
    <div>
      <h2 className="text-[28px] max-[600px]:text-[24px] mb-6">
        Our Service Areas
      </h2>

      <div className="grid grid-cols-4 gap-x-5 gap-y-[11px] max-[600px]:grid-cols-3 max-[600px]:gap-x-2 max-[380px]:grid-cols-3">
        {serviceAreas.map((city) => (
          <div
            className="flex items-center gap-[6px] text-[9px] text-[#c4cccc] min-w-0 max-[600px]:gap-1 max-[380px]:text-[8px] [&_svg]:text-[#70b5b3] [&_svg]:flex-none"
            key={city}
          >
            <MapPin size={10} />

            <span className="min-w-0 break-words">{city}</span>
          </div>
        ))}
      </div>
    </div>
  );
}