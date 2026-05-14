(function () {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const siteNav = document.querySelector("[data-site-nav]");
  const yearButtons = document.querySelectorAll("[data-year]");
  const cards = document.querySelectorAll("[data-year].project-card");
  const emptyState = document.querySelector("[data-empty-state]");
  const yearSpans = document.querySelectorAll("[data-current-year]");

  yearSpans.forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  if (header) {
    let ticking = false;
    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateHeader();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      document.body.classList.toggle("nav-open", !open);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  if (!yearButtons.length || !cards.length) return;

  function setFilter(year) {
    let visible = 0;
    cards.forEach(function (card) {
      const y = card.getAttribute("data-year");
      const show = year === "all" || y === year;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    yearButtons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-year") === year);
    });

    if (emptyState) {
      const hide = visible === 0;
      emptyState.classList.toggle("visually-hidden", !hide);
      emptyState.setAttribute("aria-hidden", hide ? "false" : "true");
    }
  }

  yearButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setFilter(btn.getAttribute("data-year") || "all");
    });
  });
})();
