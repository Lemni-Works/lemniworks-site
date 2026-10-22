---
name: Lemni Works
description: A one-person studio drawn as a transit map. Four coloured lines on warm graphite, one hub, real work in service.
colors:
  graphite: "#121110"
  graphite-raised: "#181715"
  bone: "#f3f1ea"
  bone-muted: "#aaa89f"
  bone-dim: "#7d7c73"
  hair: "rgb(243 241 234 / 0.12)"
  hair-soft: "rgb(243 241 234 / 0.07)"
  glass: "rgb(243 241 234 / 0.035)"
  storefront-tangerine: "#e8783a"
  automation-amber: "#f2b03d"
  data-sand: "#f1d08a"
  reports-rust: "#cf4b30"
  depot-grey: "#8f8d86"
  signal-ink: "#1a1203"
  invalid-red: "#e0604f"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "clamp(46px, 7vw, 96px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "clamp(32px, 4.6vw, 60px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "clamp(22px, 2.4vw, 30px)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "normal"
  station:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  button:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.005em"
  meta:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
rounded:
  pill: "999px"
  glass: "18px"
  shot: "14px"
  frame: "6px"
  bar: "4px 4px 0 0"
  dot: "50%"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  section: "clamp(80px, 10vw, 140px)"
  head: "clamp(40px, 6vw, 72px)"
  column: "clamp(32px, 6vw, 96px)"
  entry: "44px"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.graphite}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 26px 17px 28px"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
  button-small:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "12px 18px 12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "17px 26px 17px 28px"
  button-ghost-hover:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.graphite}"
  glass-panel:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.bone}"
    rounded: "{rounded.glass}"
    padding: "clamp(24px, 3.2vw, 40px)"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "0"
    padding: "12px 0"
  chip-stack:
    backgroundColor: "transparent"
    textColor: "{colors.bone-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.bone-muted}"
    typography: "{typography.label}"
    padding: "12px 0"
  nav-link-hover:
    textColor: "{colors.bone}"
  hub-capsule:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    width: "244px"
    height: "64px"
---

# Design System: Lemni Works

## Overview

**Creative North Star: "The Network Map"**

Lemni Works is a one-person studio drawn as a transit network. The tools a small shop already pays for are stations; the four services are four coloured lines; every line changes trains at one hub, the builder. The world is Harry Beck's: a warm graphite ground, bone ink, lines that run only horizontal, vertical or at 45° with rounded bends, white station ticks, rings for the destinations, a capsule for the interchange. The site is dark only. Nothing on it is a card; structure comes from hairlines, route strips, tables and the lines themselves.

The ground is warm, never blue. Page ground is a warm graphite; the two service sections (the lines, the contact form) sit one step lighter on a raised graphite with a soft hairline above and below. Ink is bone, not white. The four line colours are loud on purpose and belong to the lines: tangerine for the Storefront line, amber for the Automation line, sand for the Data line, rust for the Reports line, with a dashed grey siding for the Depot. The interface itself uses one of them, the amber step, as its single signal colour for selection, the caret, focus rings and hover colour. Everything else is bone on graphite.

Motion is drawn, not animated. The Open Path mark draws itself once per session and travels into the header; the map's lines draw themselves after it lands, stations appearing in order along each line, the hub last; slow trains then run every line indefinitely. Sections rise 22px into place; images are uncovered; titles and shots travel between routes; instruments settle. Reduced motion shows every finished state and hides the trains. The craft of the motion is the proof that one person runs every line.

**Key Characteristics:**
- Dark only. Warm graphite ground (#121110), bone ink, one raised step for two sections.
- Four line colours plus a dashed Depot grey; one signal colour (the amber step) for the interface.
- Beck geometry everywhere a line appears: horizontal, vertical, 45°, rounded bends, stations on the line.
- Manrope at weight 500 for every display size and label; 600 only on the hub name and destination labels. Body on the system sans.
- Pill buttons and pill swatches, like stations. Hairlines, tables and route strips instead of cards.
- Five motion verbs: draw, rise, uncover, travel, settle.

## Colors

A warm monochrome of graphite and bone carries the whole interface; four saturated line colours belong to the map and to anything that names a line, and one of them, the amber step, is borrowed as the interface's only signal.

### Primary
- **Relay Amber** (#f2b03d): the Automation line, and the interface's single signal colour. Text selection (amber on signal ink), the caret, the 1.5px focus ring at 4px offset, the hover colour of text links and destination names, the arrow in the header's contact link, the stroke of the "sent" mark on the contact panel, the dash before each list item on a case study. It is never a fill behind a button.
- **Signal Ink** (#1a1203): the text colour on an amber selection. Nowhere else.

### Secondary
- **Storefront Vermilion** (#e8783a): the Storefront line (websites and e-commerce). Line stroke, route strip, swatch, dot, table header on that line's instrument.
- **Collector Jade** (#f1d08a): the Data line (web scraping and data collection). Same uses.
- **Dashboard Orchid** (#cf4b30): the Reports line (reports and dashboards). Same uses, and the bars of the report instrument.
- **Depot Grey** (#8f8d86): the Depot siding, product work shown as proof. Drawn dashed and at a narrower stroke; it is not a service line and never lights up.

Each line colour reaches its elements through one custom property, `--c`, set by `data-line="<slug>"` on an ancestor. Components never hardcode a line colour; they read `--c`.

### Neutral
- **Graphite** (#121110): the page ground, the fill of station rings, the stroke around the hub capsule, the colour the Open Path mark is drawn in inside the hub, and text on bone buttons.
- **Raised Graphite** (#181715): the ground of the lines section and the contact section, each bounded by a soft hairline. Also the fill of relay-stop circles and of select menus.
- **Bone** (#f3f1ea): ink. Headings, body, station ticks, terminus bars, rings, the hub capsule, trains, button fills, the journey line.
- **Muted Bone** (#aaa89f): secondary text: ledes, descriptions, route-strip labels, line-name meta lines, nav links at rest, timetable "what runs" cells.
- **Dim Bone** (#7d7c73): tertiary text: prices, section labels, the legend title, the footer, the "not offered" line, the footer mark.
- **Hair** (bone at 12%): the hairline. Borders under table cells and inputs, line-entry separators, the glass panel's border, ghost button borders, the relay track at rest.
- **Soft Hair** (bone at 7%): the quieter hairline. Section bounds, the header's bottom edge, the footer rule, summary separators, legend rows on phones.
- **Glass** (bone at 3.5%): the fill of the one glass panel, the contact form.
- **White** (#ffffff): the hover fill of the primary button only.
- **Invalid Red** (#e0604f): the underline of a field the user has left invalid. No other red exists.

### Named Rules
**The One Signal Rule.** The interface borrows exactly one line colour, the amber step, for selection, focus, caret and hover. No second accent; no line colour is promoted to a button fill or a background.

**The Line Owns Its Colour Rule.** A line colour appears only on things that stand for that line: its stroke on the map, its route strip, its swatch, its dot, its table head, its bars. Colour is read from `--c` under `data-line`, never hardcoded.

**The Warm Ground Rule.** Grounds are warm graphite. Cobalt, blue-black and cool greys are refused; the previous world's cobalt is gone and does not return.

## Typography

**Display Font:** Manrope (self-hosted variable latin subset, weights 200–800 available; with system sans fallback)
**Body Font:** System sans (-apple-system, BlinkMacSystemFont, Segoe UI, Inter)
**Label Font:** Manrope

**Character:** Manrope at a single weight, 500, tightly tracked and set in sentence case, does every heading, label, button and station name. Body copy steps down to the system sans at 17px so prose reads as prose and Manrope reads as signage. Weight 600 is reserved for the two places that carry the studio's name or its shipped work on the map.

### Hierarchy
- **Display** (500, clamp(46px, 7vw, 96px), 0.98, −0.04em): the case-study title. The hero headline is the same face at a smaller size (clamp(42px, 3.75vw, 56px), 1.02) because it sits in the map's north-west quadrant, not across the page.
- **Headline** (500, clamp(32px, 4.6vw, 60px), 1.0, −0.035em): section headings: "What I build.", "In service.", "The journey.", "One operator. Every line.", "Tell me what you need." Headings are short, end in a full stop, and are balanced.
- **Title** (500, clamp(22px, 2.4vw, 30px), 1.15, −0.025em): the service name on each line entry (raised there to clamp(26px, 2.6vw, 36px)), journey stops (20px), the "sent" title.
- **Body** (400, 17px, 1.55, system sans): prose. Measures run 34ch (hero lede) to 52ch (about, case-study overview); descriptions sit at 46ch in muted bone. Small text is 14.5px; captions, status lines and prices run 13px to 13.5px.
- **Label** (500, 13px, 1.3, Manrope, sentence case): the workhorse small label. Line-name meta lines, the legend title, legend names (15px), route-strip stops, form labels (13.5px), timetable headers, nav links (14.5px), text links (14px), chips (13.5px), the about sign-off.
- **Station** (500, 15px, −0.01em, Manrope): station names on the map, in sentence case. Destination names are the same at weight 600, underlined in hair.
- **Button** (500, 16px, 1, −0.005em, Manrope): pill buttons. Small variant 14px.
- **Meta** (500, 12.5px, 0.08em, uppercase, dim bone): the `.label` class. Used only below a heading or as a row label ("Next", the case-study kind and year, the case-study block headings at 15px/0.06em). Never above a heading.

### Named Rules
**The One Weight Rule.** Manrope is set at 500 everywhere except the hub name and the destination labels on the map, which are 600. No bold headings, no light display.

**The Sentence Case Rule.** Headings, labels, buttons, stations and legend entries are sentence case. The only uppercase is the meta line beneath a heading and the case-study block headings.

**The Meta Below Rule.** A line name or kind sits below its heading as a meta line with a swatch. Nothing is set as an eyebrow above a heading.

## Layout

The page is a single column on a 1280px measure (`--measure`), centred by `.wrap` with gutters of clamp(20px, 5vw, 72px). Sections are spaced clamp(80px, 10vw, 140px) apart and open with a section head: the headline left, a muted paragraph of 36–44ch right, aligned to the baseline, with clamp(40px, 6vw, 72px) below it. Two sections, the lines and the contact, sit on raised graphite and are bounded by soft hairlines; the about section drops its top padding to butt against the lines section.

The first viewport is the map. A fixed 80px header (64px under 720px) is frosted graphite at 72% with an 18px blur; below it the hero stage is one grid cell in which the map (a 1200×720 viewBox, `xMidYMid slice`) and the copy overlap. The map is sized to `min(100%, (100vh − 120px) × 1.76)` so it fills the stage without cropping the hub; the copy owns the empty north-west quadrant at a 420px measure and never takes the wrap's auto margins; between 901 and 1100px the measure narrows to 300px and the headline steps down to clamp(32px, 3.3vw, 38px) so the overlay holds. Beneath the stage, the legend: a title rule, then five entries in a 4 + 0.9 fraction grid, each a swatch, a line name and the service in muted bone. At 900px and below the stage stacks, copy first, and the map becomes a pocket map: a 980×372 strip wider than the screen, cropped to the band around the hub and masked so the band fades into the ground at its top and bottom 6%, scrolled sideways by hand with the hub centred on load, no visible scrollbar. The legend goes to two columns at 900px with the Depot spanning both, and to one column with soft hairline rows at 560px.

Inside sections the page is two-column: line entries split copy 5 / proof 7 with a gap of clamp(32px, 5vw, 80px); about splits portrait 4 / text 7, contact splits intro 5 / panel 7, and the case-study body is two equal columns, all with a gap of clamp(32px, 6vw, 96px). The contact intro is sticky at 120px. Every two-column layout collapses to one at about 860px (719px for about, the header and case studies). Line entries are separated by hairlines and padded 44px above, 64px below, with a 96px scroll margin so a legend tap lands below the header. The journey is four columns across, one column with the line running down the left below 860px. Tables (the timetable, the collector instrument) are full-width with hairline rows; on phones the timetable drops its header row and each row becomes a small grid.

## Elevation & Depth

Flat by default, with tonal layering. Depth is one step of ground (graphite to raised graphite) and hairlines; nothing floats at rest. Shadows exist in three places only: beneath the primary button on hover, as a lift; around real screenshots, as a long, dark ground shadow with a 1px light rim; and inside the glass panel, as two inset hairlines that make the surface read as frosted rather than painted. The header is the one element in front of content, and it is frosted rather than shadowed.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 8px 24px -12px rgb(0 0 0 / 0.7)`, with `translateY(-1px)`): the primary button on hover only.
- **Screen ground** (`0 0 0 1px rgb(255 255 255 / 0.09), 0 40px 80px -40px rgb(0 0 0 / 0.9)`): a captured site or app screen sitting on the ground. Case-study hero shots deepen to `0 60px 120px -50px`; the portrait to `0 50px 100px -50px`. The site proof on the Storefront line uses the hair ring (`0 0 0 1px var(--hair)`) with the same ground shadow.
- **Glass inset** (`inset 0 0 0 1px var(--hair-soft), inset 0 1px 0 rgb(255 255 255 / 0.08)`): the contact panel only.
- **Frosted header** (`background: rgb(18 17 16 / 0.72); backdrop-filter: blur(18px) saturate(150%)`): the fixed header; whatever scrolls beneath stays legible.

### Named Rules
**The Nothing Floats Rule.** Surfaces are flat at rest. A shadow appears only under a hovered button, under a real screenshot, or inside the glass panel. No card shadows, no glows except the blurred amber copy of the mark during the entrance.

## Shapes

Two silhouettes rule: the pill and the line. Buttons, swatches, the hub capsule, the period toggle and stack chips are full pills (999px). Lines are strokes with round caps and round joins; on the map they are 9 units wide (6 and dashed for the siding), bend with a 28-unit radius, and carry 4-unit ticks 16 long, 5-unit terminus bars 26 long, and 4-unit rings of radius 10 at destinations. Route strips in the services section are 7px pill bars; the journey line is a 7px pill bar in bone; swatches are 44×9 (legend) or 28×7 (meta lines, timetable) pills, drawn as a 4px dashed top border for the Depot.

The station marker (`.dot`) is a 12px disc in the line colour (10–11px inside route strips and the journey) inside a white ring: a 2px gap of graphite, then a 1.5px ring of bone. Rectangles are rare and soft: the glass panel at 18px, the site capture at 14px, desktop screens and the portrait at 6px, phone screens at clamp(18px, 2.4vw, 34px), report bars square at the base and 4px at the top. Inputs are not boxes; they are a hairline under the text.

## Components

### Buttons
Pill buttons are stations: a bone capsule with a 16px arrow that nudges on hover.
- **Shape:** full pill (999px), 1px border in the fill colour.
- **Primary:** bone fill, graphite text, Manrope 500 16px, padding 17px 26px 17px 28px, 14px gap to a 16px arrow. Small variant (service offers, instrument actions) 12px 18px 12px 20px at 14px.
- **Hover / Focus:** fill to white with the button lift shadow and a 1px rise; the arrow travels 3px right. Active cancels the rise. Disabled is 60% opacity with a wait cursor. Focus is the amber ring.
- **Ghost:** transparent with a hair border and bone text; hover inverts to the primary.

### Chips
- **Style:** stack chips on case studies: hair border, transparent, muted bone text in Manrope 500 13.5px, padding 7px 12px, full pill. No fill.
- **State:** none; they are a list, not filters. The period toggle on the dashboard instrument is the only selectable pill group: a hair-bordered pill track with 3px padding, the pressed option filled bone on graphite.

### Cards / Containers
There are no cards. The one container is the glass panel.
- **Corner Style:** 18px.
- **Background:** glass (bone at 3.5%) on raised graphite.
- **Shadow Strategy:** the glass inset only; see Elevation.
- **Border:** 1px hair.
- **Internal Padding:** clamp(24px, 3.2vw, 40px).

Proof on a line (a site capture, the relay, the collector table, the dashboard) sits plain on the ground with no container.

### Inputs / Fields
- **Style:** underline only. Transparent, no border except a 1px hair bottom, no radius, padding 12px 0, 17px inherited font, bone text. Labels are Manrope 500 13.5px in muted bone, 8px above. Selects strip the native chevron and draw a 16px one in muted bone; their menus are raised graphite.
- **Focus:** the underline turns amber; hover turns it muted bone. No outline, no glow.
- **Error / Disabled:** a field the user has left invalid underlines in invalid red. On success the panel shows the Open Path mark at 84px in amber drawing itself (1300ms) beside "Got it."

### Navigation
- **Style:** fixed frosted header, 80px tall, the Open Path mark at 20px beside the Manrope wordmark at 15px, three links right. Links are Manrope 500 14.5px in muted bone with a 1px bone underline that scales in from the left on hover and on the current section; the contact link is bone with a 13px amber diagonal arrow. On phones the header is 64px and the links 12–14px; the arrow hides below 420px.
- **Entrance:** while the intro plays the header mark is hidden and the wordmark is clipped; the mark lands by a FLIP transform and the wordmark wipes in (760ms) behind it.

### The Network Map
The signature. `src/map.ts` holds the geometry; `src/components/NetworkMap.astro` draws it. Five lines on a 1200×720 canvas meeting at the hub (600, 340): every segment horizontal, vertical or 45°, bent with a 28-unit radius, stroked 9 wide in the line's colour with round caps. Stations sit on their line, marked by a 16-unit bone tick on the label's side with the name in Manrope 500 15px. Destinations, which are real shipped work, are rings (radius 10, bone stroke 4, graphite fill) with the name at 600, underlined in hair, linking to the case study; on hover or focus the ring fills with the line colour and the underline turns bone. Outer ends carry a 26-unit terminus bar. The hub is a 244×64 bone capsule with a 5-unit graphite stroke, the Open Path mark drawn in graphite at 76×38 inside, and "Lemni Works" at 600 19px. The Depot is a siding: 6 wide, dashed (0.045 on, 0.03 off of a normalised length), two destinations, no train.

Draw-in: each line's path uses `pathLength="1"` and runs its dash offset from 1 to 0 over 2400ms with `cubic-bezier(0.65, 0, 0.2, 1)`, lines staggered 320ms apart; each station fades in (500ms) at its own fraction of the line's length; terminus bars at +2300ms, trains at +2600ms, the hub at 2500ms. Trains are radius-6 bone discs with a 3-unit stroke in the line colour, running the line on an 18s-plus loop (longer on later lines) that begins at 2.6s. The map draws once the entrance has landed, or two frames after load when there is no entrance. Without JavaScript everything is drawn. Reduced motion zeroes every delay and hides the trains.

Legend selection: hovering or focusing a legend entry sets the map's focus to that line; the other lines drop to 16% opacity over 320ms and the swatch stretches to 1.36×. On touch there is no hover; tapping a legend entry navigates to that line's section, which is the selection.

### Route strips, the journey and instruments
Each line entry opens with a route strip: a 7px bar in the line colour with its deliverables as station dots and labels spaced along it; below 860px the bar turns vertical down the left. The journey is the same strip in bone with four stops. Proof beside each line is real work or a working example: the Storefront line shows the real dinesense.app capture; the Automation line is a straight stretch of track whose test order (a pulse, 2.6s linear, lighting each stop and writing a status line) runs in the page and sends nothing; the Data line is a table of 3 fictional rows with a CSV download; the Reports line is seven bars scaling to their values over 500ms, switching between a week and a month. Every example says it is an example in its status line.

### Timetable
Work in service is a table, not a showcase: a bone rule under the Manrope 13px header, hair rules between rows, a line swatch and name in the first cell, the destination name at clamp(20px, 2vw, 26px) with a diagonal arrow that nudges and turns amber on hover, the kind beneath in dim bone, the year right-aligned in tabular numerals.

### Case studies
Title at display size with the kind and year as a meta line beneath, the one-line pitch in muted bone, the hero shot centred (tall shots at 420px with a large radius, wide at full width with a 6px radius), then four blocks under uppercase meta headings: overview, what was built, stack chips, what to notice. List items carry a 10px amber dash. The page ends with a hair rule and the next project's name at clamp(28px, 4vw, 52px). Title and hero shot travel between routes by view transition (`title-<slug>`, `shot-<slug>`); the rest crossfades in 420ms.

### Motion
Five verbs, one placement easing (`cubic-bezier(0.16, 1, 0.3, 1)`), two draw easings.
- **Draw:** the entrance (`src/components/Intro.astro`, `src/scripts/intro.ts`): once per session on the home page, decided before first paint, the mark draws itself along its path over 1150ms with `cubic-bezier(0.7, 0, 0.18, 1)` and a blurred amber copy beneath as a glow, then flies into the header slot over 900ms while the hero rises in with a 90ms stagger. Any input skips it; a 3.4s timer and the router guarantee the page is never left covered. The footer mark (56px, dim bone) draws itself on entering view (1400ms). The map draws as described above. Every drawn path uses `pathLength="1"` so the dash is normalised.
- **Rise:** `.reveal` fades and lifts 22px (900ms opacity, 1100ms transform), staggered with `--d`. Hidden only under `html.js`.
- **Uncover:** `.img-reveal` hides an image under a page-coloured cover that shrinks upward (1100ms) while the image settles from 1.06 to 1 (1400ms).
- **Travel:** view transitions carry a project's title and hero shot; the root crossfades in 420ms.
- **Settle:** the relay pulse runs 2.6s; bars scale over 500ms; legend swatches stretch over 320ms; period and ring fills change in 200–250ms.
- **Timing tokens:** feedback 150ms, state 280ms, slow 900ms. Reduced motion collapses every animation and transition to 0.01ms and shows finished states.

## Do's and Don'ts

### Do:
- **Do** keep every map segment horizontal, vertical or 45°, bent with the 28-unit rounded corner `linePath` draws; new geometry goes in `src/map.ts`.
- **Do** place every station on its line; the scratch checker (`scripts/check-map.mjs`) enforces it and must stay green.
- **Do** read a line's colour from `--c` under `data-line="<slug>"`; never write a line hex into a component.
- **Do** use the amber step alone for selection, focus (1.5px ring, 4px offset), caret and hover colour.
- **Do** set Manrope at 500 for every heading, label, button and station; 600 only for the hub name and destination labels.
- **Do** put the line name below its heading as a meta line with a 28×7 swatch.
- **Do** structure with hairlines, route strips and tables; proof sits plain on the ground.
- **Do** make the primary action a bone pill with an arrow; ghost pills carry a hair border.
- **Do** label every working example as an example in its status line, and name real work by its real name.
- **Do** draw with `pathLength="1"` and a normalised dash, and give every drawn thing a finished state under reduced motion and without JavaScript.
- **Do** keep the pocket map cropped to the hub band on phones, hub centred on load.

### Don't:
- **Don't** use cards as page structure; the glass panel is the only container and it holds the form.
- **Don't** set an eyebrow or kicker above a heading; the only uppercase is the meta line beneath.
- **Don't** use cobalt, blue-black or any cool ground; the ground is warm graphite and the two raised sections are one step lighter.
- **Don't** promote a line colour to a button fill, a background or a second interface accent.
- **Don't** draw a destination ring for anything that is not real, shipped work with a case study; stations that are tools or steps get a tick.
- **Don't** present an example as a client, a metric or a shipped thing; fictional rows, test orders and sample numbers say so.
- **Don't** add shadows at rest; only the hovered button, a real screenshot and the glass insets carry one.
- **Don't** run trains, line draw-in or the entrance under reduced motion; show the finished map.
- **Don't** bold a heading or use a weight below 500 in Manrope.
- **Don't** write a station name, label or button in title case or uppercase.
