import { findFirstFakeFocusable } from "@app/dom";
import { onOOBNavigation } from "@app/types/navigation";

export function setupThirdRow(root: HTMLElement) {
  const clearFilterButton = root.querySelector<HTMLElement>(
    ".filtersWrapper > .button-alt"
  );
  const originalSelects = Array.from(
    root.querySelectorAll<HTMLSelectElement>("select")
  );

  if (!clearFilterButton || !originalSelects.length) {
    return {
      teardown: () => {},
      allItems: [],
    };
  }

  clearFilterButton.setAttribute("tabIndex", "-1");
  clearFilterButton.setAttribute("role", "button");
  clearFilterButton.setAttribute("label", "Clear Filters");

  function onClickClearFilter() {
    originalSelects.forEach((sel) => {
      sel.selectedIndex = 0;
      sel.dispatchEvent(new Event("change"));
    });
  }
  clearFilterButton.addEventListener("click", onClickClearFilter);

  return {
    teardown: () =>
      clearFilterButton.removeEventListener("click", onClickClearFilter),
    allItems: [clearFilterButton],
  };
}
export function setupThirdRowListeners(
  secondRowItems: HTMLElement[],
  thirdRowItems: HTMLElement[],
  onHorizontalOOB: onOOBNavigation,
  onVerticalOOB: (direction: "START" | "END") => void
) {
  function onKeydown(el: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowUp") {
      findFirstFakeFocusable(secondRowItems)?.focus();
    } else if (keyPressed === "ArrowDown") {
      onVerticalOOB("END");
    } else if (keyPressed === "ArrowLeft") {
      onHorizontalOOB({
        axis: "HORIZONTAL",
        direction: "START",
        el: el,
      });
    } else if (keyPressed === "Enter") {
      el.click();
    }
  }

  const teardown = thirdRowItems.map((el) => {
    const bind = onKeydown.bind(null, el);
    el.addEventListener("keydown", bind);
    return () => el.removeEventListener("keydown", bind);
  });

  return () => {
    teardown.forEach((f) => f());
  };
}
