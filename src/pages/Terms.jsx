import SchemaMarkup from '../components/SchemaMarkup';
import { termsSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

const sectionBase =
  'relative p-[30px_30px_32px] max-[768px]:p-[25px_22px] max-[480px]:p-[22px_18px] mb-[34px] max-[768px]:mb-6 border rounded-xl';

const h2Base =
  'relative m-0 mb-3 pl-[18px] font-display text-[18px] max-[768px]:text-[17px] max-[480px]:text-[16px] leading-[1.3] font-bold before:content-[\'\'] before:absolute before:left-0 before:top-[1px] before:w-[3px] before:h-[22px] before:bg-turquoise';

const pBase =
  'm-0 mb-[10px] last:mb-0 text-[14px] max-[768px]:text-[12px] leading-[1.7]';

function TermsSection({ title, dark = false, children }) {
  return (
    <section
      className={`${sectionBase} ${
        dark
          ? 'bg-[#11171a] border-[#11171a] text-white'
          : 'bg-white border-[#18818a] text-[#20282c]'
      }`}
    >
      <h2
        className={`${h2Base} ${
          dark ? 'text-white' : 'text-[#20282c]'
        }`}
      >
        {title}
      </h2>

      <div
        className={
          dark
            ? '[&_p]:text-white/80'
            : '[&_p]:text-[#596267]'
        }
      >
        {children}
      </div>
    </section>
  );
}

export default function Terms() {
  return (
    <section className="py-12 pb-[70px] max-[768px]:py-8 max-[768px]:pb-[50px] bg-white">
      <SchemaMarkup schema={termsSchema} />
      <div className={SITE_CONTAINER}>

        <section className="bg-[#2A6E6F] text-white p-[42px_48px] max-[768px]:p-[32px_26px] max-[480px]:p-[27px_20px] mb-12 max-[768px]:mb-8 rounded-xl">
          <h1 className="m-0 mb-3 text-[34px] max-[768px]:text-[28px] max-[480px]:text-[25px] leading-[1.15] font-bold text-white">
            Terms and Policies
          </h1>

          <p className="m-0 max-w-[900px] text-[13px] max-[768px]:text-[12px] leading-[1.7] text-white/82">
            We're thrilled to have you on board with Dedham Airport Taxi &amp;
            Livery, your go-to ride for hassle-free transportation in and
            around Boston. Below are terms and policies that keep things
            running smoothly for all of us.
          </p>
        </section>

        <TermsSection title="Booking a Ride">
          <p className={pBase}>
            You can easily submit a ride request right here on our website.
            Just fill out the form with your phone number, pickup location,
            and destination. Once we receive your request, we'll swing into
            action. Our team will give you a shout-out via call or WhatsApp
            to confirm all the details of your ride.
          </p>
        </TermsSection>

        <TermsSection title="Riding with Us" dark>
          <p className={pBase}>
            Your safety is our priority. All our drivers are vetted and
            licensed, and our vehicles are regularly inspected.
          </p>
        </TermsSection>

        <TermsSection title="Cancellations and Changes">
          <p className={pBase}>
            We understand that plans can sometimes take an unexpected turn.
            You have up to 60 minutes before your scheduled pickup time to
            cancel or make changes to your ride. Need to tweak your pickup
            location or adjust your ride time? No problem! Simply give us a
            ring or shoot us a message on WhatsApp, and we'll get everything
            sorted out for you.
          </p>

          <p className={pBase}>
            Please note that prices may vary based on changes made to your
            ride, such as modifications to pickup location, destination, or
            time. We'll always inform you of any price adjustments before
            finalizing the changes.
          </p>
        </TermsSection>

        <TermsSection title="Payments" dark>
          <p className={pBase}>
            We believe in transparency, which is why we'll always provide you
            with the estimated price of your ride when we contact you to
            confirm your booking. You'll know exactly how much your ride will
            cost before you make any commitments. When it comes time to pay,
            you have the flexibility to choose between cash, Visa card,
            Master card or Venmo.
          </p>
        </TermsSection>

        <TermsSection title="Feedback and Support">
          <p className={pBase}>
            Have a question, concern, or just want to say hi? Our support team
            is available 24/7 to assist you. We're always looking to improve.
            Share your feedback with us, and help us make Dedham Airport Taxi
            &amp; Livery even better.
          </p>
        </TermsSection>

        <TermsSection title="Privacy and Security" dark>
          <p className={pBase}>
            We take your privacy seriously. Rest assured that any personal
            information you share with us is kept safe and secure. We comply
            with all relevant data protection laws and regulations to
            safeguard your information.
          </p>
        </TermsSection>

      </div>
    </section>
  );
}