// Single place for copy and for values the spec marks as placeholders.
// Everything marked PLACEHOLDER is listed in README.md.

export const site = {
  name: 'Lemni Works',
  // PLACEHOLDER: confirm the domain once bought.
  domain: 'lemniworks.com',
  // PLACEHOLDER: the Worker that receives the contact form.
  workerOrigin: import.meta.env.PUBLIC_WORKER_ORIGIN ?? '{WORKER_ORIGIN}',
  city: 'Wichita, Kansas',
  title: 'Lemni Works · One studio for the whole shop',
  description:
    'Stores, websites, automations and the reports behind them, built by one person in Wichita and handed over with the source. Fixed price, written quote within two business days.',
  // PLACEHOLDER: first-reply window. Spec fixes the quote window at two business days.
  replyWindow: 'one business day',
} as const;

export const email = `hello@${site.domain}`;

// A placeholder must never leave visitors with a form that cannot deliver.
export const contactEndpoint = /^https:\/\/[^/{}\s]+\/?$/.test(site.workerOrigin)
  ? `${site.workerOrigin.replace(/\/$/, '')}/api/contact`
  : null;

export const hero = {
  headline: 'One studio for the whole shop.',
  lede:
    'Stores, websites, automations and the reports behind them, built by one person and handed over with the source. Fixed price, written quote within two business days.',
  cta: 'Tell me what you need',
  quoteLine: 'Written quote within two business days. Fixed price. Payment on delivery.',
  note: `I reply within ${site.replyWindow}. Calls are by appointment, evenings Central.`,
} as const;

export const services = [
  {
    slug: 'web',
    name: 'Websites and e-commerce',
    short: 'A store or site that is yours',
    description:
      'A fast site or online store, designed and built to fit the business, then handed over with the keys. Shopify where it fits, hand-built where it does not.',
    offer: 'Launch site or store',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: updates, new pages, and someone to call.',
  },
  {
    slug: 'automation',
    name: 'Workflow automation',
    short: 'Two tools, made to talk',
    description:
      'Two tools you already pay for, made to talk to each other without someone copying and pasting. Orders into the sheet, form entries into the CRM, the weekly email that writes itself.',
    offer: 'First automation',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: monitoring and fixes when an API changes.',
  },
  {
    slug: 'scraping',
    name: 'Web scraping and data collection',
    short: 'Data collected on a schedule',
    description:
      'A scraper that runs on a schedule and lands clean rows in a spreadsheet, a database or a file you can open. Built to survive small changes to the site it reads.',
    offer: 'Starter scraper',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: I fix it when the source site changes.',
  },
  {
    slug: 'reports',
    name: 'Reports and dashboards',
    short: 'The numbers, laid out once',
    description:
      'The numbers you keep rebuilding by hand, pulled from the source and laid out once. A page or a scheduled PDF, with the queries behind it handed over.',
    offer: 'One-page report',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: new fields and sources as you need them.',
  },
] as const;

export const notOffered =
  'Not offered: custom mobile apps, Microsoft 365 / SharePoint, architecture and construction software.';

export const steps = [
  {
    title: 'Send the problem',
    body: contactEndpoint
      ? 'Use the form below. A few sentences and a rough budget are enough. No call needed to start.'
      : 'Email a few sentences about the problem and your rough budget. No call needed to start.',
  },
  {
    title: 'Written quote within two business days',
    body: 'Fixed price, delivery date, what is included and what is not. If it is not a fit, I say so.',
  },
  {
    title: 'Delivery, with everything that makes it yours',
    body: 'Source code, a handover note and a short walkthrough. Payment on delivery.',
  },
  {
    title: 'Optional upkeep plan',
    body: 'A monthly plan if you want me to keep it running. Cancel any time.',
  },
] as const;

export const workNote =
  'These are shipped products shown as proof of work. Custom app builds are not currently offered.';

export const about = {
  text: 'I am Zander Erwin. I live in Wichita, have a computer science degree with a math minor, and I like the problems where the thing exists but nobody has made it usable yet: a store that needs building, a site that needs collecting on a schedule, two tools that should talk to each other, a spreadsheet that has outgrown itself.',
  portrait: { src: '/about/portrait.jpg', alt: 'Zander Erwin' },
} as const;

export const budgets = ['Not sure yet', 'Under $500', '$500 to $2,000', '$2,000 to $5,000', '$5,000+'] as const;
