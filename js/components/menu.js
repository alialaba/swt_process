(function () {

  /* ========================================
     1. SETUP
  ======================================== */

  const header =
    document.querySelector(".site-header");

  const toggle =
    header?.querySelector(".site-menu__toggle");

  const overlay =
    document.getElementById("site-menu");

  if (!header || !toggle || !overlay) return;


  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  let lastFocused = null;


  /* ========================================
     2. OPEN MENU
  ======================================== */

  function openMenu() {

    lastFocused = document.activeElement;

    header.classList.add("is-menu-open");

    toggle.setAttribute(
      "aria-expanded",
      "true"
    );

    toggle.setAttribute(
      "aria-label",
      "Close menu"
    );

    overlay.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "menu-open"
    );


    const firstFocusable =
      overlay.querySelector(
        focusableSelector
      );

    if (firstFocusable) {
      firstFocusable.focus();
    }


    document.addEventListener(
      "keydown",
      onKeydown
    );
  }


  /* ========================================
     3. CLOSE MENU
  ======================================== */

  function closeMenu() {

    header.classList.remove(
      "is-menu-open"
    );

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle.setAttribute(
      "aria-label",
      "Open menu"
    );

    overlay.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "menu-open"
    );


    document.removeEventListener(
      "keydown",
      onKeydown
    );


    if (
      lastFocused &&
      typeof lastFocused.focus === "function"
    ) {
      lastFocused.focus();
    }
  }


  /* ========================================
     4. KEYBOARD ACCESSIBILITY
  ======================================== */

  function onKeydown(event) {

    /* ESC → close */
    if (event.key === "Escape") {
      closeMenu();
      return;
    }


    /* Ignore everything except Tab */
    if (event.key !== "Tab") return;


    const focusable =
      Array.from(
        overlay.querySelectorAll(
          focusableSelector
        )
      );


    if (focusable.length === 0) return;


    const first = focusable[0];

    const last =
      focusable[focusable.length - 1];


    /* Shift + Tab */
    if (
      event.shiftKey &&
      document.activeElement === first
    ) {

      event.preventDefault();

      last.focus();

    }


    /* Tab */
    else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {

      event.preventDefault();

      first.focus();

    }

  }


  /* ========================================
     5. TOGGLE MENU
  ======================================== */

  toggle.addEventListener(
    "click",
    function () {

      const isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";


      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );


  /* ========================================
     6. CLOSE AFTER NAVIGATION
  ======================================== */

  const menuLinks =
    overlay.querySelectorAll("a");


  menuLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  /* ========================================
     7. CLOSE WHEN ENTERING DESKTOP
  ======================================== */

  const desktopQuery =
    window.matchMedia(
      "(min-width: 996px)"
    );


  desktopQuery.addEventListener(
    "change",
    function (event) {

      if (event.matches) {
        closeMenu();
      }

    }
  );


  /* ========================================
     8. STICKY HEADER
  ======================================== */

  // const hero =
  //   document.querySelector(".hero");


  // if (
  //   hero &&
  //   "IntersectionObserver" in window
  // ) {

  //   const headerHeight =
  //     getComputedStyle(
  //       document.documentElement
  //     )
  //       .getPropertyValue(
  //         "--header-height"
  //       )
  //       .trim() || "76px";


  //   const observer =
  //     new IntersectionObserver(
  //       ([entry]) => {

  //         header.classList.toggle(
  //           "is-scrolled",
  //           !entry.isIntersecting
  //         );

  //       },
  //       {
  //         rootMargin:
  //           `-${headerHeight} 0px 0px 0px`,

  //         threshold: 0
  //       }
  //     );


  //   observer.observe(hero);
  // }

  function updateStickyHeader() {
  const hasScrolled = window.scrollY > 0;

  header.classList.toggle("is-scrolled", hasScrolled);
}

window.addEventListener("scroll", updateStickyHeader, {
  passive: true
});

updateStickyHeader();

})();