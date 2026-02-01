/**
 * Sticky Header Scroll Effect
 */
export function initStickyHeader() {
  const stickyHeader = document.querySelector(".shop-now-bar");
  if (!stickyHeader) return;

  const scrollThreshold = 400;
  let isVisible = false;

  // Initial check
  if (window.scrollY > scrollThreshold) {
    stickyHeader.style.transform = "translateY(0)";
    isVisible = true;
  }

  window.addEventListener(
    "scroll",
    () => {
      const shouldShow = window.scrollY > scrollThreshold;

      if (shouldShow && !isVisible) {
        window.requestAnimationFrame(() => {
          stickyHeader.style.transform = "translateY(0)";
        });
        isVisible = true;
      } else if (!shouldShow && isVisible) {
        window.requestAnimationFrame(() => {
          stickyHeader.style.transform = "translateY(-100%)";
        });
        isVisible = false;
      }
    },
    { passive: true },
  );
}

/**
 * Accordion / Expand Toggle
 */
export function initAccordion() {
  const trigger = document.querySelector(".cpr-expand__trigger");
  const content = document.querySelector(".cpr-expand__content");

  if (trigger && content) {
    trigger.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");
      content.classList.toggle("open");
      trigger.classList.toggle("active");
      trigger.setAttribute("aria-expanded", !isOpen);
    });
  }
}

/**
 * HSA Info Modal
 */
export function initHsaModal() {
  const hsaInfoLink = document.querySelector(".hsa-info__link");
  const hsaModal = document.querySelector(".hsa-modal");
  const hsaModalClose = document.querySelector(".hsa-modal__close");
  const backdrop = document.querySelector(".hsa-modal__backdrop");

  if (!hsaModal) return;

  const closeModal = () => hsaModal.classList.remove("hsa-modal--open");
  const openModal = (e) => {
    if (e) e.preventDefault();
    hsaModal.classList.add("hsa-modal--open");
  };

  if (hsaInfoLink) hsaInfoLink.addEventListener("click", openModal);
  if (hsaModalClose) hsaModalClose.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/**
 * Table "See More" Interaction
 */
export function initTableSeeMore() {
  const seeMoreBtn = document.getElementById(
    "Index_object_table_column_see_more",
  );
  if (!seeMoreBtn) return;

  seeMoreBtn.addEventListener("click", function () {
    const rows = document.querySelectorAll(
      ".Index_object_table_column_inneroverlay_innertable_innerright_innerloops_mainboxs_new",
    );
    rows.forEach((row) => row.classList.remove("hide"));

    const elements = document.getElementsByClassName(
      "Index_object_table_column_inneroverlay_innertable_innerright_innercolumn_new",
    );
    Array.from(elements).forEach((el) => el.classList.remove("truncate"));

    this.style.display = "none";
  });
}
