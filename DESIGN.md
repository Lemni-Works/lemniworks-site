# Lemni Works design

Written from the built site. The source of truth for tokens is `src/styles/global.css`; this file explains the decisions.

## World

A one-person engineering shop's workbench: drafting-paper white or lamp-black, one ink, one pen-blue accent, hairlines, generous whitespace. The mark is the only picture. Nothing playful, nothing corporate, no gradients, no illustrations, no stock photos.

## Mark

An open, asymmetric lemniscate drawn as one monoline stroke with round terminals. Enters lower-left, crosses once, exits upper-right leaving a gap on the right lobe. The right lobe is 8% larger. Stroke weight is 1/8 of the mark height. Path data lives in `src/mark.ts` and is generated from the Bernoulli lemniscate (a = 100, t from π/2 + 0.16 to 5π/2 − 0.62).

The mark is always `--ink` or `--accent`, never both. The data particles in the hero are not part of the mark.

Files in `public/`: `logo-mark.svg`, `logo-mark-white.svg`, `logo-wordmark.svg`, `logo-wordmark-white.svg`, `logo-lockup.svg`, `logo-lockup-white.svg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `og-image.png`.

Lockup: mark at cap height, gap equal to four stroke widths. The wordmark is Manrope 600, tracking −0.02em, both words the same weight and colour.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--ink` | #1B1B1F | #ECECF0 | body text, wordmark |
| `--muted` | #5D6068 | #A0A3AB | secondary text |
| `--bg` | #FBFBFC | #121317 | page background |
| `--card` | #FFFFFF | #1A1B20 | cards, inputs |
| `--line` | #E4E4E8 | #2A2B31 | borders |
| `--accent` | #2A5BD7 | #6B93FF | buttons, links, particles, progress |
| `--accent-ink` | #FFFFFF | #0D1526 | text on accent |

Derived: `--accent-soft` (accent at 12–16%) for focus rings and pulses, `--accent-line` (accent at 40–45%) for hover borders and link underlines, `--grid-dot` for the hero dot grid. Theme follows `prefers-color-scheme`; there is no toggle.

## Type

Display: Manrope, self-hosted variable latin subset (24 KB), weight 600 for headings and the wordmark. Body: the system stack. Sizes: H1 `clamp(34px, 5.5vw, 52px)` at −0.025em; H2 26px; H3 18px; body 17px/1.55; small 14.5px. Headings are 600, never 700. Prices and dates use tabular numerals.

## Layout

860px measure, 20px gutters, 72px between sections on desktop and 48px on mobile. Single column except the service and work cards (grid, 240px minimum). Header is sticky on desktop with a blurred background, static on mobile.

## Motion

One material idea: a stroke drawing itself, and data moving along it. Every animation is one of these. Easing is `cubic-bezier(0.16, 1, 0.3, 1)`; feedback 150ms, state changes 260ms, authored entrances 900–1500ms. Scroll-driven animations use `animation-timeline: view()` with a static fallback. `prefers-reduced-motion` shows finished states.

## Browser surfaces

Selection is accent on accent-ink. Caret is accent. Focus rings are 2px accent with 3px offset. Link underlines are 1px at 0.18em offset in a softened accent, darkening on hover.

## Voice

First person singular, no exclamation marks, numbers over adjectives, name the thing. Copy lives in `src/site.ts`.
