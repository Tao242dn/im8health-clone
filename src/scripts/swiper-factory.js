/**
 * Shared Swiper Configuration
 * Contains defaults found across the original script
 */
const BASE_SWIPER_CONFIG = {
  loop: false, // Default to false, override if needed
  grabCursor: true,
  spaceBetween: 0,
  slidesPerView: 1,
  watchSlidesProgress: true,
  draggable: true,
  autoHeight: false,
  watchOverflow: true,
  threshold: 10,
  mousewheel: { forceToAxis: true },
  observer: true, // Added to base as it's safer for dynamic content
  observeParents: true, // Added to base
};

export function createSwiper(selector, customOptions = {}) {
  // Safe check for element existence
  const element = document.querySelector(selector);
  if (!element) return null;

  // Check if Swiper library is loaded
  if (typeof Swiper === "undefined") {
    console.warn(`[Swiper Factory] Swiper is not defined for ${selector}`);
    return null;
  }

  // Merge base config with custom options
  // Note: specific keys in customOptions will overwrite BASE_SWIPER_CONFIG keys
  const finalOptions = {
    ...BASE_SWIPER_CONFIG,
    ...customOptions,
  };

  return new Swiper(selector, finalOptions);
}
