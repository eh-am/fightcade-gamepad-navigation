import {
  fakeRovingTabIndex,
  makeFocusableIfNeeded,
  rovingTabIndex,
} from "@app/dom";
import * as gridList from "@app/ds/gridList";
import { setupActionButton } from "./actionButtons";
import { onOOBNavigation } from "@app/types/navigation";

const actionSel = ".channelActions a, .eventActions a, .categoryActions a";

export function setupCard(
  allCards: HTMLElement[],
  card: HTMLElement,
  onVerticalMovement: (
    allCards: HTMLElement[],
    currCard: HTMLElement,
    direction: "ArrowUp" | "ArrowDown"
  ) => void,
  onHorizontalOOB: onOOBNavigation,
  cardsPerRow: number = Infinity
): Teardown {
  makeFocusableIfNeeded(card, true);
  const teardown1 = handleFocusOut(card);
  const teardown2 = setupCardKeydown(
    allCards,
    card,
    onVerticalMovement,
    onHorizontalOOB,
    cardsPerRow
  );

  const actionButtons = Array.from(
    card.querySelectorAll<HTMLElement>(actionSel)
  );

  setupRole(card);

  const teardown3 = actionButtons.map((ab) => {
    return setupActionButton(
      actionButtons,
      ab,
      moveToNextCardHorizontally.bind(
        null,
        allCards,
        card,
        onHorizontalOOB,
        cardsPerRow
      )
    );
  });

  return () => {
    teardown1();
    teardown2();

    teardown3.forEach((v) => v());
  };
}

function setupCardKeydown(
  allCards: HTMLElement[],
  card: HTMLElement,
  onVerticalMovement: (
    allCards: HTMLElement[],
    currCard: HTMLElement,
    direction: "ArrowUp" | "ArrowDown"
  ) => void,
  onHorizontalOOB: Parameters<typeof setupCard>["3"],
  cardsPerRow: number
): Teardown {
  function onKeydown(e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      moveToNextCardHorizontally(
        allCards,
        card,
        onHorizontalOOB,
        cardsPerRow,
        gridList.prev
      );
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();
      moveToNextCardHorizontally(
        allCards,
        card,
        onHorizontalOOB,
        cardsPerRow,
        gridList.next
      );
    } else if (keyPressed === "Enter") {
      const channelActionsWrapper = getChannelActionsWrapper(card);

      channelActionsWrapper.forEach((el) => {
        el.style.opacity = "1";
      });

      const firstChannelAction = card.querySelector<HTMLElement>(actionSel);
      firstChannelAction?.focus();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      onVerticalMovement(allCards, card, keyPressed);
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      onVerticalMovement(allCards, card, keyPressed);
    } else if (keyPressed === "Escape") {
      hideChannelActions(card);
      card.focus();
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

function hideChannelActions(card: HTMLElement) {
  const channelActionsWrapper = getChannelActionsWrapper(card);
  channelActionsWrapper.forEach((el) => {
    el.style.opacity = "0";
  });
}

export function handleFocusOut(card: HTMLElement): Teardown {
  function onFocusOut(e: FocusEvent) {
    const target = e.relatedTarget as HTMLElement | null;
    if (!e.relatedTarget) {
      return;
    }

    if (!card.contains(target)) {
      hideChannelActions(card);
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
  onHorizontalOOB: Parameters<typeof setupCard>["3"],
  cardsPerRow: number,
  nextFn: typeof gridList.next
) {
  const next = nextFn(allCards, curr, cardsPerRow);
  if (next.status === "OOB") {
    onHorizontalOOB({
      el: curr,
      axis: "HORIZONTAL",
      direction: next.value,
    });
    return;
  }

  fakeRovingTabIndex(curr, next.value);
  rovingTabIndex(curr, next.value);

  // TODO: rovering tab?
  next.value.scrollIntoView({
    // TODO: behavior: smooth will scroll in the center??
    behavior: "auto",
    block: "nearest",
    inline: "nearest",
  });
  next.value.focus();
}

function setupRole(el: HTMLElement) {
  el.setAttribute("role", "gridcell");

  const title =
    el
      .querySelector<HTMLElement>(".channelPreviewWrapper")
      ?.getAttribute("title") || "";

  el.setAttribute("aria-label", title);
}
