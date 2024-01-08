import * as cl from "@app/ds/circularList";

export function setupUserList(root: HTMLElement): Teardown {
  const allUsers = root.querySelectorAll<HTMLElement>(
    ".usersListWrapper .userItem"
  );
  const container = root.querySelector<HTMLElement>(".usersListWrapper");

  if (!container || !allUsers) {
    return () => {};
  }

  allUsers.forEach((el, index) => {
    if (!el.hasAttribute("tabIndex")) {
      el.setAttribute("tabIndex", index === 0 ? "0" : "-1");
    }

    el.setAttribute("role", "button");
    const playerName = el.querySelector<HTMLElement>(".playerName");
    if (playerName) {
      el.setAttribute("aria-label", playerName.textContent || "");
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
      const next = cl.next(allUsers, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowUp") {
      e.preventDefault();
      const next = cl.prev(allUsers, focusedElement);
      next.focus();
    }
  }
  // Set up a single listener
  container.addEventListener("keydown", onKeydown);
  return () => {
    container.removeEventListener("keydown", onKeydown);
  };
}
