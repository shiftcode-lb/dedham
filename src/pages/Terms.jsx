import SchemaMarkup from '../components/SchemaMarkup';
import { termsSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

function TermsSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-8 mb-10 pb-10 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
      <h2 className="relative pl-4 font-display text-xl sm:text-2xl font-bold text-gray-900 mb-4 before:content-[''] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-[#18818a] before:rounded-full">
        {title}
      </h2>
      <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function Terms() {
  const sections = [
    { id: 'booking', title: '1. Booking & Reservations' },
    { id: 'riding', title: '2. Passenger Rules & Safety' },
    { id: 'cancellation', title: '3. Cancellations & Modifications' },
    { id: 'payments', title: '4. Rates, Fees & Payment Terms' },
    { id: 'support', title: '5. Support & Feedback' },
    { id: 'privacy', title: '6. Privacy, Data & Legal Compliance' },
  ];

  return (
    <main className="py-12 sm:py-16 bg-gray-50 min-h-screen">
      <SchemaMarkup schema={termsSchema} />
      <div className={SITE_CONTAINER}>
        
        {/* Header Hero Banner */}
        <header className="bg-[#2A6E6F] text-white p-8 sm:p-12 mb-10 rounded-2xl shadow-sm">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-xs font-semibold tracking-wider uppercase rounded-full mb-3">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display tracking-tight mb-4 text-white">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm sm:text-base font-medium leading-relaxed text-teal-50/90">
              Welcome to Dedham Airport Taxi &amp; Livery. These terms govern your use of our transit services across Dedham and the Greater Boston area. By placing a booking, you agree to these operational policies.
            </p>
            <p className="mt-4 text-xs font-medium text-teal-100/70">
              Last Updated: January 2026
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Quick Navigation / Table of Contents */}
          <aside className="lg:col-span-1 bg-white p-5 rounded-xl border border-gray-200 sticky top-6 hidden lg:block shadow-xs">
            <h3 className="text-xs font-bold text-[#2C3E50] uppercase tracking-wider mb-3">
              Table of Contents
            </h3>
            <nav className="flex flex-col space-y-2">
              {sections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-gray-600 hover:text-[#18818a] transition-colors py-1"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Body */}
          <article className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-xs">
            
            <TermsSection id="booking" title="1. Booking &amp; Reservations">
              <p className="font-medium text-[#2C3E50]">
                Ride requests can be submitted via our official website interface. Users are required to provide accurate information including full name, verified contact phone number, pickup coordinates, and target destination.
              </p>
              <p className="font-medium text-[#2C3E50]">
                Submission of a booking form constitutes a preliminary request. Our dispatch team reviews availability and will confirm all ride details via direct phone call or WhatsApp before dispatching a driver.
              </p>
            </TermsSection>

            <TermsSection id="riding" title="2. Passenger Rules &amp; Safety">
              <p className="font-medium text-[#2C3E50]">
                Your safety and comfort are paramount. All drivers operating under Dedham Airport Taxi &amp; Livery undergo background verification, licensing checks, and routine safety inspections in compliance with regional regulations.
              </p>
              <p className="font-medium text-[#2C3E50]">
                Passengers are expected to conduct themselves respectfully. The company reserves the right to decline service to any individual exhibiting unsafe or disruptive behavior.
              </p>
            </TermsSection>

            <TermsSection id="cancellation" title="3. Cancellations &amp; Modifications">
              <p className="font-medium text-[#2C3E50]">
                We offer flexible cancellation terms. Passengers may modify or cancel pending reservations up to 60 minutes prior to the scheduled pickup time without incurring penalty fees.
              </p>
              <p className="font-medium text-[#2C3E50]">
                To adjust your schedule or route details, contact dispatch directly via phone or WhatsApp. Any modifications to route, stops, or timing after confirmation may result in rate adjustments, which will be communicated prior to departure.
              </p>
            </TermsSection>

            <TermsSection id="payments" title="4. Rates, Fees &amp; Payment Terms">
              <p className="font-medium text-[#2C3E50]">
                We maintain full pricing transparency. Estimated fares are calculated based on distance, time, and service tier, and are provided during the reservation confirmation step.
              </p>
              <p className="font-medium text-[#2C3E50]">
                Payment must be completed upon arrival or prior to trip completion. Accepted payment methods include Cash, major Credit/Debit Cards (Visa, MasterCard), and Venmo.
              </p>
            </TermsSection>

            <TermsSection id="support" title="5. Support &amp; Feedback">
              <p  className="font-medium text-[#2C3E50]">
                Our customer support center operates 24/7 to assist with active trips, schedule inquiries, lost-and-found items, and general customer care.
              </p>
              <p className="font-medium text-[#2C3E50]">
                We welcome feedback regarding vehicle cleanliness, driver performance, and overall service quality to continually improve our operations.
              </p>
            </TermsSection>

            <TermsSection id="privacy" title="6. Privacy, Data &amp; Legal Compliance">
              <p className="font-medium text-[#2C3E50]">
                Personal information collected during reservation processing (names, contact numbers, route details) is strictly utilized for service fulfillment and customer safety.
              </p>
              <p className="font-medium text-[#2C3E50]">
                We comply fully with local, state, and federal privacy regulations and will never sell or unauthorizedly distribute customer data to third-party advertisers.
              </p>
            </TermsSection>

          </article>
        </div>

      </div>
    </main>
  );
}