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

function studioDemo(signal: AbortSignal) {
  const root = document.querySelector<HTMLElement>('[data-studio-demo]');
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-demo-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-demo-panel]')];
  const list = root.querySelector('.demo-tabs');
  list?.setAttribute('role', 'tablist');
  const activate = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      tab.classList.toggle('is-selected', i === index);
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
      panel.classList.toggle('is-entering', i === index && !reduce());
    });
    const count = root.querySelector('.demo-count');
    if (count) count.textContent = `${String(index + 1).padStart(2, '0')} / 04`;
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[i].id);
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
    tab.addEventListener('click', (event) => { event.preventDefault(); activate(i); }, { signal });
    tab.addEventListener('keydown', (event) => {
      let target = i;
      if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') target = (i - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = tabs.length - 1;
      else if (event.key === ' ') { event.preventDefault(); activate(i); return; }
      else return;
      event.preventDefault();
      activate(target, true);
    }, { signal });
  });
  activate(0);

  const run = root.querySelector<HTMLButtonElement>('[data-run-example]');
  const steps = [...root.querySelectorAll<HTMLElement>('[data-flow-step]')];
  const result = root.querySelector<HTMLElement>('[data-run-result]');
  const timers = new Set<ReturnType<typeof setTimeout>>();
  cleanups.push(() => timers.forEach(clearTimeout));
  run?.addEventListener('click', () => {
    run.disabled = true;
    root.classList.add('is-running');
    if (result) result.textContent = 'Running the example…';
    steps.forEach((step) => {
      step.classList.remove('is-complete');
      const state = step.querySelector('.flow-state');
      if (state) state.textContent = 'Ready';
    });
    steps.forEach((step, i) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        step.classList.add('is-complete');
        const state = step.querySelector('.flow-state');
        if (state) state.textContent = 'Done';
        if (i === steps.length - 1) {
          root.classList.remove('is-running');
          run.disabled = false;
          if (result) result.textContent = '3 steps completed. Example only.';
        }
      }, reduce() ? 0 : 450 * (i + 1));
      timers.add(timer);
    });
  }, { signal });

  const periods = [...root.querySelectorAll<HTMLButtonElement>('[data-report-period]')];
  const chart = root.querySelector<HTMLElement>('[data-report-chart]');
  const total = root.querySelector<HTMLElement>('[data-report-total]');
  const columns = [...root.querySelectorAll<HTMLElement>('.chart-column')];
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
      if (bar) bar.style.setProperty('--bar-scale', String((values[i] ?? 0) / Math.max(...values) * 0.96));
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
  studioDemo(controller.signal);
  nav();
  sent();
}
document.addEventListener('astro:before-swap', release);
/* The router replaces every attribute on <html>, which drops the js flag set in the head. */
document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('js'));
document.addEventListener('astro:page-load', initMotion);
