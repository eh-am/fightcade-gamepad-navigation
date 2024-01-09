declare var FGN_DEBUG: boolean;

/**
 * dev only stuff, so that I can test locally easier
 */
function init() {
  const userButton = document.querySelector(".userButton");
  if (!userButton) {
    return;
  }

  // Toggle the user menu
  document.querySelector(".userButton")?.addEventListener("click", () => {
    const userStateMenu = document.querySelector<HTMLElement>(".userStateMenu");
    if (!userStateMenu) {
      return;
    }
    if (userStateMenu.classList.contains("active")) {
      userStateMenu.classList.remove("active");
    } else {
      userStateMenu.classList.add("active");
    }
  });

  // Toggle the filter
  const filtersButton = document.querySelector(
    ".contentWrapper .inputWrapper .filtersButton"
  );

  filtersButton?.addEventListener("click", () => {
    const filtersWrapper = filtersButton
      .closest(".contentWrapper")
      ?.querySelector(".filtersWrapper");
    if (!filtersWrapper) {
      return;
    }

    if (filtersWrapper.classList.contains("active")) {
      filtersWrapper.classList.remove("active");
    } else {
      filtersWrapper.classList.add("active");
    }
  });
}

if (FGN_DEBUG) {
  init();
}
