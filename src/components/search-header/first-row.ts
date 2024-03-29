import * as list from "@app/ds/list";
import { findFirstFakeFocusable, makeFocusableIfNeeded } from "@app/dom";
import { onOOBNavigation } from "@app/types/navigation";

export function setupFirstRow(root: HTMLElement) {
  const input = root.querySelector<HTMLElement>("input");
  const filterButton = root.querySelector<HTMLElement>(".filtersButton");
  if (!input || !filterButton) {
    throw new Error("Could not find input or .filterButtons");
  }

  makeFocusableIfNeeded(input, false, "0");
  makeFocusableIfNeeded(filterButton);

  // The filter button needs this to be tabbable
  filterButton.setAttribute("tabIndex", "-1");
  filterButton.setAttribute("role", "button");
  filterButton.setAttribute("aria-label", "filters");
  return {
    allItems: [input, filterButton],
  };
}

export function setupFirstRowListeners(
  firstRowItems: HTMLElement[],
  secondRowItems: HTMLElement[],
  onHorizontalOOB: onOOBNavigation,
  onVerticalOOB: (direction: "START" | "END") => void
): Teardown {
  function onKeydown(currEl: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      const next = list.prev(firstRowItems, currEl);
      if (next.status === "OK") {
        next.value.focus();
      } else {
        onHorizontalOOB({
          axis: "HORIZONTAL",
          el: currEl,
          direction: "START",
        });
      }
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();

      const next = list.next(firstRowItems, currEl);
      if (next.status === "OK") {
        next.value.focus();
      }
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      // It may be possible that the second row is hidden
      const firstFocusable = findFirstFakeFocusable(secondRowItems);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        onVerticalOOB("END");
      }
    } else if (keyPressed === "Enter") {
      e.preventDefault();
      currEl.click();
    }
  }

  const teardown: Teardown[] = firstRowItems.map((el) => {
    const bind = onKeydown.bind(null, el);
    el.addEventListener("keydown", bind);
    return () => {
      el.removeEventListener("keydown", bind);
    };
  });

  return () => {
    teardown.forEach((f) => f());
  };
}
