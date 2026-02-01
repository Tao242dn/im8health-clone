import { createSwiper } from "./swiper-factory.js";

/**
 * Lazy Video Loading & Complex Swipers
 */
export function initLazyVideosAndSwipers() {
  // Utility to observe videos (Unchanged)
  const optimizeVideos = (selector) => {
    const lazyVideos = document.querySelectorAll(
      `${selector} video[data-lazy-video]`,
    );
    if (lazyVideos.length === 0) return;

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.paused) {
              video.autoplay = true;
              video.play().catch(() => {});
            }
            video.classList.add("video-loaded");
            videoObserver.unobserve(video);
          }
        });
      },
      { rootMargin: "50px" },
    );

    lazyVideos.forEach((video) => videoObserver.observe(video));
  };

  // 1. Experts List Swiper
  const initExpertsSwiper = () => {
    // Retry logic if Swiper isn't ready
    if (typeof Swiper === "undefined") {
      setTimeout(initExpertsSwiper, 100);
      return;
    }

    createSwiper(".Index_object_experts_list_slider", {
      grabCursor: false,
      spaceBetween: 16,
      slidesPerView: "auto",
      on: {
        init: function () {
          setTimeout(
            () => optimizeVideos(".Index_object_experts_list_main_new"),
            100,
          );
        },
      },
    });
  };

  // 2. Real Results Swiper
  const initResultsSwiper = () => {
    if (typeof Swiper === "undefined") {
      setTimeout(initResultsSwiper, 100);
      return;
    }

    // Special logic for mobile touch handling
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;

    createSwiper(
      ".Index_object_real_results_main_new_1 .Index_object_real_results_slider",
      {
        loop: true,
        grabCursor: false,
        spaceBetween: 16,
        slidesPerView: 5.7,
        centeredSlides: true,
        threshold: isMobile ? 15 : 10, // Override base threshold
        speed: 10000,
        allowTouchMove: true,
        disableOnInteraction: false,
        autoplay: {
          delay: isMobile ? 100 : 0,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: { slidesPerView: "auto" },
          750: { slidesPerView: "auto" },
          990: { slidesPerView: "auto" },
          1200: { slidesPerView: 4 },
          1440: { slidesPerView: 4.3 },
          1600: { slidesPerView: 4.7 },
          1900: { slidesPerView: 5.7 },
        },
        on: {
          init: function () {
            setTimeout(
              () => optimizeVideos(".Index_object_real_results_main_new_1"),
              100,
            );
            if (isMobile && this.el) {
              this.el.style.touchAction = "pan-x";
              this.el.style.overscrollBehavior = "none";
              this.el.style.overscrollBehaviorY = "none";
            }
          },
        },
      },
    );
  };

  initExpertsSwiper();
  initResultsSwiper();
}
