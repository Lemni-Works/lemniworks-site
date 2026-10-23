/* Progressive enhancements. Content stays readable if JavaScript is unavailable.
   All page-owned observers, listeners, and timers are released before Astro swaps. */
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanups: (() => void)[] = [];
const release = () => { cleanups.forEach((cleanup) => cleanup()); cleanups = []; };

function reveals() {
  const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.in), .img-reveal:not(.in), .draw-mark:not(.in)');
  if (reduce() || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -3% 0px', threshold: 0.05 });
  elements.forEach((element) => observer.observe(element));
  cleanups.push(() => observer.disconnect());
}

/* The map draws itself once the entrance has landed (or at once when there is no entrance). */
function map(signal: AbortSignal) {
  const svg = document.querySelector<SVGSVGElement>('[data-map]');
  if (!svg) return;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  cleanups.push(() => timers.forEach(clearTimeout));
  const live = () => {
    if (svg.classList.contains('is-live')) return;
    svg.classList.add('is-live');
    if (reduce()) return;
    // The trains leave once their line has drawn, each from its first station.
    svg.querySelectorAll<SVGAnimationElement>('.train animateMotion').forEach((motion, i) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        motion.beginElement();
        motion.parentElement?.classList.add('is-moving');
      }, 1900 + i * 450);
      timers.add(timer);
    });
  };
  // On a phone the map is a pocket map wider than the screen: open it on the hub, not its left edge.
  const pocket = svg.parentElement;
  if (pocket && pocket.scrollWidth > pocket.clientWidth) {
    pocket.scrollLeft = (pocket.scrollWidth - pocket.clientWidth) / 2;
  }
  if (document.documentElement.classList.contains('intro-mark')) {
    document.addEventListener('lw:intro-landed', live, { once: true, signal });
  } else {
    // Two frames in, so the drawn-out state has been painted and the transitions have a start;
    // the timer covers a tab that never gets a frame.
    requestAnimationFrame(() => requestAnimationFrame(live));
    setTimeout(live, 600);
  }
}

/* A test request travels a line: every stop lights as it passes. Each example carries its own
   messages in data-messages. Nothing leaves the page. */
function relays(signal: AbortSignal) {
  const timers = new Set<ReturnType<typeof setTimeout>>();
  cleanups.push(() => timers.forEach(clearTimeout));
  document.querySelectorAll<HTMLElement>('[data-relay]').forEach((root) => {
    const button = root.querySelector<HTMLButtonElement>('[data-run-relay]');
    const status = root.querySelector<HTMLElement>('[data-relay-status]');
    const pulse = root.querySelector<SVGAnimationElement>('animateMotion');
    const stops = [...root.querySelectorAll<SVGElement>('[data-relay-stop]')];
    let messages: string[] = [];
    try { messages = JSON.parse(root.dataset.messages ?? '[]'); } catch { messages = []; }
    button?.addEventListener('click', () => {
      button.disabled = true;
      root.classList.remove('is-done');
      stops.forEach((stop) => stop.classList.remove('is-lit'));
      root.classList.add('is-running');
      const duration = reduce() ? 0 : 2600;
      if (duration) pulse?.beginElement();
      stops.forEach((stop, i) => {
        const timer = setTimeout(() => {
          timers.delete(timer);
          stop.classList.add('is-lit');
          if (status && messages[i]) status.textContent = messages[i];
          if (i === stops.length - 1) {
            root.classList.remove('is-running');
            root.classList.add('is-done');
            button.disabled = false;
          }
        }, (duration * i) / (stops.length - 1));
        timers.add(timer);
      });
    }, { signal });
  });
}

/* After an in-page jump the hash would survive a refresh and drop the visitor mid-page. Whatever
   performed the jump (the browser, or the router, which pushes the hash itself), it scrolls; once
   that scroll has settled with an in-page hash in the address, the address goes back to the plain
   path. A hash in a shared link still lands on its section first. */
function anchors(signal: AbortSignal) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  cleanups.push(() => clearTimeout(timer));
  const settle = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (location.hash && document.getElementById(location.hash.slice(1))) {
        history.replaceState(history.state, '', location.pathname + location.search);
      }
    }, 600);
  };
  addEventListener('scroll', settle, { passive: true, signal });
  addEventListener('hashchange', settle, { signal });
}

function nav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.site-header nav a')];
  const targets = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean) as HTMLElement[];
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) links.forEach((link) => link.classList.toggle('is-current', link.hash.slice(1) === entry.target.id));
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  targets.forEach((target) => observer.observe(target));
  cleanups.push(() => observer.disconnect());
}

function sent() {
  const params = new URLSearchParams(location.search);
  const box = document.getElementById('sent');
  if (params.get('sent') !== '1' || !box) return;
  box.hidden = false;
  box.scrollIntoView({ block: 'center' });
  params.delete('sent');
  const query = params.toString();
  history.replaceState(null, '', location.pathname + (query ? `?${query}` : '') + '#contact');
}

export function initMotion() {
  release();
  const controller = new AbortController();
  cleanups.push(() => controller.abort());
  reveals();
  map(controller.signal);
  relays(controller.signal);
  anchors(controller.signal);
  nav();
  sent();
}
document.addEventListener('astro:before-swap', release);
/* The router replaces every attribute on <html>, which drops the js flag set in the head. */
document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('js'));

/* On the first load, start as soon as the DOM is parsed rather than waiting for astro:page-load,
   which follows the window load event and every image on the page. Later navigations use page-load. */
let booted = false;
const boot = () => {
  if (booted) return;
  booted = true;
  initMotion();
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
document.addEventListener('astro:page-load', () => {
  if (booted) {
    booted = false;
    return;
  }
  initMotion();
});
