import { createSwiper } from "./swiper-factory.js";

/**
 * Announcement Slider
 */
export function initAnnouncementSlider() {
  createSwiper(".Index_announcement_slider", {
    loop: true,
    slidesPerView: 1,
    freeMode: true,
    effect: "fade",
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
  });
}

/**
 * Real Reviews Video Slider
 */
export function initRealReviewsVideoSlider() {
  createSwiper(".Product_meta_real_reviews_video_slider", {
    grabCursor: false, // Specific override from original
    spaceBetween: 12,
    slidesPerView: "auto",
  });
}

/**
 * Static Reviews Auto-scroll
 */
export function initStaticReviewsSlider() {
  createSwiper(".static-reviews-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 25,
    freeMode: true,
    speed: 8000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    watchSlidesVisibility: true,
    breakpoints: {
      320: { spaceBetween: 15 },
      750: { spaceBetween: 20 },
    },
  });
}

/**
 * Collection Slider (Desktop only)
 */
export function initCollectionSlider() {
  if (window.matchMedia("(min-width: 750px)").matches) {
    createSwiper(".Index_collection_slider", {
      grabCursor: false,
      spaceBetween: 16,
      slidesPerView: 3,
    });
  }
}
