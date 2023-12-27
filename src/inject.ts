import { initGamepad } from "./gamepad";
import { initSidebar, updateSidebar } from "./sections/sidebar";
import { initAbout } from "./sections/about";
import { notify } from "./notify";
import { isElectron } from "./electron";
import { initSearch } from "./sections/search";

if (isElectron()) {
  notify("Starting Arcade Stick Support...");
}

const initialized = {
  sidebar: false,
  about: false,
  search: false,
};

initGamepad();

var observer = new MutationObserver(function () {
  console.log("observing");
  if (initialized.sidebar) {
    updateSidebar();
  } else {
    initialized.sidebar = initSidebar();
  }

  if (!initialized.about) {
    initialized.about = initAbout();
  }

  if (!initialized.search) {
    initialized.search = initSearch();
  }
});

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});

alert("HEY");
