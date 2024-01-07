import { findFirstFocusable, makeFocusableIfNeeded } from "@app/dom";
import { setupGrid } from "@app/pages/search/grid";
import { updateSearchHeader } from "@app/components/search-header";
import { setupFooter, setupFooterKeydown } from "./footer";

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

  const grid = setupGrid(root, onHorizontalOOB, onGridVerticalOOB);
  teardown.push(grid.teardown);

  const searchHeader = root.querySelector<HTMLElement>(
    ".contentWrapper > header"
  );
  if (searchHeader) {
    updateSearchHeader({
      root: searchHeader,
      onHorizontalOOB: () => {},
      onVerticalOOB: (direction) => {
        if (direction === "END") {
          onBackToGrid(grid.allCards);
        }
      },
    });
  }

  setupFooter(root);
  teardown.push(
    setupFooterKeydown(
      root,
      onHorizontalOOB,
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
function onHorizontalOOB(direction: "START" | "END") {
  console.warn("Should move to next section horizontally", direction);
}

function onGridVerticalOOB(direction: "START" | "END") {
  if (direction === "START") {
    // Go to search header
    console.warn("go to header");
  } else if (direction === "END") {
    // Go to footer
    console.warn("go to footer");
  }
}
