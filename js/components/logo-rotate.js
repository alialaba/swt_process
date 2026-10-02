
(() => {
  const wrap = document.querySelector('.as-featured-as__logos');
  if (!wrap) return;

  const logos  = [...wrap.querySelectorAll('img')];
  const mobile = matchMedia('(max-width: 600px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const SWAP_EVERY = 1800;   // ms between swaps (one slot at a time)

  let timer, slots, hidden;

  function build() {
    clearInterval(timer);
    const count = mobile.matches ? 4 : 3;       // visible slots

    wrap.replaceChildren();
    logos.forEach(l => l.classList.remove('is-active', 'is-leaving'));

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

    hidden = logos.slice(count);                // logos waiting off-screen
    wrap.classList.add('is-enhanced');

    if (!reduce.matches) {
      let i = 0;
      timer = setInterval(() => swap(slots[i++ % count]), SWAP_EVERY);
    }
  }

  function swap(slot) {
    const outgoing = slot.querySelector('.is-active');
    const incoming = hidden.shift();
    if (!outgoing || !incoming) return;

    slot.append(incoming);
    incoming.getBoundingClientRect();           // force reflow so the transition runs
    incoming.classList.add('is-active');        // slides up from below

    outgoing.classList.replace('is-active', 'is-leaving');   // slides out upward
    outgoing.addEventListener('transitionend', () => {
      outgoing.classList.remove('is-leaving');
      outgoing.remove();
    }, { once: true });

    hidden.push(outgoing);                      // goes to the back of the queue
  }

  build();
  mobile.addEventListener('change', build);     // rebuild when crossing the breakpoint
})();
