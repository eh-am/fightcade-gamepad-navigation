//import "../vendor/controllerjs/unminified/Controller.js";

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
import { initSearchHeader, updateSearchHeader } from "./sections/search-header";
const tabSequence = require("ally.js/query/tabsequence");

if (isElectron()) {
  notify("Starting Arcade Stick Support...");
}

const initialized = {
  sidebar: false,
  about: false,
  search: false,
  search_results: false,
  search_header: false,
  gamepad: false,
};

const observerOptions = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};

/**
 * Observe every single DOM change
 * TODO: ideally we should wait until the app is initialized
 */
const observer = new MutationObserver(function () {
  if (!initialized.gamepad) {
    initGamepad();
    initialized.gamepad = true;
  }
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

  // There are multiple search headers lol
  const searchHeaderInWelcomeRoot = document.querySelector<HTMLElement>(
    ".welcomeWrapper > .contentWrapper > header"
  );
  const searchHeaderInSearchRoot = document.querySelector<HTMLElement>(
    ".searchWrapper > .contentWrapper > header"
  );

  // There are 2 search headers, depending on the page
  if (
    !initialized.search_header &&
    searchHeaderInWelcomeRoot &&
    searchHeaderInSearchRoot
  ) {
    const init1 = initSearchHeader(searchHeaderInWelcomeRoot);
    const init2 = initSearchHeader(searchHeaderInSearchRoot);

    // TODO: does this make any sense?
    initialized.search_header = init1 && init2;
    //    x
    //    initialized.search_header = true;
    if (initialized.search_header) {
      [searchHeaderInSearchRoot, searchHeaderInWelcomeRoot].forEach((root) => {
        // Kinda naive but does the job
        // Only run when options are added
        // Otherwise, when we create our fake options, it will trigger an infinite loop
        const observer = new MutationObserver((mr) => {
          const addedOptions = mr.some((m) => {
            return (
              m.type === "childList" &&
              (m.target as HTMLElement).tagName === "SELECT"
            );
          });
          console.log("updating because", addedOptions);

          if (addedOptions) {
            updateSearchHeader(root);
          }
        });

        observer.observe(root, observerOptions);
      });
    }
  }

  const searchResultsRoot = document.querySelector(PAGES.SEARCH_RESULTS);
  if (!initialized.search_results && searchResultsRoot) {
    log("Initializing search results");

    initialized.search_results = initSearchResults();

    // Trigger manually the first time
    updateSearchResults();

    searchResultsObserver.observe(searchResultsRoot, observerOptions);
  }

  const seq = tabSequence({
    strategy: "quick",
    includeContext: false,
    includeOnlyTabbable: true,
    context: document,
  });

  console.log("tabSequence", seq);
});

observer.observe(document, observerOptions);

const PAGES = {
  SEARCH_RESULTS: ".searchWrapper",
};

const searchResultsObserver = new MutationObserver(() => {
  updateSearchResults();
});
