document.addEventListener('DOMContentLoaded', () => {
    // --- UI: Sticky Header Scroll Effect ---
    const stickyHeader = document.querySelector('.shop-now-bar');
    if (stickyHeader) {
        let scrollThreshold = 400;
        let isVisible = false;

        // Check initial scroll position
        const initialShouldShow = window.scrollY > scrollThreshold;
        if (initialShouldShow) {
            stickyHeader.style.transform = 'translateY(0)';
            isVisible = true;
        }

        window.addEventListener('scroll', () => {
            const shouldShow = window.scrollY > scrollThreshold;

            if (shouldShow && !isVisible) {
                // Show with smooth slide down
                stickyHeader.style.transform = 'translateY(0)';
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                // Hide with smooth slide up
                stickyHeader.style.transform = 'translateY(-100%)';
                isVisible = false;
            }
        });
    }
});

// --- UI: Announcement Slider ---
new Swiper('.Index_announcement_slider', {
    loop: true,
    grabCursor: true,
    spaceBetween: 0,
    slidesPerView: 1,
    watchSlidesProgress: true,
    draggable: !0,
    autoHeight: !1,
    watchOverflow: !0,
    threshold: 10,
    mousewheel: {
        forceToAxis: !0
    },
    freeMode: !0,
    effect: "fade",
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    }
});

// --- UI: Accordion/Expand Toggle ---
(function() {
    const trigger = document.querySelector('.cpr-expand__trigger');
    const content = document.querySelector('.cpr-expand__content');
    if (trigger && content) {
        trigger.addEventListener('click', function() {
            const isOpen = content.classList.contains('open');
            content.classList.toggle('open');
            trigger.classList.toggle('active');
            trigger.setAttribute('aria-expanded', !isOpen);
        });
    }
})();

// --- UI: URL Parameter Styling (Highlight Mode) ---
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const highlight = urlParams.get('highlight');
    if (highlight === '30day') {
        document.documentElement.classList.add('highlight-30day-mode');
    }
})();

// --- UI: Variant Auto-Select Logic (DOM Manipulation) ---
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const isQuarterlyRegion = true;
        const isHighlight30dayMode = document.documentElement.classList.contains('highlight-30day-mode');

        // If highlight=30day mode, select the regular 30-day subscription radio button
        if (isHighlight30dayMode) {
            const allPlanInputs = document.querySelectorAll('input[type="radio"][name*="Plan"]');
            for (const input of allPlanInputs) {
                if (input.dataset.quarterlyVariant === 'true') continue;
                if (input.dataset.doubleSubscription === 'true') continue;
                if (input.value.toLowerCase().includes('one time')) continue;

                const wrapper = input.closest('.product-variant-option-wrapper');
                if (wrapper && window.getComputedStyle(wrapper).display !== 'none') {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', {
                        bubbles: true
                    }));
                    const label = input.nextElementSibling;
                    if (label) {
                        label.click();
                    }
                    break;
                }
            }
            return;
        }

        if (isQuarterlyRegion) {
            // US/UK: Auto-select quarterly variant radio button
            const quarterlyInput = document.querySelector('input[type="radio"][name*="Plan"][data-quarterly-variant="true"]');
            if (quarterlyInput && !quarterlyInput.checked) {
                quarterlyInput.checked = true;
                quarterlyInput.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
                const label = quarterlyInput.nextElementSibling;
                if (label) {
                    label.click();
                }
            }
        } else {
            // Rest of World: Auto-select double subscription variant logic
            const doubleSubInput = document.querySelector('input[type="radio"][name*="Plan"][data-double-subscription="true"]');
            const quarterlyInput = document.querySelector('input[type="radio"][name*="Plan"][data-quarterly-variant="true"]');

            let doubleSubIsVisible = false;
            if (doubleSubInput) {
                const wrapper = doubleSubInput.closest('.product-variant-option-wrapper');
                doubleSubIsVisible = wrapper && window.getComputedStyle(wrapper).display !== 'none';
            }

            if (doubleSubIsVisible && !doubleSubInput.checked) {
                doubleSubInput.checked = true;
                doubleSubInput.dispatchEvent(new Event('change', {
                    bubbles: true
                }));
                const label = doubleSubInput.nextElementSibling;
                if (label) {
                    label.click();
                }
            } else if (!doubleSubIsVisible || (quarterlyInput && quarterlyInput.checked)) {
                const allPlanInputs = document.querySelectorAll('input[type="radio"][name*="Plan"]');
                for (const input of allPlanInputs) {
                    if (input.dataset.quarterlyVariant === 'true') continue;
                    if (input.dataset.doubleSubscription === 'true') continue;
                    if (input.value.toLowerCase().includes('one time')) continue;

                    const wrapper = input.closest('.product-variant-option-wrapper');
                    if (wrapper && window.getComputedStyle(wrapper).display !== 'none') {
                        input.checked = true;
                        input.dispatchEvent(new Event('change', {
                            bubbles: true
                        }));
                        const label = input.nextElementSibling;
                        if (label) {
                            label.click();
                        }
                        break;
                    }
                }
            }
        }
    }, 100);
});

// --- UI: BFCM Banner Toggle Logic ---
(function() {
    function updateBfcmBanner() {
        const banners = document.querySelectorAll('[data-bfcm-banner]');
        const variantInput = document.querySelector('form[action*="/cart/add"] input[name="id"]');
        if (!variantInput || !banners.length) return;

        // Logic assumes helper functions exist, but strict UI toggle can run on class check
        // Simplified to just look for specific UI classes if helpers are removed
        const isQuarterly = variantInput.dataset.quarterlyVariant === 'true'; 
        // Note: Real logic depended on removed window helpers, strictly UI logic usually relies on DOM attributes.
    }

    // Listen for variant changes
    document.addEventListener('change', function(e) {
        if (e.target.matches('input[name="id"], select[name="id"], input[type="radio"][name*="option"]')) {
            setTimeout(updateBfcmBanner, 50);
        }
    });

    document.addEventListener('variant:changed', updateBfcmBanner);
})();

// --- UI: HSA Info Modal ---
document.addEventListener('DOMContentLoaded', () => {
    const hsaInfoLink = document.querySelector('.hsa-info__link');
    const hsaModal = document.querySelector('.hsa-modal');

    if (hsaInfoLink && hsaModal) {
        hsaInfoLink.addEventListener('click', (e) => {
            e.preventDefault();
            hsaModal.classList.add('hsa-modal--open');
        });
    }
});

// --- UI: Real Reviews Video Slider ---
new Swiper('.Product_meta_real_reviews_video_slider', {
    loop: false,
    grabCursor: false,
    spaceBetween: 12,
    slidesPerGroup: 1,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    draggable: !0,
    autoHeight: !1,
    watchOverflow: !0,
    threshold: 10,
    mousewheel: {
        forceToAxis: !0
    }
});

// --- UI: Static Reviews Auto-scroll ---
document.addEventListener('DOMContentLoaded', function() {
    const staticReviewsSwiper = new Swiper('.static-reviews-swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 25,
        freeMode: true,
        speed: 8000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        breakpoints: {
            320: {
                spaceBetween: 15,
            },
            750: {
                spaceBetween: 20,
            },
        },
    });
});

// --- UI: Organ Systems Interactive Section ---
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const section = document.getElementById('organ-systems-section');
    if (!section) return;

    const toggle = section.querySelector('.organ-systems__toggle');
    const toggleBtns = section.querySelectorAll('.organ-systems__toggle-btn');
    const contents = section.querySelectorAll('.organ-systems__content');
    const cards = section.querySelectorAll('.organ-systems__card');
    const details = section.querySelectorAll('.organ-systems__detail-content');

    // PERFORMANCE: Pause/resume animations based on visibility
    let isVisible = false;

    function updateAnimationState() {
        if (document.hidden || !isVisible) {
            section.classList.add('is-paused');
            section.classList.remove('is-visible');
        } else {
            section.classList.remove('is-paused');
            section.classList.add('is-visible');
        }
    }

    if ('IntersectionObserver' in window) {
        const visibilityObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                isVisible = entry.isIntersecting;
                updateAnimationState();
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        visibilityObserver.observe(section);
    } else {
        section.classList.add('is-visible');
    }

    document.addEventListener('visibilitychange', updateAnimationState);

    // Product toggle functionality
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.dataset.product;

            toggleBtns.forEach(b => {
                b.classList.remove('organ-systems__toggle-btn--active');
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
            });
            this.classList.add('organ-systems__toggle-btn--active');
            this.setAttribute('aria-selected', 'true');
            this.setAttribute('tabindex', '0');

            toggle.dataset.active = product;

            section.classList.remove('organ-systems--essentials', 'organ-systems--longevity');
            section.classList.add('organ-systems--' + product);
            section.dataset.activeProduct = product;

            contents.forEach(content => {
                const isActive = content.dataset.content === product;
                content.classList.toggle('organ-systems__content--active', isActive);
                content.hidden = !isActive;
            });
        });
    });

    // Card selection functionality with smooth transitions
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const product = this.dataset.product;
            const index = this.dataset.index;

            cards.forEach(c => {
                if (c.dataset.product === product) {
                    const isActive = c.dataset.index === index;
                    c.classList.toggle('organ-systems__card--active', isActive);
                    c.setAttribute('aria-selected', isActive ? 'true' : 'false');
                }
            });

            details.forEach(detail => {
                if (detail.dataset.product === product) {
                    const isActive = detail.dataset.detailIndex === index;
                    detail.classList.toggle('organ-systems__detail-content--active', isActive);
                }
            });
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// --- UI: Table "See More" Interaction ---
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('Index_object_table_column_see_more')) {
        document.getElementById('Index_object_table_column_see_more').addEventListener('click', function() {
            const rows = document.querySelectorAll(
                '.Index_object_table_column_inneroverlay_innertable_innerright_innerloops_mainboxs_new',
            );
            rows.forEach((row) => row.classList.remove('hide'));
            const className = 'Index_object_table_column_inneroverlay_innertable_innerright_innercolumn_new';
            const elements = document.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove('truncate');
            }
            this.style.display = 'none';

        });
    }
});

// --- UI: Vanta.js Background Animation ---
(function() {
    'use strict';

    var isMobile = window.innerWidth <= 749;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    var SCRIPTS = {
        three: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js',
        vanta: 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.cells.min.js'
    };

    var THEMES = {
        essentials: {
            backgroundColor: 0xF5EAEA,
            color1: 0xA40011,
            color2: 0xFF9693
        },
        longevity: {
            backgroundColor: 0xD7EDAF,
            color1: 0x8C0000,
            color2: 0xF29B45
        }
    };

    var vantaEffect = null;
    var currentTheme = 'essentials';
    var isVisible = true;
    var loadPromise = null;

    function injectScript(src) {
        return new Promise(function(resolve, reject) {
            if (src.indexOf('three') > -1 && window.THREE) return resolve();
            if (src.indexOf('vanta') > -1 && window.VANTA) return resolve();

            var script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    function loadAllScripts() {
        if (loadPromise) return loadPromise;

        loadPromise = injectScript(SCRIPTS.three)
            .then(function() {
                return injectScript(SCRIPTS.vanta);
            })
            .catch(function(e) {
                console.warn('[Vanta] Script load failed:', e);
                loadPromise = null;
            });

        return loadPromise;
    }

    function initVanta() {
        var container = document.getElementById('pillars-vanta-bg');
        var section = document.getElementById('pillars-health-section');

        if (!container || !window.VANTA || !window.THREE) {
            return;
        }

        currentTheme = section && section.dataset.activeProduct || 'essentials';
        var theme = THEMES[currentTheme];

        try {
            vantaEffect = VANTA.CELLS({
                el: container,
                THREE: THREE,
                mouseControls: false,
                touchControls: false,
                gyroControls: false,
                minHeight: 200,
                minWidth: 200,
                scale: 0.7,
                size: 0.4,
                speed: 0.8,
                backgroundColor: theme.backgroundColor,
                color1: theme.color1,
                color2: theme.color2
            });

            if (vantaEffect.renderer) {
                vantaEffect.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
                vantaEffect.renderer.powerPreference = 'high-performance';
            }

            var visObserver = new IntersectionObserver(function(entries) {
                isVisible = entries[0].isIntersecting;
                toggleRendering();
            }, {
                threshold: 0
            });
            visObserver.observe(section);

            document.addEventListener('visibilitychange', toggleRendering);
            container.style.opacity = '1';

        } catch (e) {
            console.warn('[Vanta] Init failed:', e);
        }
    }

    function toggleRendering() {
        if (!vantaEffect || !vantaEffect.renderer) return;

        if (isVisible && !document.hidden) {
            vantaEffect.renderer.setAnimationLoop(vantaEffect.onUpdate.bind(vantaEffect));
        } else {
            vantaEffect.renderer.setAnimationLoop(null);
        }
    }

    window.__vantaSwitchTheme = function(theme) {
        if (!vantaEffect || currentTheme === theme || !THEMES[theme]) return;
        currentTheme = theme;
        try {
            vantaEffect.setOptions(THEMES[theme]);
        } catch (e) {}
    };

    function setup() {
        var section = document.getElementById('pillars-health-section');
        if (!section) return;

        var observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                observer.disconnect();
                loadAllScripts().then(initVanta);
            }
        }, {
            rootMargin: '500px 0px',
            threshold: 0
        });

        observer.observe(section);
    }

    if (document.getElementById('pillars-health-section')) {
        setup();
    } else {
        document.addEventListener('DOMContentLoaded', setup);
    }

})();

// --- UI: Pillars Health Section Interaction ---
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const section = document.getElementById('pillars-health-section');
        if (!section) return;

        const toggle = section.querySelector('.pillars-health__toggle');
        const toggleBtns = section.querySelectorAll('.pillars-health__toggle-btn');
        const contents = section.querySelectorAll('.pillars-health__content');
        const navItems = section.querySelectorAll('.pillars-health__nav-item');
        const panels = section.querySelectorAll('.pillars-health__panel-content');

        // Product toggle functionality
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const product = this.dataset.product;

                toggleBtns.forEach(b => {
                    b.classList.remove('pillars-health__toggle-btn--active');
                    b.setAttribute('aria-selected', 'false');
                    b.setAttribute('tabindex', '-1');
                });
                this.classList.add('pillars-health__toggle-btn--active');
                this.setAttribute('aria-selected', 'true');
                this.setAttribute('tabindex', '0');

                toggle.dataset.active = product;

                section.classList.remove('pillars-health--essentials', 'pillars-health--longevity');
                section.classList.add('pillars-health--' + product);
                section.dataset.activeProduct = product;

                if (window.__vantaSwitchTheme) window.__vantaSwitchTheme(product);

                contents.forEach(content => {
                    const isActive = content.dataset.content === product;
                    content.classList.toggle('pillars-health__content--active', isActive);
                    content.hidden = !isActive;
                });
            });
        });

        // Pillar navigation functionality
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const product = this.dataset.product;
                const index = this.dataset.index;

                navItems.forEach(nav => {
                    if (nav.dataset.product === product) {
                        const isActive = nav.dataset.index === index;
                        nav.classList.toggle('pillars-health__nav-item--active', isActive);
                        nav.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    }
                });

                panels.forEach(panel => {
                    if (panel.dataset.product === product) {
                        const isActive = panel.dataset.panelIndex === index;
                        panel.classList.toggle('pillars-health__panel-content--active', isActive);
                    }
                });
            });

            // Keyboard navigation
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }

                const product = this.dataset.product;
                const currentIndex = parseInt(this.dataset.index);
                const productNavItems = Array.from(navItems).filter(nav => nav.dataset.product === product);

                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % productNavItems.length;
                    productNavItems[nextIndex].focus();
                    productNavItems[nextIndex].click();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (currentIndex - 1 + productNavItems.length) % productNavItems.length;
                    productNavItems[prevIndex].focus();
                    productNavItems[prevIndex].click();
                }
            });
        });

    });
})();

// --- UI: Lazy Loading Video + Swiper ---
(() => {
    'use strict';

    const optimizeVideos = () => {
        const lazyVideos = document.querySelectorAll('.Index_object_experts_list_main_new video[data-lazy-video]');

        if (lazyVideos.length === 0) return;

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.paused) {
                        video.autoplay = true;
                        video.play().catch(() => {});
                    }
                    video.classList.add('video-loaded');
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyVideos.forEach(video => videoObserver.observe(video));
    };

    const initSwiper = () => {
        if (typeof Swiper === 'undefined') {
            setTimeout(initSwiper, 100);
            return;
        }

        new Swiper('.Index_object_experts_list_slider', {
            loop: false,
            grabCursor: false,
            spaceBetween: 16,
            slidesPerGroup: 1,
            slidesPerView: "auto",
            watchSlidesProgress: true,
            draggable: true,
            autoHeight: false,
            watchOverflow: true,
            threshold: 10,
            mousewheel: {
                forceToAxis: true
            },
            observer: true,
            observeParents: true,
            on: {
                init: function() {
                    setTimeout(optimizeVideos, 100);
                }
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwiper);
    } else {
        initSwiper();
    }
})();

// --- UI: Real Results Swiper + Video Opt ---
(() => {
    'use strict';

    const optimizeVideos = () => {
        const lazyVideos = document.querySelectorAll('.Index_object_real_results_main_new_1 video[data-lazy-video]');

        if (lazyVideos.length === 0) return;

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.paused) {
                        video.autoplay = true;
                        video.play().catch(() => {});
                    }
                    video.classList.add('video-loaded');
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyVideos.forEach(video => videoObserver.observe(video));
    };

    const initSwiper = () => {
        if (typeof Swiper === 'undefined') {
            setTimeout(initSwiper, 100);
            return;
        }

        const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

        new Swiper('.Index_object_real_results_main_new_1 .Index_object_real_results_slider', {
            loop: true,
            grabCursor: false,
            spaceBetween: 16,
            slidesPerGroup: 1,
            slidesPerView: 5.7,
            watchSlidesProgress: true,
            centeredSlides: true,
            draggable: true,
            autoHeight: false,
            watchOverflow: true,
            threshold: isMobile ? 15 : 10,
            mousewheel: {
                forceToAxis: true
            },
            speed: 10000,
            allowTouchMove: true,
            disableOnInteraction: false,
            autoplay: {
                delay: isMobile ? 100 : 0,
                disableOnInteraction: false
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                0: {
                    slidesPerView: "auto",
                },
                750: {
                    slidesPerView: "auto",
                },
                990: {
                    slidesPerView: "auto",
                },
                1200: {
                    slidesPerView: 4,
                },
                1440: {
                    slidesPerView: 4.3,
                },
                1600: {
                    slidesPerView: 4.7,
                },
                1900: {
                    slidesPerView: 5.7,
                }
            },
            on: {
                init: function() {
                    setTimeout(optimizeVideos, 100);

                    if (isMobile) {
                        const swiperContainer = this.el;
                        if (swiperContainer) {
                            swiperContainer.style.touchAction = 'pan-x';
                            swiperContainer.style.overscrollBehavior = 'none';
                            swiperContainer.style.overscrollBehaviorY = 'none';
                        }
                    }
                }
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwiper);
    } else {
        initSwiper();
    }
})();

// --- UI: Collection Slider (Desktop only) ---
if ($(window).width() > 749) {
    new Swiper('.Index_collection_slider', {
        loop: false,
        grabCursor: false,
        spaceBetween: 16,
        slidesPerGroup: 1,
        slidesPerView: 3,
        watchSlidesProgress: true,
        draggable: !0,
        autoHeight: !1,
        watchOverflow: !0,
        threshold: 10,
        mousewheel: {
            forceToAxis: !0
        },
        observer: true,
        observeParents: true,
    })
}

// --- UI: HSA Modal Interaction ---
const hsaModal = document.querySelector('.hsa-modal');
if (hsaModal) {
    const hsaModalClose = document.querySelector('.hsa-modal__close');
    const backdrop = document.querySelector('.hsa-modal__backdrop');

    if (hsaModalClose) {
        hsaModalClose.addEventListener('click', () => {
            hsaModal.classList.remove('hsa-modal--open');
        });
    }

    if (backdrop) {
        backdrop.addEventListener('click', () => {
            hsaModal.classList.remove('hsa-modal--open');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hsaModal.classList.remove('hsa-modal--open');
        }
    });
}

// --- UI: Sticky Buy Dropdown & Synchronization ---
document.addEventListener('DOMContentLoaded', function() {
    const dropdownSelected = document.getElementById('sticky-buy-selected');
    const dropdownOptions = document.getElementById('sticky-buy-options');
    if (!dropdownSelected || !dropdownOptions) return;

    const selectedTitle = dropdownSelected.querySelector('.dropdown-selected__title');

    // UI Toggle Logic
    dropdownSelected.addEventListener('click', function(event) {
        event.stopPropagation();
        const isVisible = dropdownOptions.style.display === 'block';
        dropdownOptions.style.display = isVisible ? 'none' : 'block';
        dropdownSelected.classList.toggle('open', !isVisible)
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('#sticky-buy-dropdown')) {
            dropdownOptions.style.display = 'none';
            dropdownSelected.classList.remove('open');
        }
    });

    // Dropdown Option Selection (Syncs to Main Form DOM)
    dropdownOptions.addEventListener('click', function(event) {
        const option = event.target.closest('.dropdown-option');
        if (!option) return;

        const altName = option.dataset.altName || option.dataset.title;
        selectedTitle.textContent = altName;
        dropdownOptions.style.display = 'none';
        dropdownSelected.classList.remove('open');

        // Sync with main form via DOM manipulation
        window.stickyDropdownSelecting = true;
        const mainPlanInput = document.querySelector(
            'product-info input[data-option-value-id="' + option.dataset.optionValueId + '"]'
        );
        if (mainPlanInput) {
            mainPlanInput.nextElementSibling.click();
            requestAnimationFrame(() => {
                if (typeof window.updateStickyButtonPricing === 'function') {
                    window.updateStickyButtonPricing();
                }
                requestAnimationFrame(() => {
                    window.stickyDropdownSelecting = false;
                });
            });
        } else {
            requestAnimationFrame(() => {
                window.stickyDropdownSelecting = false;
            });
        }
    });
});

// --- UI: Sticky Buy Button Logic (Visiblity & DOM Sync) ---
document.addEventListener('DOMContentLoaded', function() {
    const productFormStickyContainer = document.querySelector('.product-buy-sticky-container');
    const stickyVariantDropdown = document.getElementById('sticky-buy-dropdown');
    
    if(!productFormStickyContainer) return;

    // Listen for form changes to update Sticky Title
    document.addEventListener('change', function(event) {
        if (event.target.matches('product-info input[type="radio"]')) {
            const input = event.target;
            if (input.name.includes('Format')) {
                // update sticky product title
                const selectedFormat = event.target.value;
                const productTitleDiv = productFormStickyContainer.querySelector('.product-title__variant');
                if(productTitleDiv) {
                    productTitleDiv.textContent = `(${selectedFormat})`;
                }
            } else if (input.name.includes('Plan')) {
                if (window.stickyDropdownSelecting) {
                    return;
                }
                syncStickyDropdownWithMainForm(input.value);
                updateDropdownTitle();
            }
        }
    });

    // Observer to catch UI state changes
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'checked') {
                    const target = mutation.target;
                    if (target.checked) shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                requestAnimationFrame(() => {
                    updateDropdownTitle();
                });
            }
        });

        const productForm = document.querySelector('product-info');
        if (productForm) {
            observer.observe(productForm, {
                attributes: true,
                attributeFilter: ['checked'],
                subtree: true
            });
        }
    }

    function syncStickyDropdownWithMainForm(selectedValue) {
        if (!stickyVariantDropdown) return;
        const dropdownTitle = stickyVariantDropdown.querySelector('.dropdown-selected__title');
        const dropdownPricePerServing = stickyVariantDropdown.querySelector('.dropdown-selected__price-per-serving');

        if (!dropdownTitle) return;

        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        if (selectedPlanInput) {
            const planTitle = selectedPlanInput.nextElementSibling?.querySelector('.variant_name_new');
            const planPricePerServing = selectedPlanInput.nextElementSibling?.querySelector('.variant_servings_price_new');
            dropdownTitle.textContent = planTitle ? planTitle.textContent.trim() : selectedValue;
            if (dropdownPricePerServing) dropdownPricePerServing.textContent = planPricePerServing ? planPricePerServing.textContent.trim() : '';
        }
    }

    function updateDropdownTitle() {
        if (window.stickyDropdownSelecting || !stickyVariantDropdown) return;

        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        const dropdownTitle = stickyVariantDropdown.querySelector('.dropdown-selected__title');
        const dropdownPricePerServing = stickyVariantDropdown.querySelector('.dropdown-selected__price-per-serving');

        if (!selectedPlanInput || !dropdownTitle) return;

        const planTitle = selectedPlanInput.nextElementSibling.querySelector('.variant_name_new');
        const planPricePerServing = selectedPlanInput.nextElementSibling.querySelector('.variant_servings_price_new');
        if (planTitle) dropdownTitle.textContent = planTitle.textContent.trim();
        if (planPricePerServing && dropdownPricePerServing) dropdownPricePerServing.textContent = planPricePerServing.textContent.trim();
    }

    // Initialize Sticky UI
    function initializeStickyDropdown() {
        const selectedPlanInput = document.querySelector('product-info .product-form__input--plan input:checked');
        if (selectedPlanInput) {
            syncStickyDropdownWithMainForm(selectedPlanInput.value);
        }

        const selectedFormatInput = document.querySelector('product-info .product-form__input--format input:checked');
        const productTitleVariant = productFormStickyContainer.querySelector('.product-title__variant');
        if (selectedFormatInput && productTitleVariant) {
            productTitleVariant.textContent = `(${selectedFormatInput.value})`;
        }

        updateDropdownTitle();

        productFormStickyContainer.classList.remove('product-buy-sticky--hidden');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    productFormStickyContainer.classList.add('initialized');
                });
            });
        });
    }

    initializeStickyDropdown();

    // Expose function globally for coordination with main form UI
    window.updateStickyButtonPricing = function() {
        if (!window.preventVariantRevert) {
            updateDropdownTitle();
        }
    };
});