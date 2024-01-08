import * as cl from "@app/ds/circularList";

export function setupToolbar(root: HTMLElement): Teardown {
  const buttons = root.querySelectorAll<HTMLElement>(".channelActions > *");
  const channelActions = root.querySelector<HTMLElement>(".channelActions");
  if (!channelActions) {
    return () => {};
  }

  setupButtons(root);

  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = cl.next(buttons, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = cl.prev(buttons, focusedElement);
      next.focus();
    }
  }

  // Add a single listener
  channelActions.addEventListener("keydown", onKeydown);

  return () => {
    channelActions.removeEventListener("keydown", onKeydown);
  };
}

function setupButtons(root: HTMLElement) {
  const testGameBtn = root.querySelector(".channelActions .testGame");
  const trainingBtn = root.querySelector(".channelActions .trainingGame");

  testGameBtn?.setAttribute("tabindex", "0");
  testGameBtn?.setAttribute("role", "button");
  testGameBtn?.setAttribute("aria-label", "Test Game");

  trainingBtn?.setAttribute("role", "button");
  trainingBtn?.setAttribute("aria-label", "Training");
  trainingBtn?.setAttribute("tabindex", "-1");
}
