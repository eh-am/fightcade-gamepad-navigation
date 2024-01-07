import { initGamepad } from "./gamepad";
import { initSidebar, updateSidebar } from "./sections/sidebar";
import { initAbout } from "./sections/about";
import * as welcomePage from "./pages/welcome";
import * as searchPage from "./pages/search";
import "./devOnly";
import { updateLobby } from "./sections/lobby";

const initialized = {
  sidebar: false,
  about: false,
  welcome: false,
  search: false,
  gamepad: false,
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
  //  TODO: only do this if gamepad is detected
  makeExternalLinksNotFocusable();

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

  const searchPageRoot = document.querySelector<HTMLElement>(".searchWrapper");
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
