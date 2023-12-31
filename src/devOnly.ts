declare var FBN_DEBUG: boolean;

/**
 * dev only stuff, so that I can test locally easier
 */
function init() {
  const userButton = document.querySelector(".userButton");
  if (!userButton) {
    return;
  }

  //  addCSS(`
  //    `);

  //  var d = document.createElement("div");
  //  d.className = userButton.className;
  //  d.innerHTML = userButton.innerHTML;
  //
  //  // debugger;
  //  userButton.parentNode?.replaceChild(d, userButton);

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
}

//debugger;
console.log("FBN_DEBUG", FBN_DEBUG);
if (FBN_DEBUG) {
  init();
}
