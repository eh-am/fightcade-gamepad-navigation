import { log } from "../log";
import { addCSS } from "../dom";
import { Teardown } from "../types";
import { setupGrid } from "./components/grid";

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
function setupFooter() {
  moveFooterUpTheDOM();

  const footerButtons = document.querySelectorAll<HTMLElement>(
    ".searchWrapper .paginationWrapper .button-alt"
  );

  // Make it tabbable
  if (footerButtons && footerButtons[0]) {
    footerButtons[0].setAttribute("tabIndex", "0");
  }
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

let teardown: Teardown;

/**
 * update, should be idempotent
 */
export function updateSearchResults() {
  if (teardown) {
    teardown();
  }
  const root = document.querySelector<HTMLElement>(
    ".searchWrapper .searchResultsGrid"
  );
  if (!root) {
    return () => {};
  }

  teardown = setupGrid(root, ".channelWrapper");
  setupFooter();
}
