var observer = new MutationObserver(function (mutations) {
  initialized.sidebar ? updateSidebar() : initSidebar();
  initAbout();
});

// document.activeElement
// el.contains(document.activeElement);

const initialized = {
  sidebar: false,
  about: false,
};

function initSidebar() {
  const me = document.querySelector(".mainToolbar");
  if (!me) {
    // TODO: error?
    return;
  }

  // Query open lobbies and the search button
  // Then select the first item
  const sidebarItems = document.querySelectorAll(
    `.mainToolbar .channelsList .channelItemWrapper,
    .mainToolbar .buttonItemWrapper`
  );
  const first = sidebarItems[0];

  // Technically there should be always an item
  if (!first) {
    return;
  }

  first.setAttribute("tabIndex", 0);

  // Make leave lobby/mute channel items always visible
  addCSS(`
  .channelItemWrapper div:not(.channelItem) {
    opacity: 1 !important;
  }
   `);

  me.addEventListener("keydown", (e) => {
    const currentFocused = document.activeElement;

    console.log("pressed", e.key);
    if (e.key === "ArrowRight") {
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
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
    } else if (e.key === "ArrowDown") {
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
function nextCircular(array, index) {
  return circularList(array, index + 1);
}

/*
 * Finds the previous item in a circular list
 */
function prevCircular(array, index) {
  return circularList(array, index - 1);
}

function circularList(array, index) {
  let i = index;

  // Support negative values
  if (i < 0) {
    i = i + array.length;
  }

  i = i % array.length;
  console.log("trying to access i");
  return array[i];
}

function initAbout() {
  // We don't want to focus on any of the items
  const tabbableElements = document
    .querySelector(".aboutWrapper")
    .querySelectorAll(
      "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
    );

  tabbableElements.forEach((el) => el.setAttribute("tabIndex", "-1"));
}

function updateSidebar() {
  // Look for new items

  // Make so that the focusing the lobby button also triggers the hover event
  // So that the user can navigate the leave lobby button
  const lobbyItems = document.querySelectorAll(
    `.mainToolbar .channelsList .channelItemWrapper`
  );

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

const addCSS = (css) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

console.log("observing");
observer.observe(document, {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
});
