import {
  Direction,
  onOOBNavigation,
  onVerticalOOB,
} from "@app/types/navigation";

type onHorizontalOOB = (direction: Direction, el: HTMLElement) => void;

type Props = {
  root: HTMLElement;
  onVerticalOOB: onVerticalOOB;
  onHorizontalOOB: onHorizontalOOB;
  onOOBNavigation: onOOBNavigation;
};
import * as list from "@app/ds/list";
import { findFirstFocusableChild, rovingTabIndex } from "@app/dom";

export function setupChat(props: Props): Teardown {
  const { root } = props;
  const teardown: Teardown[] = [];

  const rows = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".messageWrapper.challengeRequested, .messageWrapper.requestChallenge"
    )
  );

  // TODO: enable input box once I figure out how to type
  root
    .querySelector<HTMLElement>(".chatInput input")
    ?.setAttribute("tabindex", "-1");

  teardown.push(
    ...rows.map((currentRow) => {
      const onVerticalOOB = moveVertically.bind(
        null,
        props.onVerticalOOB,
        rows,
        currentRow
      );

      // TODO: kinda poor
      if (currentRow.classList.contains("challengeRequested")) {
        return setupBeenChallenged({
          ...props,
          root: currentRow,
          onVerticalOOB,
        });
      }

      if (currentRow.classList.contains("requestChallenge")) {
        return setupCancelChallengeButtons({
          ...props,
          root: currentRow,
          onVerticalOOB,
        });
      }

      return () => {};
    })
  );

  return () => {
    teardown.forEach((f) => f());
  };
}

function moveVertically(
  onVerticalOOB: onVerticalOOB,
  rows: HTMLElement[],
  currentRow: HTMLElement,
  direction: Direction
) {
  const nextFn = direction === "START" ? list.prev : list.next;
  const nextRow = nextFn(rows, currentRow);

  // TODO: this should be receivd as a parameter
  const focusedElement = document.activeElement as HTMLElement;
  if (nextRow.status === "OK") {
    const next = findFirstFocusableChild(nextRow.value);
    if (next) {
      rovingTabIndex(focusedElement, next);

      next?.focus();
    }
  } else {
    // TODO: it looks weird moving to the toolbar since it's right aligned
    // onVerticalOOB(direction);
    //    console.log("dispatching");
    //    onOOBNavigation({
    //      axis: "VERTICAL",
    //      direction,
    //      el: focusedElement,
    //    });
    // TODO
  }
}

function setupCancelChallengeButtons({
  root,
  onVerticalOOB,
  onHorizontalOOB,
}: Exclude<Props, "onOOBNavigation">): Teardown {
  // TODO: lazy, should handle keyboard navigation to/from maybe?
  const el = root.querySelector<HTMLElement>(
    ".challengeContainer .cancel-challenge"
  );
  if (!el) {
    return () => {};
  }

  el.setAttribute("role", "button");
  el.setAttribute("aria-label", "Cancel Challenge");
  el.setAttribute("tabindex", "0");

  function onKeydown(el: HTMLElement, e: KeyboardEvent) {
    const pressed = e.key;
    if (pressed === "Enter") {
      e.preventDefault();
      el?.click();
    } else if (pressed === "ArrowUp") {
      e.preventDefault();
      onVerticalOOB("START");
    } else if (pressed === "ArrowDown") {
      onVerticalOOB("END");
    } else if (pressed === "ArrowLeft") {
      onHorizontalOOB("START", el);
    } else if (pressed === "ArrowRight") {
      onHorizontalOOB("END", el);
    }
  }
  const bind = onKeydown.bind(null, el);
  el.addEventListener("keydown", bind);
  return () => el.removeEventListener("keydown", bind);
}

// root should be .challengeContent
function setupBeenChallenged({
  root,
  onHorizontalOOB,
  //  onOOBNavigation,
  onVerticalOOB,
}: Props): Teardown {
  const acceptChallengeBtn =
    root.querySelector<HTMLElement>(".accept-challenge");

  const declineChallengeBtn =
    root.querySelector<HTMLElement>(".decline-challenge");

  if (!acceptChallengeBtn || !declineChallengeBtn || !parent) {
    console.warn(
      `Could not initialize buttons, since one of '.accept-challenge=${acceptChallengeBtn}' or '.decline-challenge=${declineChallengeBtn}' were not found. This is not expected.`
    );
    return () => {};
  }

  acceptChallengeBtn.setAttribute("tabIndex", "0");
  acceptChallengeBtn.setAttribute("role", "button");
  acceptChallengeBtn.setAttribute("aria-label", "Accept Challenge");

  declineChallengeBtn.setAttribute("tabIndex", "-1");
  declineChallengeBtn.setAttribute("role", "button");
  declineChallengeBtn.setAttribute("aria-label", "Decline Challenge");

  const buttons = [acceptChallengeBtn, declineChallengeBtn];

  const onKeydown = (e: KeyboardEvent) => {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = list.next(buttons, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      } else {
        onHorizontalOOB("END", focusedElement);
      }
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = list.prev(buttons, focusedElement);
      if (next.status === "OK") {
        rovingTabIndex(focusedElement, next.value);
        next.value.focus();
      } else {
        onHorizontalOOB("START", focusedElement);
      }
    } else if (pressed === "ArrowUp") {
      onVerticalOOB("START");
    } else if (pressed === "ArrowDown") {
      onVerticalOOB("END");
    }
  };

  root.addEventListener("keydown", onKeydown);
  return () => {
    root.removeEventListener("keydown", onKeydown);
  };
}
