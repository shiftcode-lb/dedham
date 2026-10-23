// Town landing pages ("own every town the business drives"). Distances and
// drive times are approximate door-to-Logan figures under normal traffic —
// they are shown as ranges on the page, never as guarantees.
export const locations = [
  {
    slug: 'dedham',
    name: 'Dedham',
    miles: 13,
    minutes: '25–35',
    blurb:
      'Our office is at 3 Allied Drive in Dedham, so this is the town we know best — from Dedham Square and Legacy Place to the Route 1 and I-95 business corridor.',
    landmarks: ['Dedham Square', 'Legacy Place', 'Dedham Corporate Center', 'Endicott Estate'],
  },
  {
    slug: 'norwood',
    name: 'Norwood',
    miles: 17,
    minutes: '30–40',
    blurb:
      'Norwood riders get the same dispatch team and drivers as our Dedham base, just a short hop down Route 1 — ideal for early flights out of Logan.',
    landmarks: ['Norwood Center', 'Route 1 corridor', 'Norwood Memorial Airport area'],
  },
  {
    slug: 'westwood',
    name: 'Westwood',
    miles: 16,
    minutes: '30–40',
    blurb:
      'From the University Avenue offices to quiet residential streets, we cover Westwood for airport runs, business travel, and evenings out.',
    landmarks: ['University Avenue', 'Westwood Station', 'Route 109'],
  },
  {
    slug: 'needham',
    name: 'Needham',
    miles: 16,
    minutes: '30–40',
    blurb:
      'Needham homes and the Route 128 / Needham Street business district are an easy run to Logan with a flat rate confirmed when you book.',
    landmarks: ['Needham Center', 'Needham Street', 'Route 128 business district'],
  },
  {
    slug: 'canton',
    name: 'Canton',
    miles: 18,
    minutes: '30–40',
    blurb:
      'Canton, from Canton Junction to the Route 138 corridor, is within our everyday service radius for airport and point-to-point rides.',
    landmarks: ['Canton Junction', 'Blue Hills Reservation', 'Route 138'],
  },
  {
    slug: 'walpole',
    name: 'Walpole',
    miles: 22,
    minutes: '35–45',
    blurb:
      'Walpole is also the gateway to Gillette Stadium, so we handle both Logan transfers and game-day or concert rides from here.',
    landmarks: ['Walpole Center', 'Route 1A', 'Gillette Stadium nearby'],
  },
  {
    slug: 'sharon',
    name: 'Sharon',
    miles: 25,
    minutes: '35–50',
    blurb:
      'Sharon travelers can book a private, flight-tracked ride to Logan instead of driving in and paying for airport parking.',
    landmarks: ['Sharon Center', 'Moose Hill Wildlife Sanctuary', 'Sharon commuter rail'],
  },
  {
    slug: 'milton',
    name: 'Milton',
    miles: 12,
    minutes: '25–35',
    blurb:
      'Milton is among our closest towns to Logan, making it a quick, comfortable transfer for families and business travelers alike.',
    landmarks: ['Milton Village', 'Blue Hills', 'Milton Academy area'],
  },
  {
    slug: 'wellesley',
    name: 'Wellesley',
    miles: 18,
    minutes: '30–45',
    blurb:
      'We serve Wellesley residents, visitors to Wellesley College and Babson College, and local businesses with reliable airport transportation.',
    landmarks: ['Wellesley Square', 'Wellesley College', 'Babson College'],
  },
  {
    slug: 'medfield',
    name: 'Medfield',
    miles: 22,
    minutes: '35–45',
    blurb:
      'Medfield pickups are scheduled in advance so your driver is at the door on time, whatever hour your flight leaves.',
    landmarks: ['Medfield Center', 'Route 109', 'Charles River'],
  },
  {
    slug: 'dover',
    name: 'Dover',
    miles: 20,
    minutes: '35–45',
    blurb:
      'Private, discreet door-to-door car service for Dover homes — a comfortable alternative to driving yourself to Logan.',
    landmarks: ['Dover Center', 'Route 109', 'Charles River'],
  },
  {
    slug: 'west-roxbury',
    name: 'West Roxbury',
    miles: 10,
    minutes: '20–35',
    blurb:
      'West Roxbury is one of the closest neighborhoods to our Dedham base, with quick pickups for airport and local rides.',
    landmarks: ['Centre Street', 'West Roxbury Parkway', 'Millennium Park'],
  },
  {
    slug: 'roslindale',
    name: 'Roslindale',
    miles: 9,
    minutes: '20–30',
    blurb:
      'From Roslindale Village to the surrounding streets, we offer on-time airport transfers and local car service.',
    landmarks: ['Roslindale Village', 'Washington Street', 'Arnold Arboretum area'],
  },
  {
    slug: 'hyde-park',
    name: 'Hyde Park',
    miles: 10,
    minutes: '20–30',
    blurb:
      'Hyde Park riders are minutes from our Dedham base, so pickups for early-morning and late-night flights are easy to arrange.',
    landmarks: ['Hyde Park Avenue', 'Cleary Square', 'Readville'],
  },
];

export const locationPath = (slug) => `/${slug}-taxi`;
