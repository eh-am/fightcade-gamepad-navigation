import { setupCategory } from "@app/pages/welcome/category";

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

  return true;
}

function onHorizontalOOB(direction: "START" | "END") {
  console.warn("Should move to next section horizontally", direction);
}

function onVerticalOOB(direction: "START" | "END") {
  console.warn("Should move to next section vertically", direction);
}
