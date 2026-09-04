const completedProjects = window.realEstateProjects || [];

/* =========================================================
   UPCOMING PROJECTS DATA
   ========================================================= */

const upcomingProjects =
  window.upcomingRealEstateProjects || [];


/* =========================================================
   COMPLETED PROJECTS
   ========================================================= */

const projGrid =
  document.getElementById("projGrid");

const isRealEstatePage =
  window.location.pathname.endsWith(
    "real-estate.html"
  ) ||
  window.location.pathname.endsWith(
    "real-estate_page.html"
  );

const visibleCompletedProjects = isRealEstatePage
  ? completedProjects
  : completedProjects.slice(0, 6);

const realEstateViewAll =
  projGrid?.parentElement.querySelector(
    ".view-all-row"
  );

if (realEstateViewAll && isRealEstatePage) {
  realEstateViewAll.hidden = true;
  realEstateViewAll.style.display = "none";
}


if (projGrid) {
  projGrid.innerHTML = "";

  visibleCompletedProjects.forEach((p) => {
    const card =
      document.createElement("div");

    card.className =
      "proj-card";

    card.innerHTML = `
      <div class="img-wrap">
        <img
          src="${p.img}"
          alt="${p.name}"
          loading="lazy"
        />
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

    card.addEventListener(
      "click",
      () => {
        window.location.href =
          `real-estate-detail.html?id=${encodeURIComponent(p.id)}`;
      }
    );

    projGrid.appendChild(card);
  });
}


/* =========================================================
   UPCOMING PROJECTS
   ========================================================= */

const upList =
  document.getElementById(
    "upcomingProjList"
  );


if (upList) {
  upList.innerHTML = "";

  upcomingProjects.forEach(
    (p, i) => {

      const row =
        document.createElement("div");

      row.className =
        "up-proj-row";

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
    }
  );
}
