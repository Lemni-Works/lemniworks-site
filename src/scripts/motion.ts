/* Clean reveals, the pinned showcase, and the header's current-section mark.
   Runs on first load and after every client-side navigation. */

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveals() {
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in), .img-reveal:not(.in)');
  if (!els.length) return;
  if (reduce() || !('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );
  els.forEach((e) => io.observe(e));
}

function showcase() {
  const root = document.querySelector<HTMLElement>('.showcase');
  if (!root) return;
  const items = [...root.querySelectorAll<HTMLElement>('.item')];
  const shots = [...root.querySelectorAll<HTMLElement>('.shot')];
  if (!items.length || !shots.length) return;
  const set = (slug: string) => {
    for (const s of shots) s.classList.toggle('is-active', s.dataset.shot === slug);
    for (const i of items) i.classList.toggle('is-active', i.dataset.item === slug);
  };
  set(items[0].dataset.item || '');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) set((e.target as HTMLElement).dataset.item || '');
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  );
  items.forEach((i) => io.observe(i));
}

function nav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.site-header nav a')];
  const targets = links
    .map((l) => (l.hash ? document.getElementById(l.hash.slice(1)) : null))
    .filter(Boolean) as HTMLElement[];
  for (const l of links) l.classList.remove('is-current');
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const ratios = new Map<Element, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
      let best: Element | null = null, bestR = 0;
      for (const [el, r] of ratios) if (r > bestR) { bestR = r; best = el; }
      for (const l of links) l.classList.toggle('is-current', !!best && l.hash.slice(1) === (best as HTMLElement).id);
    },
    { threshold: [0, 0.2, 0.4, 0.6], rootMargin: '-30% 0px -50% 0px' }
  );
  targets.forEach((t) => io.observe(t));
}

function sent() {
  const params = new URLSearchParams(location.search);
  if (params.get('sent') !== '1') return;
  const box = document.getElementById('sent');
  if (!box) return;
  box.hidden = false;
  box.scrollIntoView({ block: 'center' });
  params.delete('sent');
  const q = params.toString();
  history.replaceState(null, '', location.pathname + (q ? `?${q}` : '') + '#contact');
}

export function initMotion() {
  reveals();
  showcase();
  nav();
  sent();
}

document.addEventListener('astro:page-load', initMotion);
