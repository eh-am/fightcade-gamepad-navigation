import { makeFocusableIfNeeded, rovingTabIndex } from "@app/dom";
import * as list from "@app/ds/list";

export function setupFooterKeydown(
  root: HTMLElement,
  onHorizontalOOB: (direction: "START" | "END") => void,
  onArrowUp: () => void
): Teardown {
  const footerButtons = getFooterButtons(root);

  function onKeydown(el: HTMLElement, e: KeyboardEvent) {
    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = e.key;
    if (keyPressed === "Enter") {
      e.preventDefault();
      el.click();
    } else if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      const next = list.prev(footerButtons, el);
      if (next.status === "OK") {
        rovingTabIndex(el, next.value);
        next.value.focus();
      } else {
        onHorizontalOOB("START");
      }
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();

      const next = list.next(footerButtons, el);
      if (next.status === "OK") {
        rovingTabIndex(el, next.value);
        next.value.focus();
      }
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      onArrowUp();
    }
  }

  const teardown = [
    ...footerButtons.map((el) => {
      const bind = onKeydown.bind(null, el);
      el.addEventListener("keydown", bind);
      return () => el.removeEventListener("keydown", bind);
    }),
  ];

  return () => {
    teardown.forEach((f) => f());
  };
}

function getFooterButtons(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(".paginationWrapper .button-alt")
  );
}

export function setupFooter(root: HTMLElement) {
  moveFooterUpTheDOM(root);

  const footerButtons = getFooterButtons(root);

  // Make it tabbable
  // TODO: we should set tabindex=0 to the first non disabled button
  Array.from(footerButtons).forEach((el, i) => {
    makeFocusableIfNeeded(el, false, i === 0 ? "0" : "-1");
  });
}

/*
 * Move Footer up the DOM, so that it's always visible
 */
function moveFooterUpTheDOM(root: HTMLElement) {
  // Only move if necessary
  // Otherwise it may trigger an infinite loop with the Mutation Observer

  // Move footer up the DOM, the query is very specific
  // so that it won't run erroneously
  const footer = root.querySelector<HTMLElement>(
    ".searchResultsWrapper .searchResultsGrid + .paginationWrapper"
  );

  const parent = footer?.parentNode?.parentNode;
  if (parent && footer) {
    var footerWrapper = document.createElement("div");
    footerWrapper.className = "searchResultsWrapper";

    // Unset the one we set with css
    footerWrapper.style.overflow = "initial";
    footerWrapper.append(footer);
    parent.append(footerWrapper);
  }
}
