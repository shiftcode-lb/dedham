import logo from '../assets/images/dedham-official-logo.jpg';
import { serviceAreas } from './serviceAreas';

const SITE_URL = 'https://dedhamairporttaxi.com';

// Resolves a path against the live site domain so schema URLs are always
// absolute, even though Vite serves the logo from a hashed build path.
function absoluteUrl(path) {
  try {
    return new URL(path, SITE_URL).href;
  } catch {
    return path;
  }
}

const businessCore = {
  '@type': 'TaxiService',
  name: 'Dedham Airport Taxi & Livery',
  image: absoluteUrl(logo),
  telephone: '+1-781-777-8033',
  email: 'dedhamairporttaxi@gmail.com',
  url: SITE_URL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3 Allied Dr Ste 303',
    addressLocality: 'Dedham',
    addressRegion: 'MA',
    postalCode: '02026',
    addressCountry: 'US',
  },
  areaServed: serviceAreas,
  priceRange: '$$',
};

// Home — primary business identity schema
export const homeSchema = {
  '@context': 'https://schema.org',
  ...businessCore,
};

// About — organization background schema
export const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Dedham Airport Taxi & Livery',
  url: absoluteUrl('/about'),
  mainEntity: {
    '@type': 'Organization',
    name: 'Dedham Airport Taxi & Livery',
    description:
      'For over 15 years, Dedham Airport Taxi & Livery has provided executive transport and reliable airport transfers with 24/7 concierge dispatch.',
    telephone: '+1-781-777-8033',
    url: SITE_URL,
    image: absoluteUrl(logo),
  },
};

// Services — one Service entity per offering actually listed on the page
export const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      serviceType: 'Airport Transfers',
      name: 'Airport Transfers',
      description:
        'Seamless, punctual transportation to and from all major regional airports, including Logan Airport and TF Green, with flight tracking.',
      provider: { '@type': 'TaxiService', name: 'Dedham Airport Taxi & Livery' },
      areaServed: serviceAreas,
      url: absoluteUrl('/services'),
    },
    {
      '@type': 'Service',
      serviceType: 'Corporate Travel',
      name: 'Corporate Travel',
      description:
        'Dedicated executive accounts offering streamlined booking, discreet service, and a mobile-office environment for busy professionals.',
      provider: { '@type': 'TaxiService', name: 'Dedham Airport Taxi & Livery' },
      areaServed: serviceAreas,
      url: absoluteUrl('/services'),
    },
    {
      '@type': 'Service',
      serviceType: 'Special Events',
      name: 'Special Events',
      description:
        'Premium fleet transportation for weddings, galas, proms, and nights out in Boston.',
      provider: { '@type': 'TaxiService', name: 'Dedham Airport Taxi & Livery' },
      areaServed: serviceAreas,
      url: absoluteUrl('/services'),
    },
  ],
};

// Contact — how to reach the business
export const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Dedham Airport Taxi & Livery',
  url: absoluteUrl('/contact'),
  mainEntity: {
    '@type': 'Organization',
    name: 'Dedham Airport Taxi & Livery',
    url: SITE_URL,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-781-777-8033',
      email: 'dedhamairporttaxi@gmail.com',
      contactType: 'customer service',
      areaServed: 'US',
    },
  },
};

// Safety — generic WebPage schema (no FAQ/product data exists on this
// page to justify a more specific type)
export const safetySchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Safety First | Dedham Airport Taxi & Livery',
  url: absoluteUrl('/safety'),
  description:
    'Vehicle maintenance standards, driver vetting, and safety policies at Dedham Airport Taxi & Livery.',
};

// Terms — generic WebPage schema
export const termsSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Terms and Policies | Dedham Airport Taxi & Livery',
  url: absoluteUrl('/terms'),
  description:
    'Booking, cancellation, payment, and privacy policies for Dedham Airport Taxi & Livery.',
};
