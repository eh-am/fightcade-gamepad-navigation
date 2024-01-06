import {
  fakeRovingTabIndex,
  findFocusableElements,
  getFakeRovingTabindex,
} from "@app/dom";
import * as list from "@app/ds/list";

export function setupCardKeydown(
  allCategories: HTMLElement[],
  allCards: HTMLElement[],
  currentCategory: HTMLElement,
  card: HTMLElement
): Teardown {
  function onKeydown(e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      moveToNextCardHorizontally(allCards, card, list.prev);
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();
      moveToNextCardHorizontally(allCards, card, list.next);
    } else if (keyPressed === "Enter") {
      const channelActionsWrapper = getChannelActionsWrapper(card);

      channelActionsWrapper.forEach((el) => {
        el.style.opacity = "1";
      });

      const firstChannelAction = card.querySelector<HTMLElement>(
        ".channelActions a, .categoryActions a"
      );

      firstChannelAction?.focus();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      moveToNextCategory(allCategories, currentCategory, list.prev);
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      moveToNextCategory(allCategories, currentCategory, list.next);
    }
  }

  card.addEventListener("keydown", onKeydown);
  return () => {
    card.removeEventListener("keydown", onKeydown);
  };
}

function getChannelActionsWrapper(card: HTMLElement) {
  // .categoryActions refers to the "Browse Categories" section
  return card.querySelectorAll<HTMLElement>(
    ".channelActions, .categoryActions"
  );
}

export function handleFocusOut(card: HTMLElement): Teardown {
  function onFocusOut(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement | null;
    if (!e.relatedTarget) {
      return;
    }

    if (!card.contains(target)) {
      const channelActionsWrapper = getChannelActionsWrapper(card);
      channelActionsWrapper.forEach((el) => {
        el.style.opacity = "0";
      });
    }
  }

  card.addEventListener("focusout", onFocusOut);
  return () => {
    card.removeEventListener("focusout", onFocusOut);
  };
}

function moveToNextCardHorizontally(
  allCards: HTMLElement[],
  curr: HTMLElement,
  nextFn: typeof list.next
) {
  const next = nextFn(allCards, curr);
  if (next === "OOB") {
    return;
  }

  fakeRovingTabIndex(curr, next);

  // TODO: rovering tab?
  next.scrollIntoView({
    // TODO: behavior: smooth will scroll in the center??
    behavior: "auto",
    block: "nearest",
    inline: "nearest",
  });
  next.focus();
}

function moveToNextCategory(
  allCategories: HTMLElement[],
  currentCategory: HTMLElement,
  nextFn: typeof list.next
) {
  const next = nextFn(allCategories, currentCategory);

  if (next === "OOB") {
    throw new Error("Implement OOB");
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
