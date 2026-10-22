/* Case studies. Every claim here comes from the project's own repo or live site;
   nothing is invented. Edit freely, but keep it true. */

export interface Project {
  slug: string;
  name: string;
  kind: string;
  year: string;
  line: string;
  summary: string;
  built: string[];
  stack: string[];
  notice: string[];
  /** First image is the hero. Phone screens are 880x1912 or 460x1000; the site render is 1400x1006. */
  images: { src: string; alt: string; w: number; h: number }[];
  link?: { label: string; href: string };
  /** Marks a featured project; homepage composition lives in components/Work.astro. */
  featured: boolean;
  /** Drafts are never built or linked. Flip to false only once every field is true and approved. */
  draft?: boolean;
}

const all: Project[] = [
  {
    slug: 'dinesense',
    name: 'DineSense',
    kind: 'iOS app · on the App Store',
    year: '2026',
    line: 'Turns one meal’s numbers into the exact order at a place nearby.',
    summary:
      'Bring a target like 650 calories and 50 grams of protein, or just pick a meal style, and DineSense ranks the dishes at restaurants near you against it, down to the changes that bring a dish onto target. It is not a tracker. It records the pick and hands the numbers back to whatever you already use.',
    built: [
      'A SwiftUI app for iOS 26 with four tabs: Find, Nearby, Saved and Settings.',
      'Ranking across nearby restaurants from Apple Maps, with published chain nutrition kept visibly distinct from estimates.',
      'An order ticket with per-ingredient arithmetic, suggested changes and the source behind every figure.',
      'A Lock Screen order while you queue, Apple Health read only, Sign in with Apple, and a Pro subscription with a trial through the App Store.',
      'A Supabase backend that owns every figure, with edge functions, migrations and a release gate run before every push.',
    ],
    stack: ['Swift', 'SwiftUI', 'Supabase', 'Apple Maps', 'HealthKit', 'StoreKit', 'WidgetKit'],
    notice: [
      'Published figures and estimates never look the same, anywhere in the app.',
      'The whole flow is one action: pick the dish, then copy the numbers.',
      'First run asks how you eat before it asks for anything else.',
    ],
    images: [
      { src: '/work/dinesense-results.webp', alt: 'DineSense: dishes nearby ranked against the target', w: 880, h: 1912 },
      { src: '/work/dinesense-target.webp', alt: 'DineSense: setting a target for this meal', w: 880, h: 1912 },
      { src: '/work/dinesense-order.webp', alt: 'DineSense: an edited order with its calories and macros', w: 880, h: 1912 },
      { src: '/work/dinesense-nearby.webp', alt: 'DineSense: places nearby on a map with their best dishes', w: 880, h: 1912 },
      { src: '/work/dinesense-lockscreen.webp', alt: 'DineSense: the order kept on the Lock Screen', w: 880, h: 1912 },
      { src: '/work/dinesense-source.webp', alt: 'DineSense: the published source behind a dish’s figures', w: 880, h: 1912 },
    ],
    link: { label: 'Get it on the App Store', href: 'https://apps.apple.com/us/app/dinesense/id6816440061' },
    featured: true,
  },
  {
    slug: 'dinesense-site',
    name: 'dinesense.app',
    kind: 'Marketing site',
    year: '2026',
    line: 'A static site that introduces the app with its own screens.',
    summary:
      'The site has one job: introduce the iPhone app and send people to it on the App Store. It is plain HTML, CSS and JavaScript with no framework and no build step, and every screen on it is a real capture from the app in a deterministic demo mode.',
    built: [
      'An opening that fans three real screens over a place setting, then follows the pointer for depth. No idle loop, no video.',
      'A guided walkthrough from target to order, with the screens as the evidence.',
      'Support and privacy pages that share the system without changing the disclosures.',
      'Motion that steps aside for reduced motion and the data saver flag, and pauses when the tab is hidden.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloudflare Pages'],
    notice: [
      'Nothing on the page is a mockup.',
      'It ships with no framework runtime and loads in one request per asset.',
    ],
    images: [{ src: '/work/dinesense-site.jpg', alt: 'The DineSense website at desktop width', w: 1400, h: 1006 }],
    link: { label: 'Visit the site', href: 'https://dinesense.app/' },
    featured: true,
  },
  {
    // DRAFT: the first client store. Fill in every TODO from the real project (and get the
    // client's OK to name them and quote them), add a screenshot to public/work/, then set
    // draft: false. Until then it does not appear anywhere on the site.
    slug: 'first-store',
    name: 'TODO store name',
    kind: 'Online store · client work',
    year: '2026',
    line: 'TODO one line: what the store does for the owner.',
    summary: 'TODO: who the client is (with their OK), what they needed, what was built, how it is going.',
    built: ['TODO: what was built, one item per line.'],
    stack: ['TODO'],
    notice: ['TODO: optional client quote, word for word, only with their permission.'],
    images: [],
    link: undefined,
    featured: false,
    draft: true,
  },
  {
    slug: 'apify-tools',
    name: 'Data tools on Apify',
    kind: 'Public Actors',
    year: '2026',
    line: 'Scrapers anyone can run from the Apify store.',
    summary:
      'Public Actors on the Apify platform, including bulk keyword search volume, difficulty and search intent, for people who need the numbers without a seat on an SEO suite. Give it a list, get a dataset back as CSV or JSON.',
    built: [
      'Actors that take a keyword list as input and return a clean dataset.',
      'Scheduling, monitoring and storage handled by the Apify platform.',
    ],
    stack: ['Node.js', 'Apify SDK', 'Crawlee'],
    notice: ['Each listing links back here for a custom version.'],
    images: [],
    link: { label: 'View on Apify', href: 'https://apify.com/lemniworks/keyword-search-volume' }, // confirmed live on 2026-10-22 under the Lemniworks account
    featured: false,
  },
];

export const projects: Project[] = all.filter((p) => !p.draft);
export const featured = projects.filter((p) => p.featured);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
