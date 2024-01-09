import { makeFocusableIfNeeded, rovingTabIndex } from "@app/dom";
import * as list from "@app/ds/list";
import { onHorizontalOOB, onVerticalOOB } from "@app/types/navigation";

type Props = {
  root: HTMLElement;
  onVerticalOOB: onVerticalOOB;
  onHorizontalOOB: onHorizontalOOB;
};

export function setupUserList({
  root,
  onVerticalOOB,
  onHorizontalOOB,
}: Props): Teardown {
  const allUsers = Array.from(root.querySelectorAll<HTMLElement>(".userItem"));

  if (!allUsers) {
    return () => {};
  }

  allUsers.forEach((el, index) => {
    if (!el.hasAttribute("tabIndex")) {
      const tabIndex = index === 0 ? "0" : "-1";
      makeFocusableIfNeeded(el, false, tabIndex);
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

    // TODO: rovering tabindex
    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowDown") {
      e.preventDefault();
      const next = list.next(allUsers, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      }
    } else if (pressed === "ArrowUp") {
      e.preventDefault();
      const next = list.prev(allUsers, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      } else {
        onVerticalOOB("START");
      }
    } else if (pressed === "ArrowLeft") {
      onHorizontalOOB("START");
    }
  }
  // Set up a single listener
  root.addEventListener("keydown", onKeydown);
  return () => {
    root.removeEventListener("keydown", onKeydown);
  };
}
