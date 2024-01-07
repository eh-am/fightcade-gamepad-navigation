import {
  makeFocusableIfNeeded,
  getFakeRovingTabindex,
  findFocusableElements,
} from "@app/dom";
import * as list from "@app/ds/list";
import { setupCardForCategory } from "./card";

export function setupCategory(
  allCategories: HTMLElement[],
  category: HTMLElement
): Teardown {
  const cards = Array.from(
    category.querySelectorAll<HTMLElement>(".gridWrapper")
  );
  if (!cards.length) {
    return () => {};
  }

  makeFocusableIfNeeded(cards[0], true, "0");

  const teardown = cards.map((card) => {
    return setupCardForCategory(
      cards,
      card,
      moveToNextCategory.bind(null, Array.from(allCategories), category)
    );
  });

  return () => {
    teardown.forEach((v) => v());
  };
}

function moveToNextCategory(
  allCategories: HTMLElement[],
  currentCategory: HTMLElement,
  nextFn: typeof list.next
) {
  const next = nextFn(allCategories, currentCategory);

  if (next === "OOB") {
    console.warn("Implement OOB for category");
    return;
  }

  const focusableElements = findFocusableElements(next);

  // Try to mimic the rovering tabindex technique
  const lastVisited = focusableElements.find((el) => {
    return getFakeRovingTabindex(el) === "0";
  });
  if (lastVisited) {
    lastVisited.focus();
  } else {
    focusableElements[0]?.focus();
  }
}
