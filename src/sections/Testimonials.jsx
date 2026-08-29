import { Star } from 'lucide-react';

import {
  homeTestimonials,
  aboutTestimonials,
} from '../data/testimonials';
import { SITE_CONTAINER } from '../styles/container';

export default function Testimonials({ home = false }) {
  const data = home ? homeTestimonials : aboutTestimonials;

  return (
    <section className="py-[72px] max-[600px]:py-[55px] bg-[#fbfaf8]">
      <div className={SITE_CONTAINER}>
        <header className="text-center mb-[34px]">
          <h2
            className={`text-[27px] max-[600px]:text-[24px] mb-[6px] ${
              home ? 'text-[#07585a]' : 'text-[#111418]'
            }`}
          >
            Client Experiences
          </h2>

          {home && <p className="text-[16px] font-medium text-[#2C3E50]">What Our Clients Say</p>}
        </header>

        <div className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[22px]">
          {data.map((t, i) => {
            const isLast = i === data.length - 1;
            return (
              <article
                className={`bg-white border border-[#dce1e1] p-[27px_30px] min-h-[225px] flex flex-col ${
                  isLast ? 'max-[1080px]:col-span-full max-[600px]:col-auto' : ''
                }`}
                key={t.name}
              >
                {home && (
                  <div className="flex gap-[3px] text-[#167575] mb-[14px]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                )}

                <p className="text-[15px] font-medium text-[#566064] italic flex-1">
                  “{t.quote}”
                </p>

                <div className="border-t border-[#dfe3e3] pt-4 flex gap-3 items-center">
                  <span className="w-[30px] h-[30px] rounded-full bg-[#237274] text-white grid place-items-center text-[9px]">
                    {t.initials}
                  </span>

                  <div>
                    <strong className="block text-[12px]">{t.name}</strong>

                    {t.role && (
                      <small className="block text-[8px] text-[#737b7e]">{t.role}</small>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
