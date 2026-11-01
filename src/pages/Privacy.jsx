import PageMeta from '../components/PageMeta';
import { BUSINESS, TEL_HREF } from '../data/business';
import { SITE_CONTAINER } from '../styles/container';

// TODO(client): legal review of this policy before relying on it.
const LAST_UPDATED = 'November 1, 2026';

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-600 text-sm sm:text-base leading-relaxed">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="py-12 sm:py-16 bg-gray-50">
      <PageMeta
        title="Privacy Policy | Dedham Airport Taxi & Livery"
        description="How Dedham Airport Taxi & Livery collects and uses the information you give us when you book a ride, call, text, or visit our website."
        path="/privacy"
      />
      <div className={`${SITE_CONTAINER} max-w-[860px]`}>
        <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2A6E6F] mb-2">Privacy Policy</h1>
          <p className="text-xs font-medium text-gray-500 mb-8">Last updated: {LAST_UPDATED}</p>

          <Section title="What we collect">
            <p>
              When you request a ride through our booking form we collect your name, email
              address, phone number, pickup and drop-off addresses, pickup date and time,
              passenger and luggage counts, vehicle preference, child-seat needs, flight and
              airline details, and any notes you add.
            </p>
            <p>
              If you call or text us we receive your phone number and the content of your
              message.
            </p>
          </Section>

          <Section title="Why we collect it">
            <p>
              We use this information only to arrange and confirm your ride, contact you about
              it (by phone, text, or email), and keep records of the service we provided.
            </p>
          </Section>

          <Section title="Website analytics and advertising">
            <p>
              We use Google Analytics and Google Ads to understand how people find and use this
              website and to measure whether our ads lead to calls and bookings. These tools
              use cookies and similar identifiers and receive information such as the pages you
              visit and the device you use. You can limit this through your browser settings or
              Google&apos;s opt-out tools.
            </p>
          </Section>

          <Section title="Phone calls and text messages">
            <p>
              We contact you by phone or text only about rides you have requested or
              booked. Message and data rates from your carrier may apply.
            </p>
          </Section>

          <Section title="Sharing your information">
            <p>
              We do not sell your personal information. We share it only with service providers
              that help us run the business (for example, our email delivery and analytics
              providers) or when the law requires it.
            </p>
          </Section>

          <Section title="Your choices and deleting your data">
            <p>
              To ask what we hold about you, or to have it deleted, email{' '}
              <a className="text-[#2A6E6F] underline" href={`mailto:${BUSINESS.email}`}>
                {BUSINESS.email}
              </a>{' '}
              or call{' '}
              <a className="text-[#2A6E6F] underline" href={TEL_HREF}>
                {BUSINESS.phoneDisplay}
              </a>
              .
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}
