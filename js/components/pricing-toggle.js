function initPriceToggle(toggleEl, priceBoxEl) {
  const switchBtn = toggleEl.querySelector('.price-toggle__switch');
  if (!switchBtn) return;

  toggleEl.setAttribute('data-active', 'monthly');

  function setYearly(isYearly) {
    switchBtn.setAttribute('aria-checked', String(isYearly));
    toggleEl.setAttribute('data-active', isYearly ? 'yearly' : 'monthly');
    priceBoxEl.classList.toggle('yearly', isYearly);
    priceBoxEl.classList.toggle('monthly', !isYearly);
  }

  switchBtn.addEventListener('click', () => {
    const isYearly = switchBtn.getAttribute('aria-checked') !== 'true';
    setYearly(isYearly);
  });

  // Clicking either label text also toggles, not just the switch itself —
  // a larger, more forgiving hit target than the pill alone.
  toggleEl.querySelectorAll('[data-toggle-label]').forEach((label) => {
    label.addEventListener('click', () => {
      setYearly(label.dataset.toggleLabel === 'yearly');
    });
  });
}

document.querySelectorAll('[data-price-toggle]').forEach((toggleEl) => {
  const priceBoxEl = document.getElementById('price-box');
  if (priceBoxEl) initPriceToggle(toggleEl, priceBoxEl);
});