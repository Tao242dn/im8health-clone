import {
  initStickyHeader,
  initAccordion,
  initHsaModal,
  initTableSeeMore,
} from "./src/scripts/layout-widgets.js";

import {
  initAnnouncementSlider,
  initRealReviewsVideoSlider,
  initStaticReviewsSlider,
  initCollectionSlider,
} from "./src/scripts/carousel-initializers.js";

import {
  initUrlHighlightMode,
  initVariantAutoSelect,
  initBfcmBanner,
  initStickyBuyButton,
} from "./src/scripts/product-manager.js";

import {
  initOrganSystems,
  initPillarsHealthSection,
} from "./src/scripts/interactive-blocks.js";

import {
  initLazyVideosAndSwipers,
} from "./src/scripts/media-optimization.js";

import {
  initVantaBackground,
} from "./src/scripts/background-animation.js";

/**
 * Main Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initAccordion();
  initHsaModal();
  initTableSeeMore();
  
  initAnnouncementSlider();
  initRealReviewsVideoSlider();
  initStaticReviewsSlider();
  initLazyVideosAndSwipers();
  initCollectionSlider();

  initOrganSystems();
  initPillarsHealthSection(); 

  initUrlHighlightMode();
  initVariantAutoSelect();
  initBfcmBanner();
  initStickyBuyButton();
});

initVantaBackground();