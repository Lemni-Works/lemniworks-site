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

/* The map draws itself once the entrance has landed (or at once when there is no entrance),
   and the legend lights one line at a time. */
function map(signal: AbortSignal) {
  const svg = document.querySelector<SVGSVGElement>('[data-map]');
  if (!svg) return;
  const live = () => svg.classList.add('is-live');
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
  document.querySelectorAll<HTMLElement>('[data-legend-item]').forEach((item) => {
    const slug = item.dataset.line ?? '';
    const on = () => svg.setAttribute('data-focus', slug);
    const off = () => svg.removeAttribute('data-focus');
    item.addEventListener('pointerenter', on, { signal });
    item.addEventListener('focus', on, { signal });
    item.addEventListener('pointerleave', off, { signal });
    item.addEventListener('blur', off, { signal });
  });
}

/* A test order travels the Relay line: every stop lights as it passes. Nothing leaves the page. */
function relay(signal: AbortSignal) {
  const root = document.querySelector<HTMLElement>('[data-relay]');
  if (!root) return;
  const button = root.querySelector<HTMLButtonElement>('[data-run-relay]');
  const status = root.querySelector<HTMLElement>('[data-relay-status]');
  const pulse = root.querySelector<SVGAnimationElement>('animateMotion');
  const stops = [...root.querySelectorAll<SVGElement>('[data-relay-stop]')];
  const messages = ['Form entry received.', 'New order #1042.', 'Row added to the spreadsheet.', 'Contact updated in the CRM.', 'Summary emailed to the team. 2.6 seconds, example only.'];
  const timers = new Set<ReturnType<typeof setTimeout>>();
  cleanups.push(() => timers.forEach(clearTimeout));
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
        if (status) status.textContent = messages[i];
        if (i === stops.length - 1) {
          root.classList.remove('is-running');
          root.classList.add('is-done');
          button.disabled = false;
        }
      }, (duration * i) / (stops.length - 1));
      timers.add(timer);
    });
  }, { signal });
}

/* The Dashboard example switches between a week and a month. */
function report(signal: AbortSignal) {
  const root = document.querySelector<HTMLElement>('[data-report]');
  if (!root) return;
  const periods = [...root.querySelectorAll<HTMLButtonElement>('[data-report-period]')];
  const chart = root.querySelector<HTMLElement>('[data-report-chart]');
  const total = root.querySelector<HTMLElement>('[data-report-total]');
  const columns = [...root.querySelectorAll<HTMLElement>('.column')];
  periods.forEach((button) => button.addEventListener('click', () => {
    const isMonth = button.dataset.reportPeriod === 'month';
    const values = isMonth ? [399, 420, 470, 499] : [42, 68, 54, 85, 72, 96, 82];
    const labels = isMonth ? ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    periods.forEach((period) => period.setAttribute('aria-pressed', String(period === button)));
    if (total) total.textContent = values.reduce((sum, value) => sum + value, 0).toLocaleString('en-US');
    if (chart) {
      chart.style.gridTemplateColumns = `repeat(${values.length}, 1fr)`;
      chart.setAttribute('aria-label', `Sample orders ${isMonth ? 'for weeks one through four' : 'for Monday through Sunday'}: ${values.join(', ')}`);
    }
    columns.forEach((column, i) => {
      column.hidden = i >= values.length;
      const bar = column.querySelector<HTMLElement>('[data-bar]');
      const value = column.querySelector('[data-bar-value]');
      const label = column.querySelector('[data-bar-label]');
      if (bar) bar.style.setProperty('--bar-scale', String(((values[i] ?? 0) / Math.max(...values)) * 0.96));
      if (value) value.textContent = String(values[i] ?? '');
      if (label) label.textContent = labels[i] ?? '';
    });
  }, { signal }));
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
  relay(controller.signal);
  report(controller.signal);
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
