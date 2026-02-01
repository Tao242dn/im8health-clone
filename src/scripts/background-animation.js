/* ==========================================================================
   Vanta.js Background Animation
   ========================================================================== */
export function initVantaBackground() {
  const isMobile = window.innerWidth <= 749;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (isMobile || prefersReducedMotion) return;

  const SCRIPTS = {
    three: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
    vanta:
      "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.cells.min.js",
  };

  const THEMES = {
    essentials: {
      backgroundColor: 0xf5eaea,
      color1: 0xa40011,
      color2: 0xff9693,
    },
    longevity: {
      backgroundColor: 0xd7edaf,
      color1: 0x8c0000,
      color2: 0xf29b45,
    },
  };

  let vantaEffect = null;
  let currentTheme = "essentials";
  let isVisible = true;
  let loadPromise = null;

  function injectScript(src) {
    return new Promise((resolve, reject) => {
      if (src.indexOf("three") > -1 && window.THREE) return resolve();
      if (src.indexOf("vanta") > -1 && window.VANTA) return resolve();

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadAllScripts() {
    if (loadPromise) return loadPromise;
    loadPromise = injectScript(SCRIPTS.three)
      .then(() => injectScript(SCRIPTS.vanta))
      .catch((e) => {
        console.warn("[Vanta] Script load failed:", e);
        loadPromise = null;
      });
    return loadPromise;
  }

  function toggleRendering() {
    if (!vantaEffect || !vantaEffect.renderer) return;
    if (isVisible && !document.hidden) {
      vantaEffect.renderer.setAnimationLoop(
        vantaEffect.onUpdate.bind(vantaEffect),
      );
    } else {
      vantaEffect.renderer.setAnimationLoop(null);
    }
  }

  function initVanta() {
    const container = document.getElementById("pillars-vanta-bg");
    const section = document.getElementById("pillars-health-section");

    if (!container || !window.VANTA || !window.THREE) return;

    currentTheme = (section && section.dataset.activeProduct) || "essentials";
    const theme = THEMES[currentTheme];

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
        color2: theme.color2,
      });

      if (vantaEffect.renderer) {
        vantaEffect.renderer.setPixelRatio(
          Math.min(window.devicePixelRatio, 1.5),
        );
        vantaEffect.renderer.powerPreference = "high-performance";
      }

      const visObserver = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0].isIntersecting;
          toggleRendering();
        },
        { threshold: 0 },
      );

      if (section) visObserver.observe(section);

      document.addEventListener("visibilitychange", toggleRendering);
      container.style.opacity = "1";
    } catch (e) {
      console.warn("[Vanta] Init failed:", e);
    }
  }

  // Exposed global function for theme switching
  window.__vantaSwitchTheme = function (theme) {
    if (!vantaEffect || currentTheme === theme || !THEMES[theme]) return;
    currentTheme = theme;
    try {
      vantaEffect.setOptions(THEMES[theme]);
    } catch (e) {}
  };

  function setup() {
    const section = document.getElementById("pillars-health-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          loadAllScripts().then(initVanta);
        }
      },
      { rootMargin: "500px 0px", threshold: 0 },
    );

    observer.observe(section);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
}
