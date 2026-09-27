// const PROOF_DATA = [
//   {
//     company: "Anthropic",
//     logo: "./assets/logos/anthropic.svg",
//     result:
//       "3x’d their enrichment rate with Sweet AI’s data marketplace."
//   },

//   {
//     company: "OpenAI",
//     logo: "./assets/logos/openai.svg",
//     result:
//       "Improved their workflow efficiency with documented processes."
//   },

//   {
//     company: "Gemini",
//     logo: "./assets/logos/gemini.svg",
//     result:
//       "Reduced the time spent managing their documented processes."
//   }
// ];




function initializeProofCycler(proof) {
  const triggers =
    proof.querySelectorAll("[data-proof-trigger]");

  const quotes =
    proof.querySelectorAll("[data-proof-quote]");

  let activeIndex = 0;
  let intervalId = null;

  function activateProof(index) {
    activeIndex = index;

    triggers.forEach((trigger, triggerIndex) => {
      const isActive =
        triggerIndex === index;

      trigger.classList.toggle(
        "is-active",
        isActive
      );

      trigger.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    quotes.forEach((quote, quoteIndex) => {
      quote.classList.toggle(
        "is-active",
        quoteIndex === index
      );
    });
  }

  function startAutoRotation() {
    intervalId = window.setInterval(() => {
      const nextIndex =
        (activeIndex + 1) % triggers.length;

      activateProof(nextIndex);
    }, 3200);
  }

  function restartAutoRotation() {
    window.clearInterval(intervalId);
    startAutoRotation();
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      activateProof(index);
      restartAutoRotation();
    });
  });

  activateProof(0);
  startAutoRotation();
}

// const proofContainer = document.querySelector("[data-proof]");
// proofContainer.innerHTML = renderProof(PROOF_DATA)

// const proofCycler = document.querySelectorAll("[data-proof-cycler]");
// console.log(proofCycler)
// proofCycler.forEach(initializeProofCycler)
function renderProof(proofItems) {
  const logos = proofItems.map((proof, index) => {
    return `
        <button class="proof__logo-wrap${index === 0 ? " is-active" : ""}"
        data-proof-trigger="${index}"
          aria-label="Show ${proof.company} result"
          aria-pressed="${index === 0}"
        >
  <img
            src="${proof.logo}"
            alt=""
          >
        </button>
        `
  }).join("");

  const quotes = proofItems
    .map((proof, index) => {
      return `
        <p
          class="proof__quote${index === 0 ? " is-active" : ""}"
          data-proof-quote="${index}"
        >
          <strong>${proof.company}</strong>
          ${proof.result}
        </p>
      `;
    })
    .join("");

  return `
    <div
      class="proof"
      data-proof-cycler
      aria-label="Customer results"
    >
      <div
        class="proof__logos"
        role="group"
        aria-label="Companies"
      >
        ${logos}
      </div>

      <div class="proof__quotes">
        ${quotes}
      </div>
    </div>
  `;

}


const PROCESSES_CARDS = [
  {
    id: "financial-planning",
    eyebrow: "Finance",
    title: "Make financial processes easier to follow",
    description:
      "Bring your financial processes, procedures, and tasks into one organized workspace.",

    proof: [
      {
        company: "Anthropic",
        logo: "./assets/logos/anthropic.svg",
        result:
          "Reduced the time spent managing financial processes."
      },
      {
        company: "OpenAI",
        logo: "./assets/logos/openai.svg",
        result:
          "Improved visibility across financial workflows."
      },
      {
        company: "Gemini",
        logo: "./assets/logos/gemini.svg",
        result:
          "Created a clearer system for documenting financial tasks."
      }
    ],

    media: {
      type: "video",
      src: "./assets/videos/financial-planning.mp4",
      poster: "./assets/images/financial-planning.jpg"
    }
  },

  {
    id: "onboarding",
    eyebrow: "Onboarding",
    title: "Get new hires productive on day one",
    description:
      "Give every new employee a clear path through your processes, procedures, and tasks.",

    proof: [
      {
        company: "Anthropic",
        logo: "./assets/logos/anthropic.svg",
        result:
          "Reduced the time spent managing financial processes."
      },
      {
        company: "OpenAI",
        logo: "./assets/logos/openai.svg",
        result:
          "Improved visibility across financial workflows."
      },
      {
        company: "Gemini",
        logo: "./assets/logos/gemini.svg",
        result:
          "Created a clearer system for documenting financial tasks."
      }
    ],

    media: {
      type: "video",
      src: "./assets/videos/onboarding.mp4",
      poster: "./assets/images/onboarding.jpg"
    }
  },
  {
    id: "customer",
    eyebrow: "Customer",
    title: "Make financial processes easier to follow",
    description:
      "Bring your financial processes, procedures, and tasks into one organized workspace.",

    proof: [
      {
        company: "Anthropic",
        logo: "./assets/logos/anthropic.svg",
        result:
          "Reduced the time spent managing financial processes."
      },
      {
        company: "OpenAI",
        logo: "./assets/logos/openai.svg",
        result:
          "Improved visibility across financial workflows."
      },
      {
        company: "Gemini",
        logo: "./assets/logos/gemini.svg",
        result:
          "Created a clearer system for documenting financial tasks."
      }
    ],

    media: {
      type: "video",
      src: "./assets/videos/financial-planning.mp4",
      poster: "./assets/images/financial-planning.jpg"
    }
  },

  {
    id: "product",
    eyebrow: "Product",
    title: "Get new hires productive on day one",
    description:
      "Give every new employee a clear path through your processes, procedures, and tasks.",

    proof: [
      {
        company: "Anthropic",
        logo: "./assets/logos/anthropic.svg",
        result:
          "Reduced the time spent managing financial processes."
      },
      {
        company: "OpenAI",
        logo: "./assets/logos/openai.svg",
        result:
          "Improved visibility across financial workflows."
      },
      {
        company: "Gemini",
        logo: "./assets/logos/gemini.svg",
        result:
          "Created a clearer system for documenting financial tasks."
      }
    ],

    media: {
      type: "video",
      src: "./assets/videos/onboarding.mp4",
      poster: "./assets/images/onboarding.jpg"
    }
  },


  // customer-support
  // product-development
];

const processList = document.querySelector("[data-process-list]");

function renderProcessCard(process) {
  return `
<div class="process-showcase__item" data-process="${process.id}">
<article class="process-showcase__card" >
<div class="process-showcase__left">

        <div class="process-showcase__top">

          <div class="process-showcase__eyebrow-wrapper">
            <span class="process-showcase__eyebrow">
              ${process.eyebrow}
            </span>
          </div>

          <h3 class="process-showcase__title">
            ${process.title}
          </h3>

          <p class="process-showcase__desc">
            ${process.description}
          </p>

        </div>

        <div class="process-showcase__bottom">

          <div
            class="process-showcase__proof"
            data-proof
          >
          ${renderProof(process.proof)}
          </div>

          <div class="process-showcase__action">
            <button class="btn btn--primary" type="button">
             <span>Try it free</span>

  <svg
    class="btn__icon"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
            </button>

            <button class="btn btn--secondary" type="button">
            <span>  Explore Sweet AI</span>
            </button>
          </div>

        </div>

      </div>  
      <div class="process-showcase__right">

        <div
          class="process-showcase__media"
          data-media
        ></div>

      </div>
</article>
</div>
`
}

processList.innerHTML = PROCESSES_CARDS.map(renderProcessCard).join("")

// const proofCyclers = document.querySelectorAll("[data-proof]");
// console.log(proofCyclers)
// proofCyclers.forEach((container, index)=>{
//   const process = PROCESSES_CARDS[index];
//   container.innerHTML = renderProof(process.proof)
// })

document.querySelectorAll("[data-proof-cycler]").forEach(initializeProofCycler)


// function initializeProcessStack() {
//   const items = [
//     ...document.querySelectorAll(".process-showcase__item"),
//   ];

//   if (!items.length) return;

//   const PIN_TOP = 80;

//   let ticking = false;

//   let itemPositions = [];

//   function measureItems() {
//     itemPositions = items.map((item) => {
//       return {
//         item,
//         top: item.getBoundingClientRect().top + window.scrollY,
//       };
//     });
//   }

//   function updateStack() {
//     const scrollY = window.scrollY;

//     itemPositions.forEach(({ item, top }, index) => {
//       const card = item.querySelector(".process-showcase__card");

//       if (!card) return;

//       const distancePastPin =
//         scrollY + PIN_TOP - top;

//       if (distancePastPin > 0) {
//         card.style.transform =
//           `translate3d(0, ${distancePastPin}px, 0)`;
//       } else {
//         card.style.transform =
//           "translate3d(0, 0, 0)";
//       }

//       card.style.zIndex = String(index + 1);
//     });

//     ticking = false;
//   }

//   function requestUpdate() {
//     if (ticking) return;

//     ticking = true;

//     requestAnimationFrame(updateStack);
//   }

//   measureItems();
//   updateStack();
//   //   document.fonts.ready.then(() => {
//   //   measureItems();
//   //   updateStack();
//   // });

//   window.addEventListener("scroll", requestUpdate, {
//     passive: true,
//   });

//   window.addEventListener("resize", () => {
//     measureItems();
//     requestUpdate();
//   });
// }

// initializeProcessStack();
