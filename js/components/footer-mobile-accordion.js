
(() => {
  const cols = document.querySelectorAll('.section-footer__list-col');
  const mq = matchMedia('(max-width: 700px)');

  function setup() {
    cols.forEach(col => {
      const title = col.querySelector('.section-footer__list-title');
      if (mq.matches) {
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.setAttribute('aria-expanded', col.classList.contains('is-open'));
      } else {
        title.removeAttribute('role');
        title.removeAttribute('tabindex');
        title.removeAttribute('aria-expanded');
        col.classList.remove('is-open');
      }
    });
  }

  function toggle(col) {
    if (!mq.matches) return;
    const open = col.classList.toggle('is-open');
    col.querySelector('.section-footer__list-title').setAttribute('aria-expanded', open);
  }

  cols.forEach(col => {
    const title = col.querySelector('.section-footer__list-title');
    title.addEventListener('click', () => toggle(col));
    title.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(col); }
    });
  });

  mq.addEventListener('change', setup);
  setup();
})();
