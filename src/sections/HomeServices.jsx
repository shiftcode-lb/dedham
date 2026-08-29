import { Plane, BriefcaseBusiness, PartyPopper } from 'lucide-react';
import { services } from '../data/services';
import { SITE_CONTAINER } from '../styles/container';

const icons = [Plane, BriefcaseBusiness, PartyPopper];

export default function HomeServices() {
  return (
    <section className="py-20 bg-turquoise">
      <div className={`${SITE_CONTAINER} flex flex-col gap-16 items-center`}>
        <header className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-semibold text-[32px] text-off-white tracking-[-0.32px]">Dedham Taxi & Livery Service</h2>
          <p className="max-w-[672px] text-[18px] text-white leading-[1.56]">
            Providing airport and local transportation services for your convenience and comfort.
          </p>
        </header>

        <div className="flex max-[900px]:flex-col gap-6 w-full">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <article
                className="flex-1 bg-off-white rounded-lg p-8 flex flex-col gap-3 shadow-[0px_12px_16px_rgba(17,20,24,0.08)]"
                key={s.title}
              >
                <span className="w-12 h-12 grid place-items-center bg-turquoise/10 rounded-xl text-turquoise-dark">
                  <Icon size={20} />
                </span>
                <h3 className="pt-3 font-semibold text-[18px] text-charcoal leading-[1.33]">{s.shortTitle}</h3>
                <p className="text-[14px] font-medium text-[#2C3E50] leading-[1.5]">{s.homeDescription}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
