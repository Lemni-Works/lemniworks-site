// Single place for copy and for values the spec marks as placeholders.
// Everything marked PLACEHOLDER is listed in README.md.

export const site = {
  name: 'Lemni Works',
  // PLACEHOLDER: confirm the domain once bought.
  domain: 'lemniworks.com',
  // PLACEHOLDER: the Worker that receives the contact form.
  workerOrigin: import.meta.env.PUBLIC_WORKER_ORIGIN ?? '{WORKER_ORIGIN}',
  city: 'Wichita, Kansas',
  title: 'Lemni Works · Less retyping for small-business offices in Wichita',
  description:
    'I set up the software side of quotes, invoices, scheduling and paperwork for small businesses around Wichita, usually on tools you already pay for. Fixed price, written plan within two business days.',
  // Confirmed by the owner on 2026-10-22. The written plan window stays at two business days.
  replyWindow: 'one business day',
} as const;

export const email = `hello@${site.domain}`;

// A placeholder must never leave visitors with a form that cannot deliver.
export const contactEndpoint = /^https:\/\/[^/{}\s]+\/?$/.test(site.workerOrigin)
  ? `${site.workerOrigin.replace(/\/$/, '')}/api/contact`
  : null;

export const hero = {
  headline: 'Your office runs on retyping.',
  lede:
    'It doesn’t have to. I set up the software side of quotes, invoices, scheduling and paperwork for small businesses around Wichita. Fixed price. Written plan within two business days.',
  cta: 'Tell me what you’re retyping',
  note: `I reply within ${site.replyWindow}. Calls are by appointment, evenings Central.`,
} as const;

/* The four office jobs, one per line on the map, in the order of `lines` in map.ts.
   `before` is the owner's problem in their words; `description` is what changes. */
export const services = [
  {
    slug: 'quotes',
    name: 'Quotes',
    before: 'Stop retyping every quote.',
    description:
      'The customer’s request comes in through a form, the quote is built from your price list and sent, and a follow-up goes out if nobody answers. No copying details into a spreadsheet.',
    offer: 'Tell me about your quotes',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: price changes, new items, and fixes when one of your tools changes.',
  },
  {
    slug: 'billing',
    name: 'Billing and bookkeeping',
    before: 'Stop typing bills into QuickBooks.',
    description:
      'Bills that arrive by email land in QuickBooks with the details filled in, bank activity gets sorted by rules you approve, and customers with unpaid invoices get a polite reminder on a schedule.',
    offer: 'Tell me about your billing',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: new vendors and rules, and fixes when one of your tools changes.',
  },
  {
    slug: 'scheduling',
    name: 'Scheduling',
    before: 'Stop playing phone tag to book a job.',
    description:
      'Customers pick a time that actually works for you, it lands on your calendar, and they get a confirmation right away and a reminder the day before. The phone rings for the questions that need you.',
    offer: 'Tell me about your scheduling',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: new services and hours, and fixes when one of your tools changes.',
  },
  {
    slug: 'paperwork',
    name: 'Paperwork and onboarding',
    before: 'Stop chasing paperwork from memory.',
    description:
      'Everything you need from a customer or client in one list: what came in, what is still missing, and a reminder that goes out until it arrives. New clients get their requests the day they sign on.',
    offer: 'Tell me about your paperwork',
    price: 'Quoted per project',
    upkeep: 'Optional upkeep, quoted separately: new documents and steps, and fixes when one of your tools changes.',
  },
] as const;

/* Websites are offered, but only as an add-on to the office work. */
export const website = {
  title: 'Need the website too?',
  body: 'I build those as well, connected to the rest: a request form that feeds your quotes, a booking page that fills your calendar. Fixed price, and you own the site.',
} as const;

export const notOffered =
  'Not offered: custom mobile apps, Microsoft 365 / SharePoint, architecture and construction software.';

export const steps = [
  {
    title: 'Send the problem',
    body: contactEndpoint
      ? 'Use the form below. A few sentences about what you retype or chase by hand is enough.'
      : 'Email a few sentences about what you retype or chase by hand. No call needed to start.',
  },
  {
    title: 'I look at how you do it now',
    body: 'About 20 minutes, on your screen or at your shop: the spreadsheet, the inbox, the QuickBooks file. Most of the real scope shows up here.',
  },
  {
    title: 'A written plan within two business days',
    body: 'What changes, which tools it runs on, a fixed price and a date. If it is not worth automating, I say so.',
  },
  {
    title: 'Set up, handed over, paid on delivery',
    body: 'It runs on your accounts, with a short written how-to and a walkthrough. Optional monthly upkeep if you want me to keep it running.',
  },
] as const;

export const workNote =
  'These are my own products, shown as proof of work. Custom app builds are not offered as a service.';

export const about = {
  text: 'I am Zander Erwin. I live in Wichita and have a computer science degree with a math minor. I like the jobs where the work is already being done, just by hand: the quote retyped from a text message, the bill keyed into QuickBooks, the document someone has to remember to ask for again. I set up the part a computer should do and leave your people the part that needs a person.',
  portrait: { src: '/about/portrait.jpg', alt: 'Zander Erwin' },
} as const;

export const budgets = ['Not sure yet', 'Under $500', '$500 to $2,000', '$2,000 to $5,000', '$5,000+'] as const;
