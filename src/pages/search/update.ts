import {
  findFirstFocusable,
  findFirstFocusableChild,
  makeFocusableIfNeeded,
} from "@app/dom";
import { setupGrid } from "@app/pages/search/grid";
import { updateSearchHeader } from "@app/components/search-header";
import { setupFooter, setupFooterKeydown } from "./footer";
import { dispatchOOBEvent } from "@app/oobNavigator";

let teardown: Teardown[] = [];

/**
 * update, should be idempotent
 */
export function update(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown.length = 0;

  const rootGrid = root.querySelector<HTMLElement>(
    ".searchWrapper .searchResultsGrid"
  );
  if (rootGrid) {
    rootGrid.setAttribute("role", "grid");
  }

  // Only the first card should be initially tabbable (tabindex 0)
  // ATENTION! Order matters here, since it's only set if needed
  // and the category code down below will initialize to -1
  const card = root.querySelector<HTMLElement>(".channelWrapper");
  if (card) {
    makeFocusableIfNeeded(card, true, "0");
  }

  const searchHeader = root.querySelector<HTMLElement>(
    ".contentWrapper > header"
  );
  if (!searchHeader) {
    console.warn("Aborting since searchHeader was not found.");
    return;
  }

  const footer = setupFooter(root);
  if (!footer) {
    console.warn("Aborting since footer was not found.");
    return;
  }

  const grid = setupGrid(
    root,
    onHorizontalOOB.bind(null, root),
    onGridVerticalOOB.bind(null, searchHeader, footer)
  );
  teardown.push(grid.teardown);

  updateSearchHeader({
    root: searchHeader,
    onHorizontalOOB: onHorizontalOOB.bind(null, root),
    onVerticalOOB: (direction) => {
      if (direction === "END") {
        onBackToGrid(grid.allCards);
      }
    },
  });

  teardown.push(
    setupFooterKeydown(
      root,
      onHorizontalOOB.bind(null, root),
      onBackToGrid.bind(null, grid.allCards)
    )
  );
}

function onBackToGrid(allCards: HTMLElement[]) {
  const firstFocusable = findFirstFocusable(allCards);
  if (firstFocusable) {
    firstFocusable.focus();
  }
}
//
function onHorizontalOOB(root: HTMLElement, direction: "START" | "END") {
  dispatchOOBEvent(root, "HORIZONTAL", direction);
}

function onGridVerticalOOB(
  searchHeader: HTMLElement,
  footer: HTMLElement,
  direction: "START" | "END"
) {
  if (direction === "START") {
    const next = findFirstFocusableChild(searchHeader);
    next?.focus();
  } else if (direction === "END") {
    const next = findFirstFocusableChild(footer);
    next?.focus();
  }
}
