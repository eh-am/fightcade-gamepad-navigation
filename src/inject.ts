const ARCADE_STICK_MAPPINGS = {
  DPAD_UP: 12,
  DPAD_DOWN: 13,
  DPAD_LEFT: 14,
  DPAD_RIGHT: 15,
  BUTTON_A: 0,
  BUTTON_B: 1,
};

function initSidebar() {
  const me = document.querySelector(".mainToolbar");
  if (!me) {
    // TODO: error?
    return;
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
    return;
  }

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
      const nextItem = prevCircular(sidebarItems, myIndex);

      // Roving tabindex
      currentFocused.setAttribute("tabIndex", "-1");
      nextItem.setAttribute("tabIndex", "0");
      nextItem.focus();
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      const myIndex = Array.from(sidebarItems).findIndex(
        (a) => a === currentFocused
      );

      const nextItem = nextCircular(sidebarItems, myIndex);

      // Roving tabindex
      currentFocused.setAttribute("tabIndex", "-1");
      nextItem.setAttribute("tabIndex", "0");
      nextItem.focus();
    }
  });

  //updateSidebar();
  initialized.sidebar = true;
}

/*
 * Finds the next item in a circular list
 */
//function nextCircular<T extends Node>(array: NodeListOf<T>, index: number) {
function nextCircular(array: ListOfHTML, index: number) {
  return circularList(array, index + 1);
}

/*
 * Finds the previous item in a circular list
 */
//function prevCircular<T extends Node>(array: NodeListOf<T>, index: number) {
function prevCircular(array: ListOfHTML, index: number) {
  return circularList(array, index - 1);
}

//function circularList<T extends Node>(array: NodeListOf<T>, index: number) {
function circularList(array: ListOfHTML, index: number) {
  let i = index;

  // Support negative values
  if (i < 0) {
    i = i + array.length;
  }

  i = i % array.length;
  return array[i];
}

function initAbout() {
  if (isHidden(document.querySelector(".aboutWrapper"))) {
    return;
  }

  console.log("initializing about...");

  // We don't want to focus on any of the items
  const tabbableElements =
    document
      .querySelector(".aboutWrapper")
      ?.querySelectorAll(
        "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
      ) || [];

  tabbableElements.forEach((el) => el.setAttribute("tabIndex", "-1"));
  initialized.about = true;
}

function updateSidebar() {
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

const addCSS = (css: string) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

function notify(msg: string) {
  if (window.Notification) {
    new window.Notification(msg, {
      silent: true,
    });
  }
}

// A simple way to test against display: none
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
// It takes null to make it easier to pass queries
function isHidden(el: HTMLElement | null) {
  if (!el) {
    return true;
  }

  return el.offsetParent === null;
}

function initSearch() {
  if (isHidden(document.querySelector(".welcomeWrapper"))) {
    return;
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
    return;
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

        const nextItem = nextCircular(items, myIndex);

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

        const nextItem = prevCircular(items, myIndex);
        // Roving tabindex
        currentFocused.setAttribute("tabIndex", "-1");
        nextItem.setAttribute("tabIndex", "0");
        nextItem.focus();
      }
    });
  });

  // For each category create its own listener
  // TODO: it doesn't handle
  initialized.search = true;
}

// alert("starting");
// https://stackoverflow.com/a/61725416
function isElectron() {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    "type" in window.process &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
}

if (isElectron()) {
  notify("Starting Arcade Stick Support...");
  alert("hold");
}
var observer = new MutationObserver(function () {
  console.log("mutation observer", initialized);

  initialized.sidebar ? updateSidebar() : initSidebar();
  !initialized.about && initAbout();
  !initialized.search && initSearch();

  console.log("end mutation observer", initialized);
});

const initialized = {
  sidebar: false,
  about: false,
  search: false,
};

observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});

window.addEventListener("gamepadconnected", () => {
  setInterval(function () {
    gameLoop();
  }, 100);
});

function gameLoop() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  // TODO: technically any index could work
  const gp = gamepads[0];
  if (!gp) {
    return;
  }

  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_A].pressed) {
    handleTab(prevCircular);
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_B].pressed) {
    handleTab(nextCircular);
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_UP].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_DOWN].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_RIGHT].pressed) {
    console.log("pressed right", getCurrentFocusedElement());
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_LEFT].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
    );
  }
}

// TODO: sometimes it returns the body
function getCurrentFocusedElement() {
  return document.activeElement;
}

type ListOfHTML = NodeListOf<HTMLElement> | HTMLElement[];

/*
 * Reimplement tabbing
 * Notice that it follows only the DOM order
 * Ie no positive tabIndex handling/disabled items
 * Source: https://stackoverflow.com/a/7329696
 */
function handleTab(nextItemFn: (a: ListOfHTML, i: number) => HTMLElement) {
  // Find all tablable elements
  const tabbableElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
    )
  ).filter((a) => a.getAttribute("tabindex") !== "-1");

  const currentFocused = document.activeElement;
  const currentFocusedIndex = Array.from(tabbableElements).findIndex(
    (a) => a === currentFocused
  );

  let focusOn: HTMLElement;
  if (currentFocused) {
    focusOn = nextItemFn(tabbableElements, currentFocusedIndex);
  } else {
    focusOn = tabbableElements[0];
  }

  focusOn.focus();
}

document.body.addEventListener("keydown", (e) => {
  console.log("pressed", e.key);
});
