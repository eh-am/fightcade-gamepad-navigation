import { addCSS, findFocusableElements, isHidden } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";

export function initSearch(): boolean {
  if (isHidden(document.querySelector(".welcomeWrapper"))) {
    return false;
  }

  log("Initializing search...");

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
  //
  // channelActions

  log("setting up categories...");
  // For each category
  categories.forEach((el) => {
    const items = el.querySelectorAll<HTMLElement>(".gridWrapper");

    // TODO: inline this
    const setActionsOpacity = (ancestor: HTMLElement, opacity: string) => {
      ancestor.querySelectorAll<HTMLElement>(actionSel).forEach((el2) => {
        el2.style.opacity = opacity;
      });
    };

    // In practice there's only a single div, but we use querySelectorAll
    // to graciously fail
    // Plus, it supports both games and events
    const actionSel = ".channelActions, .eventActions, .categoryActions";

    // Actions are implemented as <A>
    // Which require a 'href' parameter to be focusable
    el.querySelectorAll<HTMLElement>(actionSel).forEach((actions) => {
      const buttons = Array.from(actions.querySelectorAll<HTMLElement>("a"));

      buttons.forEach((a) => {
        // Since we will control the navigation manually
        a.setAttribute("tabindex", "-1");
        return a;
      });

      buttons
        .filter((a) => a.tagName === "A" && !a.hasAttribute("href"))
        .forEach((a) => {
          a.setAttribute("href", "#");
        });
    });

    // When it's focused, make the actions visible
    // We used 'focusin' since this event bubbles
    el.addEventListener("focusin", (e) => {
      // If one of my children is being focused, leave my focus on
      // And turn of the focus of the others
      const others = Array.from(
        el.querySelectorAll<HTMLElement>(actionSel)
      ).filter((a) => !el.contains(a));

      others.forEach((el2) => {
        el2.style.opacity = "0";
      });

      // Make my actions visible!
      if (e.target instanceof HTMLElement) {
        setActionsOpacity(e.target, "1");
      }
    });

    // It's focusing on another thing, let's remove the opacity
    el.addEventListener("focusout", (e) => {
      const currentFocused = e.target;
      const focusingTo = e.relatedTarget;

      log("focusingTo", focusingTo);
      log("currentFocused", currentFocused);
      log(
        "contain",
        (currentFocused as HTMLElement).contains(focusingTo as HTMLElement)
      );

      // This doesn't make full sense, but still
      if (!currentFocused) {
        setActionsOpacity(el, "0");
        return;
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget
      if (!focusingTo) {
        setActionsOpacity(el, "0");
        return;
      }

      // It's focused on the parent
      if ((currentFocused as HTMLElement).contains(focusingTo as HTMLElement)) {
        return;
      }

      // It's going to focus on a sibling button
      if (
        (currentFocused as HTMLElement)
          ?.closest(".gridWrapper")
          ?.contains(focusingTo as HTMLElement)
      ) {
        return;
      }

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
      //
      else if (keyPressed === "Enter") {
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
        const actions = currentFocused.querySelectorAll<HTMLElement>(actionSel);
        if (actions && actions.length > 0) {
          // TODO: this is very brittle, maybe we should have more focused
          const buttons = findFocusableElements(actions[0]);

          if (buttons && buttons.length > 0) {
            const firstButton = buttons[0];
            firstButton.focus();
            firstButton.dispatchEvent(new MouseEvent("mouseover"));
          }

          return;
        }

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

          if (keyPressed === "ArrowUp") {
            CL.prev(buttons, myIndex).focus();
          } else {
            CL.next(buttons, myIndex).focus();
          }
        }
      }
    });
  });

  return true;
}
