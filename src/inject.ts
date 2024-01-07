import { initGamepad } from "./gamepad";
import { initSidebar, updateSidebar } from "./sections/sidebar";
import { initAbout } from "./sections/about";
import * as welcomePage from "./pages/welcome";
import * as searchPage from "./pages/search";
//import {
//  initSearchResults,
//  updateSearchResults,
//} from "./sections/search_results";
import { log } from "./log";
import { initSearchHeader, updateSearchHeader } from "./sections/search-header";
import "./devOnly";
import { updateLobby } from "./sections/lobby";

const initialized = {
  sidebar: false,
  about: false,
  welcome: false,
  search: false,
  search_header: false,
  gamepad: false,

  global_css: false,
  lobby: false,
};

const observerOptions = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};

/**
 * Since we don't want to leave the application
 * the downside here is that keyboard users won't be able to tab to external links
 */
function makeExternalLinksNotFocusable() {
  document.querySelectorAll('a[href^="http"]').forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });
}

const lobbiesObservers: MutationObserver[] = [];

/**
 * Observe every single DOM change
 * TODO: ideally we should wait until the app is initialized
 */
const observer = new MutationObserver(function (mr: MutationRecord[]) {
  //  if (!initialized.global_css) {
  //  TODO: only do this if gamepad is detected
  makeExternalLinksNotFocusable();
  //    initialized.global_css = true;
  //  }

  if (!initialized.gamepad) {
    initGamepad();
    initialized.gamepad = true;
  }
  if (!initialized.sidebar) {
    initialized.sidebar = initSidebar();
    updateSidebar();

    if (initialized.sidebar) {
      const observer = new MutationObserver((mr) => {
        updateSidebar();
      });

      const root = document.querySelector(".mainToolbarWrapper");
      if (root) {
        observer.observe(root, observerOptions);
      }
    }
  }

  // Lobbies (.channelWrapper) are added asynchronously (upon load, and upon joining)
  // Instead of keep tracking of what lobby we are watching
  // We take the easy approach and ALWAYS disconnect/reconnect for every DOM change
  // TODO: this is not very peformant
  lobbiesObservers.forEach((lo) => lo.disconnect());
  const lobbies = document.querySelectorAll<HTMLElement>(".channelWrapper");
  lobbiesObservers.push(
    ...Array.from(lobbies).map((l) => {
      const observer = new MutationObserver(() => {
        updateLobby(l);
      });

      observer.observe(l, observerOptions);

      updateLobby(l);
      return observer;
    })
  );

  if (initialized.sidebar) {
    updateSidebar();
  } else {
    initialized.sidebar = initSidebar();
  }

  if (!initialized.about) {
    initialized.about = initAbout();
  }

  const welcomeRoot = welcomePage.getRoot();
  if (!initialized.welcome && welcomeRoot) {
    welcomePage.init();
    initialized.welcome = true;
    welcomePage.update(welcomeRoot);

    const observer = new MutationObserver((mr) => {
      // Since we add a custom SELECT element,
      // this mutation observer is triggered again
      const addedOptions = mr.some((m) => {
        return (
          m.type === "childList" &&
          (m.target as HTMLElement).tagName === "SELECT"
        );
      });

      if (addedOptions) {
        welcomePage.update(welcomeRoot);
      }
    });

    observer.observe(welcomeRoot, observerOptions);
  }

  // There are multiple search headers lol
  //  const searchHeaderInWelcomeRoot = document.querySelector<HTMLElement>(
  //    ".welcomeWrapper > .contentWrapper > header"
  //  );
  //  const searchHeaderInSearchRoot = document.querySelector<HTMLElement>(
  //    ".searchWrapper > .contentWrapper > header"
  //  );

  // There are 2 search headers, depending on the page
  //  if (
  //    !initialized.search_header &&
  //    searchHeaderInWelcomeRoot &&
  //    searchHeaderInSearchRoot
  //  ) {
  //    const init1 = initSearchHeader(searchHeaderInWelcomeRoot);
  //    const init2 = initSearchHeader(searchHeaderInSearchRoot);
  //
  //    // TODO: does this make any sense?
  //    initialized.search_header = init1 && init2;
  //    //    x
  //    //    initialized.search_header = true;
  //    if (initialized.search_header) {
  //      [searchHeaderInSearchRoot, searchHeaderInWelcomeRoot].forEach((root) => {
  //        // Kinda naive but does the job
  //        // Only run when options are added
  //        // Otherwise, when we create our fake options, it will trigger an infinite loop
  //        const observer = new MutationObserver((mr) => {
  //          const addedOptions = mr.some((m) => {
  //            return (
  //              m.type === "childList" &&
  //              (m.target as HTMLElement).tagName === "SELECT"
  //            );
  //          });
  //
  //          if (addedOptions) {
  //            updateSearchHeader(root);
  //          }
  //        });
  //
  //        observer.observe(root, observerOptions);
  //      });
  //    }
  //  }

  const searchPageRoot = document.querySelector<HTMLElement>(
    PAGES.SEARCH_RESULTS
  );
  if (!initialized.search && searchPageRoot) {
    searchPage.init();
    initialized.search = true;

    searchPage.update(searchPageRoot);

    const observer = new MutationObserver((mr) => {
      // Since we add a custom SELECT element,
      // this mutation observer is triggered again
      const addedOptions = mr.some((m) => {
        return (
          m.type === "childList" &&
          (m.target as HTMLElement).tagName === "SELECT"
        );
      });

      if (addedOptions) {
        searchPage.update(searchPageRoot);
      }
    });

    observer.observe(searchPageRoot, observerOptions);
  }
});

observer.observe(document, observerOptions);

const PAGES = {
  SEARCH_RESULTS: ".searchWrapper",
};

//const searchResultsObserver = new MutationObserver(() => {
//  updateSearchResults();
//});
