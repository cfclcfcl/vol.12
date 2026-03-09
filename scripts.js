document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const root = document.documentElement;
  body.classList.add("hero-ready");
  body.classList.add("hero-active");
  const snapContainer = document.querySelector(".snap-container");

  const updateViewportVars = () => {
    const visibleHeight =
      window.visualViewport?.height || window.innerHeight || 0;
    const screenHeight = window.screen?.height || visibleHeight;
    const outerHeight = window.outerHeight || visibleHeight;
    const isNarrowViewport = window.matchMedia("(max-width: 640px)").matches;
    const heroHeight = isNarrowViewport
      ? Math.max(visibleHeight, screenHeight, outerHeight)
      : visibleHeight;

    root.style.setProperty("--viewport-height", `${visibleHeight}px`);
    root.style.setProperty("--hero-screen-height", `${heroHeight}px`);
  };

  updateViewportVars();
  window.addEventListener("resize", updateViewportVars, { passive: true });
  window.addEventListener("orientationchange", updateViewportVars, {
    passive: true,
  });
  window.visualViewport?.addEventListener("resize", updateViewportVars, {
    passive: true,
  });
  window.visualViewport?.addEventListener("scroll", updateViewportVars, {
    passive: true,
  });

  const scrollButtons = document.querySelectorAll("[data-target]");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const targetSelector = button.getAttribute("data-target");
      const target =
        targetSelector && document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      body.classList.add("lang-pressed");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // When page loads with a hash (e.g., #section-2), smoothly scroll
  // after a short delay so the hero is briefly visible.
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  }

  const updateHeroVisibility = () => {
    if (!snapContainer) return;
    const shouldShowHeroControls =
      snapContainer.scrollTop < window.innerHeight * 0.9;
    body.classList.toggle("hero-active", shouldShowHeroControls);
  };

  if (snapContainer) {
    snapContainer.addEventListener("scroll", updateHeroVisibility, {
      passive: true,
    });
    updateHeroVisibility();
  }
});

