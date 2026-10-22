# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7, static output, plain CSS, no component library. Deployed to Cloudflare Pages from github.com/Lemni-Works/lemniworks-site. The contact form posts to a separate `lemni-leads` Cloudflare Worker that must never share this repo.

## Users

Owners and operations people at 5-50 person businesses, marketers, e-commerce sellers and agency staff. Non-technical. Reading on a phone as often as a laptop. They arrive from Reddit, Hacker News, Upwork or a referral, already holding a specific problem: a store or site they need built or fixed, a data source they need collected, a manual process they want automated, numbers they keep rebuilding by hand. They skim.

## Product Purpose

Lemni Works is Zander Erwin's one-person studio in Wichita, Kansas that builds what a small business needs online: e-commerce stores and websites, workflow automation, scheduled scrapers and data collection, and reports and dashboards. The site's only job is to turn a visitor with one of those problems into a contact-form submission. Success is measured by form submissions, not time on page. Secondary job: look like a real, careful studio so a link from a forum or a marketplace is trusted.

## Positioning

One builder who ships the whole thing and hands it over: the store, the automation behind it and the report on top, with source code, a handover note and a fixed price quoted in writing within two business days. Agencies split that across teams and retainers; marketplaces split it across strangers. Lemni Works should read as a premium studio, not a freelancer profile, while staying honest that it is one person.

## Operating Context

- Visitors compare against agency sites, Upwork profiles and template-shop storefronts.
- First contact is the form; calls are by appointment, evenings Central.
- Quotes are fixed price with delivery date, inclusions and exclusions. Half up front to book the work, half on delivery. Optional monthly upkeep plans.
- Shipped work: DineSense (iOS app, on the App Store since 2026-10-22), public data tools on the Apify store, websites, and a first client store (case study in draft). Custom mobile apps are not offered as a service.
- Not offered: custom mobile apps, Microsoft 365 / SharePoint, architecture and construction software.

## Capabilities and Constraints

- Four services: websites and e-commerce, workflow automation, web scraping and data collection, reports and dashboards. The homepage speaks to all four audiences equally.
- Zero third-party scripts, no analytics at launch, no cookie banner, no chat widget. Fonts self-hosted. Form works without JavaScript.
- One H1, headings in order, visible labels, 4.5:1 body contrast, visible focus.
- Target under 150 KB page weight and Lighthouse 95+ on all categories at 375px and 1280px.
- Starting prices (`from` on each service) and the Worker origin are undecided; placeholders live in src/site.ts. The first client case study is a draft in src/work.ts.

## Brand Commitments

- Name: Lemni Works, from "lemniscate". Mark: an open figure-eight stroke, monoline, round terminals, right lobe larger. A final identity package exists (see Evidence) and is the authoritative mark; the site currently uses a generated approximation by the user's choice.
- Colour tokens from the Build Kit: ink #1B1B1F / #ECECF0, muted #5D6068 / #A0A3AB, bg #FBFBFC / #121317, card #FFFFFF / #1A1B20, line #E4E4E8 / #2A2B31, accent #2A5BD7 / #6B93FF. One accent only. Wordmark in Manrope.
- Voice: first person singular ("I build"), no exclamation marks, numbers over adjectives, name the thing. No marketing adjectives. No employer ever named.
- User-pinned for the redesign (2026-10-21): the site should feel like a premium studio; dark by default; real projects shown large; motion that demonstrates skill is welcome.

## Evidence on Hand

- Final identity package at /Users/zandere/Documents/Research/lemni-works-open-path-final (outlined lockups, favicons, social images, Manrope source).
- Build Kit spec with section copy and tone rules (DESIGN section mirrored in this repo's history).
- Real captures and case-study copy for DineSense, dinesense.app and the Apify tools live in `src/work.ts` and `public/work/`. DineSense links to its App Store listing (id6816440061) and the data tools to https://apify.com/lemniworks/keyword-search-volume, both confirmed on 2026-10-22. Do not fabricate clients, testimonials, metrics or prices.

## Product Principles

1. The form is the product: every section exists to make sending a message feel easy and sensible.
2. Prove, don't claim: shipped work and demonstrated craft over adjectives.
3. One shop, four doors: a visitor with any of the four problems should find their door within one scroll.
4. Premium by precision, not by volume: restraint, finish and real motion craft signal the studio tier.
5. Honest scale: one builder, stated plainly, framed as an advantage.
