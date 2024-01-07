import {
  findFirstFocusable,
  findFirstFocusableChild,
  makeFocusableIfNeeded,
} from "@app/dom";
import {
  findFirstFocusableCardInCategory,
  setupCategory,
} from "@app/pages/welcome/category";
import { updateSearchHeader } from "@app/components/search-header";
import { Direction } from "@app/types/navigation";

const teardown: Teardown[] = [];

export function update(root: HTMLElement) {
  // Find all categories
  const categories = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".welcomeWrapper .contentWrapper .welcomeListWrapper"
    )
  );

  if (categories.length <= 0) {
    console.warn("Search: No items found. Returning early");
    return false;
  }

  teardown.forEach((v) => v());
  teardown.length = 0;

  // Only the first card should be initially tabbable (tabindex 0)
  // ATENTION! Order matters here, since it's only set if needed
  // and the category code down below will initialize to -1
  const card = root.querySelector<HTMLElement>(".gridWrapper");
  if (card) {
    makeFocusableIfNeeded(card, true, "0");
  }

  const searchHeader = root.querySelector<HTMLElement>(
    ".contentWrapper > header"
  );
  if (!searchHeader) {
    return;
  }

  teardown.push(
    ...categories.map((category) => {
      return setupCategory(
        categories,
        category,
        onHorizontalOOB,
        onCardVerticalOOB.bind(null, searchHeader)
      );
    })
  );

  if (searchHeader) {
    updateSearchHeader({
      root: searchHeader,
      onHorizontalOOB: onHeaderHorizontalNavigation,
      onVerticalOOB: onHeaderVerticalNavigation.bind(null, categories),
    });
  }

  return true;
}

function onCardVerticalOOB(searchHeader: HTMLElement, direction: Direction) {
  if (direction === "START") {
    const next = findFirstFocusableChild(searchHeader);
    next?.focus();
  }
}
function onHeaderHorizontalNavigation(direction: Direction) {
  onHorizontalOOB(direction);
}
function onHeaderVerticalNavigation(
  categories: HTMLElement[],
  direction: Direction
) {
  if (direction === "END") {
    const lastCategory = categories[0];
    if (lastCategory) {
      // Focus on the next item in the grid
      const lastVisited = findFirstFocusableCardInCategory(lastCategory);
      lastVisited?.focus();
      // TODO: set tabindex to 0, and remove tabindex from other place?
    }
  }
}

function onHorizontalOOB(direction: "START" | "END") {
  console.warn("Should move to next section horizontally", direction);
}

function onVerticalOOB(direction: "START" | "END") {
  console.warn("Should move to next section vertically", direction);
}
