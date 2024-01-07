import { setupCategory } from "@app/pages/welcome/category";

const teardown: Teardown[] = [];

export function update() {
  const root = document.querySelector<HTMLElement>(".welcomeWrapper");
  if (!root) {
    return false;
  }

  // Find all categories
  const categories = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".welcomeWrapper .contentWrapper .welcomeListWrapper"
    )
  );

  if (categories.length <= 0) {
    console.warn("Search: No items found. Returning early");
    return false;
  }

  teardown.forEach((v) => v());
  teardown.push(
    ...categories.map((category) => {
      return setupCategory(categories, category);
    })
  );

  return true;
}
