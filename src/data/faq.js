import { serviceAreas } from './serviceAreas';

export const faqs = [
  {
    question: 'How much does a taxi from Dedham to Logan Airport cost?',
    answer:
      'Airport transfer rates depend on your pickup location, vehicle type, and time of day. Request a free, no-obligation quote through our booking form or by calling 781-777-8033, and we’ll confirm your exact rate before you book — no surprise charges on arrival.',
  },
  {
    question: 'Do you offer flat-rate airport transfers?',
    answer:
      'Yes. Airport transfers to and from Boston Logan International Airport are quoted as a flat rate confirmed at booking, regardless of traffic or route.',
  },
  {
    question: 'What areas do you serve besides Dedham, MA?',
    answer: `We provide taxi and livery service throughout Greater Boston, including ${serviceAreas.slice(0, 12).join(', ')}, and more.`,
  },
  {
    question: 'Is Dedham Airport Taxi & Livery available 24/7?',
    answer:
      'Yes, our dispatch team and drivers are available 24 hours a day, 7 days a week for airport transfers, corporate travel, and special events.',
  },
  {
    question: 'How do I book a ride?',
    answer:
      'Book online through our contact form or call/text us directly at 781-777-8033. We recommend booking at least a few hours in advance for airport transfers.',
  },
  {
    question: 'What types of vehicles are available?',
    answer:
      'We offer luxury sedans (up to 3 passengers) and luxury SUVs (3-6 passengers) for point-to-point transfers, corporate travel, and special occasions.',
  },
];
