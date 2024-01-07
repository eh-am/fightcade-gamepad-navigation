import {
  getFakeRovingTabindex,
  findFocusableElements,
  rovingTabIndex,
} from "@app/dom";
import * as list from "@app/ds/list";
import { setupCard } from "@app/components/card";

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

  const teardown = cards.map((card) => {
    return setupCard(
      cards,
      card,
      (allCards, currCard, direction) => {
        const nextFn = direction === "ArrowUp" ? list.prev : list.next;

        moveToNextCategory(
          currCard,
          Array.from(allCategories),
          category,
          onVerticalOOB,
          nextFn
        );
      },
      onHorizontalOOB
    );
  });

  return () => {
    teardown.forEach((v) => v());
  };
}

function moveToNextCategory(
  currCard: HTMLElement,
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

  const focusableCards = findFocusableElements(next.value).filter((el) => {
    // TODO: kinda ugly, but we need to know only cards
    return el.classList.contains("gridWrapper");
  });

  // Try to mimic the rovering tabindex technique per category
  // So that we come back to the previous item in that category
  const lastVisited = focusableCards.find((el) => {
    return getFakeRovingTabindex(el) === "0";
  });
  if (lastVisited) {
    lastVisited.focus();
    rovingTabIndex(currCard, lastVisited);
  } else {
    focusableCards[0]?.focus();
    rovingTabIndex(currCard, focusableCards[0]);
  }
}
