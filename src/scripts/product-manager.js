/**
 * URL Parameter Styling (Highlight Mode)
 */
export function initUrlHighlightMode() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("highlight") === "30day") {
    document.documentElement.classList.add("highlight-30day-mode");
  }
}

/**
 * Variant Auto-Select Logic
 */
export function initVariantAutoSelect() {
  setTimeout(function () {
    const isQuarterlyRegion = true;
    const isHighlight30dayMode = document.documentElement.classList.contains(
      "highlight-30day-mode",
    );
    const allPlanInputs = Array.from(
      document.querySelectorAll('input[type="radio"][name*="Plan"]'),
    );

    const triggerChange = (input) => {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      const label = input.nextElementSibling;
      if (label) label.click();
    };

    if (isHighlight30dayMode) {
      const valid30Day = allPlanInputs.find((input) => {
        if (input.dataset.quarterlyVariant === "true") return false;
        if (input.dataset.doubleSubscription === "true") return false;
        if (input.value.toLowerCase().includes("one time")) return false;
        const wrapper = input.closest(".product-variant-option-wrapper");
        return wrapper && window.getComputedStyle(wrapper).display !== "none";
      });

      if (valid30Day) triggerChange(valid30Day);
      return;
    }

    if (isQuarterlyRegion) {
      const quarterlyInput = document.querySelector(
        'input[type="radio"][name*="Plan"][data-quarterly-variant="true"]',
      );
      if (quarterlyInput && !quarterlyInput.checked) {
        triggerChange(quarterlyInput);
      }
    } else {
      const doubleSubInput = document.querySelector(
        'input[type="radio"][name*="Plan"][data-double-subscription="true"]',
      );
      const quarterlyInput = document.querySelector(
        'input[type="radio"][name*="Plan"][data-quarterly-variant="true"]',
      );

      let doubleSubIsVisible = false;
      if (doubleSubInput) {
        const wrapper = doubleSubInput.closest(
          ".product-variant-option-wrapper",
        );
        doubleSubIsVisible =
          wrapper && window.getComputedStyle(wrapper).display !== "none";
      }

      if (doubleSubIsVisible && !doubleSubInput.checked) {
        triggerChange(doubleSubInput);
      } else if (
        !doubleSubIsVisible ||
        (quarterlyInput && quarterlyInput.checked)
      ) {
        const standardSub = allPlanInputs.find((input) => {
          if (input.dataset.quarterlyVariant === "true") return false;
          if (input.dataset.doubleSubscription === "true") return false;
          if (input.value.toLowerCase().includes("one time")) return false;
          const wrapper = input.closest(".product-variant-option-wrapper");
          return wrapper && window.getComputedStyle(wrapper).display !== "none";
        });
        if (standardSub) triggerChange(standardSub);
      }
    }
  }, 100);
}

/**
 * BFCM Banner Toggle Logic
 */
export function initBfcmBanner() {
  function updateBfcmBanner() {
    const banners = document.querySelectorAll("[data-bfcm-banner]");
    const variantInput = document.querySelector(
      'form[action*="/cart/add"] input[name="id"]',
    );
    if (!variantInput || !banners.length) return;
  }

  document.addEventListener("change", (e) => {
    if (
      e.target.matches(
        'input[name="id"], select[name="id"], input[type="radio"][name*="option"]',
      )
    ) {
      setTimeout(updateBfcmBanner, 50);
    }
  });
  document.addEventListener("variant:changed", updateBfcmBanner);
}

/**
 * Sticky Buy Button Logic
 */
export function initStickyBuyButton() {
  const productFormStickyContainer = document.querySelector(
    ".product-buy-sticky-container",
  );
  const stickyVariantDropdown = document.getElementById("sticky-buy-dropdown");
  const dropdownSelected = document.getElementById("sticky-buy-selected");
  const dropdownOptions = document.getElementById("sticky-buy-options");

  if (!productFormStickyContainer) return;

  // --- Dropdown UI ---
  if (dropdownSelected && dropdownOptions) {
    const selectedTitle = dropdownSelected.querySelector(
      ".dropdown-selected__title",
    );

    dropdownSelected.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = dropdownOptions.style.display === "block";
      dropdownOptions.style.display = isVisible ? "none" : "block";
      dropdownSelected.classList.toggle("open", !isVisible);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#sticky-buy-dropdown")) {
        dropdownOptions.style.display = "none";
        dropdownSelected.classList.remove("open");
      }
    });

    dropdownOptions.addEventListener("click", (e) => {
      const option = e.target.closest(".dropdown-option");
      if (!option) return;

      const altName = option.dataset.altName || option.dataset.title;
      if (selectedTitle) selectedTitle.textContent = altName;
      dropdownOptions.style.display = "none";
      dropdownSelected.classList.remove("open");

      window.stickyDropdownSelecting = true;
      const mainPlanInput = document.querySelector(
        'product-info input[data-option-value-id="' +
          option.dataset.optionValueId +
          '"]',
      );

      if (mainPlanInput) {
        mainPlanInput.nextElementSibling.click();
        requestAnimationFrame(() => {
          if (typeof window.updateStickyButtonPricing === "function") {
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
  }

  // --- Synchronization Logic ---
  function syncStickyDropdownWithMainForm(selectedValue) {
    if (!stickyVariantDropdown) return;
    const dropdownTitle = stickyVariantDropdown.querySelector(
      ".dropdown-selected__title",
    );
    const dropdownPricePerServing = stickyVariantDropdown.querySelector(
      ".dropdown-selected__price-per-serving",
    );

    if (!dropdownTitle) return;

    const selectedPlanInput = document.querySelector(
      "product-info .product-form__input--plan input:checked",
    );
    if (selectedPlanInput) {
      const planTitle =
        selectedPlanInput.nextElementSibling?.querySelector(
          ".variant_name_new",
        );
      const planPricePerServing =
        selectedPlanInput.nextElementSibling?.querySelector(
          ".variant_servings_price_new",
        );
      dropdownTitle.textContent = planTitle
        ? planTitle.textContent.trim()
        : selectedValue;
      if (dropdownPricePerServing && planPricePerServing) {
        dropdownPricePerServing.textContent =
          planPricePerServing.textContent.trim();
      }
    }
  }

  function updateDropdownTitle() {
    if (window.stickyDropdownSelecting || !stickyVariantDropdown) return;

    const selectedPlanInput = document.querySelector(
      "product-info .product-form__input--plan input:checked",
    );
    const dropdownTitle = stickyVariantDropdown.querySelector(
      ".dropdown-selected__title",
    );
    const dropdownPricePerServing = stickyVariantDropdown.querySelector(
      ".dropdown-selected__price-per-serving",
    );

    if (!selectedPlanInput || !dropdownTitle) return;

    const planTitle =
      selectedPlanInput.nextElementSibling?.querySelector(".variant_name_new");
    const planPricePerServing =
      selectedPlanInput.nextElementSibling?.querySelector(
        ".variant_servings_price_new",
      );

    if (planTitle) dropdownTitle.textContent = planTitle.textContent.trim();
    if (planPricePerServing && dropdownPricePerServing) {
      dropdownPricePerServing.textContent =
        planPricePerServing.textContent.trim();
    }
  }

  // --- Events & Observers ---
  document.addEventListener("change", (event) => {
    if (event.target.matches('product-info input[type="radio"]')) {
      const input = event.target;
      if (input.name.includes("Format")) {
        const productTitleDiv = productFormStickyContainer.querySelector(
          ".product-title__variant",
        );
        if (productTitleDiv) productTitleDiv.textContent = `(${input.value})`;
      } else if (input.name.includes("Plan")) {
        if (window.stickyDropdownSelecting) return;
        syncStickyDropdownWithMainForm(input.value);
        updateDropdownTitle();
      }
    }
  });

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "checked"
        ) {
          if (mutation.target.checked) shouldUpdate = true;
        }
      });
      if (shouldUpdate) {
        requestAnimationFrame(() => updateDropdownTitle());
      }
    });

    const productForm = document.querySelector("product-info");
    if (productForm) {
      observer.observe(productForm, {
        attributes: true,
        attributeFilter: ["checked"],
        subtree: true,
      });
    }
  }

  // --- Initialize ---
  const selectedPlanInput = document.querySelector(
    "product-info .product-form__input--plan input:checked",
  );
  if (selectedPlanInput)
    syncStickyDropdownWithMainForm(selectedPlanInput.value);

  const selectedFormatInput = document.querySelector(
    "product-info .product-form__input--format input:checked",
  );
  const productTitleVariant = productFormStickyContainer.querySelector(
    ".product-title__variant",
  );
  if (selectedFormatInput && productTitleVariant) {
    productTitleVariant.textContent = `(${selectedFormatInput.value})`;
  }

  updateDropdownTitle();
  productFormStickyContainer.classList.remove("product-buy-sticky--hidden");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        productFormStickyContainer.classList.add("initialized");
      });
    });
  });

  // Expose global for external usage
  window.updateStickyButtonPricing = function () {
    if (!window.preventVariantRevert) {
      updateDropdownTitle();
    }
  };
}
