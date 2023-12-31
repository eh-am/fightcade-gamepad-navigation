import { Teardown } from "../types";
import * as CL from "../circularList";

export function initLobby(root: HTMLElement) {
  const testGameBtn = root.querySelector(".channelActions .testGame");
  const trainingBtn = root.querySelector(".channelActions .trainingGame");

  testGameBtn?.setAttribute("tabindex", "0");
  testGameBtn?.setAttribute("role", "button");
  testGameBtn?.setAttribute("aria-label", "Test Game");

  trainingBtn?.setAttribute("role", "button");
  trainingBtn?.setAttribute("aria-label", "Training");
  trainingBtn?.setAttribute("tabindex", "-1");

  setupToolbar(root);
}

function setupToolbar(root: HTMLElement): Teardown {
  const buttons = root.querySelectorAll<HTMLElement>(".channelActions > *");
  const channelActions = root.querySelector<HTMLElement>(".channelActions");
  if (!channelActions) {
    return () => {};
  }

  console.log("adding listeners to channel actions", channelActions);
  function onClick(e: KeyboardEvent) {
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
  channelActions.addEventListener("keydown", onClick);

  return () => {
    channelActions.removeEventListener("keydown", onClick);
  };
}

let teardown: Teardown[] = [];
export function updateLobby(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown = [];

  teardown.push(setupToolbar(root));
}

// document.querySelectorAll('.usersListWrapper .userItem')
