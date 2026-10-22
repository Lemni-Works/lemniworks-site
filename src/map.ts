/* The network map. Four lines, one per service, meeting at the hub. Beck's rules hold:
   every segment is horizontal, vertical or 45°, and every station sits on its line.
   `scripts/check-map.mjs` in the scratchpad verified this geometry; keep it true when editing. */

export const MAP_W = 1200;
export const MAP_H = 720;
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
  slug: 'web' | 'automation' | 'scraping' | 'reports' | 'depot';
  /** The line's name on the map and in the legend. */
  name: string;
  /** The service it stands for, from site.ts; the Depot is product work, not a service. */
  service: string;
  /** CSS custom property that carries its colour. */
  color: string;
  /** A siding: dashed, dim, not a service line. */
  siding?: boolean;
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
      { name: 'Your domain', x: 140, y: 520, side: 's' },
      { name: 'The site', x: 300, y: 460, side: 'e' },
      { name: 'The store', x: 390, y: 370, side: 'e' },
      { name: 'Checkout', x: 452, y: 340, side: 'n' },
      { name: 'Orders', x: 748, y: 340, side: 'n' },
      { name: 'Customers', x: 820, y: 340, side: 'n' },
      { name: 'Repeat orders', x: 1060, y: 240, side: 'n' },
      { name: 'dinesense.app', x: 1160, y: 240, side: 'w', href: '/work/dinesense-site' },
    ],
  },
  {
    slug: 'automation',
    name: 'Relay line',
    service: 'Workflow automation',
    color: 'var(--l-automation)',
    points: [[480, 60], [480, 220], [600, 340], [600, 480], [740, 620], [1000, 620]],
    stations: [
      { name: 'Form entries', x: 480, y: 120, side: 'e' },
      { name: 'New order', x: 480, y: 170, side: 'e' },
      { name: 'Spreadsheet', x: 600, y: 470, side: 'w' },
      { name: 'CRM', x: 670, y: 550, side: 'w' },
      { name: 'Email', x: 820, y: 620, side: 's' },
      { name: 'Team chat', x: 940, y: 620, side: 's' },
    ],
  },
  {
    slug: 'scraping',
    name: 'Collector line',
    service: 'Web scraping and data collection',
    color: 'var(--l-scraping)',
    points: [[120, 600], [340, 600], [600, 340], [600, 200], [740, 60], [1120, 60]],
    stations: [
      { name: 'Source sites', x: 250, y: 600, side: 'n' },
      { name: 'Every night', x: 420, y: 520, side: 'e' },
      { name: 'Clean rows', x: 500, y: 440, side: 'w' },
      { name: 'Database', x: 600, y: 215, side: 'w' },
      { name: 'Exports', x: 680, y: 120, side: 'e' },
      { name: 'Your files', x: 860, y: 60, side: 'n' },
      { name: 'Your tools', x: 1000, y: 60, side: 'n' },
      { name: 'Keyword tools on Apify', x: 1120, y: 60, side: 'w', href: '/work/apify-tools' },
    ],
  },
  {
    slug: 'reports',
    name: 'Dashboard line',
    service: 'Reports and dashboards',
    color: 'var(--l-reports)',
    points: [[1140, 540], [800, 540], [600, 340], [760, 180], [1100, 180]],
    stations: [
      { name: 'Sales data', x: 1040, y: 540, side: 's' },
      { name: 'Ad spend', x: 900, y: 540, side: 's' },
      { name: 'Bookkeeping', x: 700, y: 440, side: 'e' },
      { name: 'Queries', x: 680, y: 260, side: 'e' },
      { name: 'Page or PDF', x: 880, y: 180, side: 'n' },
      { name: 'Your inbox', x: 1020, y: 180, side: 'n' },
    ],
  },
  {
    slug: 'depot',
    name: 'Depot',
    service: 'Product work, shown as proof',
    color: 'var(--l-depot)',
    siding: true,
    /* leaves the Collector line at (200, 600) and runs along the bottom of the map */
    points: [[200, 600], [290, 690], [540, 690]],
    stations: [
      { name: 'DineSense', x: 360, y: 690, side: 's', href: '/work/dinesense' },
      { name: 'Programmed', x: 500, y: 690, side: 's', href: '/work/programmed' },
    ],
  },
];

/** The four service lines, in the order of `services` in site.ts. */
export const serviceLines = lines.filter((L) => !L.siding);
export const depot = lines.find((L) => L.siding)!;

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
