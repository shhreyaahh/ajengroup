/* =========================================================
   HOSPITALITY
   Shared data + rendering + interactions
   ========================================================= */

const properties = window.hospitalityProperties || [];

/* ---------------- UPCOMING HOSPITALITY ---------------- */

const upcomingProps =
  window.upcomingHospitalityProperties || [];


/* =========================================================
   PROPERTY GRID
   ========================================================= */

const propGrid = document.getElementById("propGrid");

/*
  Homepage:
  Show only the first 4 properties.

  Hospitality page:
  Show all properties.

  Add future properties to the `properties` array above.
  The homepage will automatically remain limited to 4.
*/

const isHospitalityPage =
  window.location.pathname.endsWith(
    "hospitality_page.html"
  );

const visibleProperties = isHospitalityPage
  ? properties
  : properties.slice(0, 4);

const hospitalityViewAll =
  propGrid?.parentElement.querySelector(
    ".view-all-row"
  );

if (hospitalityViewAll && isHospitalityPage) {
  hospitalityViewAll.hidden = true;
  hospitalityViewAll.style.display = "none";
}


if (propGrid && visibleProperties.length) {

  propGrid.innerHTML = "";

  visibleProperties.forEach((p, i) => {

    const card = document.createElement("div");

    card.className = "prop-card";

    card.innerHTML = `
      <img src="${p.hero}" alt="${p.name}">

      <div class="prop-view">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </div>

      <div class="prop-card-body">
        <div class="prop-tag">Premium accommodation</div>

        <h4>${p.name}</h4>

        <div class="loc">
          ${p.loc}
        </div>
      </div>
    `;

    card.addEventListener(
      "click",
      () => {
        window.location.href =
          `hospitality-detail.html?id=${encodeURIComponent(p.id)}`;
      }
    );

    propGrid.appendChild(card);

  });

}


/* =========================================================
   UPCOMING PROPERTY
   ========================================================= */

const upcomingGrid =
  document.getElementById("upcomingGrid");

const upcomingControls =
  document.getElementById("upcomingControls");

const upcomingPrev =
  document.querySelector(".upcoming-prev");

const upcomingNext =
  document.querySelector(".upcoming-next");

const upcomingCurrent =
  document.getElementById("upcomingCurrent");

const upcomingTotal =
  document.getElementById("upcomingTotal");


if (upcomingGrid && upcomingProps.length) {

  const propertyCount =
    upcomingProps.length;

  upcomingGrid.classList.toggle(
    "has-multiple",
    propertyCount > 1
  );


  /* CREATE CARDS */

  upcomingProps.forEach((p, index) => {

    const card =
      document.createElement("div");

    card.className =
      "upcoming-card";

    card.innerHTML = `
      <div class="img-wrap">

        <img
          src="${p.img}"
          alt="${p.name}"
          loading="${index === 0 ? "eager" : "lazy"}"
        />

      </div>

      <div class="upcoming-body">

        <h4>
          ${p.name}
        </h4>

        <div class="loc">
          ${p.loc}
        </div>

        <span class="vd">
          View details →
        </span>

      </div>
    `;

    upcomingGrid.appendChild(card);

  });


  /* REVEAL */

  requestAnimationFrame(() => {

    const cards =
      upcomingGrid.querySelectorAll(
        ".upcoming-card"
      );

    cards.forEach((card, index) => {

      setTimeout(() => {

        card.classList.add("in");

      }, index * 90);

    });

  });


  /* CAROUSEL */

  if (propertyCount > 1) {

    upcomingTotal.textContent =
      String(propertyCount).padStart(2, "0");

    let currentIndex = 0;


    function updateUpcomingCounter() {

      if (upcomingCurrent) {

        upcomingCurrent.textContent =
          String(currentIndex + 1).padStart(2, "0");

      }

      if (upcomingPrev) {

        upcomingPrev.disabled =
          currentIndex === 0;

      }

      if (upcomingNext) {

        upcomingNext.disabled =
          currentIndex === propertyCount - 1;

      }

    }


    function goToUpcoming(index) {

      const cards = [
        ...upcomingGrid.querySelectorAll(
          ".upcoming-card"
        ),
      ];

      if (!cards.length) return;

      currentIndex =
        Math.max(
          0,
          Math.min(index, cards.length - 1)
        );

      upcomingGrid.scrollTo({

        left:
          cards[currentIndex].offsetLeft,

        behavior: "smooth",

      });

      updateUpcomingCounter();

    }


    upcomingPrev?.addEventListener(
      "click",
      () => goToUpcoming(currentIndex - 1)
    );


    upcomingNext?.addEventListener(
      "click",
      () => goToUpcoming(currentIndex + 1)
    );


    updateUpcomingCounter();

  } else {

    if (upcomingControls) {

      upcomingControls.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  }

}


/* =========================================================
   PROPERTY MODAL
   ========================================================= */

const overlay =
  document.getElementById("modalOverlay");

const modalCard =
  document.getElementById("modalCard");


function openProperty(i) {

  const p = properties[i];

  if (!p || !overlay || !modalCard) return;

  modalCard.innerHTML = `

    <div class="modal-hero">

      <img
        src="${p.hero}"
        alt="${p.name}"
      >

      <div
        class="modal-close"
        id="modalClose"
      >
        &times;
      </div>

    </div>


    <div class="modal-body">

      <div class="loc-line">
        ${p.loc}
      </div>

      <h3>
        ${p.name}
      </h3>


      <div class="modal-cols">

        <div>

          <p>
            ${p.about}
          </p>

          <div class="amenities">

            ${p.amenities
              .map(
                (a) => `<span>${a}</span>`
              )
              .join("")}

          </div>

        </div>


        <div class="modal-facts">

          <div class="fact-row">
            <span>Bedrooms</span>
            <span>${p.bedrooms}</span>
          </div>

          <div class="fact-row">
            <span>Guests</span>
            <span>${p.guests}</span>
          </div>

          <div class="fact-row">
            <span>Location</span>
            <span>${p.loc}</span>
          </div>


          <a
            href="#"
            class="btn-solid book-btn"
          >
            Book your stay
          </a>

        </div>

      </div>

    </div>

  `;


  overlay.classList.add("open");

  document.body.style.overflow =
    "hidden";


  document
    .getElementById("modalClose")
    ?.addEventListener(
      "click",
      closeProperty
    );

}


function closeProperty() {

  if (!overlay) return;

  overlay.classList.remove("open");

  document.body.style.overflow = "";

}


overlay?.addEventListener(
  "click",
  (e) => {

    if (e.target === overlay) {

      closeProperty();

    }

  }
);
