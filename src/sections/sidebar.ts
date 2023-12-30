import * as CL from "../circularList";
import { addCSS } from "../dom";

export function initSidebar(): boolean {
  const me = document.querySelector(".mainToolbar");
  if (!me) {
    // TODO: error?
    return false;
  }
  console.log("initializing sidebar...");

  // Query open lobbies and the search button
  // Then select the first item
  const sidebarItems = document.querySelectorAll<HTMLElement>(
    `.mainToolbar .channelsList .channelItemWrapper,
    .mainToolbar .buttonItemWrapper`
  );
  const first = sidebarItems[0];

  // Technically there should be always an item
  if (!first) {
    return false;
  }

  sidebarItems.forEach((el) => el.setAttribute("tabIndex", "-1"));
  first.setAttribute("tabIndex", "0");

  // Make leave lobby/mute channel items always visible
  addCSS(`
  .channelItemWrapper div:not(.channelItem) {
    opacity: 1 !important;
  }
   `);

  me.addEventListener("keydown", (e) => {
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
    } else if (keyPressed === "ArrowLeft") {
      e.preventDefault();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();

      // Find next element, focus that
      const myIndex = Array.from(sidebarItems).findIndex(
        (a) => a === currentFocused
      );
      const nextItem = CL.prev(sidebarItems, myIndex);

      // Roving tabindex
      currentFocused.setAttribute("tabIndex", "-1");
      nextItem.setAttribute("tabIndex", "0");
      nextItem.focus();
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      const myIndex = Array.from(sidebarItems).findIndex(
        (a) => a === currentFocused
      );

      const nextItem = CL.next(sidebarItems, myIndex);

      // Roving tabindex
      currentFocused.setAttribute("tabIndex", "-1");
      nextItem.setAttribute("tabIndex", "0");
      nextItem.focus();
    }
  });

  return true;
}

export function updateSidebar() {
  // Look for new items
  // Make so that the focusing the lobby button also triggers the hover event
  // So that the user can navigate the leave lobby button
  //  const lobbyItems = document.querySelectorAll(
  //    `.mainToolbar .channelsList .channelItemWrapper`
  //  );
  // We can't trigger hover events
  // https://www.w3.org/TR/DOM-Level-3-Events/#trusted-events
  //  lobbyItems.forEach((el) => {
  //    el.addEventListener("focus", () => {
  //      const mouseoverEvent = new Event("mouseover");
  //      console.log("trigerring mouseover");
  //      el.dispatchEvent(mouseoverEvent);
  //    });
  //  });
}
