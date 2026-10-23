import { locations, locationPath } from './locations.js';
import { routes, routePath } from './routes.js';

// One flat list of every town + route landing page, so the router, the
// sitemap/prerender build script, and the hub pages all read from the same
// source and can never drift apart. Plain JS (no asset imports) so the Node
// build script can import it directly.
const PHONE = '781-777-8033';

function townPage(loc) {
  const isHome = loc.slug === 'dedham';
  const title = isHome
    ? 'Dedham Taxi & Car Service | Logan Airport Transfers'
    : `${loc.name}, MA Taxi & Car Service | Logan Airport Transfers`;

  return {
    type: 'town',
    path: locationPath(loc.slug),
    title,
    description: `Airport taxi and car service in ${loc.name}, MA to Boston Logan Airport — about ${loc.miles} miles, ${loc.minutes} minutes. Flat-rate, flight-tracked rides 24/7. Call ${PHONE}.`,
    h1: isHome
      ? 'Dedham Taxi & Car Service'
      : `${loc.name}, MA Taxi & Car Service`,
    intro: `${loc.blurb} We provide private airport transfers to Boston Logan International Airport, local point-to-point rides, corporate travel, and special-event transportation.`,
    facts: [
      ['Distance to Logan', `About ${loc.miles} miles`],
      ['Typical drive time', `${loc.minutes} minutes`],
      ['Availability', '24 hours, 7 days a week'],
      ['Pricing', 'Flat rate confirmed at booking'],
    ],
    highlights: [
      `Door-to-door airport transfers from ${loc.name} to Logan (BOS) and TF Green (PVD)`,
      'Flight tracking, so your driver adjusts if your flight is early or late',
      'Sedans for up to 3 passengers and SUVs for 3–6 passengers',
      `Local rides around ${loc.landmarks.slice(0, 3).join(', ')} and the rest of ${loc.name}`,
    ],
    faqs: [
      {
        question: `How much is a taxi from ${loc.name} to Logan Airport?`,
        answer: `Rates depend on your pickup address, vehicle, and time of day. Call or text ${PHONE} or use the booking form and we’ll confirm a flat rate before you book — no surprise charges.`,
      },
      {
        question: `How long does it take to get from ${loc.name} to Logan Airport?`,
        answer: `Typically ${loc.minutes} minutes (roughly ${loc.miles} miles), depending on traffic. We recommend booking early and allowing extra time at peak commute hours.`,
      },
      {
        question: `Is there an airport taxi near me in ${loc.name}?`,
        answer: `Yes. Dedham Airport Taxi & Livery is based at 3 Allied Drive in Dedham and serves ${loc.name} 24/7. Book online or call ${PHONE}.`,
      },
    ],
    breadcrumbName: loc.name,
    parent: { name: 'Service Areas', path: '/service-areas' },
    service: `Taxi and car service in ${loc.name}, MA`,
  };
}

function routePage(route) {
  const isEvent = route.kind === 'event';
  return {
    type: 'route',
    path: routePath(route.slug),
    title: `${route.title} | Dedham Airport Taxi`,
    description: `${route.summary} About ${route.miles} miles, ${route.minutes}. Flat-rate, flight-tracked, 24/7. Call ${PHONE}.`,
    h1: route.title,
    intro: `${route.summary} ${route.notes}`,
    facts: [
      [isEvent ? 'Typical distance' : 'Distance from Logan', `About ${route.miles} miles`],
      ['Typical drive time', route.minutes],
      ['Availability', '24 hours, 7 days a week'],
      ['Pricing', 'Flat rate confirmed at booking'],
    ],
    highlights: [
      'Private sedan or SUV — no shared rides, no transfers',
      'Flight tracking and pickup timing planned around your schedule',
      'Luggage and child-seat assistance on request',
      'Pickup from Dedham, Greater Boston, or Boston Logan',
    ],
    faqs: [
      {
        question: `How long is the drive to ${route.name}?`,
        answer: `Typically ${route.minutes} (about ${route.miles} miles), depending on traffic, weather, and time of day.`,
      },
      {
        question: `How much does a ride to ${route.name} cost?`,
        answer: `Longer routes are quoted as a flat rate confirmed at booking. Call or text ${PHONE} or use the booking form for a no-obligation quote.`,
      },
      {
        question: 'Can I book a ride in the opposite direction or for a return trip?',
        answer: `Yes — we run transfers in both directions and can schedule your return at the same time. Call ${PHONE} to set it up.`,
      },
    ],
    breadcrumbName: route.name,
    parent: { name: 'Airport Routes', path: '/routes' },
    service: route.title,
  };
}

export const townPages = locations.map(townPage);
export const routePages = routes.map(routePage);
export const landingPages = [...townPages, ...routePages];

export const hubPages = [
  {
    path: '/service-areas',
    title: 'Service Areas | Taxi & Car Service Near Dedham, MA',
    description:
      'Dedham Airport Taxi & Livery serves Dedham, Norwood, Westwood, Needham, Canton, Walpole, Sharon, Milton, Wellesley and more. Flat-rate airport rides 24/7.',
  },
  {
    path: '/routes',
    title: 'Airport Routes | Logan to Cape Cod, Providence, Newport & More',
    description:
      'Private car service from Boston Logan to Cape Cod, Hyannis, Woods Hole, Providence, Newport, Manchester NH, Plymouth, Worcester and Portland ME.',
  },
];
