import { addCSS, findFocusableElements, isHidden } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";
import { ListOfHTML } from "../types";

/**
 * We can treat each card as a "submenu", ie.
 * It has focus, and upon <Enter>,
 * it expands its submenus (aka its Action Buttons)
 */
function handleGrid(section: HTMLElement) {
  //  section.addEventListener("focusin", (e) => {
  //    const focusingTo = e.target as HTMLElement | null;
  //  });
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
  log("currentCardFocused", currentCardFocused);

  // Find all cards under the same section
  const cards = section.querySelectorAll<HTMLElement>(".gridWrapper");
  const myIndex = Array.from(cards).findIndex((a) => a === currentCardFocused);
  const nextItem = nextFn(cards, myIndex);
  log("currentFocused", currentFocused);
  log("cards", cards);
  log("focusing on nextItem", nextItem);

  // Roving tabindex
  currentCardFocused.setAttribute("tabIndex", "-1");
  nextItem.setAttribute("tabIndex", "0");
  nextItem.focus();
}

// TODO: if there's a single action, hitting enter should click on it
function handleEnter() {
  log("Handling enter");
  const currentFocused = document.activeElement as HTMLElement;
  if (!currentFocused) {
    return;
  }

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

  // We are likely focused on the action button
  // So let's click it
  currentFocused.click();
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

export function initSearch(): boolean {
  const rootElement = document.querySelector(".welcomeWrapper");
  if (isHidden(document.querySelector(".welcomeWrapper"))) {
    return false;
  }

  log("Initializing search...");

  const actionSel = ".channelActions, .eventActions, .categoryActions";
  const actionsButtonQuery = `.welcomeListGrid .channelActions a,
     .welcomeListGrid .eventActions a,
     .welcomeListGrid .categoryActions a,
     .welcomeListGridBig .channelActions a,
     .welcomeListGridBig .eventActions a,
     .welcomeListGridBig .categoryActions a
    `;

  // By default <a> tags are tabbable, so let's disable it
  // since we will handle that manually
  const actionsButtons = document.querySelectorAll<HTMLElement>(
    `.welcomeListGrid .channelActions a,
     .welcomeListGrid .eventActions a,
     .welcomeListGrid .categoryActions a,
     .welcomeListGridBig .channelActions a,
     .welcomeListGridBig .eventActions a,
     .welcomeListGridBig .categoryActions a
    `
  );
  actionsButtons.forEach((a) => {
    a.setAttribute("tabIndex", "-1");
  });

  makeFirstCardFocusable();

  // Get the first of each category and make that focusable
  // .welcomeListGridBig refers to the "Hidden Gems" section
  //  const firstItems = document.querySelectorAll(
  //    `.welcomeListGrid .gridWrapper:first-of-type,
  //    .welcomeListGridBig .gridWrapper:first-of-type`
  //  );
  //  firstItems.forEach((firstAction) => {
  //    firstAction.setAttribute("tabIndex", "0");
  //    // Find their actions
  //    // TODO: this is naive since it assumes it's an <a> tag
  //    //    const actions = el.querySelectorAll<HTMLElement>(
  //    //      ".channelActions a, .eventActions a, .categoryActions a"
  //    //    );
  //    //
  //    //    // TODO: prefer to focus on 'join' first
  //    //    // let the first item to be focusable
  //    //    const firstAction = actions[0];
  //    //    if (firstAction) {
  //    //      log("setting tabindex", firstAction);
  //    //      firstAction.setAttribute("tabIndex", "0");
  //    //    }
  //  });
  //
  // Find all categories
  const categories = document.querySelectorAll<HTMLElement>(
    ".welcomeWrapper .contentWrapper .welcomeListWrapper"
  );

  if (categories.length <= 0) {
    console.warn("Search: No items found. Returning early");
    return false;
  }

  // TODO: this triggers the mutation observer again
  // Make items scrollable
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
.channelActions {
}
   `);
  //
  // channelActions

  log("setting up categories...");
  // For each category
  categories.forEach((category) => {
    const items = category.querySelectorAll<HTMLElement>(".gridWrapper");

    // TODO: inline this
    const setActionsOpacity = (ancestor: HTMLElement, opacity: string) => {
      ancestor.querySelectorAll<HTMLElement>(actionSel).forEach((el2) => {
        el2.style.opacity = opacity;
      });
    };

    // In practice there's only a single div, but we use querySelectorAll
    // to graciously fail
    // Plus, it supports both games and events

    // Actions are implemented as <A>
    // Which require a 'href' parameter to be focusable
    category.querySelectorAll<HTMLElement>(actionSel).forEach((actions) => {
      const buttons = Array.from(actions.querySelectorAll<HTMLElement>("a"));

      //      buttons.forEach((a) => {
      //        // Since we will control the navigation manually
      //        a.setAttribute("tabindex", "-1");
      //        return a;
      //      });

      buttons
        .filter((a) => a.tagName === "A" && !a.hasAttribute("href"))
        .forEach((a) => {
          a.setAttribute("href", "#");
        });
    });

    // When it's focused, make the actions visible
    // We used 'focusin' since this event bubbles
    category.addEventListener("focusin", (e) => {
      const focusingTo = e.target as HTMLElement | null;

      // If one of my children is being focused, leave my focus on
      // And turn off the focus of the others
      //      const others = Array.from(
      //        el.querySelectorAll<HTMLElement>(actionSel)
      //      ).filter((a) => !el.contains(a));
      //
      //      others.forEach((el2) => {
      //        el2.style.opacity = "0";
      //      });
      //
      // Make my actions visible!
      //      if (e.target instanceof HTMLElement) {
      //        setActionsOpacity(e.target, "1");
      //      }

      if (focusingTo?.tagName === "A") {
        const parent = focusingTo?.closest(actionSel) as HTMLElement | null;
        if (parent) {
          parent.style.opacity = "1";
        }
        return;
      }
    });

    // It's focusing on another thing, let's remove the opacity
    category.addEventListener("focusout", (e) => {
      const currentFocused = e.target as HTMLElement | null;
      const focusingTo = e.relatedTarget;

      if (!currentFocused) {
        return;
      }

      //      if (currentFocused.getAttribute("tabIndex") === "0") {
      //        log("setting", currentFocused, "to tabindex -1 since focus is outside");
      //        currentFocused.setAttribute("tabIndex", "-1");
      //      }

      //      log("focusingTo", focusingTo);
      //      log("currentFocused", currentFocused);
      //      log(
      //        "contain",
      //        (currentFocused as HTMLElement).contains(focusingTo as HTMLElement)
      //      );
      //
      // This doesn't make full sense, but still
      //      if (!currentFocused) {
      //        setActionsOpacity(el, "0");
      //        return;
      //      }
      //
      //      // https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
      //      if (!focusingTo) {
      //        setActionsOpacity(el, "0");
      //        return;
      //      }

      //      // It's focused on the parent
      //      if ((currentFocused as HTMLElement).contains(focusingTo as HTMLElement)) {
      //        setActionsOpacity(el, "1");
      //        return;
      //      }
      //
      //      if (focusingTo.tagName === "A") {
      //        const parent = focusingTo.closest(".channelActions");
      //        log("parent", parent);
      //        setActionsOpacity(parent, "1");
      //        return;
      //      }

      // It's going to focus on a sibling button
      //      if (
      //        (currentFocused as HTMLElement)
      //          ?.closest(".gridWrapper")
      //          ?.contains(focusingTo as HTMLElement)
      //      ) {
      //        setActionsOpacity(el, "1");
      //        return;
      //      }

      setActionsOpacity(category, "0");
    });

    // Register handler
    category.addEventListener("keydown", (e) => {
      const currentFocused = document.activeElement as HTMLElement;

      if (!currentFocused) {
        return;
      }

      // TODO: figure out why setting KeyboardEvent in the event doesn't type check
      const keyPressed = (e as KeyboardEvent).key;

      if (keyPressed === "ArrowLeft") {
        e.preventDefault();
        moveToNextCard(category, currentFocused, CL.prev);
      } else if (keyPressed === "ArrowRight") {
        e.preventDefault();
        moveToNextCard(category, currentFocused, CL.next);
      } else if (keyPressed === "Enter") {
        handleEnter();
        // We don't even need to do anything here
        // TODO:
        //alert("Should Join");
      }
      // Handle Up and Down, it should focus on the Fav/Join buttons
      // TODO: if there's only a single child, then we don't need to do anything
      else if (keyPressed === "ArrowDown" || keyPressed == "ArrowUp") {
        e.preventDefault();

        const currentFocused = document.activeElement as HTMLElement;
        if (!currentFocused) {
          return;
        }

        // If it's focused on the .gridWrapper, ie. the game card
        // Let's focus the first item
        //        const actions = currentFocused.querySelectorAll<HTMLElement>(actionSel);
        //        if (actions && actions.length > 0) {
        //          // TODO: this is very brittle, maybe we should have more focused
        //          const buttons = findFocusableElements(actions[0]);
        //
        //          if (buttons && buttons.length > 0) {
        //            const firstButton = buttons[0];
        //            firstButton.focus();
        //            firstButton.dispatchEvent(new MouseEvent("mouseover"));
        //          }
        //
        //          return;
        //        }
        //
        // If it's already focused on one of the actions
        if (currentFocused.tagName === "A") {
          // Cycle to the next
          const parent = currentFocused.closest(".gridWrapper");
          if (!parent) {
            log("Could not find .gridWrapper parent...");
            return;
          }

          const actions = parent.querySelectorAll<HTMLElement>(actionSel);
          const buttons = findFocusableElements(actions[0]);
          const myIndex = Array.from(buttons).findIndex(
            (a) => a === currentFocused
          );

          const next =
            keyPressed === "ArrowUp"
              ? CL.prev(buttons, myIndex)
              : CL.next(buttons, myIndex);
          //          currentFocused.setAttribute("tabIndex", "-1");
          //          next.setAttribute("tabIndex", "0");

          next.focus();
        }
      }
    });
  });

  return true;
}
