"use strict"
/**
 * PANEL_DATA maps each tab's data-panel value to what the shared panel
 * should show when that tab is active. Add/remove tabs by editing this
 * object and the matching button in the HTML — nothing else needs to change.
 */
const PANEL_DATA = {
    procedures: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/procedure-page.png',
        alt: 'SweetProcess procedure page screenshot',
    },
    policies: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/policy-page.png',
        alt: 'SweetProcess policy page screenshot',
    },
    processes: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/process-page.png',
        alt: 'SweetProcess process page screenshot',
    },
    tasks: {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/tasks-page.png',
        alt: 'SweetProcess tasks dashboard screenshot',
    },
    'knowledge-base': {
        src: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/screenshots/kb-page.png',
        alt: 'SweetProcess knowledge base screenshot',
    },
};

const initHowItWorks = (root) => {
  const body = root.querySelector('.how-it-works__body');
  if (!body) return;

  const tabs = Array.from(body.querySelectorAll('[role="tab"]'));
  const panel = body.querySelector('[role="tabpanel"]');
  const firstImage = panel && panel.querySelector('img');
  if (!tabs.length || !panel || !firstImage) return;

  const initialTab = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];

  // Build one stacked image layer per tab so every screenshot is preloaded
  const layers = new Map();
  tabs.forEach((tab) => {
    const key = tab.dataset.panel;
    const data = PANEL_DATA[key];
    if (!data) return;

    let img;
    if (tab === initialTab) {
      img = firstImage;
      img.removeAttribute('loading');
    } else {
      img = new Image();
      img.className = firstImage.className;
      img.decoding = 'async';
      img.src = data.src;
      panel.append(img);
    }
    img.alt = data.alt;
    layers.set(key, img);
  });

  function activate(tab, { focus = false } = {}) {
    const key = tab.dataset.panel;
    if (!layers.has(key)) return;

    tabs.forEach((t) => {
      const on = t === tab;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
      t.setAttribute('tabindex', on ? '0' : '-1');
    });

    layers.forEach((img, k) => {
      const on = k === key;
      img.classList.toggle('is-visible', on);
      img.setAttribute('aria-hidden', String(!on));
    });

    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus({ preventScroll: true });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));

    tab.addEventListener('keydown', (e) => {
      let target;
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight': target = (index + 1) % tabs.length; break;
        case 'ArrowUp':
        case 'ArrowLeft':  target = (index - 1 + tabs.length) % tabs.length; break;
        case 'Home':       target = 0; break;
        case 'End':        target = tabs.length - 1; break;
        default: return;
      }
      e.preventDefault();
      activate(tabs[target], { focus: true });
    });
  });

  activate(initialTab);   // sync initial state
};

document.querySelectorAll('.how-it-works').forEach(initHowItWorks);