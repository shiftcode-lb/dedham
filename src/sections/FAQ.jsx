import { faqs } from '../data/faq';
import { SITE_CONTAINER } from '../styles/container';

export default function FAQ() {
  return (
    <section className="py-20 max-[600px]:py-14 bg-off-white">
      <div className={SITE_CONTAINER}>
        <h2 className="font-semibold text-[32px] max-[600px]:text-[26px] text-turquoise leading-[1.25] tracking-[-0.32px] mb-10 max-[600px]:mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-x-12 gap-y-8 max-w-[980px] mx-auto">
          {faqs.map((item) => (
            <div key={item.question}>
              <h3 className="text-[17px] font-semibold text-charcoal mb-2">
                {item.question}
              </h3>
              <p className="text-[15px] text-muted leading-[1.6]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
