/* The Open Path entrance. Base.astro adds `intro` and `intro-mark` to <html> before first
   paint when this is the first home-page visit of the session and motion is allowed.

   1. The mark draws itself along the path (CSS animation in Intro.astro).
   2. `intro` comes off: the hero rises in and the backdrop clears while the mark travels
      (a FLIP transform) into the header's brand slot.
   3. `intro-mark` comes off: the real header mark shows and the wordmark wipes in.

   Any input skips to the end. A timer and the router's before-swap hook guarantee the page
   is never left covered. */
const html = document.documentElement;
const overlay = document.querySelector<HTMLElement>('[data-intro]');
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

if (overlay && html.classList.contains('intro')) {
  try {
    sessionStorage.setItem('lw-intro', '1');
  } catch {
    /* private mode: the intro simply plays again next time */
  }

  const svg = overlay.querySelector<SVGSVGElement>('svg')!;
  const line = overlay.querySelector<SVGPathElement>('.intro-line')!;
  const controller = new AbortController();
  const { signal } = controller;
  let landed = false;

  const land = () => {
    if (landed) return;
    landed = true;
    controller.abort();
    html.classList.remove('intro', 'intro-mark');
    overlay.remove();
    document.dispatchEvent(new CustomEvent('lw:intro-landed'));
  };

  const travel = () => {
    if (landed) return;
    html.classList.remove('intro');
    overlay.classList.add('is-clearing');
    const from = svg.getBoundingClientRect();
    const to = document.querySelector('.site-header .brand-mark')?.getBoundingClientRect();
    if (!to || !from.width) return land();
    const scale = to.width / from.width;
    const flight = svg.animate(
      [
        { transform: 'translate(0, 0) scale(1)' },
        { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${scale})` },
      ],
      { duration: 900, easing: EASE, fill: 'forwards' },
    );
    flight.onfinish = land;
    flight.oncancel = land;
  };

  line.addEventListener('animationend', travel, { once: true, signal });
  for (const type of ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const) {
    addEventListener(type, land, { once: true, passive: true, signal });
  }
  document.addEventListener('astro:before-swap', land, { once: true, signal });
  setTimeout(land, 3400);
}
