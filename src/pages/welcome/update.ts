import { makeFocusableIfNeeded } from "@app/dom";
import { setupCategory } from "@app/pages/welcome/category";
import { updateSearchHeader } from "@app/components/search-header";
import {
  onCardVerticalOOB,
  onCategoryHorizontalOOB,
  onHeaderHorizontalNavigation,
  onHeaderVerticalNavigation,
} from "@app/pages/welcome/navigation";

const teardown: Teardown[] = [];

export function update(root: HTMLElement) {
  // Find all categories
  const categories = Array.from(
    root.querySelectorAll<HTMLElement>(
      //".welcomeWrapper .contentWrapper .welcomeListWrapper"
      ".contentWrapper .welcomeListWrapper"
    )
  );

  if (categories.length <= 0) {
    console.warn("Search: No categories found. Returning early");
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
        onCategoryHorizontalOOB.bind(null, root),
        onCardVerticalOOB.bind(null, searchHeader)
      );
    })
  );

  if (searchHeader) {
    updateSearchHeader({
      root: searchHeader,
      onHorizontalOOB: onHeaderHorizontalNavigation.bind(null, root),
      onVerticalOOB: onHeaderVerticalNavigation.bind(null, categories),
    });
  }

  return true;
}
