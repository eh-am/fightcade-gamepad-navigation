import { makeFocusableIfNeeded, rovingTabIndex } from "@app/dom";
import * as list from "@app/ds/list";
import { SectionProps } from "@app/pages/lobby/props";

export function setupToolbar(props: SectionProps): Teardown {
  setupButtons(props.root);
  return setupKeydownListeners(props);
}

function setupKeydownListeners(props: SectionProps): Teardown {
  const { root, onVerticalOOB, onOOBNavigation } = props;
  const buttons = Array.from(
    root.querySelectorAll<HTMLElement>(".channelActions > *")
  );
  const channelActions = root.querySelector<HTMLElement>(".channelActions");
  if (!channelActions) {
    return () => {};
  }

  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = list.next(buttons, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      }
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = list.prev(buttons, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      } else {
        console.log("Going outside");
        onOOBNavigation({
          axis: "HORIZONTAL",
          direction: "START",
          el: focusedElement,
        });
      }
    } else if (pressed === "ArrowDown") {
      onVerticalOOB("END");
    }
  }

  // Add a single listener
  channelActions.addEventListener("keydown", onKeydown);

  return () => {
    channelActions.removeEventListener("keydown", onKeydown);
  };
}

function setupButtons(root: HTMLElement) {
  const testGameBtn = root.querySelector<HTMLElement>(
    ".channelActions .testGame"
  );
  const trainingBtn = root.querySelector<HTMLElement>(
    ".channelActions .trainingGame"
  );

  // Should be always visible, I think
  if (testGameBtn) {
    makeFocusableIfNeeded(testGameBtn, false, "0");
    testGameBtn.setAttribute("role", "button");
    testGameBtn.setAttribute("aria-label", "Test Game");
  }

  if (trainingBtn) {
    makeFocusableIfNeeded(trainingBtn, false, "-1");
    trainingBtn?.setAttribute("role", "button");
    trainingBtn?.setAttribute("aria-label", "Training");
  }
}
