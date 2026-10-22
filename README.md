# Lemni Works site

Marketing site for Lemni Works. Astro, static output, plain CSS, no component library. Deployed to Cloudflare Pages.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
npm run preview    # serves dist/
```

Node 22.23 or newer.

## Deploy

Cloudflare Pages, build command `npm run build`, output directory `dist`. Set one environment variable in the Pages project:

| Variable | Value |
| --- | --- |
| `PUBLIC_WORKER_ORIGIN` | Origin of the `lemni-leads` Worker, for example `https://leads.lemniworks.com` |

The contact form posts form data to `{PUBLIC_WORKER_ORIGIN}/api/contact`. The Worker redirects to `/?sent=1` on success and the page shows the confirmation box above the form. The form works with JavaScript off.

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

- Hero: the mark draws in once, then particles enter at the lower-left terminal, pulse at the crossing, and leave through the gap. Pointer over the mark speeds it up. It pauses when scrolled away or the tab is hidden.
- Header: on desktop the small mark is absent while the big one is on screen; it draws in as you scroll past, and the wordmark slides over.
- Services: each pictogram draws in when its card reaches the viewport.
- How it works: the line between steps fills with scroll (CSS scroll-driven animation; browsers without it see the finished state).
- Contact: the `?sent=1` confirmation draws the mark in blue.

`prefers-reduced-motion` removes all of it and shows finished states.

## Placeholders

Everything below is in `src/site.ts` unless noted.

- [ ] Three "starting at $TBD" prices and three "from $TBD a month" upkeep prices
- [ ] DineSense one-line description and its App Store or TestFlight link (`href` is `#`)
- [ ] Apify store or Actor link (`href` is `#`)
- [ ] First-reply window (`replyWindow`, currently "one business day")
- [ ] Domain: `domain` in `src/site.ts`, `site` in `astro.config.mjs`, the Sitemap line in `public/robots.txt` (all `lemniworks.com`)
- [ ] `PUBLIC_WORKER_ORIGIN` in the Pages project (see `.env.example`)
- [ ] Service names, descriptions and entry-offer names are drafts to review
- [ ] Privacy page text is a draft (retention period, hosting region)
- [ ] `public/logo-wordmark.svg` and `logo-lockup.svg` use live text; outline the type in Figma before sending to a printer
