import { log } from "../../log";
import * as CL from "../../circularList";
import { findFocusableElements } from "../../dom";

const actionSel = ".channelActions, .eventActions, .categoryActions";

function isActionButton(el: HTMLElement | null) {
  return el?.tagName === "A";
}

/**
 * Upon focusing out a card
 */
function setupCardFocusOut(section: HTMLElement, cardQuery: string): Teardown {
  // When focusing out of a card,
  section.querySelectorAll<HTMLElement>(cardQuery).forEach((card) => {
    card.addEventListener("focusout", (event) => {
      const target = event.relatedTarget as HTMLElement;

      // If it's focusing on its children, do nothing
      if (card.contains(target)) {
        return;
      }

      card.setAttribute("aria-expanded", "false");

      // TODO: maybe this would be better if set on each action group?
      card.querySelectorAll<HTMLElement>(actionSel).forEach((el2) => {
        el2.style.opacity = "0";
      });
    });
  });

  return () => {
    log("should teardown this function");
  };
}

/**
 * When it's focused, make the actions visible
 * We used 'focusin' since this event bubbles
 */
function setupFocusIn(section: HTMLElement): Teardown {
  section.addEventListener("focusin", (e) => {
    const focusingTo = e.target as HTMLElement | null;
    log("focusing in", focusingTo);

    // If focusing on button, let's make the whole action group visible
    if (isActionButton(focusingTo)) {
      const parent = focusingTo?.closest(actionSel) as HTMLElement | null;
      if (parent) {
        parent.style.opacity = "1";
      }
      return;
    }
  });

  return () => {
    log("should teardown this function");
  };
}

function makeButtonsTappable(section: HTMLElement) {
  section.querySelectorAll<HTMLElement>(actionSel).forEach((actions) => {
    const buttons = Array.from(actions.querySelectorAll<HTMLElement>("a"));

    buttons
      .filter((a) => isActionButton(a))
      .filter((a) => !a.hasAttribute("href"))
      .forEach((a) => {
        a.setAttribute("href", "#");

        // By default <a> tags are tabbable, so let's disable it
        // since we will handle that manually
        a.setAttribute("tabIndex", "-1");
      });
  });
}

// Get the first of each category and make that focusable
// .welcomeListGridBig refers to the "Hidden Gems" section
function makeFirstCardFocusable(section: HTMLElement, cardClassName: string) {
  const firstItems = section.querySelectorAll(`${cardClassName}:first-of-type`);

  firstItems.forEach((firstAction) => {
    firstAction.setAttribute("tabIndex", "0");
  });
}

// TODO: if there's a single action, hitting enter should click on it
function handleEnter(cardQuery: string) {
  const currentFocused = document.activeElement as HTMLElement;
  if (!currentFocused) {
    return;
  }

  const currentCardFocused = currentFocused.closest(cardQuery);
  if (!currentCardFocused) {
    return;
  }

  currentCardFocused.setAttribute("aria-expanded", "true");

  // TODO: this is a brittle selector, since it assumes action buttons are <a>
  const actionSel = `.channelActions a, .eventActions a, .categoryActions a`;

  // If it's focused the card,
  // ie. it contains actions
  // Let's focus on the first action
  const actions = currentFocused.querySelectorAll<HTMLElement>(actionSel);
  if (actions && actions[0]) {
    actions[0].focus();
    return;
  }

  // It's focused on an action button
  if (isActionButton(currentFocused)) {
    // We have to remove the href, otherwise clicking will use that href as the target
    log("Clicking on", currentFocused);
    currentFocused.removeAttribute("href");
    currentFocused.click();
    currentFocused.setAttribute("href", "#");
  }
}

function moveToNextCard(
  section: HTMLElement,
  currentFocused: HTMLElement,
  nextFn: typeof CL.next,
  cardQuery: string
) {
  // Find current card focused, since we could be either focusing on the card already, or on its action buttons
  const currentCardFocused = currentFocused.closest(cardQuery);
  if (!currentCardFocused) {
    return;
  }

  // Find all cards under the same section
  const cards = section.querySelectorAll<HTMLElement>(cardQuery);
  const myIndex = Array.from(cards).findIndex((a) => a === currentCardFocused);
  const nextItem = nextFn(cards, myIndex);

  // Roving tabindex
  currentCardFocused.setAttribute("tabIndex", "-1");
  currentCardFocused.setAttribute("aria-expanded", "false");

  nextItem.setAttribute("tabIndex", "0");
  // TODO: try https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded#browser_compatibility ?
  nextItem.scrollIntoView({
    // TODO: behavior: smooth will scroll in the center??
    behavior: "auto",
    block: "center",
    inline: "nearest",
  });
  nextItem.focus();
}

function moveToNextActionButton(nextFn: typeof CL.prev, cardQuery: string) {
  const currentFocused = document.activeElement as HTMLElement;
  if (!currentFocused) {
    return;
  }

  // If it's already focused on one of the actions
  if (isActionButton(currentFocused)) {
    // Cycle to the next
    const parent = currentFocused.closest(cardQuery);
    if (!parent) {
      log(`Could not find ${cardQuery} parent...`);
      return;
    }

    const actions = parent.querySelectorAll<HTMLElement>(actionSel);
    const buttons = findFocusableElements(actions[0]);
    const myIndex = Array.from(buttons).findIndex((a) => a === currentFocused);

    const next = nextFn(buttons, myIndex);

    next.focus();
  }
}

function moveToNextCardVertical(
  section: HTMLElement,
  currentFocused: HTMLElement,
  cardQuery: string,
  nextFn: (
    array: HTMLElement[],
    currentIndex: number,
    numPerRow: number
  ) => HTMLElement
) {
  // TODO:  move within grid
  // https://stackoverflow.com/a/49090306
  const gridItems = Array.from(
    section.querySelectorAll<HTMLElement>(cardQuery)
  );
  const baseOffset = gridItems[0].offsetTop;
  const breakIndex = gridItems.findIndex((item) => item.offsetTop > baseOffset);
  const numPerRow = breakIndex === -1 ? gridItems.length : breakIndex;
  const myIndex = gridItems.findIndex((a) => a === currentFocused);

  moveToNextCard(
    section,
    currentFocused,
    nextFn.bind(null, gridItems, myIndex, numPerRow),
    cardQuery
  );
}
function setupKeyDownListeners(section: HTMLElement, cardQuery: string) {
  const fn = (e: Event) => {
    const currentFocused = document.activeElement as HTMLElement;

    if (!currentFocused) {
      return;
    }

    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = (e as KeyboardEvent).key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();
      moveToNextCard(section, currentFocused, CL.prev, cardQuery);
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();
      moveToNextCard(section, currentFocused, CL.next, cardQuery);
    } else if (keyPressed === "Enter") {
      handleEnter(cardQuery);
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();

      const currentFocused = document.activeElement as HTMLElement;
      if (currentFocused && isActionButton(currentFocused)) {
        moveToNextActionButton(CL.prev, cardQuery);
      } else {
        moveToNextCardVertical(
          section,
          currentFocused,
          cardQuery,
          (array, index, numPerRow) => {
            const dest = index - numPerRow + 1;
            return CL.prev(array, dest);
          }
        );
      }
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();

      const currentFocused = document.activeElement as HTMLElement;
      if (currentFocused && isActionButton(currentFocused)) {
        moveToNextActionButton(CL.next, cardQuery);
      } else {
        moveToNextCardVertical(
          section,
          currentFocused,
          cardQuery,

          (array, index, numPerRow) => {
            log("per row", numPerRow);
            const dest = index + numPerRow + 1;
            log("current index", index, "should go to", dest);
            return CL.prev(array, dest);
          }
        );
      }
    }
  };

  section.addEventListener("keydown", fn);
  return () => {
    section.removeEventListener("keydown", fn);
  };
}

export function setupGrid(section: HTMLElement, cardQuery: string): Teardown {
  makeFirstCardFocusable(section, cardQuery);
  makeButtonsTappable(section);
  setupFocusIn(section);
  setupCardFocusOut(section, cardQuery);

  return setupKeyDownListeners(section, cardQuery);
}
