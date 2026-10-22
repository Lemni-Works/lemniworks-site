# Lemni Works site

Marketing site for Lemni Works. Astro, static output, plain CSS, no component library. Deployed as a Cloudflare Worker serving static assets.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/
```

Node 22.23.4 or newer. Cloudflare is pinned to Node 22 with `NODE_VERSION` and `.node-version`.

## Deploy

The existing `lemniworks-site` Worker is connected to `Lemni-Works/lemniworks-site`, production branch `main`. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. Root directory: `/`; Astro outputs static files to `dist/`.

Set these **build** variables in Cloudflare (the site has no server runtime):

| Variable | Value |
| --- | --- |
| `NODE_VERSION` | `22` |
| `PUBLIC_WORKER_ORIGIN` | Origin of the `lemni-leads` Worker, for example `https://leads.lemniworks.com` |

Until the contact Worker exists, leave `PUBLIC_WORKER_ORIGIN={WORKER_ORIGIN}`. The page then shows an email contact link and does not render a broken form or a false success state. The configured mailbox must receive mail before promoting the site.

Once a valid HTTPS origin is configured, rebuild and deploy. The form posts form-encoded `name`, `email`, `message`, `budget` and `website` fields to `/api/contact` at that origin. The Worker must reject nonempty `website` honeypots and redirect successful submissions with HTTP 303 to `https://lemniworks.com/?sent=1`. The form works with JavaScript off; the success display uses the small query-string handler.

Update the privacy notice when enabling the form so that it describes the actual processing, storage and retention in the new Worker. The launch notice describes email inquiries and the Cloudflare Web Analytics beacon observed on the live domain.

Custom domains: `lemniworks.com` and `www.lemniworks.com`. Canonical URLs use the apex domain. The GitHub repository is already public; deployment does not require changing its visibility.

## Where things live

```
src/site.ts              copy, prices, links: every placeholder is here
src/mark.ts              the lemniscate path data shared by all marks
src/work.ts              case studies: copy, stack, images, featured flag
src/scripts/motion.ts    the map draw-in and legend, the test order, the report example, reveals, nav marker, sent handler
src/scripts/intro.ts     the entrance: the mark draws itself, then travels into the header
src/styles/global.css    design tokens (dark only), base type, controls
src/layouts/Base.astro   head, meta, Open Graph, direction contract
src/layouts/CaseStudy.astro   layout for /work/<slug>
src/map.ts               the network map: four lines, their stations, Beck geometry helpers
src/components/          Intro, Header, Hero, NetworkMap, Services, Steps, Work, About, ContactForm, Footer, Mark, Arrow
src/pages/index.astro    the one-page pitch
src/pages/privacy.astro  privacy notice
public/                  favicon, logo files, og-image, robots.txt, the Manrope subset
```

To add a case study, add an entry to `src/work.ts` and drop its images in `public/work/`.

## The Network Map

The home page is a transit-style map of the studio. The tools a shop already pays for are stations, the four services are four lines in one ember scheme (Storefront, Automation, Data, Reports), and all four change trains at one hub, Lemni Works. Geometry lives in `src/map.ts` and must obey Beck's rules: every segment horizontal, vertical or 45°, every station on its line. `src/components/NetworkMap.astro` draws it; the lines draw themselves after the entrance lands, the legend beneath lights one line at a time, and a slow train runs on each.

The home page opens, once per browser session, with the Open Path mark drawing itself and travelling into the header (`src/components/Intro.astro`, `src/scripts/intro.ts`). The decision to play it is made before first paint in `src/layouts/Base.astro`; any click, key or scroll skips it, reduced motion never shows it, and it does not replay on client-side navigation. Clear `sessionStorage` to see it again.

Each line has an entry in `src/components/Services.astro` with a route strip of what it covers, the copy from `src/site.ts`, and its proof: the real dinesense.app capture for the Storefront line, a test order that travels the Relay line in the page, three fictional rows and a CSV download for the Collector line, and a week/month example for the Dashboard line. Nothing in these examples sends a request. Without JavaScript everything is visible and the examples simply sit still.

`src/components/Work.astro` shows shipped work plainly: the website feature, the two apps, the data tools. Every project gets a page at `/work/<slug>` from `src/pages/work/[slug].astro` and `src/layouts/CaseStudy.astro`, with shared image and title transitions.

## Work images

`public/work/` holds real captures copied on 2026-10-21: DineSense app previews from the DineSense-Website project, a desktop render of dinesense.app, and a Programmed workout screen from the Portfolio project. Programmed is labelled in development; remove it from the homepage selection in `src/components/Work.astro` if it should not be public yet. Refresh the captures when those apps change.

Existing project images are reused unchanged. The adjacent `.json` files record their provenance.

## Identity

The final Open Path package replaces the original approximation. The mark has a 14-unit stroke and a `0 0 232 120` viewBox. The Manrope 500 wordmark is outlined in the SVG exports, including the header. The favicon has its own wider-gap, 18-unit optical variant. Public assets include light/dark and white variants, 16/32/48 PNG and ICO favicons, Apple/Android icons, and 1200×630 social images. The font license is in `public/fonts/OFL-Manrope.txt`.

## Remaining launch decisions

- The Apify listing URL in `src/work.ts` returned 404 on 2026-10-22; confirm the live Actor link before relying on it.

Everything below is in `src/site.ts` unless noted.

- [x] Quote-based wording for services and optional upkeep, approved for launch
- [x] DineSense description and existing product-site link; direct App Store/TestFlight link can be added when public
- [x] Public Apify Actor link
- [x] First-reply window confirmed by the owner on 2026-10-22: one business day (`replyWindow`)
- [x] Owned domain: `lemniworks.com`; site config, canonical URLs and robots.txt agree
- [ ] Build the contact Worker, configure `PUBLIC_WORKER_ORIGIN`, redeploy, and verify real delivery
- [x] `hello@lemniworks.com` receives email (confirmed by the owner)
- [ ] Service names, descriptions and entry-offer names are drafts to review, including the new websites and e-commerce service
- [ ] Programmed is shown as an in-development app in the work section; remove it from the homepage selection in `src/components/Work.astro` if it should not be public yet
- [ ] Work images were copied from the DineSense-Website and Portfolio projects on 2026-10-21; refresh them when those apps change
- [x] Privacy commitments confirmed: inquiries that do not become work are deleted within 12 months; deletion requests are fulfilled within one week
- [x] Final outlined logo, optical favicons and social images integrated
