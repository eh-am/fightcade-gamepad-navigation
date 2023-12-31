import { Teardown } from "../types";
import * as CL from "../circularList";

export function initLobby(root: HTMLElement) {}

function setupToolbar(root: HTMLElement): Teardown {
  const buttons = root.querySelectorAll<HTMLElement>(".channelActions > *");
  const channelActions = root.querySelector<HTMLElement>(".channelActions");
  if (!channelActions) {
    return () => {};
  }

  console.log("adding listeners to channel actions", channelActions);
  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;
    console.log("pressed", pressed, focusedElement);

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = CL.next2(buttons, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = CL.prev2(buttons, focusedElement);
      next.focus();
    }
  }

  // Add a single listener
  channelActions.addEventListener("keydown", onKeydown);

  return () => {
    channelActions.removeEventListener("keydown", onKeydown);
  };
}

function setupUserList(root: HTMLElement): Teardown {
  const allUsers = root.querySelectorAll<HTMLElement>(
    ".usersListWrapper .userItem"
  );
  const container = root.querySelector<HTMLElement>(".usersListWrapper");

  console.log({ allUsers, container });
  if (!container || !allUsers) {
    return () => {};
  }

  allUsers.forEach((el, index) => {
    console.log("el", el);
    if (!el.hasAttribute("tabIndex")) {
      el.setAttribute("tabIndex", index === 0 ? "0" : "-1");
    }
  });

  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;
    console.log("pressed", pressed, focusedElement);

    // TODO: rovering tabindex
    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowDown") {
      e.preventDefault();
      const next = CL.next2(allUsers, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowUp") {
      e.preventDefault();
      const next = CL.prev2(allUsers, focusedElement);
      next.focus();
    }
  }
  // Set up a single listener
  container.addEventListener("keydown", onKeydown);
  return () => {
    container.removeEventListener("keydown", onKeydown);
  };
}

let teardown: Teardown[] = [];
export function updateLobby(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown = [];

  const testGameBtn = root.querySelector(".channelActions .testGame");
  const trainingBtn = root.querySelector(".channelActions .trainingGame");

  testGameBtn?.setAttribute("tabindex", "0");
  testGameBtn?.setAttribute("role", "button");
  testGameBtn?.setAttribute("aria-label", "Test Game");

  trainingBtn?.setAttribute("role", "button");
  trainingBtn?.setAttribute("aria-label", "Training");
  trainingBtn?.setAttribute("tabindex", "-1");

  teardown.push(setupToolbar(root));
  teardown.push(setupUserList(root));
}

// document.querySelectorAll('.usersListWrapper .userItem')
