import { makeFocusableIfNeeded } from "@app/dom";
import { setupCategory } from "@app/pages/welcome/category";
import { updateSearchHeader } from "@app/components/search-header";

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

  teardown.push(
    ...categories.map((category) => {
      return setupCategory(
        categories,
        category,
        onHorizontalOOB,
        onVerticalOOB
      );
    })
  );

  const searchHeader = root.querySelector<HTMLElement>(
    ".contentWrapper > header"
  );
  if (searchHeader) {
    updateSearchHeader(searchHeader);
  }

  return true;
}

function onHorizontalOOB(direction: "START" | "END") {
  console.warn("Should move to next section horizontally", direction);
}

function onVerticalOOB(direction: "START" | "END") {
  console.warn("Should move to next section vertically", direction);
}
