"use strict";

const menuToggle = document.querySelector(".site-menu__toggle");
const menuOverlay = document.querySelector(".menu-overlay");

menuToggle.addEventListener("click", ()=>{
    console.log("clicked");
 const isOpen = menuToggle.classList.toggle("is-open");
 menuOverlay.classList.toggle("is-open", isOpen);
 menuToggle.setAttribute("aria-expanded", String(isOpen));
 menuToggle.setAttribute("aria-label" , isOpen ? "Close Menu" : "Open Menu")

  menuOverlay.setAttribute(
    "aria-hidden",
    String(!isOpen)
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );
    
})