/* The network map. Four lines, one per office job, meeting at the hub. Beck's rules hold:
   every segment is horizontal, vertical or 45°, and every station sits on its line.
   `scripts/check-map.mjs` in the scratchpad verified this geometry; keep it true when editing. */

export const MAP_W = 1200;
export const MAP_H = 680;
export const HUB = { x: 600, y: 340 } as const;

export interface Station {
  name: string;
  x: number;
  y: number;
  /** label side */
  side?: 'n' | 's' | 'e' | 'w';
  /** A destination: a real, shipped project. The station becomes a link to its case study. */
  href?: string;
}

export interface Line {
  slug: 'quotes' | 'billing' | 'scheduling' | 'paperwork';
  /** The line's name on the map and in the legend. */
  name: string;
  /** The office job it stands for, from `services` in site.ts. */
  service: string;
  /** CSS custom property that carries its colour. */
  color: string;
  points: [number, number][];
  stations: Station[];
}

/* The geometry is the original network's; only the lines' meaning and their stops changed
   (2026-10-23). Stations sit on the same coordinates, so Beck's rules still hold. */
export const lines: Line[] = [
  {
    slug: 'quotes',
    name: 'Quotes line',
    service: 'Quotes',
    color: 'var(--l-quotes)',
    points: [[60, 520], [240, 520], [420, 340], [900, 340], [1000, 240], [1160, 240]],
    stations: [
      { name: 'A customer asks', x: 150, y: 520, side: 's' },
      { name: 'Quote sent', x: 800, y: 340, side: 'n' },
      { name: 'Deposit paid', x: 1080, y: 240, side: 'n' },
    ],
  },
  {
    slug: 'billing',
    name: 'Billing line',
    service: 'Billing and bookkeeping',
    color: 'var(--l-billing)',
    points: [[480, 60], [480, 220], [600, 340], [600, 480], [740, 620], [1000, 620]],
    stations: [
      { name: 'A bill arrives', x: 480, y: 100, side: 'e' },
      { name: 'QuickBooks', x: 670, y: 550, side: 'w' },
      { name: 'Reminder sent', x: 820, y: 620, side: 's' },
      { name: 'Paid', x: 950, y: 620, side: 's' },
    ],
  },
  {
    slug: 'scheduling',
    name: 'Scheduling line',
    service: 'Scheduling',
    color: 'var(--l-scheduling)',
    points: [[120, 600], [340, 600], [600, 340], [600, 200], [740, 60], [1120, 60]],
    stations: [
      { name: 'A request', x: 230, y: 600, side: 's' },
      { name: 'A good time', x: 450, y: 490, side: 'e' },
      { name: 'Confirmed', x: 600, y: 210, side: 'w' },
      { name: 'Your calendar', x: 940, y: 60, side: 'n' },
    ],
  },
  {
    slug: 'paperwork',
    name: 'Paperwork line',
    service: 'Paperwork and onboarding',
    color: 'var(--l-paperwork)',
    points: [[1140, 540], [800, 540], [600, 340], [760, 180], [1100, 180]],
    stations: [
      { name: 'New client', x: 1040, y: 540, side: 's' },
      { name: 'Forms sent', x: 890, y: 540, side: 's' },
      { name: 'What’s missing', x: 700, y: 440, side: 'e' },
      { name: 'A reminder', x: 900, y: 180, side: 'n' },
      { name: 'All in', x: 1060, y: 180, side: 'n' },
    ],
  },
];

/** The four office-job lines, in the order of `services` in site.ts. */
export const serviceLines = lines;

/** SVG path for a line, with rounded corners of radius r at every bend. */
export function linePath(points: [number, number][], r = 28): string {
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const a = Math.hypot(cx - px, cy - py);
    const b = Math.hypot(nx - cx, ny - cy);
    const ra = Math.min(r, a / 2);
    const rb = Math.min(r, b / 2);
    const ax = cx - ((cx - px) / a) * ra;
    const ay = cy - ((cy - py) / a) * ra;
    const bx = cx + ((nx - cx) / b) * rb;
    const by = cy + ((ny - cy) / b) * rb;
    d += ` L${ax} ${ay} Q${cx} ${cy} ${bx} ${by}`;
  }
  const [lx, ly] = points[points.length - 1];
  return d + ` L${lx} ${ly}`;
}

/** Unit normal of the segment a station sits on, for drawing its tick. */
export function stationNormal(line: Line, s: { x: number; y: number }): [number, number] {
  const p = line.points;
  for (let i = 0; i < p.length - 1; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const t = ((s.x - x1) * dx + (s.y - y1) * dy) / (len * len);
    const ox = x1 + t * dx - s.x;
    const oy = y1 + t * dy - s.y;
    if (t >= -1e-6 && t <= 1 + 1e-6 && Math.hypot(ox, oy) < 0.5) return [-dy / len, dx / len];
  }
  return [0, -1];
}
