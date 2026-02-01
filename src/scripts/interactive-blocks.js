/**
 * Organ Systems Interactive Section
 */
export function initOrganSystems() {
  const section = document.getElementById("organ-systems-section");
  if (!section) return;

  const toggle = section.querySelector(".organ-systems__toggle");
  const toggleBtns = section.querySelectorAll(".organ-systems__toggle-btn");
  const contents = section.querySelectorAll(".organ-systems__content");
  const cards = section.querySelectorAll(".organ-systems__card");
  const details = section.querySelectorAll(".organ-systems__detail-content");

  let isVisible = false;

  function updateAnimationState() {
    if (document.hidden || !isVisible) {
      section.classList.add("is-paused");
      section.classList.remove("is-visible");
    } else {
      section.classList.remove("is-paused");
      section.classList.add("is-visible");
    }
  }

  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          updateAnimationState();
        });
      },
      { rootMargin: "50px", threshold: 0.1 },
    );
    visibilityObserver.observe(section);
  } else {
    section.classList.add("is-visible");
  }

  document.addEventListener("visibilitychange", updateAnimationState);

  // Toggle Buttons
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const product = this.dataset.product;

      toggleBtns.forEach((b) => {
        b.classList.remove("organ-systems__toggle-btn--active");
        b.setAttribute("aria-selected", "false");
        b.setAttribute("tabindex", "-1");
      });
      this.classList.add("organ-systems__toggle-btn--active");
      this.setAttribute("aria-selected", "true");
      this.setAttribute("tabindex", "0");

      if (toggle) toggle.dataset.active = product;

      section.classList.remove(
        "organ-systems--essentials",
        "organ-systems--longevity",
      );
      section.classList.add("organ-systems--" + product);
      section.dataset.activeProduct = product;

      contents.forEach((content) => {
        const isActive = content.dataset.content === product;
        content.classList.toggle("organ-systems__content--active", isActive);
        content.hidden = !isActive;
      });
    });
  });

  // Cards
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const product = this.dataset.product;
      const index = this.dataset.index;

      cards.forEach((c) => {
        if (c.dataset.product === product) {
          const isActive = c.dataset.index === index;
          c.classList.toggle("organ-systems__card--active", isActive);
          c.setAttribute("aria-selected", isActive ? "true" : "false");
        }
      });

      details.forEach((detail) => {
        if (detail.dataset.product === product) {
          const isActive = detail.dataset.detailIndex === index;
          detail.classList.toggle(
            "organ-systems__detail-content--active",
            isActive,
          );
        }
      });
    });

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Pillars Health Section & Tabs
 */
export function initPillarsHealthSection() {
  const section = document.getElementById("pillars-health-section");
  if (!section) return;

  const toggle = section.querySelector(".pillars-health__toggle");
  const toggleBtns = section.querySelectorAll(".pillars-health__toggle-btn");
  const contents = section.querySelectorAll(".pillars-health__content");
  const navItems = section.querySelectorAll(".pillars-health__nav-item");
  const panels = section.querySelectorAll(".pillars-health__panel-content");

  // Product toggle
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const product = this.dataset.product;

      toggleBtns.forEach((b) => {
        b.classList.remove("pillars-health__toggle-btn--active");
        b.setAttribute("aria-selected", "false");
        b.setAttribute("tabindex", "-1");
      });
      this.classList.add("pillars-health__toggle-btn--active");
      this.setAttribute("aria-selected", "true");
      this.setAttribute("tabindex", "0");

      if (toggle) toggle.dataset.active = product;

      section.classList.remove(
        "pillars-health--essentials",
        "pillars-health--longevity",
      );
      section.classList.add("pillars-health--" + product);
      section.dataset.activeProduct = product;

      // Hook into Vanta global function
      if (window.__vantaSwitchTheme) window.__vantaSwitchTheme(product);

      contents.forEach((content) => {
        const isActive = content.dataset.content === product;
        content.classList.toggle("pillars-health__content--active", isActive);
        content.hidden = !isActive;
      });
    });
  });

  // Navigation Items
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const product = this.dataset.product;
      const index = this.dataset.index;

      navItems.forEach((nav) => {
        if (nav.dataset.product === product) {
          const isActive = nav.dataset.index === index;
          nav.classList.toggle("pillars-health__nav-item--active", isActive);
          nav.setAttribute("aria-selected", isActive ? "true" : "false");
        }
      });

      panels.forEach((panel) => {
        if (panel.dataset.product === product) {
          const isActive = panel.dataset.panelIndex === index;
          panel.classList.toggle(
            "pillars-health__panel-content--active",
            isActive,
          );
        }
      });
    });

    // Keyboard A11y
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }

      const product = this.dataset.product;
      const currentIndex = parseInt(this.dataset.index);
      const productNavItems = Array.from(navItems).filter(
        (nav) => nav.dataset.product === product,
      );

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % productNavItems.length;
        productNavItems[nextIndex].focus();
        productNavItems[nextIndex].click();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex =
          (currentIndex - 1 + productNavItems.length) % productNavItems.length;
        productNavItems[prevIndex].focus();
        productNavItems[prevIndex].click();
      }
    });
  });
}
