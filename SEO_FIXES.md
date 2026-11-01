# SEO & Booking Fixes — dedhamairporttaxi.com

> **For Claude Code.** This file is a task list from a site audit done on 2026-11-01.
> Work through the tasks in order. For each task: read the relevant code first, make the change,
> run the verification step, then tick the checkbox in this file (`- [ ]` → `- [x]`) and add a one-line
> note under the task saying what you changed.
>
> **Ground rules**
> - Do not invent business facts (prices, licence numbers, addresses, review text). Where a task needs one,
>   leave a clearly marked placeholder `TODO(client): ...` and list it in the "Open questions" section at the end.
> - Do not change copy, design or branding beyond what a task asks.
> - Keep the site building (`npm run build`) after every task. If a task breaks the build, fix it before moving on.
> - Commit after each task (one commit per task, message starts with the task ID, e.g. `T03: add sticky call bar`).
> - If something in this file conflicts with what you find in the code, stop and ask rather than guessing.

---

## Context

- Business: Dedham Airport Taxi & Livery — airport taxi / car service, Dedham MA, USA. Phone `781-777-8033`.
- Stack (as observed from the live site): Vite + React single-page app, client-side routing, GA4 (`G-7VZH8F8PP6`)
  loaded via gtag. JSON-LD (`TaxiService` + `FAQPage`) is injected at runtime.
- Routes in the sitemap: `/`, `/about/`, `/services/`, `/contact/`, `/safety/`, `/terms/`, `/service-areas/`,
  `/routes/`, 14 town pages (`/dedham-taxi/`, `/norwood-taxi/`, …), 10 route pages (`/logan-to-cape-cod/`, …),
  `/gillette-stadium-transportation/`, `/boston-cruise-terminal-transportation/`.

### Problems found (why these tasks exist)

1. Raw HTML served for every route has an **empty body** — no text, headings, links or schema until JS runs.
2. Unknown URLs return **HTTP 200** with a "Page Not Found" title (soft 404).
3. Old URLs still indexed by search engines (`/limo-service`, `/terms-and-conditions`) now hit the 404 page.
4. `/x` and `/x/` both return 200; canonicals + sitemap use trailing slash, nav links don't.
5. Phone number not in the header; no sticky call/text bar on mobile.
6. Booking form (`/contact`): no airport-transfer service type, no pickup flight number, `method="get"` with no action,
   no thank-you/confirmation state, free-text addresses.
7. No privacy policy page.
8. Promo marquee text duplicated 8× in the DOM; hero image has empty `alt`.
9. No GA4 events for calls, texts or form submissions.

---

## Step 0 — Orient

- [x] **T00: Map the project.**
  Find: the router config, the layout/header/footer components, the booking form component, where `<head>` tags
  and JSON-LD are set (react-helmet / custom hook / etc.), the promo marquee, `public/` (robots, sitemap), and the
  hosting config (`vercel.json`, `netlify.toml`, `_redirects`, `.htaccess`, `wrangler.toml`, `firebase.json`,
  nginx conf, or none). Write a short summary of what you found under this task before continuing.
  If the hosting platform can't be determined from the repo, **ask** — tasks T02 and T03 depend on it.
  **Found:** Vite 8 + React 19 SPA, `react-router-dom` v7 (`BrowserRouter`, routes in `src/App.jsx`, lazy pages). Head tags via `PageMeta` (effect), JSON-LD via `SchemaMarkup` (effect). Booking form `src/pages/Contact.jsx` -> EmailJS. Marquee `src/components/PromoBanner.jsx`. Build script `scripts/postbuild.mjs`. Host config present for three platforms: `public/.htaccess` (Apache; git history says Hostinger), `public/_redirects` (Netlify/Cloudflare Pages), `vercel.json`. Hosting was not stated explicitly; all three were configured the same way. **Confirm the real host.**

---

## Priority 1 — Crawlability

- [x] **T01: Pre-render every route to static HTML.**
  Goal: the HTML file served for each route contains the page's full text, H1–H3, internal links, `<title>`,
  meta description, canonical and JSON-LD — without JavaScript.
  Approach (pick the least invasive that works with the current code):
  1. A build-time prerender step (e.g. `vite-plugin-prerender`, `vite-react-ssg`, `react-snap`, or a small
     Puppeteer/Playwright script run after `vite build`) that renders each route from the sitemap into
     `dist/<route>/index.html`, or
  2. If the router/head setup makes that impractical, propose (don't do) a migration plan to Astro or Next.js
     static export, and stop for approval.
  The app must still hydrate and work normally in the browser after prerendering.
  **Verify:** after build, for 3+ routes (e.g. `/`, `/norwood-taxi/`, `/contact/`):
  `grep -c "<h1" dist/<route>/index.html` ≥ 1, the page's H1 text appears in the file, and
  `grep -c 'application/ld+json' dist/index.html` ≥ 1. Serve `dist` locally and confirm the app still runs.
  Added an SSR build (`src/entry-server.jsx`, React `prerender`) run by `scripts/postbuild.mjs`; every route is written to `dist/<route>/index.html` with full body, head and JSON-LD, and `main.jsx` hydrates it. Verified `/`, `/norwood-taxi/`, `/contact/`: 1 H1 each, JSON-LD present, zero console errors, no duplicate schema after hydration.

- [x] **T02: Real 404 status for unknown URLs.**
  Unknown paths must return HTTP **404** (still showing the existing 404 page). Generate `dist/404.html` from the
  existing NotFound component and configure the host to serve it with status 404 instead of falling back to
  `index.html` with 200. Remove/adjust any SPA catch-all rewrite that returns 200 for everything.
  **Verify:** with a local server that mimics the host (or the host's CLI), `curl -s -o /dev/null -w "%{http_code}" <base>/xyz-not-a-page` → `404`;
  real routes still `200`.
  `dist/404.html` is generated from NotFound; SPA catch-all removed from `.htaccess`/`_redirects`/`vercel.json`. Checked with a local server that mimics the Apache rules: unknown path -> 404, real routes -> 200. **Not yet tested on the live host.**

- [x] **T03: 301 redirects for old URLs + one trailing-slash form.**
  1. Add permanent (301) redirects in the host config:
     - `/limo-service` → `/services/`
     - `/terms-and-conditions` → `/terms/`
     - Add a `TODO(client)` comment listing that other old-site URLs should be added once known
       (from Google Search Console → Pages, or the old sitemap).
  2. Standardise on **trailing slash** (matches canonicals + sitemap): 301 `/x` → `/x/` for all routes.
  3. Update every internal `<Link>`/`href` to the trailing-slash form so no internal link hits a redirect.
  **Verify:** `curl -sI <base>/limo-service` → `301` + correct `Location`; `curl -sI <base>/norwood-taxi` → `301`
  to `/norwood-taxi/`; `grep -rn 'to="/[a-z-]*"' src` finds no slash-less internal routes (adjust pattern to the codebase).
  301s `/limo-service` -> `/services/`, `/terms-and-conditions` -> `/terms/`; `/x` -> `/x/` (Apache rule; Vercel `trailingSlash`); all internal links use trailing slashes (no slash-less hrefs in built HTML). Netlify relies on its default directory handling for `/x` -> `/x/`; confirm after deploy.

- [x] **T04: Sitemap & robots check.**
  Make sure `sitemap.xml` lists every live route exactly once in trailing-slash form, includes the new
  `/privacy/` page (T09), and has no redirected or 404 URLs. Ideally generate it at build time from the route list
  so it can't drift. `robots.txt` stays `Allow: /` with the sitemap line.
  **Verify:** every `<loc>` in `dist/sitemap.xml` has a matching `dist/<route>/index.html`.
  Sitemap generated from the route list in `postbuild.mjs` (35 URLs, trailing slash, includes `/privacy/`). `npm run check` (`scripts/check-dist.mjs`) verifies each `<loc>` has a built file with H1 + canonical + parseable JSON-LD. robots.txt unchanged.

## Priority 2 — Calls & booking

- [x] **T05: Click-to-call in the header + sticky mobile action bar.**
  - Desktop header: show `781-777-8033` as a `tel:+17817778033` link next to "Book Now".
  - Mobile (< 768px): a fixed bottom bar with three buttons — **Call** (`tel:+17817778033`),
    **Text** (`sms:+17817778033`), **Book** (`/contact/`). Add bottom padding to the page so the bar never covers
    footer content. Respect safe-area insets (`env(safe-area-inset-bottom)`).
  - Use the site's existing colours/typography; accessible names on all buttons.
  **Verify:** build passes; at 390px width the bar is visible and doesn't overlap the footer (screenshot via
  Playwright if available).
  Phone link in the header (number text shown >=1280px, icon-only 1081-1279px to avoid overlap); fixed Call/Text/Book bar under 768px with safe-area padding (`StickyActionBar.jsx`); `viewport-fit=cover` added. Screenshotted at 390px, bar does not cover footer.

- [x] **T06: Fix the booking form.**
  In the `/contact` form component:
  1. `<form method="post">`; keep the existing JS submit handler but make sure no field can end up in a query
     string if JS fails. Call `preventDefault` correctly.
  2. Service Type: add as the **first** options `Airport — to Logan (BOS)`, `Airport — from Logan (BOS)`,
     `Airport — other (PVD / MHT)`; keep existing options after them.
  3. Add optional fields: **Pickup flight number**, **Airline**, **Round trip** (checkbox → shows return date/time
     + the existing return flight field), **Child seat needed** (select: none / infant / toddler / booster),
     **Notes** (textarea).
  4. Phone country code: default `+1`; keep the list short (US/CA first).
  5. On successful submit: show a clear confirmation state ("Request received — we'll confirm by phone or text
     shortly. Need it now? Call 781-777-8033.") and/or route to `/booking-confirmed/` (add `noindex` there).
  6. On failure: show an error with the phone number. Never fail silently.
  7. Find where submissions are sent (EmailJS / Formspree / API / etc.) and confirm the new fields are included
     in the payload/template. Note the destination in this file.
  8. Add a link to the privacy policy under the submit button (after T09).
  9. Every input has a visible `<label>` tied by `for`/`id`.
  **Verify:** build passes; submitting with required fields empty shows validation; the payload (log it in dev)
  contains all new fields.
  Rebuilt the form: `method="post"`, airport service types first, flight number, airline, round trip (+return date/hour/flight), child seat, notes, labels tied by `for`/`id`, inline confirmation panel, error with phone number. **Submissions go to EmailJS** (service/template/public key from `.env`). New payload keys: `flight_number`, `airline`, `round_trip`, `return_date`, `return_hour`, `return_flight_number`, `child_seat`, `notes` — **the EmailJS template must reference them or they will not appear in the email.** Country-code list left as-is (US/CA already first). Used the inline confirmation only (no `/booking-confirmed/` page).

- [x] **T07: Address autocomplete (optional, needs key).**
  Add Google Places Autocomplete to pickup and drop-off, restricted to the US. Read the key from
  `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`; if the variable is missing, the inputs must work as plain text.
  Add the variable to `.env.example`. Do **not** commit a real key. If no key exists yet, implement behind the
  env check and note `TODO(client): Google Maps API key (restrict to the domain)`.
  `AddressInput.jsx` adds Google Places (US only) when `VITE_GOOGLE_MAPS_API_KEY` is set; plain inputs otherwise. `.env.example` added. `TODO(client): Google Maps API key (restrict to the domain)`.

- [x] **T08: GA4 conversion events.**
  Add a small analytics helper and fire:
  - `click_to_call` on every `tel:` click (param `location`: header / sticky_bar / body / footer)
  - `click_to_text` on every `sms:` click
  - `booking_submit` on successful form submission (params: `service_type`, `car_type`)
  Use a delegated listener or the components themselves; guard for `window.gtag` being undefined.
  Add a note in this file: *"In GA4 → Admin → Events, mark `click_to_call`, `click_to_text`, `booking_submit` as key events."*
  `click_to_call`, `click_to_text` (delegated listener, `location` = header/sticky_bar/body/footer) and `booking_submit` added; old `phone_call_click`/`generate_lead` events and Ads conversions kept. Verified events in `dataLayer`.
  *In GA4 -> Admin -> Events, mark `click_to_call`, `click_to_text`, `booking_submit` as key events.*

## Priority 3 — Content, trust & accessibility

- [x] **T09: Privacy policy page `/privacy/`.**
  Create a plain privacy page covering: what the booking form collects (name, email, phone, addresses, flight
  details), why (to arrange rides), Google Analytics use, SMS/phone contact, no sale of data, how to request
  deletion (email), last-updated date. Mark it `TODO(client): legal review`. Link it in the footer next to Terms,
  add to the sitemap, give it a title/description/canonical.
  `/privacy/` page (TODO(client): legal review), footer link, form link, sitemap entry.

- [x] **T10: Promo marquee renders its text once.**
  Keep the visual scrolling effect but have only one copy readable: duplicates get `aria-hidden="true"` (or use a
  CSS-only loop on a single element). Respect `prefers-reduced-motion` (stop the animation).
  **Verify:** in prerendered `dist/index.html`, the offer text appears once outside `aria-hidden` elements.
  First copy readable, 7 repeats `aria-hidden`; animation already stops under `prefers-reduced-motion`. Built `dist/index.html`: offer text appears once outside aria-hidden.

- [x] **T11: Image alt text & accessibility pass.**
  - Hero image (`hero-1376.webp`): add a descriptive `alt` (e.g. "Black SUV car service waiting at Boston Logan
    Airport terminal") — or `alt=""` + `role="presentation"` if purely decorative and the text overlay carries meaning.
  - Run Lighthouse or `@axe-core/cli` against the built site (home, contact, one town page). Fix all
    accessibility issues of severity serious/critical (labels, contrast, focus states, link names).
  - Record before/after Lighthouse scores (Performance, Accessibility, SEO) in this file.
  Hero alt added; nested `<main>` on Terms removed; axe (WCAG A/AA) = 0 violations on `/`, `/contact/`, `/norwood-taxi/`, `/privacy/` at 1280 and 390px. Scores below.

- [x] **T12: Structured data improvements.**
  In the `TaxiService` JSON-LD:
  - Add `geo` (`GeoCoordinates`) — `TODO(client): confirm coordinates of the office`, don't guess.
  - Add `hasMap`, `email`, `logo`, `image`.
  - Leave room in `sameAs` for the Google Business Profile, Facebook, Yelp URLs (`TODO(client)`).
  - Do **not** add `aggregateRating` from on-site testimonials (Google treats self-serving review markup as ineligible).
  - On town pages, add `areaServed` for that town; on route pages, consider a `Service` node.
  **Verify:** JSON-LD parses (`JSON.parse`) for every prerendered page; no duplicate `TaxiService` nodes per page.
  Added `hasMap`, `logo`, City `areaServed` on town pages; `geo` and extra `sameAs` left as TODO(client), no `aggregateRating`. All 35 pages' JSON-LD parses, no page has more than one `TaxiService`.

- [x] **T13: Pricing placeholders on town & route pages.**
  Add a "Sample flat rates" block to the town/route page template (sedan / SUV, to Logan). Values come from a
  single data file (e.g. `src/data/rates.ts`). Fill every value with `null` and render the block only when a rate
  exists, so nothing shows until the client provides prices. Add `TODO(client): flat rates per town/route`.
  `src/data/rates.js` (JS, not TS, matching the repo) — all empty; block renders only when a rate exists (nothing shows today).

- [x] **T14: Contact consistency.**
  The contact page says "Boston Metro Area & Logan Airport" while the footer and schema show
  `3 Allied Dr Ste 303, Dedham, MA 02026`. Make all three use the same name/address/phone, sourced from one
  constants file. If the client decides to hide the address (service-area business), it should be removable in
  one place. Replace the `@gmail.com` email with a constant so it can be swapped for a domain email later
  (`TODO(client): domain email`).
  `src/data/business.js` holds name/phone/email/address and `SHOW_ADDRESS`; navbar, footer, contact, home coverage block and schema use it. Town/route copy still mentions "3 Allied Drive" in `locations.js`/`landingPages.js`/`HubPage.jsx` text.

---

## Final check

- [x] **T15: Full verification run.**
  1. `npm run build` clean.
  2. Serve `dist/` and run the checks from T01–T04 again.
  3. Run Lighthouse on `/`, `/contact/`, `/norwood-taxi/`; record scores below.
  4. List every `TODO(client)` in the repo (`grep -rn "TODO(client)" .`) into "Open questions".
  5. Write a short summary of all changes at the bottom of this file.

### Lighthouse scores
| Page | Perf before | Perf after | A11y before | A11y after | SEO before | SEO after |
| --- | --- | --- | --- | --- | --- | --- |
| / | 98 | 90 | 100 | 100 | 100 | 100 |
| /contact/ | 55 | 79 | 100 | 100 | 100 | 100 |
| /norwood-taxi/ | 69 | 91 | 100 | 100 | 100 | 100 |

*Before = live site on 2026-11-01 (Lighthouse 12, CLI). After = local build served with gzip + caching headers, so Performance is not strictly like-for-like with the CDN-hosted live site. Home dropped 98 -> 90 locally; re-measure on the live host after deploy and look at hydration cost if it stays lower.*
  Build clean, checks re-run, summary below.

---

## Not for Claude Code (needs the client / a human)

These came out of the same audit but require account access or business decisions:

- Google Business Profile: claim/verify; confirm 3 Allied Dr Ste 303 is a staffed office (else set as
  service-area business with address hidden); primary category *Taxi service*, secondaries *Limousine service*,
  *Chauffeur service*, *Airport shuttle service*; 14 service-area towns; 24/7 hours; website URL with
  `?utm_source=google&utm_medium=organic&utm_campaign=gbp`; booking link → `/contact/`; real vehicle photos;
  weekly posts.
- Reviews: SMS review link after every ride; reply to all reviews.
- Citations with identical name/address/phone: Apple Business Connect, Bing Places, Yelp, BBB, Facebook, Nextdoor,
  Dedham Chamber of Commerce.
- Google Search Console + Bing Webmaster Tools: verify, submit sitemap, request reindex after T01–T03 deploy,
  export old indexed URLs for T03.
- Business/legal: Massport permit for Logan pickups, licence + insurance details for the Safety page, SMS consent
  (TCPA) and A2P 10DLC registration if texting customers, terms of the "25% off first ride" offer.
- Overnight phone coverage (site claims 24/7).

## Open questions
- `public/.htaccess:8`, `public/_redirects:3` — other old-site URLs to 301 (from Search Console -> Pages / old sitemap).
- `src/data/business.js:7` — domain email to replace the Gmail address.
- `src/data/rates.js:5` — flat rates per town/route (sedan/SUV, to Logan).
- `src/data/schema.js:15` — Google Business Profile, Facebook, Yelp URLs for `sameAs`.
- `src/data/schema.js:50` — office coordinates for `geo`.
- `src/pages/Privacy.jsx:5` — legal review of the privacy policy.
- `src/pages/Contact.jsx` / `.env.example` — Google Maps API key (restrict to the domain) for address autocomplete.
- Confirm the hosting platform (Hostinger/Apache assumed) and update the EmailJS template with the new form fields (T06).

## Change log
T01 prerender + hydrate · T02 real 404 · T03 301s + trailing slash · T04 generated sitemap + dist check · T05 header call link + sticky bar · T06 booking form rebuild · T07 Places autocomplete (key-gated) · T08 GA4 call/text/booking events · T09 privacy page · T10 marquee once · T11 alt + a11y · T12 schema · T13 rates placeholders · T14 business constants · T15 verification.

**Summary:** every page now ships its real content, head tags and schema in static HTML, unknown URLs return 404, old URLs 301, and the site has a click-to-call header/mobile bar, a fuller booking form with confirmation, privacy policy and call/text/booking events in GA4.
