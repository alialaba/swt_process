
(() => {
  const wrap = document.querySelector('.as-featured-as__logos');
  if (!wrap) return;

  const logos  = [...wrap.querySelectorAll('img')];
  const mobile = matchMedia('(max-width: 600px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const SWAP_EVERY = 1800;
  const LEAVE_MS   = 750;   // a bit longer than the CSS transition (700ms)

  let timer, slots, hidden;

  // Make sure every logo is loaded before it is ever shown
  logos.forEach(img => {
    img.removeAttribute('loading');
    img.removeAttribute('data-ll-status');
    const pre = new Image();
    pre.src = img.currentSrc || img.src;
  });

  function resetLogo(img) {
    clearTimeout(img._t);                       // cancel any pending cleanup
    img.classList.remove('is-active', 'is-leaving');
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  function start(count) {
    stop();
    if (reduce.matches) return;
    let i = 0;
    timer = setInterval(() => swap(slots[i++ % count]), SWAP_EVERY);
  }

  function build() {
    stop();
    const count = mobile.matches ? 4 : 3;

    logos.forEach(resetLogo);
    wrap.replaceChildren();

    slots = Array.from({ length: count }, () => {
      const s = document.createElement('div');
      s.className = 'as-featured-as__slot';
      wrap.append(s);
      return s;
    });

    slots.forEach((slot, i) => {
      logos[i].classList.add('is-active');
      slot.append(logos[i]);
    });

    hidden = logos.slice(count);
    wrap.classList.add('is-enhanced');
    start(count);
  }

  function swap(slot) {
    const outgoing = slot.querySelector('.is-active');
    const incoming = hidden.shift();
    if (!outgoing || !incoming) return;

    // 1. Reset the incoming logo completely before reusing it
    resetLogo(incoming);
    slot.append(incoming);
    incoming.getBoundingClientRect();           // force reflow so the transition runs
    incoming.classList.add('is-active');

    // 2. Animate the outgoing logo out
    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-leaving');
    hidden.push(outgoing);

    // 3. Safe cleanup: only runs if it is still leaving and not reused
    outgoing._t = setTimeout(() => {
      if (outgoing.classList.contains('is-leaving')) {
        outgoing.classList.remove('is-leaving');
        outgoing.remove();
      }
    }, LEAVE_MS);
  }

  // Pause when the tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (slots) start(slots.length);
  });

  build();
  mobile.addEventListener('change', build);
})();
