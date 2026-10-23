import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { hubPages, routePages, townPages } from '../data/landingPages';
import { SITE_CONTAINER } from '../styles/container';

// Index pages that give every town/route page a crawlable inbound link and
// pass authority from one hub instead of leaving them orphaned.
const HUBS = {
  '/service-areas': {
    h1: 'Service Areas Near Dedham, MA',
    intro:
      'Dedham Airport Taxi & Livery is based at 3 Allied Drive in Dedham and provides 24/7 airport transfers and local car service to the towns below.',
    items: townPages,
  },
  '/routes': {
    h1: 'Airport Routes & Long-Distance Transfers',
    intro:
      'Private car service between Boston Logan and popular destinations across New England, plus Gillette Stadium and cruise terminal transfers.',
    items: routePages,
  },
};

export default function HubPage({ path }) {
  const meta = hubPages.find((hub) => hub.path === path);
  const hub = HUBS[path];

  return (
    <section className="py-16 max-[600px]:py-12 bg-off-white">
      <PageMeta title={meta.title} description={meta.description} path={path} />
      <div className={`${SITE_CONTAINER} max-w-[980px]`}>
        <h1 className="font-semibold text-[38px] max-[600px]:text-[28px] text-turquoise leading-[1.2] mb-5">
          {hub.h1}
        </h1>
        <p className="text-[17px] text-charcoal leading-[1.6] mb-10">{hub.intro}</p>

        <ul className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-4">
          {hub.items.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="block border border-line rounded-xl bg-white p-5 hover:border-turquoise transition-colors"
              >
                <span className="block text-[18px] font-semibold text-turquoise-dark mb-1">
                  {item.breadcrumbName}
                </span>
                <span className="text-[14px] text-muted">{item.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
