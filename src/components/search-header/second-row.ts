import * as list from "@app/ds/list";
import { fakeRovingTabIndex, findFirstFakeFocusable } from "@app/dom";
import { onOOBNavigation } from "@app/types/navigation";
import { setupSelect } from "@app/components/search-header/select";

export function setupSecondRow(root: HTMLElement): {
  teardown: Teardown;
  allItems: HTMLElement[];
} {
  const selects = Array.from(
    root.querySelectorAll<HTMLSelectElement>("select")
  );
  const teardown: Teardown[] = [];

  teardown.push(...selects.map((select) => setupSelect(select)));

  return {
    teardown: () => {
      teardown.forEach((v) => v());
    },
    allItems: selects,
  };
}

export function setupSecondRowListeners(
  firstRowItems: HTMLElement[],
  secondRowItems: HTMLElement[],
  thirdRowItems: HTMLElement[],
  onHorizontalOOB: onOOBNavigation,
  onVerticalOOB: (direction: "START" | "END") => void
) {
  function onKeydown(currEl: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      const next = list.prev(secondRowItems, currEl);
      if (next.status === "OK") {
        fakeRovingTabIndex(currEl, next.value);
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

      const next = list.next(secondRowItems, currEl);
      if (next.status === "OK") {
        fakeRovingTabIndex(currEl, next.value);
        next.value.focus();
      }
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      findFirstFakeFocusable(firstRowItems)?.focus();
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      // It may be possible for a third row for to not exist
      const firstFocusable = findFirstFakeFocusable(thirdRowItems);
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        onVerticalOOB("END");
      }
    } else if (keyPressed === "Enter") {
      currEl.click();
    }
  }

  const teardown = secondRowItems.map((el) => {
    const bind = onKeydown.bind(null, el);
    el.addEventListener("keydown", bind);
    return () => el.removeEventListener("keydown", bind);
  });

  return () => {
    teardown.forEach((f) => f());
  };
}
