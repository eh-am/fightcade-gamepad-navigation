import { addCSS, findFocusableElements, isHidden } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";

function moveToNextActionButton(nextFn: typeof CL.prev) {
  const currentFocused = document.activeElement as HTMLElement;
  if (!currentFocused) {
    return;
  }

  // If it's already focused on one of the actions
  if (isActionButton(currentFocused)) {
    // Cycle to the next
    const parent = currentFocused.closest(".gridWrapper");
    if (!parent) {
      log("Could not find .gridWrapper parent...");
      return;
    }

    const actions = parent.querySelectorAll<HTMLElement>(actionSel);
    const buttons = findFocusableElements(actions[0]);
    const myIndex = Array.from(buttons).findIndex((a) => a === currentFocused);

    const next = nextFn(buttons, myIndex);

    next.focus();
  }
}

// TODO: scope all this?
function setupCSS() {
  addCSS(`
  /* with this grid implementation, focusing doesn't scrollIntoView for some reason */
  /*
  .welcomeListGrid, .welcomeListGridBig {
    overflow: auto !important;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
  }
  */
  .welcomeListGrid, .welcomeListGridBig {
    display: flex !important;
    overflow: auto !important; /* show scrollbar if necessary */
  }
  .welcomeListGrid .gridWrapper, .welcomeListGridBig .gridWrapper {
    flex: 1 0 200px;
  }

  /* copy styles from hover 
   * although it could be easily done via javascript
     https://stackoverflow.com/a/66819918
  */
.button-generic:hover {
 transform: scale(1.05);
    color: var(--mainColor-dark);
    cursor: pointer;
}
   `);
}

const actionSel = ".channelActions, .eventActions, .categoryActions";

/**
 * Upon focusing out a card
 */
function setupCardFocusOut(section: HTMLElement) {
  // When focusing out of a card,
  section.querySelectorAll<HTMLElement>(".gridWrapper").forEach((card) => {
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
}

/**
 * When it's focused, make the actions visible
 * We used 'focusin' since this event bubbles
 */
function setupFocusIn(section: HTMLElement) {
  section.addEventListener("focusin", (e) => {
    const focusingTo = e.target as HTMLElement | null;

    // If focusing on button, let's make the whole action group visible
    if (isActionButton(focusingTo)) {
      const parent = focusingTo?.closest(actionSel) as HTMLElement | null;
      if (parent) {
        parent.style.opacity = "1";
      }
      return;
    }
  });
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

// TODO: naive implementation, maybe check for ancestry/className
function isActionButton(el: HTMLElement | null) {
  return el?.tagName === "A";
}

function moveToNextCard(
  section: HTMLElement,
  currentFocused: HTMLElement,
  nextFn: typeof CL.next
) {
  // Find current card focused, since we could be either focusing on the card already, or on its action buttons
  const currentCardFocused = currentFocused.closest(".gridWrapper");
  if (!currentCardFocused) {
    return;
  }

  // Find all cards under the same section
  const cards = section.querySelectorAll<HTMLElement>(".gridWrapper");
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
    block: "nearest",
    inline: "nearest",
  });
  nextItem.focus();
}

// TODO: if there's a single action, hitting enter should click on it
function handleEnter() {
  const currentFocused = document.activeElement as HTMLElement;
  if (!currentFocused) {
    return;
  }

  const currentCardFocused = currentFocused.closest(".gridWrapper");
  if (!currentCardFocused) {
    return;
  }

  log("setting aria expanded of", currentCardFocused);
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

// Get the first of each category and make that focusable
// .welcomeListGridBig refers to the "Hidden Gems" section
function makeFirstCardFocusable() {
  const firstItems = document.querySelectorAll(
    `.welcomeListGrid .gridWrapper:first-of-type,
    .welcomeListGridBig .gridWrapper:first-of-type`
  );
  firstItems.forEach((firstAction) => {
    firstAction.setAttribute("tabIndex", "0");
  });
}

function setupKeyDownListeners(section: HTMLElement) {
  // Register handler
  section.addEventListener("keydown", (e) => {
    const currentFocused = document.activeElement as HTMLElement;

    if (!currentFocused) {
      return;
    }

    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = (e as KeyboardEvent).key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();
      moveToNextCard(section, currentFocused, CL.prev);
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();
      moveToNextCard(section, currentFocused, CL.next);
    } else if (keyPressed === "Enter") {
      handleEnter();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      moveToNextActionButton(CL.prev);
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      moveToNextActionButton(CL.next);
    }
  });
}

export function initSearch(): boolean {
  if (isHidden(document.querySelector(".welcomeWrapper"))) {
    return false;
  }

  log("Initializing search...");

  // Find all categories
  const categories = document.querySelectorAll<HTMLElement>(
    ".welcomeWrapper .contentWrapper .welcomeListWrapper"
  );

  if (categories.length <= 0) {
    console.warn("Search: No items found. Returning early");
    return false;
  }

  setupCSS();
  makeFirstCardFocusable();

  log("setting up categories...");

  // For each category
  categories.forEach((category) => {
    makeButtonsTappable(category);
    setupFocusIn(category);
    setupCardFocusOut(category);
    setupKeyDownListeners(category);
  });

  return true;
}
