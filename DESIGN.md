# Lemni Works design

Written from the built site. Tokens live in `src/styles/global.css`; this file explains the decisions.

## World: Ink in Water

A dark tank. Cobalt ink diffuses through black water in a real-time fluid simulation, and the page sits on the glass above it. Nothing on the page has a visible container except the glass panel the form sits on. Hierarchy comes from scale and space, never from boxes. Dark only.

Chosen on 2026-10-21 after a concept round (seed 61058b97): two dealt hands failed the qualities the user pinned (fluid and organic, technical wow, luxury minimal), so this direction was derived from those qualities directly.

## The tank

`src/scripts/fluid.ts` is a compact stable-fluids solver on WebGL2: curl and vorticity confinement, divergence, twenty Jacobi pressure iterations, gradient subtraction, then advection of velocity and dye. Simulation grid 128 (96 on phones), dye 1024 (512 on phones), half-float textures. `src/components/Tank.astro` drives it:

- At load, one injection of ink traces the lemniscate from `src/mark.ts`, then dissolves.
- The pointer stirs the ink; speed sets how much ink it leaves.
- Scrolling pushes the ink vertically.
- A hovered service row breathes a little ink behind it (`data-ink`).
- A faint idle splat every 2.2 seconds keeps the water alive.
- It pauses when the tab is hidden. Without WebGL2, or with reduced motion, a still CSS version of the ink shows instead (`html.no-fluid`).

Ink is always the one colour. The display shader rolls dense ink off with a soft shoulder so it stays cobalt rather than blowing out to white.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| `--water` | #06070A | page ground |
| `--ink` | #ECECF0 | text |
| `--muted` | #9A9EA8 | secondary text |
| `--dim` | #5F626B | tertiary text, labels |
| `--hair` | white at 12% | hairlines |
| `--hair-soft` | white at 7% | quieter hairlines |
| `--glass` | white at 3.5% | the form panel |
| `--cobalt` | #2A5BD7 | the ink; selection |
| `--cobalt-light` | #6B93FF | ink highlights, step numerals, focus |

Buttons are white on the water, the one solid shape on the page. Links underline in a hairline and darken to full on hover.

## Type

Manrope, self-hosted variable latin subset, weight 500 for all display sizes. H1 `clamp(46px, 8.4vw, 112px)` at −0.045em and line-height 0.98, the label-on-glass scale. H2 `clamp(32px, 4.6vw, 60px)`. H3 `clamp(22px, 2.4vw, 30px)`. Body 17px/1.55 on the system stack. Small labels are 12.5px tracked caps in `--dim`. Prices and dates use tabular numerals.

## Layout

1200px measure, gutters `clamp(20px, 5vw, 72px)`, sections `clamp(96px, 14vw, 180px)` apart. The hero fills the viewport and sits its copy at the bottom-left. Services are four rows separated by hairlines with the index, the description and the offer in three columns. Steps are four columns on desktop, two on tablets, one on phones. Work shows real screens large with a thin wet rim of light and a deep shadow, captions beneath. The header is fixed and transparent over a short scrim.

## Motion

Diffusion is the only material. The fluid carries the hero; everything else surfaces from blur as it enters the viewport (`.surface`, CSS scroll-driven, static fallback) and nothing slides in from the side. Easing `cubic-bezier(0.16, 1, 0.3, 1)`; feedback 150ms, state 280ms, surfacing 900ms. Reduced motion shows finished states and the still ink.

## Browser surfaces

Selection is cobalt on white. Caret is cobalt-light. Focus rings are a 1.5px cobalt-light outline at 4px offset. Form fields are underline-only on the glass panel; the select menu is dark.

## Voice

First person singular, no exclamation marks, numbers over adjectives, name the thing. Copy lives in `src/site.ts`.

## Mark

The final Open Path identity: a continuous cubic-curve lemniscate with round terminals and an open right lobe, stroke 14 on a 232×120 box, in `src/mark.ts`. The header uses the outlined white wordmark from `public/logo-wordmark-white.svg`; icons, manifest and social images in `public/` come from the identity package.
