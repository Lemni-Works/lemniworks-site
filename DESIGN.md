# Lemni Works design

Written from the built site. Tokens live in `src/styles/global.css`; this file explains the decisions.

## World: Connected Studio

Ink, cobalt, Manrope, precise seams, and real screens inside purposeful browser and phone frames. The thesis is that the studio's four services should be tangible: the first viewport holds a working demonstration of them, and the rest of the page is evidence. Dark only.

Chosen on 2026-10-22 as round five of the redesign, after Black Gallery read as too quiet about what the studio actually does. The user asked for a balanced mix of all four services and delegated the visual decisions.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--water` | #080b10 | page ground |
| `--ink` | #f0f2f7 | text |
| `--muted` | #a7aebb | secondary text |
| `--dim` | #8f99ab | tertiary text, labels, indices |
| `--hair` | ink at 12% | hairlines |
| `--hair-soft` | ink at 7% | quieter hairlines |
| `--glass` | ink at 3.5% | the form panel |
| `--cobalt` | #2a5bd7 | the hero slab, selection, hover fills |
| `--cobalt-light` | #6b93ff | icons, numerals, the `shop.` in the headline, the glow behind the entrance |

Section grounds step up from the page: services sit on #0d1016, contact on #111a2b with a #293751 seam. The hero carries a soft cobalt radial behind the demo so the slab reads as lit rather than pasted on. Buttons are ink rectangles with a 5px radius; text links carry an arrow that nudges on hover.

## Type

Manrope, self-hosted variable latin subset, weight 500 for all display sizes. H1 `clamp(60px, 6.7vw, 96px)` at −0.04em, line-height 1.04. H2 `clamp(32px, 4.6vw, 60px)`. H3 `clamp(22px, 2.4vw, 30px)`. Body 17px/1.55 on the system stack; the demo's own chrome runs 10px to 12px so it reads as an interface, not copy. Labels 12.5px tracked caps in `--dim`. Numerals tabular.

## Layout

1280px measure, gutters `clamp(20px, 5vw, 72px)`, sections `clamp(80px, 10vw, 140px)` apart. The header is fixed, frosted (72% ink with an 18px backdrop blur) and hairlined.

Hero: a two-column grid, copy left and the studio demo right on a cobalt slab rotated −3°, with four service doors across the lower edge. Work: the website feature in a wide card, the two apps as paired phones on tinted grounds, and the data tools in a quiet row. Services: a sticky intro beside hairline rows, each with an icon, an outcome line, the description, an inquiry link and a disclosure for upkeep. Steps: four columns, then two, then one. About: portrait and text. Contact: the glass panel.

## The studio demo

`src/components/StudioDemo.astro`, wired in `src/scripts/motion.ts`. Four tabs (Websites, Automation, Data, Reports). The website view is the real DineSense site capture. The automation runs a three-step example locally; the data view shows three fictional rows and downloads them as CSV; the report switches between week and month and updates both the bars and the chart's accessible description. Without JavaScript the tabs are links to the matching service rows. Nothing in the demo sends a request.

## Motion

Five verbs: draw, rise, uncover, travel, settle.

- Draw: the entrance. Once per session on the home page, `src/components/Intro.astro` covers the viewport in the page colour and the Open Path mark draws itself along its path (1150ms, pathLength-normalised dash, a blurred cobalt copy underneath as the glow). It then travels, by a FLIP transform, into the header's brand slot (900ms) while the backdrop clears and the hero rises in with a stagger; when it lands, the wordmark wipes in beside it. The decision to play it is made in the head of `src/layouts/Base.astro` before first paint, so nothing flashes. Any input skips it, reduced motion never shows it, and a 3.4s timer and the router's before-swap hook guarantee the page is never left covered. The footer carries the same signature at 56px, drawing itself when it enters view.
- Rise: `.reveal` elements fade and lift 22px into place when they enter the viewport, staggered with `--d`. The hidden state only exists under `html.js`, so content is never missing without JavaScript; without IntersectionObserver everything is marked in at once.
- Uncover: `.img-reveal` images are hidden by a page-coloured cover that shrinks upward while the image settles from 1.06 to 1.
- Travel: Astro view transitions carry a project's screen (`shot-<slug>`) and title (`title-<slug>`) into its case study; the rest of the page crossfades in 420ms.
- Settle: demo panels arrive with a 7px lift, the report bars scale to their new values, the workflow connectors pulse while a run is in progress.

Easing `cubic-bezier(0.16, 1, 0.3, 1)` for everything that moves into place; the draw uses `cubic-bezier(0.7, 0, 0.18, 1)` so it accelerates through the crossing. Feedback 150ms, state 280ms, reveals 900–1400ms. Reduced motion shows finished states.

## Browser surfaces

Selection is cobalt on white. Caret is cobalt-light. Focus rings are a 1.5px cobalt-light outline at 4px offset. Form fields are underline-only on the glass panel; the select menu is dark. The header blur means whatever scrolls beneath it stays legible.

## Voice

First person singular, no exclamation marks, numbers over adjectives, name the thing. Headlines state outcomes (`What needs to work better?`, `A clear path to done.`, `Let’s put it to work.`). Copy lives in `src/site.ts`; case-study copy in `src/work.ts`, drafted from each project's own repository and never from imagination. Every example in the demo is labelled as one.

## Mark

The Open Path identity in `src/mark.ts`: a continuous open lemniscate, round terminals, larger right lobe. The header uses the outlined white wordmark from `public/logo-wordmark-white.svg`; icons, manifest and social images in `public/` come from the identity package. The mark is drawn with `pathLength="1"` everywhere so the same dash animation serves the entrance, the footer and the form's sent state.
