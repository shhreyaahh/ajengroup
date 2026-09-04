/* ---------------- DATA ----------------
   NOTE: Replace all sample hero images with
   verified Ajen Group content before launch.
   ---------------- */


/* =========================================================
   HERO DATA
   ========================================================= */

const heroImages = [
  {
    url: "assets/01.jpeg",
    tag: "Premium accommodation",
  },
  {
    url: "assets/02.jpeg",
    tag: "Real estate & architecture",
  },
  {
    url: "assets/03.jpeg",
    tag: "Hospitality",
  },
  {
    url: "assets/04.jpeg",
    tag: "Featured project",
  },
  {
    url: "assets/05.jpeg",
    tag: "Featured project",
  },
  {
    url: "assets/06.jpeg",
    tag: "Premium accommodation",
  },
  {
    url: "assets/07.jpeg",
    tag: "Real estate & architecture",
  },
];


/* =========================================================
   HERO — CURVED 3D GALLERY
   ========================================================= */

const heroGallery =
  document.getElementById("heroGallery");

const heroProgress =
  document.getElementById("heroGalleryProgress");


if (heroGallery && heroImages?.length) {

  /*
   * Duplicate images for seamless looping.
   */

  const galleryItems = [
    ...heroImages,
    ...heroImages,
    ...heroImages,
  ];


  galleryItems.forEach((item) => {

    const card =
      document.createElement("div");


    card.className =
      "hero-gallery-card";


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


  const cards = [
    ...heroGallery.querySelectorAll(
      ".hero-gallery-card"
    ),
  ];


  let autoScroll = true;
  let isDragging = false;

  let startX = 0;
  let startScroll = 0;

  let resumeTimer;


  /* =======================================================
     3D CURVE ENGINE
     ======================================================= */

  function updateCurve() {

    const galleryWidth =
      heroGallery.clientWidth;

    const centerX =
      galleryWidth / 2;

    const curveWidth =
      galleryWidth * 0.72;


    cards.forEach((card) => {

      const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2 -
        heroGallery.scrollLeft;


      let distance =
        (cardCenter - centerX) /
        curveWidth;


      distance =
        Math.max(
          -1,
          Math.min(1, distance)
        );


      const abs =
        Math.abs(distance);


      /*
       * CENTER = LOWER
       * SIDES = HIGHER
       */

      const y =
        (1 - Math.pow(abs, 1.7)) *
        28;


      const rotateY =
        distance * -7;


      const rotateZ =
        distance * 0.8;


      const scale =
        1 - abs * 0.035;


      card.style.transform = `
        translateY(${y}px)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(${scale})
      `;


      if (abs < 0.16) {

        card.classList.add(
          "is-center"
        );

        card.classList.remove(
          "is-side"
        );

      } else {

        card.classList.remove(
          "is-center"
        );

        card.classList.add(
          "is-side"
        );

      }

    });


    updateProgress();

  }


  /* =======================================================
     SMOOTH AUTO MOVEMENT
     ======================================================= */

  function autoMove() {

    if (
      autoScroll &&
      !isDragging
    ) {

      heroGallery.scrollLeft +=
        0.45;


      const loopWidth =
        heroGallery.scrollWidth / 3;


      if (
        heroGallery.scrollLeft >=
        loopWidth * 2
      ) {

        heroGallery.scrollLeft -=
          loopWidth;

      }

    }


    requestAnimationFrame(
      autoMove
    );

  }


  requestAnimationFrame(
    autoMove
  );


  /* =======================================================
     SCROLL
     ======================================================= */

  heroGallery.addEventListener(
    "scroll",
    updateCurve,
    {
      passive: true,
    }
  );


  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateProgress() {

    if (!heroProgress) return;


    const loopWidth =
      heroGallery.scrollWidth / 3;


    if (!loopWidth) return;


    const progress =
      (
        heroGallery.scrollLeft %
        loopWidth
      ) / loopWidth;


    heroProgress.style.width =
      `${Math.max(
        8,
        progress * 100
      )}%`;

  }


  /* Initial calculation */

  requestAnimationFrame(() => {

    updateCurve();

  });


  window.addEventListener(
    "resize",
    updateCurve
  );

}


/* =========================================================
   MOBILE NAV
   ========================================================= */

const mainNav =
  document.querySelector(
    ".main-nav"
  );


const burger =
  document.querySelector(
    ".burger"
  );


if (burger && mainNav) {

  burger.addEventListener(
    "click",
    () => {

      const open =
        mainNav.classList.toggle(
          "mobile-open"
        );


      burger.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );


      burger.textContent =
        open ? "Close" : "Menu";

    }
  );


  document
    .querySelectorAll(
      ".main-nav nav.links a"
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "mobile-open"
          );


          burger.textContent =
            "Menu";


          burger.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const io =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((e) => {

        if (!e.isIntersecting)
          return;


        e.target.classList.add(
          "in"
        );


        io.unobserve(
          e.target
        );

      });

    },
    {
      threshold: 0.15,
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach((el) => {

    io.observe(el);

  });


/* =========================================================
   ABOUT STAT COUNTERS
   ========================================================= */

const statNumbers =
  document.querySelectorAll(
    ".stat .num"
  );


const statObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            !entry.isIntersecting
          )
            return;


          const number =
            entry.target;


          const target =
            Number(
              number.dataset.target
            );


          const suffix =
            number.dataset.suffix ||
            "";


          const duration = 1200;


          const startTime =
            performance.now();


          function animateCounter(
            currentTime
          ) {

            const progress =
              Math.min(
                (
                  currentTime -
                  startTime
                ) / duration,
                1
              );


            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const current =
              Math.floor(
                target * eased
              );


            number.textContent =
              current + suffix;


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                animateCounter
              );

            } else {

              number.textContent =
                target + suffix;

            }

          }


          number.textContent =
            "0" + suffix;


          requestAnimationFrame(
            animateCounter
          );


          statObserver.unobserve(
            number
          );

        }
      );

    },
    {
      threshold: 0.5,
    }
  );


statNumbers.forEach(
  (number) => {

    statObserver.observe(
      number
    );

  }
);


/* =========================================================
   AUTO-GROW CONTACT MESSAGE
   ========================================================= */

const messageField =
  document.querySelector(
    ".contact-middle textarea"
  );


if (messageField) {

  function resizeMessageField() {

    messageField.style.height =
      "40px";


    messageField.style.height =
      `${messageField.scrollHeight}px`;

  }


  messageField.addEventListener(
    "input",
    resizeMessageField
  );


  resizeMessageField();

}

/* =========================================================
   BUSINESS DROPDOWN
   ========================================================= */

const businessDrop =
  document.querySelector(".has-drop");

const businessButton =
  businessDrop?.querySelector("button");


if (businessDrop && businessButton) {

  businessButton.addEventListener(
    "click",
    (e) => {

      e.stopPropagation();

      const open =
        businessDrop.classList.toggle("open");

      businessButton.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );

    }
  );


  document.addEventListener(
    "click",
    () => {

      businessDrop.classList.remove("open");

      businessButton.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

}