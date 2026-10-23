// Long-distance and event route pages (Logan <-> destination). Distances and
// drive times are approximate, from Boston Logan under normal traffic, and
// are displayed as such. No prices are published — rates are quoted flat at
// booking, consistent with the site FAQ.
export const routes = [
  {
    slug: 'logan-to-cape-cod',
    name: 'Cape Cod',
    title: 'Logan Airport to Cape Cod Car Service',
    miles: '60–110',
    minutes: '1 hr 15 min – 2 hr 15 min',
    kind: 'route',
    summary:
      'Private car service between Boston Logan and anywhere on Cape Cod, from Bourne and Falmouth to Hyannis, Chatham and Provincetown.',
    notes:
      'Summer weekends and holiday Fridays can add significant time on Route 3 and the Sagamore and Bourne bridges, so we recommend leaving extra buffer for flights.',
  },
  {
    slug: 'logan-to-hyannis',
    name: 'Hyannis',
    title: 'Logan Airport to Hyannis Car Service',
    miles: '75',
    minutes: '1 hr 30 min – 2 hr',
    kind: 'route',
    summary:
      'Door-to-door car service between Boston Logan and Hyannis, including the Hyannis ferry docks and Barnstable Municipal Airport.',
    notes:
      'Ideal for Nantucket and Martha’s Vineyard ferry connections — tell us your sailing time and we’ll plan the pickup around it.',
  },
  {
    slug: 'logan-to-woods-hole',
    name: 'Woods Hole',
    title: 'Logan Airport to Woods Hole Car Service',
    miles: '80',
    minutes: '1 hr 30 min – 2 hr',
    kind: 'route',
    summary:
      'Private transfers between Boston Logan and the Woods Hole ferry terminal for Martha’s Vineyard departures and returns.',
    notes:
      'Ferry check-in cutoffs are strict, so we schedule pickups with a safe margin before your boarding time.',
  },
  {
    slug: 'logan-to-providence',
    name: 'Providence',
    title: 'Logan Airport to Providence Car Service',
    miles: '50',
    minutes: '1 hr – 1 hr 30 min',
    kind: 'route',
    summary:
      'Comfortable car service between Boston Logan and downtown Providence, Brown University, and surrounding Rhode Island towns.',
    notes:
      'A good option for business travelers who want to work or rest on the way rather than drive I-95.',
  },
  {
    slug: 'logan-to-tf-green-airport',
    name: 'TF Green Airport',
    title: 'Logan Airport to TF Green (PVD) Car Service',
    miles: '60',
    minutes: '1 hr 10 min – 1 hr 45 min',
    kind: 'route',
    summary:
      'Private transfers between Boston Logan and T.F. Green Airport in Warwick, RI — and from Dedham and Greater Boston to either airport.',
    notes:
      'We also serve TF Green directly from the Dedham area when it’s the better airport for your flight.',
  },
  {
    slug: 'logan-to-newport',
    name: 'Newport',
    title: 'Logan Airport to Newport, RI Car Service',
    miles: '75',
    minutes: '1 hr 30 min – 2 hr',
    kind: 'route',
    summary:
      'Private car service between Boston Logan and Newport, Rhode Island, for visitors, weddings, and weekend getaways.',
    notes:
      'Summer weekends and event days increase traffic in Newport, so we build in extra time for arrivals.',
  },
  {
    slug: 'logan-to-manchester-nh',
    name: 'Manchester, NH',
    title: 'Logan Airport to Manchester, NH Car Service',
    miles: '55',
    minutes: '1 hr – 1 hr 30 min',
    kind: 'route',
    summary:
      'Car service between Boston Logan and Manchester, New Hampshire, including Manchester-Boston Regional Airport.',
    notes:
      'A flat rate confirmed at booking means no surprises on the way up I-93.',
  },
  {
    slug: 'logan-to-plymouth',
    name: 'Plymouth',
    title: 'Logan Airport to Plymouth, MA Car Service',
    miles: '40',
    minutes: '55 min – 1 hr 20 min',
    kind: 'route',
    summary:
      'Private rides between Boston Logan and Plymouth, Massachusetts, including the waterfront and surrounding South Shore towns.',
    notes:
      'Route 3 traffic varies a lot by time of day; share your flight time and we’ll plan the pickup around it.',
  },
  {
    slug: 'logan-to-worcester',
    name: 'Worcester',
    title: 'Logan Airport to Worcester Car Service',
    miles: '50',
    minutes: '1 hr – 1 hr 30 min',
    kind: 'route',
    summary:
      'Car service between Boston Logan and Worcester, covering colleges, hospitals, and business offices across Central Massachusetts.',
    notes:
      'The Mass Pike can back up at rush hour, so we recommend booking early for morning departures.',
  },
  {
    slug: 'logan-to-portland-maine',
    name: 'Portland, ME',
    title: 'Logan Airport to Portland, Maine Car Service',
    miles: '115',
    minutes: '2 hr – 2 hr 45 min',
    kind: 'route',
    summary:
      'Long-distance private car service between Boston Logan and Portland, Maine, in a comfortable sedan or SUV.',
    notes:
      'A private ride is often more comfortable than a connecting bus or train for longer trips with luggage.',
  },
  {
    slug: 'gillette-stadium-transportation',
    name: 'Gillette Stadium',
    title: 'Gillette Stadium Car Service from Dedham & Boston',
    miles: '20–30',
    minutes: '35 min – 1 hr 15 min',
    kind: 'event',
    summary:
      'Private rides to and from Gillette Stadium in Foxborough for Patriots games, concerts, and events — from Dedham, Logan Airport, and across Greater Boston.',
    notes:
      'Event traffic around Route 1 and I-95 is heavy before and after games. Book early and we’ll plan the timing and a pickup point for your return.',
  },
  {
    slug: 'boston-cruise-terminal-transportation',
    name: 'Boston Cruise Terminal',
    title: 'Boston Cruise Terminal Transfers | Flynn Cruiseport Car Service',
    miles: '10–25',
    minutes: '20–45 min',
    kind: 'event',
    summary:
      'Private transfers between the Black Falcon Cruise Terminal at the Flynn Cruiseport, Boston Logan, and your home or hotel.',
    notes:
      'Cruise embarkation and disembarkation windows are fixed, so we plan the pickup around your ship’s schedule.',
  },
];

export const routePath = (slug) => `/${slug}`;
