import { addCSS, isHidden } from "../dom";
import * as CL from "../circularList";

export function initSearch(): boolean {
  if (isHidden(document.querySelector(".welcomeWrapper"))) {
    return false;
  }

  console.log("initializing search...");

  // Get the first of each category and make that focusable
  // .welcomeListGridBig refers to the "Hidden Gems" section
  const firstItems = document.querySelectorAll(
    `.welcomeListGrid .gridWrapper:first-of-type,
    .welcomeListGridBig .gridWrapper:first-of-type`
  );
  firstItems.forEach((el) => el.setAttribute("tabIndex", "0"));

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
   `);
  //
  // channelActions

  // For each category
  categories.forEach((el) => {
    const items = el.querySelectorAll<HTMLElement>(".gridWrapper");

    // In practice there's only a single div, but we use querySelectorAll
    // to graciously fail
    // Plus, it supports both games and events
    const actionSel = ".channelActions, .eventActions, .categoryActions";
    const setActionsOpacity = (ancestor: HTMLElement, opacity: string) => {
      ancestor.querySelectorAll<HTMLElement>(actionSel).forEach((el2) => {
        el2.style.opacity = opacity;
      });
    };

    // When it's focused, set up opacity the actions opacity
    // We used 'focusin' since this event bubbles
    el.addEventListener("focusin", (e) => {
      setActionsOpacity(el, "0");

      if (e.target instanceof HTMLElement) {
        setActionsOpacity(e.target, "1");
      }
    });

    // It's focusing on another thing, let's remove the opacity
    el.addEventListener("focusout", () => {
      setActionsOpacity(el, "0");
    });

    // Register handler
    el.addEventListener("keydown", (e) => {
      const currentFocused = document.activeElement as HTMLElement;

      if (!currentFocused) {
        return;
      }

      // TODO: figure out why setting KeyboardEvent in the event doesn't type check
      const keyPressed = (e as KeyboardEvent).key;

      // Simulate a click event
      if (keyPressed === "Enter") {
        currentFocused.click();
      }
      if (keyPressed === "ArrowRight") {
        e.preventDefault();
        const myIndex = Array.from(items).findIndex(
          (a) => a === currentFocused
        );

        const nextItem = CL.next(items, myIndex);

        // Roving tabindex
        currentFocused.setAttribute("tabIndex", "-1");
        nextItem.setAttribute("tabIndex", "0");
        nextItem.focus();
      } else if (keyPressed === "ArrowLeft") {
        e.preventDefault();

        // Find next element, focus that
        const myIndex = Array.from(items).findIndex(
          (a) => a === currentFocused
        );

        const nextItem = CL.prev(items, myIndex);
        // Roving tabindex
        currentFocused.setAttribute("tabIndex", "-1");
        nextItem.setAttribute("tabIndex", "0");
        nextItem.focus();
      }
    });
  });

  return true;
}
