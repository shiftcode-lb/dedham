import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone } from 'lucide-react';

import bg from '../assets/images/real-suburban-airport.png';

import SchemaMarkup from '../components/SchemaMarkup';
import { contactSchema } from '../data/schema';
import { SITE_CONTAINER } from '../styles/container';

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  vehicle: 'Luxury Sedan',
  requests: '',
};

const inputClasses =
  'w-full border border-[#cfd6da] bg-white text-[#596166] px-3 outline-none text-[11px] h-[39px] max-[600px]:h-[42px] focus:border-[#42b0aa] transition-colors';

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const update = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setStatus('sending');
    setMessage('');

    const templateParameters = {
      first_name: form.firstName,
      last_name: form.lastName,
      customer_name: `${form.firstName} ${form.lastName}`,
      customer_email: form.email,
      reply_to: form.email,
      phone: form.phone,
      pickup: form.pickup,
      dropoff: form.dropoff,
      date: form.date,
      time: form.time,
      vehicle: form.vehicle,
      requests: form.requests || 'No special requests provided.',
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParameters,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setStatus('success');
      setMessage(
        'Thank you. Your ride request has been sent successfully.',
      );
      setForm(initial);
    } catch (error) {
      console.error('EmailJS error:', error);

      setStatus('error');
      setMessage(
        'We could not send your request. Please try again or call 781-777-8033.',
      );
    }
  };

  return (
    <section
      className="min-h-[870px] max-[600px]:min-h-0 bg-cover bg-[center_55%] max-[600px]:bg-[58%_center] flex items-center py-[58px]"
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(3, 18, 22, 0.80),
          rgba(3, 18, 22, 0.36)
        ), url(${bg})`,
      }}
    >
      <SchemaMarkup schema={contactSchema} />

      <div
        className={`${SITE_CONTAINER} grid grid-cols-[.92fr_1.08fr] max-[1080px]:grid-cols-1 gap-[76px] max-[1024px]:gap-10 max-[600px]:gap-[30px] items-center`}
      >
        <div className="text-white pl-2 max-[1080px]:pl-0">
          <h1 className="text-[52px] max-[600px]:text-[40px] tracking-[-0.045em] mb-[18px]">
            Book Your Ride
          </h1>

          <p className="text-[14px] max-[600px]:text-[12px] text-white/88 max-w-[470px]">
            Experience the pinnacle of reliable, sophisticated transportation.
            Whether for corporate travel, airport transfers, or a special
            evening, our premium fleet and professional chauffeurs await.
          </p>

          <div className="border-t border-white/20 mt-7 pt-[14px] grid gap-3">
            <a
              className="flex gap-[9px] items-center text-[11px] text-[#e3e9e9] [&_svg]:text-[#42b0aa]"
              href="tel:+17817778033"
            >
              <Phone size={15} />
              781-777-8033
            </a>

            <a
              className="flex gap-[9px] items-center text-[11px] text-[#e3e9e9] [&_svg]:text-[#42b0aa]"
              href="mailto:dedhamairporttaxi@gmail.com"
            >
              <Mail size={15} />
              dedhamairporttaxi@gmail.com
            </a>

            <span className="flex gap-[9px] items-center text-[11px] text-[#e3e9e9] [&_svg]:text-[#42b0aa]">
              <MapPin size={15} />
              Boston Metro Area &amp; Logan Airport
            </span>
          </div>
        </div>

        <form
          className="bg-[#f5f7fb] rounded-md p-9 max-[1024px]:p-8 max-[600px]:p-[26px_20px] shadow-[0_20px_55px_rgba(0,0,0,0.18)] max-[1080px]:max-w-[680px] max-[1080px]:w-full max-[1080px]:mx-auto"
          onSubmit={submit}
        >
          <FormSection title="01 Passenger Info">
            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-[11px]">
              <Field label="FIRST NAME">
                <input
                  className={inputClasses}
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={update}
                  placeholder="John"
                  autoComplete="given-name"
                />
              </Field>

              <Field label="LAST NAME">
                <input
                  className={inputClasses}
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={update}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </Field>

              <Field label="EMAIL">
                <input
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

              <Field label="PHONE">
                <input
                  className={inputClasses}
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="(555) 000-0000"
                  autoComplete="tel"
                />
              </Field>
            </div>
          </FormSection>

          <FormSection title="02 Trip Details">
            <Field label="PICK-UP LOCATION">
              <input
                className={inputClasses}
                required
                name="pickup"
                value={form.pickup}
                onChange={update}
                placeholder="Address or airport"
                autoComplete="street-address"
              />
            </Field>

            <Field label="DROP-OFF LOCATION">
              <input
                className={inputClasses}
                required
                name="dropoff"
                value={form.dropoff}
                onChange={update}
                placeholder="Address or airport"
              />
            </Field>

            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-[11px]">
              <Field label="DATE">
                <input
                  className={inputClasses}
                  required
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={update}
                />
              </Field>

              <Field label="TIME">
                <input
                  className={inputClasses}
                  required
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={update}
                />
              </Field>
            </div>

            <Field label="VEHICLE PREFERENCE">
              <select
                className={inputClasses}
                name="vehicle"
                value={form.vehicle}
                onChange={update}
              >
                <option value="Luxury Sedan">Luxury Sedan</option>
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Executive Van">Executive Van</option>
              </select>
            </Field>
          </FormSection>

          <FormSection title="03 Special Requests">
            <textarea
              className="w-full border border-[#cfd6da] bg-white text-[#596166] outline-none text-[11px] h-[86px] p-[11px] resize-y focus:border-[#42b0aa] transition-colors"
              name="requests"
              value={form.requests}
              onChange={update}
              placeholder="Flight number, child seat required, etc."
            />
          </FormSection>

          <button
            className="w-full h-[38px] border-0 bg-turquoise text-white text-[9px] tracking-[0.04em] cursor-pointer transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending'
              ? 'SENDING REQUEST...'
              : 'SUBMIT REQUEST →'}
          </button>

          {message && (
            <p
              aria-live="polite"
              className={`text-center text-[10px] mt-[10px] mb-0 ${
                status === 'success'
                  ? 'text-[#176366]'
                  : 'text-[#b42318]'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function FormSection({ title, children }) {
  return (
    <section className="mb-[29px]">
      <h2 className="text-[18px] max-[600px]:text-[17px] pb-2 border-b border-[#d9dfe2] mb-[13px]">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-[7px] tracking-[0.06em] mb-1">
        {label}
      </span>

      {children}
    </label>
  );
}