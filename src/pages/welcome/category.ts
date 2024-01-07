import {
  makeFocusableIfNeeded,
  getFakeRovingTabindex,
  findFocusableElements,
} from "@app/dom";
import * as list from "@app/ds/list";
import { setupCardForCategory as setupCard } from "./card";

export function setupCategory(
  allCategories: HTMLElement[],
  category: HTMLElement,
  onHorizontalOOB: (direction: "START" | "END") => void,
  onVerticalOOB: (direction: "START" | "END") => void
): Teardown {
  const cards = Array.from(
    category.querySelectorAll<HTMLElement>(".gridWrapper")
  );
  if (!cards.length) {
    return () => {};
  }

  // makeFocusableIfNeeded(cards[0], true, "0");

  const teardown = cards.map((card) => {
    return setupCard(
      cards,
      card,
      moveToNextCategory.bind(
        null,
        Array.from(allCategories),
        category,
        onVerticalOOB
      ),
      onHorizontalOOB
    );
  });

  return () => {
    teardown.forEach((v) => v());
  };
}

function moveToNextCategory(
  allCategories: HTMLElement[],
  currentCategory: HTMLElement,
  onVerticalOOB: (direction: "START" | "END") => void,
  nextFn: typeof list.next
) {
  const next = nextFn(allCategories, currentCategory);

  if (next.status === "OOB") {
    onVerticalOOB(next.value);
    return;
  }

  const focusableElements = findFocusableElements(next.value);

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
