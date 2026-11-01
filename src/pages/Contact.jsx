import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone } from 'lucide-react';

import bg from '../assets/images/real-suburban-airport.webp';

import AddressInput from '../components/AddressInput';
import SchemaMarkup from '../components/SchemaMarkup';
import PageMeta from '../components/PageMeta';
import { contactSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';
import { trackAdsConversion, trackEvent } from '../lib/analytics';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+33', country: 'FR' },
  { code: '+49', country: 'DE' },
  { code: '+971', country: 'UAE' },
  { code: '+961', country: 'LB' },
  { code: '+91', country: 'IN' },
  { code: '+81', country: 'JP' },
];

const SERVICE_TYPES = [
  'Airport — to Logan (BOS)',
  'Airport — from Logan (BOS)',
  'Airport — other (PVD / MHT)',
  'Point to Point Transportation',
  'Night Out',
  'Hourly Limo',
];

const CHILD_SEATS = ['None', 'Infant', 'Toddler', 'Booster'];

const initial = {
  name: '',
  email: '',
  countryCode: '+1',
  phone: '',
  serviceType: 'Airport — to Logan (BOS)',
  pickupLocation: '',
  dropoffLocation: '',
  passengers: '1',
  suitcases: '0',
  carType: 'Luxury Sedan (Up to 3 passengers)',
  pickupDate: '',
  pickupHour: '',
  flightNumber: '',
  airline: '',
  roundTrip: false,
  returnDate: '',
  returnHour: '',
  returnFlightNumber: '',
  childSeat: 'None',
  notes: '',
};

const inputClasses =
  'w-full border border-slate-300 bg-white text-slate-700 px-3 py-2 rounded-md outline-none text-xs sm:text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all';

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');

  const update = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (status === 'error') setStatus('idle');
  };

  const submit = async (e) => {
    e.preventDefault();

    setStatus('sending');

    const templateParameters = {
      customer_name: form.name,
      customer_email: form.email,
      reply_to: form.email,
      phone: `${form.countryCode} ${form.phone}`,
      service_type: form.serviceType,
      pickup_location: form.pickupLocation,
      dropoff_location: form.dropoffLocation,
      passengers: form.passengers,
      suitcases: form.suitcases,
      car_type: form.carType,
      pickup_date: form.pickupDate,
      pickup_hour: form.pickupHour,
      flight_number: form.flightNumber || 'N/A',
      airline: form.airline || 'N/A',
      round_trip: form.roundTrip ? 'Yes' : 'No',
      return_date: form.roundTrip ? form.returnDate : 'N/A',
      return_hour: form.roundTrip ? form.returnHour : 'N/A',
      return_flight_number: form.roundTrip ? form.returnFlightNumber || 'N/A' : 'N/A',
      child_seat: form.childSeat,
      notes: form.notes || 'N/A',
    };

    // Dev-only: lets you confirm every field reaches the EmailJS template.
    if (import.meta.env.DEV) console.info('Booking payload', templateParameters);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParameters,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      trackEvent('booking_submit', {
        service_type: form.serviceType,
        car_type: form.carType,
      });
      trackEvent('generate_lead', {
        service_type: form.serviceType,
        car_type: form.carType,
      });
      trackAdsConversion('lead');

      setStatus('success');
      setForm(initial);
    } catch (error) {
      console.error('EmailJS error:', error);

      setStatus('error');
    }
  };

  return (
    <section
      className="min-h-[870px] bg-cover bg-[center_55%] flex items-center py-12 sm:py-16"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(3, 18, 22, 0.85),
          rgba(3, 18, 22, 0.45)
        ), url(${bg})`,
      }}
    >
      <PageMeta
        title="Book a Ride | Contact Dedham Airport Taxi & Livery"
        description="Book your airport taxi or car service in Dedham, MA. Call 781-777-8033 or request a ride online for 24/7 reliable transportation to Boston Logan Airport."
        path="/contact"
      />
      <SchemaMarkup schema={contactSchema} />

      <div
        className={`${SITE_CONTAINER} grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center`}
      >
        {/* Left Side Content */}
        <div className="text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-tight">
            Book Your Ride
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-lg mb-8 leading-relaxed">
            Experience the pinnacle of reliable, sophisticated transportation.
            Whether for corporate travel, airport transfers, or a special
            evening, our premium fleet and professional chauffeurs await.
          </p>

          <div className="border-t border-white/20 pt-6 space-y-4">
            <a
              className="flex items-center gap-3 text-sm font-medium text-slate-200 hover:text-teal-400 transition-colors"
              href="tel:+17817778033"
            >
              <Phone size={18} className="text-teal-400 shrink-0" />
              781-777-8033
            </a>

            <a
              className="flex items-center gap-3 text-sm font-medium text-slate-200 hover:text-teal-400 transition-colors"
              href="mailto:dedhamairporttaxi@gmail.com"
            >
              <Mail size={18} className="text-teal-400 shrink-0" />
              dedhamairporttaxi@gmail.com
            </a>

            <span className="flex items-center gap-3 text-sm font-medium text-slate-200">
              <MapPin size={18} className="text-teal-400 shrink-0" />
              Boston Metro Area &amp; Logan Airport
            </span>
          </div>
        </div>

        {/* Right Side Form */}
        {status === 'success' ? (
          <div
            role="status"
            className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-xl w-full mx-auto text-center"
          >
            <h2 className="text-xl font-semibold text-teal-700 mb-3">Request received</h2>
            <p className="text-sm text-slate-700 leading-relaxed mb-5">
              We&apos;ll confirm by phone or text shortly. Need it now? Call{' '}
              <a className="font-semibold text-teal-700 underline" href="tel:+17817778033">
                781-777-8033
              </a>
              .
            </p>
            <button
              type="button"
              className="text-xs font-semibold tracking-wider uppercase text-teal-700 underline cursor-pointer"
              onClick={() => setStatus('idle')}
            >
              Submit another request
            </button>
          </div>
        ) : (
          <form
            className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-xl w-full mx-auto"
            method="post"
            action="/contact/"
            onSubmit={submit}
          >
            {/* Section 1 */}
            <FormSection title="01 Passenger Info">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="FULL NAME" htmlFor="name" required>
                  <input
                    id="name"
                    className={inputClasses}
                    required
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </Field>

                <Field label="EMAIL ADDRESS" htmlFor="email" required>
                  <input
                    id="email"
                    className={inputClasses}
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Field label="PHONE NUMBER" htmlFor="phone" required>
                  <div className="flex items-center border border-slate-300 bg-white rounded-md focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all overflow-hidden">
                    <select
                      className="bg-slate-50 border-r border-slate-200 text-slate-700 px-2 py-2 outline-none text-xs sm:text-sm font-medium cursor-pointer shrink-0 h-full"
                      name="countryCode"
                      aria-label="Phone country code"
                      value={form.countryCode}
                      onChange={update}
                    >
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} ({item.country})
                        </option>
                      ))}
                    </select>

                    <input
                      id="phone"
                      className="w-full bg-transparent text-slate-700 px-3 py-2 outline-none text-xs sm:text-sm"
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                    />
                  </div>
                </Field>

                <Field label="SERVICE TYPE" htmlFor="serviceType" required>
                  <select
                    id="serviceType"
                    className={inputClasses}
                    name="serviceType"
                    value={form.serviceType}
                    onChange={update}
                  >
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Section 2 */}
            <FormSection title="02 Trip Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="PICK-UP LOCATION" htmlFor="pickupLocation" required>
                  <AddressInput
                    id="pickupLocation"
                    className={inputClasses}
                    required
                    name="pickupLocation"
                    value={form.pickupLocation}
                    onChange={update}
                    placeholder="Street address, city, or airport"
                  />
                </Field>

                <Field label="DROP-OFF LOCATION" htmlFor="dropoffLocation" required>
                  <AddressInput
                    id="dropoffLocation"
                    className={inputClasses}
                    required
                    name="dropoffLocation"
                    value={form.dropoffLocation}
                    onChange={update}
                    placeholder="Street address, city, or airport"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Field label="PICKUP DATE" htmlFor="pickupDate" required>
                  <input
                    id="pickupDate"
                    className={inputClasses}
                    required
                    type="date"
                    name="pickupDate"
                    value={form.pickupDate}
                    onChange={update}
                  />
                </Field>

                <Field label="PICKUP HOUR" htmlFor="pickupHour" required>
                  <input
                    id="pickupHour"
                    className={inputClasses}
                    required
                    type="time"
                    name="pickupHour"
                    value={form.pickupHour}
                    onChange={update}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Field label="PICKUP FLIGHT NUMBER (OPTIONAL)" htmlFor="flightNumber">
                  <input
                    id="flightNumber"
                    className={inputClasses}
                    name="flightNumber"
                    value={form.flightNumber}
                    onChange={update}
                    placeholder="e.g. AA 1234"
                  />
                </Field>

                <Field label="AIRLINE (OPTIONAL)" htmlFor="airline">
                  <input
                    id="airline"
                    className={inputClasses}
                    name="airline"
                    value={form.airline}
                    onChange={update}
                    placeholder="e.g. Delta"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Field label="NUMBER OF PASSENGERS" htmlFor="passengers" required>
                  <input
                    id="passengers"
                    className={inputClasses}
                    required
                    type="number"
                    min="1"
                    max="14"
                    name="passengers"
                    value={form.passengers}
                    onChange={update}
                  />
                </Field>

                <Field label="NUMBER OF SUITCASES" htmlFor="suitcases" required>
                  <input
                    id="suitcases"
                    className={inputClasses}
                    required
                    type="number"
                    min="0"
                    max="10"
                    name="suitcases"
                    value={form.suitcases}
                    onChange={update}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Field label="CAR TYPE" htmlFor="carType" required>
                  <select
                    id="carType"
                    className={inputClasses}
                    name="carType"
                    value={form.carType}
                    onChange={update}
                  >
                    <option value="Luxury Sedan (Up to 3 passengers)">
                      Luxury Sedan (Up to 3 passengers)
                    </option>
                    <option value="Luxury SUV (3-6 passengers)">
                      Luxury SUV (3-6 passengers)
                    </option>
                  </select>
                </Field>

                <Field label="CHILD SEAT NEEDED" htmlFor="childSeat">
                  <select
                    id="childSeat"
                    className={inputClasses}
                    name="childSeat"
                    value={form.childSeat}
                    onChange={update}
                  >
                    {CHILD_SEATS.map((seat) => (
                      <option key={seat} value={seat}>
                        {seat}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="roundTrip"
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer"
                >
                  <input
                    id="roundTrip"
                    type="checkbox"
                    name="roundTrip"
                    checked={form.roundTrip}
                    onChange={update}
                    className="h-4 w-4 accent-teal-700"
                  />
                  Round trip (book my return too)
                </label>
              </div>

              {form.roundTrip && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <Field label="RETURN DATE" htmlFor="returnDate" required>
                    <input
                      id="returnDate"
                      className={inputClasses}
                      required
                      type="date"
                      name="returnDate"
                      value={form.returnDate}
                      onChange={update}
                    />
                  </Field>

                  <Field label="RETURN HOUR" htmlFor="returnHour" required>
                    <input
                      id="returnHour"
                      className={inputClasses}
                      required
                      type="time"
                      name="returnHour"
                      value={form.returnHour}
                      onChange={update}
                    />
                  </Field>

                  <Field label="RETURN FLIGHT (OPTIONAL)" htmlFor="returnFlightNumber">
                    <input
                      id="returnFlightNumber"
                      className={inputClasses}
                      name="returnFlightNumber"
                      value={form.returnFlightNumber}
                      onChange={update}
                      placeholder="e.g. AA 1234"
                    />
                  </Field>
                </div>
              )}

              <div className="mt-4">
                <Field label="NOTES (OPTIONAL)" htmlFor="notes">
                  <textarea
                    id="notes"
                    className={inputClasses}
                    rows={3}
                    name="notes"
                    value={form.notes}
                    onChange={update}
                    placeholder="Anything else we should know?"
                  />
                </Field>
              </div>
            </FormSection>

            <button
              className="w-full py-3 cursor-pointer bg-turquoise hover:bg-[#1E5152] text-white font-semibold text-xs tracking-wider uppercase rounded-md transition-all shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 mt-2"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending Request...' : 'Submit Request →'}
            </button>

            {status === 'error' && (
              <p role="alert" className="text-center text-xs font-medium mt-3 text-red-700">
                We could not send your request. Please try again or call{' '}
                <a className="underline" href="tel:+17817778033">
                  781-777-8033
                </a>
                .
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-slate-800 tracking-wide uppercase border-b border-slate-200 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, htmlFor, required, children }) {
  return (
    <div className="block">
      <label
        htmlFor={htmlFor}
        className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
