# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7, static output, plain CSS, no component library. Deployed to Cloudflare Pages from github.com/Lemni-Works/lemniworks-site. The contact form posts to a separate `lemni-leads` Cloudflare Worker that must never share this repo.

## Users

Owners and office managers of small local businesses around Wichita (roughly 2–50 people): trades and home services, rentals, auto, small retail and wholesale, small professional offices. Non-technical. Reading on a phone as often as a laptop. Most arrive from a cold email (the signature links here) that mentioned something specific about their business, often a job posting for office help; others from a referral. They already have the problem: office work done by retyping, quotes built in spreadsheets, bills keyed into QuickBooks, phone tag to book jobs, paperwork chased from memory. They skim, and they decide in the first screen whether this is for them.

## Product Purpose

Lemni Works is Zander Erwin's one-person studio in Wichita, Kansas that sets up the software side of small-business office work: quotes, billing and bookkeeping, scheduling, and paperwork and onboarding, usually on tools the business already pays for. Websites are offered as an add-on, connected to the rest. The site's only job is to turn an owner who recognizes their busywork into a message. Success is measured by messages, not time on page. Secondary job: back up the cold email that sent them here, so the claims there are visibly true here.

## Positioning

A local person who takes the retyping out of a small office: looks at how the work is done today, writes a plan with a fixed price within two business days, sets it up on the tools the business already uses, and hands it over with a written how-to. Payment on delivery. The alternative the owner is weighing is hiring (or keeping) someone to do the retyping; the pitch is that software does the repetitive part and the person does the parts that need a person, never that the hire is unnecessary. Lemni Works should read as a careful premium studio, not a freelancer profile, while staying honest that it is one person in Wichita.

## Operating Context

- Visitors compare against hiring office help, their bookkeeper, and doing nothing. They rarely compare against agencies.
- First contact is the form; calls are by appointment, evenings Central.
- Quotes are fixed price with delivery date, inclusions and exclusions. Payment on delivery. Optional monthly upkeep plans.
- Shipped work: DineSense (iOS app, on the App Store since 2026-10-22), public data tools on the Apify store, and websites. Custom mobile apps are not offered as a service.
- Not offered: custom mobile apps, Microsoft 365 / SharePoint, architecture and construction software.

## Capabilities and Constraints

- Four office jobs on the homepage, one per map line: quotes, billing and bookkeeping, scheduling, paperwork and onboarding. Websites appear once, as an add-on. Scraping and reports are still done on request but are not on the homepage.
- Contact is email only for now (no phone number). No prices are published until the owner sets a starting price.
- Avoid technical words on the homepage (API, JSON, dataset, CSV, scraper). Name the owner's task, not the technology.
- Zero third-party scripts, no analytics at launch, no cookie banner, no chat widget. Fonts self-hosted. Form works without JavaScript.
- One H1, headings in order, visible labels, 4.5:1 body contrast, visible focus.
- Target under 150 KB page weight and Lighthouse 95+ on all categories at 375px and 1280px.
- Prices, DineSense description and link, Apify link, reply window, domain and Worker origin are undecided; placeholders live in src/site.ts.

## Brand Commitments

- Name: Lemni Works, from "lemniscate". Mark: an open figure-eight stroke, monoline, round terminals, right lobe larger. A final identity package exists (see Evidence) and is the authoritative mark; the site currently uses a generated approximation by the user's choice.
- Colour tokens from the Build Kit: ink #1B1B1F / #ECECF0, muted #5D6068 / #A0A3AB, bg #FBFBFC / #121317, card #FFFFFF / #1A1B20, line #E4E4E8 / #2A2B31, accent #2A5BD7 / #6B93FF. One accent only. Wordmark in Manrope.
- Voice: first person singular ("I build"), no exclamation marks, numbers over adjectives, name the thing. No marketing adjectives. No employer ever named.
- User-pinned for the redesign (2026-10-21): the site should feel like a premium studio; dark by default; real projects shown large; motion that demonstrates skill is welcome.

## Evidence on Hand

- Final identity package at /Users/zandere/Documents/Research/lemni-works-open-path-final (outlined lockups, favicons, social images, Manrope source).
- Build Kit spec with section copy and tone rules (DESIGN section mirrored in this repo's history).
- Real captures and case-study copy for DineSense, dinesense.app, Programmed and the Apify tools live in `src/work.ts` and `public/work/`. DineSense links to its App Store listing (id6816440061) and the data tools to https://apify.com/lemniworks/keyword-search-volume, both confirmed on 2026-10-22. Do not fabricate clients, testimonials, metrics or prices.

## Product Principles

1. The message is the product: every section exists to make writing in feel easy and sensible.
2. Prove, don't claim: shipped work and working examples over adjectives. Never invent clients, testimonials or results.
3. Their busywork, in their words: an owner should recognize their own office within one scroll.
4. Premium by precision, not by volume: restraint, finish and real motion craft signal the studio tier.
5. Honest scale: one builder, stated plainly, framed as an advantage.
