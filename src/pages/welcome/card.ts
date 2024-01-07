import { fakeRovingTabIndex, makeFocusableIfNeeded } from "@app/dom";
import * as list from "@app/ds/list";
import { setupActionButton } from "@app/pages/welcome/actionButtons";

type onChangeCategory = (nextFn: typeof list.next) => void;

const actionSel = ".channelActions a, .eventActions a, .categoryActions a";

export function setupCardForCategory(
  allCards: HTMLElement[],
  card: HTMLElement,
  onChangeCategory: onChangeCategory
): Teardown {
  makeFocusableIfNeeded(card, true);
  const teardown1 = handleFocusOut(card);
  const teardown2 = setupCardKeydown(allCards, card, onChangeCategory);

  const actionButtons = Array.from(
    card.querySelectorAll<HTMLElement>(actionSel)
  );

  const teardown3 = actionButtons.map((ab) => {
    return setupActionButton(
      actionButtons,
      ab,
      moveToNextCardHorizontally.bind(null, allCards, card)
    );
  });

  return () => {
    teardown1();
    teardown2();

    teardown3.forEach((v) => v());
  };
}

export function setupCardKeydown(
  allCards: HTMLElement[],
  card: HTMLElement,
  onChangeCategory: onChangeCategory
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

      const firstChannelAction = card.querySelector<HTMLElement>(actionSel);
      //      const firstChannelAction = card.querySelector<HTMLElement>(
      //        ".channelActions a, .categoryActions a"
      //      );

      console.log("focusing on", firstChannelAction);
      firstChannelAction?.focus();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      onChangeCategory(list.prev);
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      onChangeCategory(list.next);
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
