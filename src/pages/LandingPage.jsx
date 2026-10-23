import { Link } from 'react-router-dom';
import { Check, Phone } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SchemaMarkup from '../components/SchemaMarkup';
import { landingPages } from '../data/landingPages';
import { buildLandingSchema } from '../data/schema';
import { BTN_TEAL } from '../styles/buttons';
import { SITE_CONTAINER } from '../styles/container';

// Shared template for every town and route page: real drive time/distance,
// a quick-facts card, highlights, per-page FAQ (also emitted as FAQPage
// schema), and internal links to sibling pages.
export default function LandingPage({ page }) {
  const siblings = landingPages
    .filter((item) => item.type === page.type && item.path !== page.path)
    .slice(0, 8);

  return (
    <>
      <PageMeta title={page.title} description={page.description} path={page.path} />
      <SchemaMarkup schema={buildLandingSchema(page)} />

      <section className="py-16 max-[600px]:py-12 bg-off-white">
        <div className={`${SITE_CONTAINER} max-w-[980px]`}>
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted mb-6">
            <Link to="/" className="hover:text-turquoise">Home</Link>
            {' / '}
            <Link to={page.parent.path} className="hover:text-turquoise">
              {page.parent.name}
            </Link>
            {' / '}
            <span>{page.breadcrumbName}</span>
          </nav>

          <h1 className="font-semibold text-[38px] max-[600px]:text-[28px] text-turquoise leading-[1.2] tracking-[-0.4px] mb-5">
            {page.h1}
          </h1>
          <p className="text-[17px] text-charcoal leading-[1.6] mb-8">{page.intro}</p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/contact" className={BTN_TEAL}>
              Book a Ride
            </Link>
            <a
              href="tel:+17817778033"
              className="inline-flex items-center gap-2 text-turquoise-dark text-[16px] font-medium px-4"
            >
              <Phone size={18} />
              781-777-8033
            </a>
          </div>

          <dl className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-4 mb-12">
            {page.facts.map(([label, value]) => (
              <div key={label} className="border border-line rounded-xl bg-white p-5">
                <dt className="text-[13px] uppercase tracking-wider text-muted mb-1">{label}</dt>
                <dd className="text-[18px] font-semibold text-charcoal">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="font-semibold text-[26px] text-turquoise mb-4">What you get</h2>
          <ul className="grid gap-3 mb-12">
            {page.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-[16px] text-charcoal leading-[1.5]">
                <Check size={20} className="text-turquoise flex-none mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-[26px] text-turquoise mb-6">Frequently asked questions</h2>
          <div className="grid gap-6 mb-12">
            {page.faqs.map((item) => (
              <div key={item.question}>
                <h3 className="text-[17px] font-semibold text-charcoal mb-2">{item.question}</h3>
                <p className="text-[15px] text-muted leading-[1.6]">{item.answer}</p>
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-[22px] text-turquoise mb-4">
            {page.type === 'town' ? 'Other areas we serve' : 'More routes'}
          </h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {siblings.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-turquoise-dark underline hover:text-turquoise">
                  {item.breadcrumbName}
                </Link>
              </li>
            ))}
            <li>
              <Link to={page.parent.path} className="text-turquoise-dark underline hover:text-turquoise">
                All {page.parent.name.toLowerCase()}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
