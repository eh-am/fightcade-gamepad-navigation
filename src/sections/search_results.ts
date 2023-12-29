import { log } from "../log";
import { addCSS, rovingTabIndex } from "../dom";
import { Teardown } from "../types";
import { setupGrid } from "./components/grid";
import * as CL from "../circularList";

function css() {
  addCSS(`
  .searchWrapper .contentWrapper {
    overflow: initial !important;
    display: flex;
    flex-direction: column;
    padding-bottom: 0 !important;
  }

  .searchWrapper .searchResultsWrapper {
    overflow: auto;
  }
  .searchWrapper .searchResultsWrapper .searchResultsGrid {
  /*
    overflow: auto !important;
    height: 100%;
    padding-bottom: 200px;
    */
  }

/*
  .searchWrapper .searchResultsWrapper .paginationWrapper {
    bottom: 0;
    background-color: var(--mainColor-light);
    z-index: 1;
  }
  */
  `);
}
function setupFooter(section: HTMLElement): Teardown {
  moveFooterUpTheDOM();

  const footerButtons = document.querySelectorAll<HTMLElement>(
    ".searchWrapper .paginationWrapper .button-alt"
  );

  // Make it tabbable
  // TODO: we should set tabindex=0 to the first non disabled button
  Array.from(footerButtons).forEach((el, i) => {
    el.setAttribute("tabIndex", i === 0 ? "0" : "-1");
  });

  const fn = function (e: Event) {
    const currentFocused = document.activeElement as HTMLElement;
    const footerButtons = document.querySelectorAll<HTMLElement>(
      ".searchWrapper .paginationWrapper .button-alt"
    );
    const myIndex = Array.from(footerButtons).findIndex(
      (a) => a === currentFocused
    );

    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = (e as KeyboardEvent).key;
    if (keyPressed === "Enter") {
      e.preventDefault();
      currentFocused.click();
    } else if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      const next = CL.prev(footerButtons, myIndex);
      rovingTabIndex(currentFocused, next);
      next.focus();
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();

      const next = CL.next(footerButtons, myIndex);
      rovingTabIndex(currentFocused, next);
      next.focus();
    }
  };

  const footer = section.querySelector(".searchWrapper .paginationWrapper");
  if (!footer) {
    return () => {
      log("noop teardown");
    };
  }
  footer.addEventListener("keydown", fn);

  return () => {
    footer.removeEventListener("keydown", fn);
  };
}

/*
 * Move Footer up the DOM, so that it's always visible
 */
function moveFooterUpTheDOM() {
  // Only move if necessary
  // Otherwise it may trigger an infinite loop with the Mutation Observer

  // Move footer up the DOM, the query is very specific
  // so that it won't run erroneously
  const footer = document.querySelector<HTMLElement>(
    ".searchWrapper .searchResultsWrapper .searchResultsGrid + .paginationWrapper"
  );

  const parent = footer?.parentNode?.parentNode;
  if (parent && footer) {
    var footerWrapper = document.createElement("div");
    footerWrapper.className = "searchResultsWrapper";

    // Unset the one we set with css
    footerWrapper.style.overflow = "initial";
    footerWrapper.append(footer);
    parent.append(footerWrapper);
  }
}

export function initSearchResults(): boolean {
  css();

  return true;
}

let teardown: Teardown[] = [];

/**
 * update, should be idempotent
 */
export function updateSearchResults() {
  teardown.forEach((fn) => {
    fn();
  });
  teardown = [];

  const root = document.querySelector<HTMLElement>(".searchWrapper");
  const rootGrid = document.querySelector<HTMLElement>(
    ".searchWrapper .searchResultsGrid"
  );
  if (!root || !rootGrid) {
    return () => {};
  }

  teardown.push(setupGrid(rootGrid, ".channelWrapper"));
  teardown.push(setupFooter(root));
}
