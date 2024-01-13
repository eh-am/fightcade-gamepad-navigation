import { initGamepad } from "@app/gamepad";
import { initSidebar, updateSidebar } from "./sections/sidebar";
import * as welcomePage from "./pages/welcome";
import * as searchPage from "./pages/search";
import * as aboutPage from "./pages/about";
import * as lobbyPage from "./pages/lobby";
import "./devOnly";
import { startOOBNavigator } from "@app/oobNavigator";
// Needed for its side effects
import "./electron";

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

  // TODO: disable Make all inputs non focusable for steam deck
  document.querySelectorAll("input").forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });

  if (!initialized.gamepad) {
    initGamepad();
    initialized.gamepad = true;
  }

  const sidebarRoot = document.querySelector<HTMLElement>(".mainToolbar");
  if (!initialized.sidebar && sidebarRoot) {
    initSidebar();
    initialized.sidebar = true;
    updateSidebar(sidebarRoot);

    const observer = new MutationObserver((mr) => {
      updateSidebar(sidebarRoot);
    });

    observer.observe(sidebarRoot, observerOptions);
  }

  // Lobbies (.channelWrapper) are added asynchronously (upon load, and upon joining)
  // Instead of keep tracking of what lobby we are watching
  // We take the easy approach and ALWAYS disconnect/reconnect for every DOM change
  // TODO: this is not very peformant
  lobbiesObservers.forEach((lo) => lo.disconnect());
  lobbiesObservers.length = 0;
  const lobbies = document.querySelectorAll<HTMLElement>(
    "#app > .channelWrapper"
  );
  lobbiesObservers.push(
    ...Array.from(lobbies).map((l) => {
      const observer = new MutationObserver(() => {
        lobbyPage.updateLobby(l);
      });

      observer.observe(l, observerOptions);

      lobbyPage.updateLobby(l);
      return observer;
    })
  );

  const aboutRoot = aboutPage.getRoot();
  if (!initialized.about && aboutRoot) {
    aboutPage.init(aboutRoot);
    aboutPage.update(aboutRoot);

    initialized.about = true;
    const observer = new MutationObserver((mr) => {
      aboutPage.update(aboutRoot);
    });
    observer.observe(aboutRoot, observerOptions);
  }

  const welcomeRoot = welcomePage.getRoot();
  if (!initialized.welcome && welcomeRoot) {
    welcomePage.init();
    initialized.welcome = true;
    welcomePage.update(welcomeRoot);

    const observer = new MutationObserver((mr) => {
      // Since we add a custom select element,
      // this mutation observer is triggered again
      const addedCustomSelect = mr.some((m) => {
        const addedNodes = Array.from(m.addedNodes) as HTMLElement[];
        return addedNodes.some(
          (node) =>
            node &&
            node.classList &&
            node.classList.contains("fgn-custom-select")
        );
      });

      if (!addedCustomSelect) {
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
      const addedCustomSelect = mr.some((m) => {
        const addedNodes = Array.from(m.addedNodes) as HTMLElement[];
        return addedNodes.some(
          (node) =>
            node &&
            node.classList &&
            node.classList.contains("fgn-custom-select")
        );
      });

      if (!addedCustomSelect) {
        searchPage.update(searchPageRoot);
      }
    });

    observer.observe(searchPageRoot, observerOptions);
  }

  if (sidebarRoot && welcomeRoot && searchPageRoot) {
    startOOBNavigator({
      sidebar: sidebarRoot,
      welcome: welcomeRoot,
      search: searchPageRoot,
      lobbies: Array.from(lobbies),
    });
  }
});

observer.observe(document, observerOptions);
