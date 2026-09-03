/* ---------------- DATA ----------------
   NOTE: Replace all sample property/project names, images and details below with verified Ajen Group content before launch.
   ---------------- */

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    tag: "Premium accommodation",
  },
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    tag: "Real estate & architecture",
  },
  {
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
    tag: "Hospitality",
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    tag: "Featured project",
  },
];

const properties = [
  {
    name: "The Laterite House",
    loc: "Nayapalli, Bhubaneswar",
    hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    about:
      "A quiet three-bedroom stay finished in warm stone and timber, designed for longer visits and family stays close to the city centre.",
    bedrooms: "3",
    guests: "6",
    amenities: [
      "Wi-Fi",
      "Kitchen",
      "Parking",
      "Air conditioning",
      "Power backup",
    ],
  },
  {
    name: "Chilika View Residence",
    loc: "Patia, Bhubaneswar",
    hero: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80",
    about:
      "An airy two-bedroom apartment with a private balcony, ideal for short business stays and weekend visits.",
    bedrooms: "2",
    guests: "4",
    amenities: ["Wi-Fi", "Balcony", "Washing machine", "Air conditioning"],
  },
  {
    name: "Konark Court Suites",
    loc: "Jaydev Vihar, Bhubaneswar",
    hero: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1400&q=80",
    about:
      "Serviced suites near the business district, combining hotel-style convenience with the comfort of a private home.",
    bedrooms: "1",
    guests: "2",
    amenities: ["Wi-Fi", "Housekeeping", "Elevator", "24/7 security"],
  },
  {
    name: "The Sandstone Villa",
    loc: "Khandagiri, Bhubaneswar",
    hero: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80",
    about:
      "A standalone villa with a private courtyard garden, suited to family gatherings and extended stays.",
    bedrooms: "4",
    guests: "8",
    amenities: ["Wi-Fi", "Garden", "Parking", "Kitchen", "Air conditioning"],
  },
];

/* ---------------------------------------------------------
   UPCOMING HOSPITALITY
   ---------------------------------------------------------

   For now there is only ONE real upcoming property.

   When property 6 is ready, add another object below.
   The carousel controls will automatically appear when
   there are 2 or more upcoming properties.
   --------------------------------------------------------- */

const upcomingProps = [
  {
    name: "Daya Riverside Retreat",
    loc: "Near Daya River, Bhubaneswar",
    img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80",
  },

  /*
    FUTURE PROPERTY EXAMPLE

    ,
    {
      name: "Property Six Name",
      loc: "Location",
      img: "IMAGE URL"
    }

    Property 7, 8, etc. can be added in the same format.
  */
];

const completedProjects = [
  {
    name: "Ashiana Residency",
    loc: "Patia, Bhubaneswar",
    desc: "A mid-rise residential development.",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Green Court Apartments",
    loc: "Chandrasekharpur",
    desc: "Landscaped residential community.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Vista Business Park",
    loc: "Infocity, Bhubaneswar",
    desc: "Commercial office development.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Amara Enclave",
    loc: "Rasulgarh, Bhubaneswar",
    desc: "Gated residential enclave.",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=700&q=80",
  },
];

const upcomingProjects = [
  {
    name: "Utkal Heights",
    loc: "Chandaka, Bhubaneswar",
  },
  {
    name: "Riverfront Commons",
    loc: "Near Daya River",
  },
  {
    name: "The Lotus Residences",
    loc: "Patrapada, Bhubaneswar",
  },
];

/* =========================================================
   HERO — CURVED 3D GALLERY
   ========================================================= */

const heroGallery = document.getElementById("heroGallery");
const heroProgress = document.getElementById("heroGalleryProgress");

if (heroGallery && heroImages?.length) {
  /*
   * Duplicate images for seamless looping.
   */
  const galleryItems = [...heroImages, ...heroImages, ...heroImages];

  galleryItems.forEach((item) => {
    const card = document.createElement("div");

    card.className = "hero-gallery-card";

    card.innerHTML = `
      <img
        src="${item.url}"
        alt="${item.tag || "Ajen Group"}"
        draggable="false"
      />

      <div class="hero-gallery-info">
        <span>${item.tag || ""}</span>
      </div>
    `;

    heroGallery.appendChild(card);
  });

  const cards = [...heroGallery.querySelectorAll(".hero-gallery-card")];

  let autoScroll = true;
  let isDragging = false;

  let startX = 0;
  let startScroll = 0;

  let resumeTimer;

  /* =======================================================
     3D CURVE ENGINE
     ======================================================= */

  function updateCurve() {
    const galleryWidth = heroGallery.clientWidth;
    const centerX = galleryWidth / 2;

    const curveWidth = galleryWidth * 0.72;

    cards.forEach((card) => {
      /*
       * IMPORTANT:
       * Use the card's actual scroll position,
       * NOT getBoundingClientRect().
       *
       * This keeps the curve stable while the cards
       * themselves are being transformed.
       */

      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2 - heroGallery.scrollLeft;

      let distance = (cardCenter - centerX) / curveWidth;

      distance = Math.max(-1, Math.min(1, distance));

      const abs = Math.abs(distance);

      /*
       * CENTER = LOWER
       * SIDES = HIGHER
       *
       * This matches the reference image wall.
       */

      const y = (1 - Math.pow(abs, 1.7)) * 28;

      /*
       * Subtle perspective.
       * Panels remain mostly upright.
       */

      const rotateY = distance * -7;

      const rotateZ = distance * 0.8;

      const scale = 1 - abs * 0.035;

      card.style.transform = `
        translateY(${y}px)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `;

      if (abs < 0.16) {
        card.classList.add("is-center");
        card.classList.remove("is-side");
      } else {
        card.classList.remove("is-center");
        card.classList.add("is-side");
      }
    });

    updateProgress();
  }

  /* =======================================================
     SMOOTH AUTO MOVEMENT
     ======================================================= */

  function autoMove() {
    if (autoScroll && !isDragging) {
      heroGallery.scrollLeft += 0.45;

      /*
       * Seamless loop.
       */

      const loopWidth = heroGallery.scrollWidth / 3;

      if (heroGallery.scrollLeft >= loopWidth * 2) {
        heroGallery.scrollLeft -= loopWidth;
      }
    }

    requestAnimationFrame(autoMove);
  }

  requestAnimationFrame(autoMove);

  /* =======================================================
     SCROLL
     ======================================================= */

  heroGallery.addEventListener("scroll", updateCurve, { passive: true });

  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateProgress() {
    if (!heroProgress) return;

    const loopWidth = heroGallery.scrollWidth / 3;

    if (!loopWidth) return;

    const progress = (heroGallery.scrollLeft % loopWidth) / loopWidth;

    heroProgress.style.width = `${Math.max(8, progress * 100)}%`;
  }

  /* Initial calculation */

  requestAnimationFrame(() => {
    updateCurve();
  });

  window.addEventListener("resize", updateCurve);
}

/* ---------------- PREMIUM ACCOMMODATION GRID ---------------- */

const propGrid = document.getElementById("propGrid");

properties.forEach((p, i) => {
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
      <div class="loc">${p.loc}</div>
    </div>
  `;

  card.addEventListener("click", () => openProperty(i));

  propGrid.appendChild(card);
});

/* ---------------- COMING NEXT — HOSPITALITY ---------------- */

const upcomingGrid = document.getElementById("upcomingGrid");

const upcomingControls = document.getElementById("upcomingControls");

const upcomingPrev = document.querySelector(".upcoming-prev");

const upcomingNext = document.querySelector(".upcoming-next");

const upcomingCurrent = document.getElementById("upcomingCurrent");

const upcomingTotal = document.getElementById("upcomingTotal");

if (upcomingGrid && upcomingProps?.length) {
  const propertyCount = upcomingProps.length;

  /* -------------------------------------------------------
     FUTURE CAROUSEL STATE
     ------------------------------------------------------- */

  upcomingGrid.classList.toggle("has-multiple", propertyCount > 1);

  /* -------------------------------------------------------
     CREATE UPCOMING PROPERTY CARDS
     ------------------------------------------------------- */

  upcomingProps.forEach((p, index) => {
    const card = document.createElement("div");

    card.className = "upcoming-card";

    card.innerHTML = `
      <div class="img-wrap">

        

        <img
          src="${p.img}"
          alt="${p.name}"
          loading="${index === 0 ? "eager" : "lazy"}"
        />

      </div>

      <div class="upcoming-body">

        <h4>${p.name}</h4>

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

  /* -------------------------------------------------------
     REVEAL ANIMATION
     ------------------------------------------------------- */

  requestAnimationFrame(() => {
    const upcomingCards = upcomingGrid.querySelectorAll(".upcoming-card");

    upcomingCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("in");
      }, index * 90);
    });
  });

  /* -------------------------------------------------------
     FUTURE CAROUSEL
     Only active when 2+ properties exist.
     ------------------------------------------------------- */

  if (propertyCount > 1) {
    if (upcomingTotal) {
      upcomingTotal.textContent = String(propertyCount).padStart(2, "0");
    }

    let currentIndex = 0;

    function updateUpcomingCounter() {
      if (upcomingCurrent) {
        upcomingCurrent.textContent = String(currentIndex + 1).padStart(2, "0");
      }

      if (upcomingPrev) {
        upcomingPrev.disabled = currentIndex === 0;
      }

      if (upcomingNext) {
        upcomingNext.disabled = currentIndex === propertyCount - 1;
      }
    }

    function goToUpcoming(index) {
      const cards = [...upcomingGrid.querySelectorAll(".upcoming-card")];

      if (!cards.length) return;

      currentIndex = Math.max(0, Math.min(index, cards.length - 1));

      upcomingGrid.scrollTo({
        left: cards[currentIndex].offsetLeft,
        behavior: "smooth",
      });

      updateUpcomingCounter();
    }

    upcomingPrev?.addEventListener("click", () => {
      goToUpcoming(currentIndex - 1);
    });

    upcomingNext?.addEventListener("click", () => {
      goToUpcoming(currentIndex + 1);
    });

    /* -----------------------------------------------------
       SYNC COUNTER WITH MANUAL SWIPING
       ----------------------------------------------------- */

    let scrollTimer;

    upcomingGrid.addEventListener(
      "scroll",
      () => {
        clearTimeout(scrollTimer);

        scrollTimer = setTimeout(() => {
          const cards = [...upcomingGrid.querySelectorAll(".upcoming-card")];

          if (!cards.length) return;

          const scrollPosition = upcomingGrid.scrollLeft;

          let nearestIndex = 0;
          let nearestDistance = Infinity;

          cards.forEach((card, index) => {
            const distance = Math.abs(card.offsetLeft - scrollPosition);

            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          });

          currentIndex = nearestIndex;

          updateUpcomingCounter();
        }, 80);
      },
      { passive: true },
    );

    updateUpcomingCounter();
  } else {
    /*
      One upcoming property:
      carousel controls remain completely hidden.
    */

    if (upcomingControls) {
      upcomingControls.setAttribute("aria-hidden", "true");
    }
  }
}

/* ---------------- REAL ESTATE PROJECTS ---------------- */

const projGrid = document.getElementById("projGrid");

if (projGrid && completedProjects?.length) {
  completedProjects.forEach((p) => {
    const card = document.createElement("div");

    card.className = "proj-card";

    card.innerHTML = `
      <div class="img-wrap">
        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
        >
      </div>

      <div class="proj-card-body">

        <h4>
          ${p.name}
        </h4>

        <div class="loc">
          ${p.loc}
        </div>

        <p>
          ${p.desc}
        </p>

        <span class="proj-link">
          View project →
        </span>

      </div>
    `;

    projGrid.appendChild(card);
  });
}

/* ---------------- UPCOMING PROJECTS ---------------- */

const upList = document.getElementById("upcomingProjList");

upcomingProjects.forEach((p, i) => {
  const row = document.createElement("div");

  row.className = "up-proj-row";

  row.innerHTML = `
    <span class="idx">
      ${String(i + 1).padStart(2, "0")}
    </span>

    <span class="pname">
      ${p.name}
    </span>

    <span class="ploc">
      ${p.loc}
    </span>

    <span class="badge">
      Upcoming
    </span>
  `;

  upList.appendChild(row);
});

/* ---------------- PROPERTY MODAL ---------------- */

const overlay = document.getElementById("modalOverlay");

const modalCard = document.getElementById("modalCard");

function openProperty(i) {
  const p = properties[i];

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
            ${p.amenities.map((a) => `<span>${a}</span>`).join("")}
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

  document.body.style.overflow = "hidden";

  document
    .getElementById("modalClose")
    .addEventListener("click", closeProperty);
}

function closeProperty() {
  overlay.classList.remove("open");

  document.body.style.overflow = "";
}

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closeProperty();
  }
});

/* ---------------- MOBILE NAV ---------------- */

const mainNav = document.querySelector(".main-nav");

const burger = document.querySelector(".burger");

if (burger) {
  burger.addEventListener("click", () => {
    const open = mainNav.classList.toggle("mobile-open");

    burger.setAttribute("aria-expanded", open ? "true" : "false");

    burger.textContent = open ? "Close" : "Menu";
  });

  document.querySelectorAll(".main-nav nav.links a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("mobile-open");

      burger.textContent = "Menu";

      burger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------- HERO PAUSE ON HOVER / FOCUS ---------------- */

let heroTimer = setInterval(() => {
  goToSlide((heroIdx + 1) % heroImages.length);
}, 5500);

const hero = document.querySelector(".hero");

hero.addEventListener("mouseenter", () => {
  clearInterval(heroTimer);
});

hero.addEventListener("mouseleave", () => {
  heroTimer = setInterval(() => {
    goToSlide((heroIdx + 1) % heroImages.length);
  }, 5500);
});

/* ---------------- OLD MOBILE MENU ---------------- */

/*
  This is leftover code from the previous version.
  We should remove it when we clean the JS.
*/

const menuToggle = document.getElementById("menuToggle");

const mobilePanel = document.getElementById("mobilePanel");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = mobilePanel.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");

    menuToggle.textContent = open ? "Close" : "Menu";
  });

  mobilePanel.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobilePanel.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.textContent = "Menu";
    });
  });
}

/* ---------------- REVEAL + STAT COUNTERS ---------------- */

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;

      e.target.classList.add("in");

      io.unobserve(e.target);
    });
  },
  {
    threshold: 0.15,
  },
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------------- ABOUT STAT COUNTERS ---------------- */

const statNumbers = document.querySelectorAll(".stat .num");

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;

      const target = Number(number.dataset.target);

      const suffix = number.dataset.suffix || "";

      const duration = 1200;

      const startTime = performance.now();

      function animateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(target * eased);

        number.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(animateCounter);
        } else {
          number.textContent = target + suffix;
        }
      }

      number.textContent = "0" + suffix;

      requestAnimationFrame(animateCounter);

      statObserver.unobserve(number);
    });
  },
  {
    threshold: 0.5,
  },
);

statNumbers.forEach((number) => {
  statObserver.observe(number);
});

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------------- AUTO-GROW CONTACT MESSAGE ---------------- */

const messageField = document.querySelector(".contact-middle textarea");

if (messageField) {
  function resizeMessageField() {
    messageField.style.height = "40px";

    messageField.style.height = `${messageField.scrollHeight}px`;
  }

  messageField.addEventListener("input", resizeMessageField);

  resizeMessageField();
}
