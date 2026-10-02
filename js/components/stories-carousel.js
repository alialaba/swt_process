const CUSTOMERS = [
  {
    name: 'Mitch Dodd',
    role: 'COO, Kintec',
    quote: 'To be able to have people understand and know what they are doing \u2026 it\u2019s a wonderful tool.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/kintec-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/kintec-poster.jpg',
    videoId: 'hfmphxqbx3',
  },
  {
    name: 'Brian King',
    role: 'Managing Partner, King Law',
    quote: 'SweetProcess is the only program I\u2019d start a law firm with today. If you have the right procedures and you combine that with the right team, there is nothing that may limit you to how far and wide that you may go.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/kinglaw-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/kinglaw-poster.jpg',
    videoId: 'o6rsp7stma',
  },
  {
    name: 'Alli Maris Krastel',
    role: 'HR Coordinator, VantageOne Credit Union',
    quote: 'The most mind blowing positive results are the feedback we hear from new hires that we\u2019ve been training.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/vantageone-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/vantageone-poster.jpg',
    videoId: '6go9potecv',
  },
  {
    name: 'Dr. Richard A Rasmussen Jr, DDS',
    role: 'Owner & President, Implant & Periodontal Therapy',
    quote: 'SweetProcess is basically a very standardized, online, true operational manual for any kind of a business.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/implantperio-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/implantperio-poster.jpg',
    videoId: 'd0tk86yfqi',
  },
  {
    name: 'Megan Tully',
    role: 'Director of B.P.M, Synergy Billing',
    quote: 'SweetProcess is not only cost effective, but it gives you the ability to scale your business and grow. It gives you the tools and resources to scale, and gives you the data to make data driven decisions for your company.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/synergy-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/synergy-poster.jpg',
    videoId: 'ii617mwt8w',
  },
  {
    name: 'Paul Sherman',
    role: 'VP & GM, Sherman\u2019s',
    quote: 'When someone steps into a new role or we bring them into the company, it\u2019s documented how to do their job. That culture of: define it, improve it \u2014 has been really positive for us.',
    logo: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/shermans-logo.png',
    poster: 'https://www.sweetprocess.com/wp-content/themes/sweetprocess/theme-2020/images/customers-stories/shermans-poster.jpg',
    videoId: '7z4wf3qq0t',
  },
];

const TRANSITION_OUT_MS = 220;
const TRANSITION_IN_MS = 280;

/* ==========================================================================
   DOM lookup — one place that knows the markup's selectors. If the class
   names ever change, this is the only function that needs to change.
   ========================================================================== */

function getElements(section) {
  return {
    video: section.querySelector('[data-customers-video]'),
    content: section.querySelector('[data-customers-content]'),
    prevBtn: section.querySelector('[data-customers-prev]'),
    nextBtn: section.querySelector('[data-customers-next]'),
    logos: section.querySelector('.customers-logos'),
  };
}

function elementsAreReady(els) {
  return !!(els.video && els.content && els.prevBtn && els.nextBtn && els.logos);
}

/* ==========================================================================
   Rendering — each function writes markup for exactly one piece of the
   card. Swapping the quote's markup, say, never touches video logic.
   ========================================================================== */

function renderContent(contentEl, customer) {
  contentEl.innerHTML = `
    <img class="customers-card__logo" src="${customer.logo}" alt="${customer.name}, ${customer.role}" loading="lazy">
    <blockquote class="customers-card__quote">${customer.quote}</blockquote>
    <div class="customers-card__author">
      <span class="customers-card__name">${customer.name}</span>
      <span class="customers-card__role">${customer.role}</span>
    </div>
  `;
}

function renderVideo(videoEl, customer) {
  const link = videoEl.querySelector('.customers-card__video-link');
  const poster = videoEl.querySelector('.customers-card__poster');
  link.setAttribute('data-wistia-videoid', customer.videoId);
  link.setAttribute('aria-label', `Play video testimonial from ${customer.name}`);
  poster.src = customer.poster;
}

// function buildLogoStrip(logosEl, customers, activeIndex) {
//   logosEl.innerHTML = customers
//     .map(
//       (c, i) => `
//         <button
//           type="button"
//           class="customers-logos__item${i === activeIndex ? ' is-active' : ''}"
//           role="tab"
//           aria-selected="${i === activeIndex}"
//           tabindex="${i === activeIndex ? '0' : '-1'}"
//           data-customer-index="${i}"
//         >
//           <img src="${c.logo}" alt="${c.name}, ${c.role}" loading="lazy">
//         </button>
//       `
//     )
//     .join('');

//   return Array.from(logosEl.querySelectorAll('[data-customer-index]'));
// }

function syncLogoStrip(logoButtons, activeIndex) {
  logoButtons.forEach((btn, i) => {
    const isActive = i === activeIndex;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
  });
}

/* ==========================================================================
   Transition — owns ONLY the choreography (which classes go on/off and
   when), not what content ends up inside the card. `onMidpoint` is called
   once the "leaving" animation finishes, which is where the caller swaps
   in the new content before the "entering" animation plays.
   ========================================================================== */

function transitionContent(contentEl, direction, onMidpoint) {
  const goingNext = direction === 'next';

  contentEl.classList.add(goingNext ? 'is-leaving-up' : 'is-leaving-down');

  window.setTimeout(() => {
    onMidpoint();

    contentEl.classList.remove('is-leaving-up', 'is-leaving-down');
    contentEl.classList.add(goingNext ? 'is-entering-from-bottom' : 'is-entering-from-top');

    requestAnimationFrame(() => {
      contentEl.classList.add('is-settled');
    });

    window.setTimeout(() => {
      contentEl.classList.remove('is-entering-from-bottom', 'is-entering-from-top', 'is-settled');
    }, TRANSITION_IN_MS);
  }, TRANSITION_OUT_MS);
}

function fadeVideo(videoEl, duration) {
  videoEl.classList.add('is-fading');
  window.setTimeout(() => videoEl.classList.remove('is-fading'), duration);
}

/* ==========================================================================
   Navigation controller — the only function that knows "what index are
   we on" and orchestrates render + transition + logo sync together. This
   is intentionally the one place state lives; everything above is a pure
   function that just does what it's told.
   ========================================================================== */

function createNavigator({ customers, els, logoButtons, prefersReducedMotion }) {
  let activeIndex = 0;
  let isAnimating = false;

  function goTo(index, direction) {
    if (isAnimating || index === activeIndex) return;

    const applyChange = () => {
      activeIndex = index;
      renderContent(els.content, customers[activeIndex]);
      renderVideo(els.video, customers[activeIndex]);
    //   syncLogoStrip(logoButtons, activeIndex);
    };

    if (prefersReducedMotion) {
      applyChange();
      return;
    }

    isAnimating = true;
    fadeVideo(els.video, TRANSITION_OUT_MS + TRANSITION_IN_MS);
    transitionContent(els.content, direction, applyChange);

    window.setTimeout(() => {
      isAnimating = false;
    }, TRANSITION_OUT_MS + TRANSITION_IN_MS);
  }

  function next() {
    goTo((activeIndex + 1) % customers.length, 'next');
  }

  function prev() {
    goTo((activeIndex - 1 + customers.length) % customers.length, 'prev');
  }

  function goToIndex(index) {
    goTo(index, index > activeIndex ? 'next' : 'prev');
  }

  function getActiveIndex() {
    return activeIndex;
  }

  return { next, prev, goToIndex, getActiveIndex };
}

/* ==========================================================================
   Event binding — wires DOM events to the navigator's public methods.
   Doesn't know HOW navigation works, only WHEN to trigger it.
   ========================================================================== */

function bindArrowButtons(els, navigator) {
  els.prevBtn.addEventListener('click', navigator.prev);
  els.nextBtn.addEventListener('click', navigator.next);
}

// function bindLogoButtons(logoButtons, navigator) {
//   logoButtons.forEach((btn, i) => {
//     btn.addEventListener('click', () => navigator.goToIndex(i));

//     btn.addEventListener('keydown', (e) => {
//       const count = logoButtons.length;
//       let target = null;

//       if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = (i + 1) % count;
//       if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = (i - 1 + count) % count;
//       if (target === null) return;

//       e.preventDefault();
//       navigator.goToIndex(target);
//       logoButtons[target].focus();
//     });
//   });
// }

/* ==========================================================================
   Init — bootstraps one section. Reads top to bottom as: find elements,
   build initial markup, create the navigator, wire up events.
   ========================================================================== */

function initCustomers(section) {
  const els = getElements(section);
  if (!elementsAreReady(els)) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderContent(els.content, CUSTOMERS[0]);
  renderVideo(els.video, CUSTOMERS[0]);
//   const logoButtons = buildLogoStrip(els.logos, CUSTOMERS, 0);

  const navigator = createNavigator({
    customers: CUSTOMERS,
    els,
    // logoButtons,
    prefersReducedMotion,
  });

  bindArrowButtons(els, navigator);
//   bindLogoButtons(logoButtons, navigator);
}

document.querySelectorAll('.customers').forEach(initCustomers);