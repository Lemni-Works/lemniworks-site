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

Custom domains: `lemniworks.com` and `www.lemniworks.com`. Canonical URLs use the apex domain. The GitHub repository is already public; deployment does not require changing its visibility.

## Where things live

```
src/site.ts              copy, prices, links: every placeholder is here
src/mark.ts              the lemniscate path data shared by all marks
src/styles/global.css    design tokens (light and dark), base type, controls
src/layouts/Base.astro   head, meta, Open Graph, direction contract
src/layouts/CaseStudy.astro   layout for /work/<slug>; no pages ship yet
src/components/          Header, Hero, Services, Steps, Work, About, ContactForm, Footer, Mark
src/pages/index.astro    the one-page pitch
src/pages/privacy.astro  privacy notice
public/                  favicon, logo files, og-image, robots.txt, the Manrope subset
```

To add a case study, create `src/pages/work/<slug>.astro` that wraps its content in `CaseStudy.astro`.

## Motion

One material idea everywhere: a stroke drawing itself, and data moving along it.

- Hero: the final Open Path mark draws in once, then particles follow its continuous path, pulse at the central crossing, and leave through the upper-right gap. Pointer over the mark speeds it up. It pauses when scrolled away or the tab is hidden.
- Header: on desktop the small mark is absent while the big one is on screen; it draws in as you scroll past, and the wordmark slides over.
- Services: each pictogram draws in when its card reaches the viewport.
- How it works: the line between steps fills with scroll (CSS scroll-driven animation; browsers without it see the finished state).
- Contact: the `?sent=1` confirmation draws the mark in blue.

`prefers-reduced-motion` removes all of it and shows finished states.

## Identity

The final Open Path package replaces the original approximation. The mark has a 14-unit stroke and a `0 0 232 120` viewBox. The Manrope 500 wordmark is outlined in the SVG exports, including the header. The favicon has its own wider-gap, 18-unit optical variant. Public assets include light/dark and white variants, 16/32/48 PNG and ICO favicons, Apple/Android icons, and 1200×630 social images. The font license is in `public/fonts/OFL-Manrope.txt`.

## Remaining launch decisions

Everything below is in `src/site.ts` unless noted.

- [x] Quote-based wording for services and optional upkeep, approved for launch
- [x] DineSense description and existing product-site link; direct App Store/TestFlight link can be added when public
- [x] Public Apify Actor link
- [ ] First-reply window (`replyWindow`, currently "one business day")
- [x] Owned domain: `lemniworks.com`; site config, canonical URLs and robots.txt agree
- [ ] Build the contact Worker, configure `PUBLIC_WORKER_ORIGIN`, redeploy, and verify real delivery
- [x] `hello@lemniworks.com` receives email (confirmed by the owner)
- [ ] Service names, descriptions and entry-offer names are drafts to review
- [ ] Privacy page text is a draft (retention period, hosting region)
- [x] Final outlined logo, optical favicons and social images integrated
