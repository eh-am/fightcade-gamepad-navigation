import * as CL from "../circularList";
import { addCSS } from "../dom";
import isVisible from "ally.js/src/is/visible";
import * as list from "@app/ds/list";

// TODO: take a root node
export function initSidebar(): boolean {
  const me = document.querySelector(".mainToolbar");
  if (!me) {
    // TODO: error?
    return false;
  }
  console.log("initializing sidebar...");

  //  // Technically there should be always an item
  //  if (!first) {
  //    return false;
  //  }

  // Make leave lobby/mute channel items always visible
  addCSS(`
  /* Copied from the hover status */
.channelItemWrapper .channelItem:focus .channelItemName {
    color: #fff;
    }

    
    /* Make them all available so that users know these exist */
    .channelItemWrapper div:not(.channelItem) {
      opacity: 1 !important;
    }


.mainToolbarWrapper .mainToolbar .buttonBar .userButton .userStateMenu {
/*  transition: none !important;  */
}

/*
.userButton .userStateMenu {
position: relative !important;

}
*/
.optionWrapper {

    transition: none !important;
}

.userButton:focus {
  outline: none !important;
}

/* By default the browser will focus on the entire tree, which is bigger than the button 
 * To deal with that, we cancel out the outline and reenable */
.userButton:focus {
  outline: none !important;
}
.userButton:focus .userAvatarWrapper {
  outline: 1px dotted #212121;
  outline: 5px auto -webkit-focus-ring-color;
}
`);

  setupUserButton();

  return true;
}

function swap(node1: Element, node2: Element) {
  const afterNode2 = node2.nextElementSibling;
  const parent = node2.parentNode;
  if (!parent) {
    throw new Error("Could not swap");
  }

  if (node1 === afterNode2) {
    parent.insertBefore(node1, node2);
  } else {
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
  }
}

function setupLobbyButtons(channelItemWrapper: HTMLElement): Teardown {
  const muteChannelButton =
    channelItemWrapper.querySelector<HTMLElement>(".muteChannelItem");
  const leaveChannelButton =
    channelItemWrapper.querySelector<HTMLElement>(".leaveChannelItem");
  const joinLobbyButton =
    channelItemWrapper.querySelector<HTMLElement>(".channelItem");

  //  const joinLobbyButton =
  //    channelItemWrapper.querySelector<HTMLElement>(".channelItem");

  if (!muteChannelButton || !leaveChannelButton || !joinLobbyButton) {
    return () => {};
  }

  channelItemWrapper.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.setAttribute("tabindex", "-1");
  });

  // Trick to figure out they are in order already,
  //
  const areInRightOrder =
    channelItemWrapper.querySelectorAll(
      ".channelItem ~ .leaveChannelItem ~ .muteChannelItem"
    ).length > 0;

  if (!areInRightOrder) {
    swap(joinLobbyButton, muteChannelButton);
  }

  // Setup listeners
  const onMuteChannelButtonKeydown = function (e: KeyboardEvent) {
    const keyPressed = e.key;
    if (keyPressed === "Enter") {
      e.preventDefault();
      muteChannelButton.click();
    } else if (keyPressed === "ArrowUp") {
      leaveChannelButton.focus();
    } else if (keyPressed === "ArrowDown") {
      // Go outside
      const items = getHighLevelVerticalItems();
      const myIndex = Array.from(items).findIndex((a) => a === joinLobbyButton);
      CL.next(items, myIndex).focus();
    } else if (keyPressed === "ArrowLeft") {
      joinLobbyButton.focus();
    }
  };

  const onLeaveChannelButtonKeydown = function (e: KeyboardEvent) {
    const keyPressed = e.key;
    if (keyPressed === "Enter") {
      e.preventDefault();
      leaveChannelButton.click();
    } else if (keyPressed === "ArrowUp") {
      // Out of bounds
      e.preventDefault();
      //      const items = getHighLevelVerticalItems();
      //      const myIndex = Array.from(items).findIndex((a) => a === joinLobbyButton);
      //      CL.prev(items, myIndex).focus();
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      muteChannelButton.focus();
    } else if (keyPressed === "ArrowLeft") {
      e.preventDefault();
      joinLobbyButton.focus();
    }
  };

  const onJoinLobbyButtonKeydown = function (e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "Enter") {
      e.preventDefault();
      joinLobbyButton.click();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      const items = getHighLevelVerticalItems();
      const myIndex = Array.from(items).findIndex((a) => a === joinLobbyButton);
      CL.prev(items, myIndex).focus();
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      const items = getHighLevelVerticalItems();
      const myIndex = Array.from(items).findIndex((a) => a === joinLobbyButton);
      const next = CL.next(items, myIndex);
      next.focus();
    } else if (keyPressed === "ArrowRight") {
      leaveChannelButton.focus();
    }
  };

  muteChannelButton.addEventListener("keydown", onMuteChannelButtonKeydown);
  leaveChannelButton.addEventListener("keydown", onLeaveChannelButtonKeydown);
  joinLobbyButton.addEventListener("keydown", onJoinLobbyButtonKeydown);

  return () => {
    muteChannelButton.removeEventListener(
      "keydown",
      onMuteChannelButtonKeydown
    );
    leaveChannelButton.removeEventListener(
      "keydown",
      onLeaveChannelButtonKeydown
    );
    joinLobbyButton.removeEventListener("keydown", onJoinLobbyButtonKeydown);
  };
}

function getHighLevelVerticalItems() {
  return document.querySelectorAll<HTMLElement>(
    `.mainToolbar .channelsList .channelItemWrapper .channelItem,
    .mainToolbar .buttonItemWrapper,
    .buttonBar > *`
  );
}

function moveVertically(el: HTMLElement, keyPressed: string) {
  const nextFn = keyPressed === "ArrowUp" ? CL.prev : CL.next;

  const items = getHighLevelVerticalItems();
  const myIndex = Array.from(items).findIndex((a) => a === el);
  const nextItem = nextFn(items, myIndex);

  console.log({ items, myIndex, nextItem, el });

  el.setAttribute("tabIndex", "-1");
  nextItem.setAttribute("tabIndex", "0");
  nextItem.focus();
}

function setupUserButton(): Teardown {
  const el = document.querySelector<HTMLElement>(`.buttonBar > .userButton`);
  const buttons = document.querySelectorAll<HTMLElement>(
    `.buttonBar > .userButton > .userStateMenu > *`
  );

  if (!el || !buttons) {
    return () => {};
  }

  buttons.forEach((b) => {
    b.setAttribute("tabIndex", "-1");
  });

  function onKeydown(el: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;
    console.log("key pressed", keyPressed);
    if (keyPressed === "Enter") {
      const logoutButton = document.querySelector<HTMLElement>(
        '[role="button"][aria-label="Logout"]'
      );
      const isActive = isVisible(logoutButton);

      // TODO: make this better
      // The event listener upstream is listening for clicks on the img
      e.preventDefault();

      // TODO: we should only trigger a click
      // then the click would handle focus automatically
      //
      // TODO: figure out the state
      //      el.querySelector<HTMLElement>(".userAvatarWrapper")?.click();
      el.click();

      if (isActive) {
        // Focus back on itself
        el.focus();
      } else {
        // Focus on the first button
        logoutButton?.parentNode?.addEventListener(
          "transitionend",
          function () {
            logoutButton?.focus();
          },
          { once: true }
        );
      }
    } else if (keyPressed === "ArrowUp" || keyPressed === "ArrowDown") {
      moveVertically(el, keyPressed);
    }
  }

  console.log("adding listeners to buootns", buttons);
  Array.from(buttons).map((el) => {
    el.addEventListener("focusin", () => {
      console.log(el, "is getting focus");
    });
    el.removeEventListener("focusout", () => {
      console.log(el, "is losing focus");
    });
  });

  const bind = onKeydown.bind(null, el);
  el.addEventListener("keydown", bind);
  return () => {
    el.removeEventListener("keydown", bind);
  };
}

function setupSearchButtonRole() {
  const el = document.querySelector<HTMLElement>(`a.buttonItemWrapper`);
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Search");
}

function setupLogoutButtonRole() {
  const el = document.querySelector<HTMLElement>(`.logoutWrapper`);
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Logout");
}

function setupOnlineButtonRole() {
  const el = document.querySelector<HTMLElement>(`.optionWrapper .online`)
    ?.parentNode as Element;
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Online");
}

function setupAwayButtonRole() {
  const el = document.querySelector<HTMLElement>(`.optionWrapper .away`)
    ?.parentNode as Element;
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Away");
}

function setupRoles() {
  setupSearchButtonRole();
  setupUserButtonRole();
  setupSettingsButtonRole();
  setupNotificationsButtonRole();

  setupLogoutButtonRole();
  setupOnlineButtonRole();
  setupAwayButtonRole();
}

function setupNotificationsButtonRole() {
  const el = document.querySelector<HTMLElement>(".notificationsButton");
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Notifications");
}

function setupSettingsButtonRole() {
  const el = document.querySelector<HTMLElement>(".settingsButton");
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Settings");
}

function setupUserButtonRole() {
  const el = document.querySelector<HTMLElement>(".userButton");
  if (!el) {
    return;
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "User");
}

/**
 * Regular buttons
 * - searchButton (aka channelList)
 * - notificationsButton
 * - settingsButton
 */
function setupRegularButtonsKeydown(): Teardown {
  const el = document.querySelectorAll<HTMLElement>(
    `a.buttonItemWrapper, .buttonBar > a:not(.userButton)`
  );
  if (!el) {
    return () => {};
  }

  function onKeydown(b: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;
    if (keyPressed === "Enter") {
      // TODO: make this better
      // The event listener upstream is listening for clicks on the img
      e.preventDefault();

      if (b.querySelector(".userAvatarWrapper")) {
        b.querySelector<HTMLElement>(".userAvatarWrapper")?.click();
      } else {
        b.click();
      }
    } else if (keyPressed === "ArrowUp" || keyPressed === "ArrowDown") {
      // Dunno why i need this
      if (el) {
        moveVertically(b, keyPressed);
      }
    }
  }

  const teardowns = Array.from(el).map((b) => {
    const bind = onKeydown.bind(null, b);
    b.addEventListener("keydown", bind);
    return () => {
      b.removeEventListener("keydown", bind);
    };
  });

  return () => {
    teardowns.forEach((fn) => {
      fn();
    });
  };
}

/**
 * Expects to be run after Roles
 */
function setupUserMenuKeydown(): Teardown {
  const teardowns: Teardown[] = [];

  const onlineButton = document.querySelector<HTMLElement>(
    '[role="button"][aria-label="Online"]'
  );
  const awayButton = document.querySelector<HTMLElement>(
    '[role="button"][aria-label="Away"]'
  );
  const logoutButton = document.querySelector<HTMLElement>(
    '[role="button"][aria-label="Logout"]'
  );

  if (!onlineButton || !awayButton || !logoutButton) {
    return () => {};
  }
  const order = [onlineButton, awayButton, logoutButton];

  const userButton = document.querySelector<HTMLElement>(
    '[role="button"][aria-label="User"]'
  );

  const t = order.map((el) => {
    function onKeyDown(e: KeyboardEvent) {
      const keyPressed = e.key;
      const activeElement = document.activeElement as HTMLElement;
      if (!activeElement) {
        return;
      }

      if (keyPressed === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        el.click();
        // TODO: maybe this should belong somewhere else
        focusBackWhenTransitionEnds(userButton);
      } else if (keyPressed === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();

        const n = list.prev(order, activeElement);
        if (n === "OOB_START" || n === "OOB_END") {
          el.focus();
        } else {
          n.focus();
        }
      } else if (keyPressed === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();

        const n = list.next(order, activeElement);
        if (n === "OOB_END") {
          userButton?.click();
          focusBackWhenTransitionEnds(userButton);
        } else if (n === "OOB_START") {
          el.focus();
        } else {
          n.focus();
        }
      }
    }

    el.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("keydown", onKeyDown);
    };
  });

  teardowns.push(...t);

  return () => {
    teardowns.forEach((fn) => {
      fn();
    });
  };
}

let teardown: Teardown[] = [];
export function updateSidebar() {
  teardown.forEach((fn) => {
    fn();
  });
  teardown = [];

  const lobbyItems = Array.from(
    document.querySelectorAll<HTMLElement>(
      `.mainToolbar .channelsList .channelItemWrapper`
    )
  );

  // Make buttons focusable
  lobbyItems.forEach((el) => {
    el.querySelectorAll<HTMLElement>("*").forEach((el2) => {
      el2.setAttribute("tabindex", "-1");
    });

    const muteChannelButton = el.querySelector(".muteChannelItem");
    const leaveChannelButton = el.querySelector(".leaveChannelItem");
    const joinChannelButton = el.querySelector(".channelItem");

    if (!muteChannelButton || !leaveChannelButton || !joinChannelButton) {
      return;
    }
  });

  teardown.push(
    ...Array.from(lobbyItems).map((lobbyItem) => {
      return setupLobbyButtons(lobbyItem);
    })
  );

  setupRoles();
  teardown.push(setupRegularButtonsKeydown());
  teardown.push(setupUserMenuKeydown());

  // Query open lobbies and the search button
  // Then the first one tabbable
  const sidebarItems = document.querySelectorAll<HTMLElement>(
    `.mainToolbar .channelsList .channelItemWrapper > *,
    .mainToolbar .buttonItemWrapper`
  );

  // TODO: doing this at this point introduces a bug
  // where tab rovering breaks upon a new lobby joined
  const first = sidebarItems[0];
  sidebarItems.forEach((el) => el.setAttribute("tabIndex", "-1"));
  first.setAttribute("tabIndex", "0");
}

function focusBackWhenTransitionEnds(userButton: HTMLElement | null) {
  userButton?.addEventListener(
    "transitionend",
    function () {
      userButton?.focus();
    },
    { once: true }
  );
}
