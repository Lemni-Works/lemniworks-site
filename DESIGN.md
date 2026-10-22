# Lemni Works design

Written from the built site. Tokens live in `src/styles/global.css`; this file explains the decisions.

## World: Black Gallery

Black space, white Manrope, hairlines, and real screens. The work is the only picture. Nothing has a visible container except the glass panel the contact form sits on. Dark only.

Chosen on 2026-10-22 as round four of the redesign, after the user judged Ink in Water too abstract and asked for something minimalist with clean animations, the black space kept, and a better way to show projects.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--water` | #06070A | page ground |
| `--ink` | #ECECF0 | text |
| `--muted` | #9A9EA8 | secondary text |
| `--dim` | #5F626B | tertiary text, labels, indices |
| `--hair` | white at 12% | hairlines |
| `--hair-soft` | white at 7% | quieter hairlines |
| `--glass` | white at 3.5% | the form panel |
| `--cobalt` | #2A5BD7 | selection |
| `--cobalt-light` | #6B93FF | step numerals, list ticks, focus |

Buttons are white pills, the one solid shape on the page. Links underline in a hairline and darken to full on hover.

## Type

Manrope, self-hosted variable latin subset, weight 500 for all display sizes. H1 `clamp(46px, 8.4vw, 112px)` at −0.045em, line-height 0.98. H2 `clamp(32px, 4.6vw, 60px)`. Project titles in the showcase `clamp(30px, 3.4vw, 44px)`; case-study H1 `clamp(44px, 7vw, 96px)`. Body 17px/1.55 on the system stack. Labels 12.5px tracked caps in `--dim`. Numerals tabular.

## Layout

1200px measure, gutters `clamp(20px, 5vw, 72px)`, sections `clamp(96px, 14vw, 180px)` apart. The hero fills the viewport with its copy at the bottom-left. Services are hairline rows. Steps are four columns, then two, then one. The header is fixed and transparent over a short scrim.

## The showcase

`src/components/Work.astro`. On desktop a sticky frame (76vh, top 12vh) in a 7/5 grid holds one large screen per featured project; each project's name, line and link take a viewport of scroll on the right, and the frame crossfades to that project's screen when its text crosses the middle 10% of the viewport (`src/scripts/motion.ts`). Phone screens show at natural aspect up to 76vh with a large radius; the site render fills the frame width. Below 860px the frame is hidden and each project stacks its own image above its text. Non-featured projects sit in a quiet "Also" row.

Case studies live at `/work/<slug>` from `src/work.ts`, rendered by `src/layouts/CaseStudy.astro`: kind and year, title, one line, the hero screen, then Overview, What was built, Stack and What to notice in two columns, a gallery of the remaining screens, and a link to the next project.

## Motion

Four verbs and nothing else: rise, uncover, crossfade, travel.

- Rise: `.reveal` elements fade and rise 26px into place when they enter the viewport, staggered with `--d`.
- Uncover: `.img-reveal` images are hidden by a page-coloured cover that slides up, while the image settles from 1.06 to 1. A sliding cover is used rather than `clip-path` because a clipped element reports as never intersecting.
- Crossfade: the showcase frame swaps screens with opacity and a 0.97 scale.
- Travel: Astro view transitions carry the showcase screen (`shot-<slug>`) and the title (`title-<slug>`) into the case-study page as shared elements; the rest of the page crossfades in 420ms.

Easing `cubic-bezier(0.16, 1, 0.3, 1)`; feedback 150ms, state 280ms, reveals 900–1400ms. Reduced motion shows finished states. Nothing slides sideways, nothing bounces.

## Browser surfaces

Selection is cobalt on white. Caret is cobalt-light. Focus rings are a 1.5px cobalt-light outline at 4px offset. Form fields are underline-only on the glass panel; the select menu is dark.

## Voice

First person singular, no exclamation marks, numbers over adjectives, name the thing. Copy lives in `src/site.ts`; case-study copy in `src/work.ts`, drafted from each project's own repository and never from imagination.

## Mark

The final Open Path identity in `src/mark.ts`; the header uses the outlined white wordmark from `public/logo-wordmark-white.svg`; icons, manifest and social images in `public/` come from the identity package.
