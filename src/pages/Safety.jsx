import { BriefcaseBusiness, CarFront, ShieldCheck } from 'lucide-react';
import safetyImg from '../assets/images/real-mercedes-side.png';

import SchemaMarkup from '../components/SchemaMarkup';
import { safetySchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

const standards = [
  [CarFront, 'Regular maintenance', ' We take our commitment to safety seriously. Our certified mechanics meticulously inspect each vehicle, ensuring every system is in top condition. This includes checking brakes, tires, fluid levels, lights, and all safety features. We leave nothing to chance, so you can relax and focus on enjoying the ride.'],
  [BriefcaseBusiness, 'Experienced drivers', 'Our team consists of seasoned professionals who undergo rigorous training and background checks. Theyre experts in navigating the roads, prioritizing safety above all else.'],
  [ShieldCheck, 'Safety policies', 'We have clear and comprehensive safety procedures in place, followed by both drivers and passengers. This includes pre-trip inspections, emergency protocols, and clear communication throughout the journey.'],
];

export default function Safety() {
  return (
    <>
      <SchemaMarkup schema={safetySchema} />
      <section className="py-[70px] max-[600px]:py-[52px] bg-[#f9faff]">
        <div
          className={`${SITE_CONTAINER} grid grid-cols-2 max-[1080px]:grid-cols-1 gap-[90px] max-[1024px]:gap-[45px] items-center`}
        >
          <div>
            <h1 className="text-[34px] max-[600px]:text-[30px] text-[#00646a] mb-4">Safety First</h1>
            <p className="text-[16px] text-[#61696c] max-w-[520px]">
              At Dedham airport taxi & livery, your safety is our top priority. We understand that peace of mind is essential for a relaxing and enjoyable journey. Here's what sets us apart when it comes to safe and reliable transportation. After all, the open road awaits, and we want you to experience it with the confidence of knowing you're in the best hands.
            </p>
          </div>
          <img
            className="w-full h-[300px] max-[1080px]:h-[330px] max-[600px]:h-[250px] object-cover object-[center_58%]"
            src={safetyImg}
            alt="Black luxury vehicle"
          />
        </div>
      </section>

      <section className="py-[58px] max-[600px]:py-[52px] bg-[#f0f2f8]">
        <div className={`${SITE_CONTAINER} grid grid-cols-3 max-[1080px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6`}>
          {standards.map(([Icon, title, text], i) => {
            const isLast = i === standards.length - 1;
            return (
              <article
                className={`bg-white border border-[#d8dee2] p-[26px] min-h-[235px] ${
                  isLast ? 'max-[1080px]:col-span-full max-[600px]:col-auto' : ''
                }`}
                key={title}
              >
                <span className="w-10 h-10 grid place-items-center bg-[#d7f1ef] text-[#137172] mb-[22px]">
                  <Icon size={18} />
                </span>
                <h2 className="text-[16px] mb-[10px]">{title}</h2>
                <p className="text-[12px] text-[#697174]">{text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
