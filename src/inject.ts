import { initGamepad } from "./gamepad";
import { initSidebar, updateSidebar } from "./sections/sidebar";
import { initAbout } from "./sections/about";
import { notify } from "./notify";
import { isElectron } from "./electron";
import { initSearch } from "./sections/search";
import {
  initSearchResults,
  updateSearchResults,
} from "./sections/search_results";
import { log } from "./log";
import { Teardown } from "./types";

if (isElectron()) {
  notify("Starting Arcade Stick Support...");
}

const initialized = {
  sidebar: false,
  about: false,
  search: false,
  search_results: false,
};

initGamepad();

/**
 * Observe every single DOM change
 */
const observer = new MutationObserver(function () {
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

  const searchResultsRoot = document.querySelector(PAGES.SEARCH_RESULTS);
  if (!initialized.search_results && searchResultsRoot) {
    log("Initializing search results");

    initialized.search_results = initSearchResults();

    // Trigger manually the first time
    updateSearchResults();

    searchResultsObserver.observe(searchResultsRoot, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
  }
});

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});

const PAGES = {
  SEARCH_RESULTS: ".searchWrapper",
};

const searchResultsObserver = new MutationObserver(() => updateSearchResults());
