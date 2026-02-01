import {
  initStickyHeader,
  initAccordion,
  initHsaModal,
  initTableSeeMore,
} from "./layout-widgets.js";

import {
  initAnnouncementSlider,
  initRealReviewsVideoSlider,
  initStaticReviewsSlider,
  initCollectionSlider,
} from "./carousel-initializers.js";

import {
  initUrlHighlightMode,
  initVariantAutoSelect,
  initBfcmBanner,
  initStickyBuyButton,
} from "./product-manager.js";

import {
  initOrganSystems,
  initPillarsHealthSection,
} from "./interactive-blocks.js";

import {
  initLazyVideosAndSwipers,
} from "./media-optimization.js";

import {
  initVantaBackground,
} from "./background-animation.js";

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