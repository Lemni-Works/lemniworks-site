/* The network map. Four lines, one per service, meeting at the hub. Beck's rules hold:
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
  slug: 'web' | 'automation' | 'scraping' | 'reports';
  /** The line's name on the map and in the legend. */
  name: string;
  /** The service it stands for, from site.ts. */
  service: string;
  /** CSS custom property that carries its colour. */
  color: string;
  points: [number, number][];
  stations: Station[];
}

export const lines: Line[] = [
  {
    slug: 'web',
    name: 'Storefront line',
    service: 'Websites and e-commerce',
    color: 'var(--l-web)',
    points: [[60, 520], [240, 520], [420, 340], [900, 340], [1000, 240], [1160, 240]],
    stations: [
      { name: 'Your site', x: 150, y: 520, side: 's' },
      { name: 'Customers', x: 800, y: 340, side: 'n' },
      { name: 'Repeat orders', x: 1080, y: 240, side: 'n' },
    ],
  },
  {
    slug: 'automation',
    name: 'Automation line',
    service: 'Workflow automation',
    color: 'var(--l-automation)',
    points: [[480, 60], [480, 220], [600, 340], [600, 480], [740, 620], [1000, 620]],
    stations: [
      { name: 'An order comes in', x: 480, y: 100, side: 'e' },
      { name: 'Spreadsheet', x: 670, y: 550, side: 'w' },
      { name: 'Your email', x: 820, y: 620, side: 's' },
      { name: 'Your team', x: 950, y: 620, side: 's' },
    ],
  },
  {
    slug: 'scraping',
    name: 'Data line',
    service: 'Web scraping and data collection',
    color: 'var(--l-scraping)',
    points: [[120, 600], [340, 600], [600, 340], [600, 200], [740, 60], [1120, 60]],
    stations: [
      { name: 'The sites you watch', x: 230, y: 600, side: 's' },
      { name: 'Every night', x: 450, y: 490, side: 'e' },
      { name: 'Clean rows', x: 600, y: 210, side: 'w' },
      { name: 'Your files', x: 940, y: 60, side: 'n' },
    ],
  },
  {
    slug: 'reports',
    name: 'Reports line',
    service: 'Reports and dashboards',
    color: 'var(--l-reports)',
    points: [[1140, 540], [800, 540], [600, 340], [760, 180], [1100, 180]],
    stations: [
      { name: 'Sales', x: 1040, y: 540, side: 's' },
      { name: 'Ad spend', x: 890, y: 540, side: 's' },
      { name: 'Bookkeeping', x: 700, y: 440, side: 'e' },
      { name: 'A weekly report', x: 900, y: 180, side: 'n' },
      { name: 'Your inbox', x: 1060, y: 180, side: 'n' },
    ],
  },
];

/** The four service lines, in the order of `services` in site.ts. */
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
