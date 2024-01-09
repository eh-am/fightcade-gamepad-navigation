import * as list from "@app/ds/list";
import { fakeRovingTabIndex, findFirstFakeFocusable } from "@app/dom";
import { setupCustomSelect } from "./fake-select";
import { onOOBNavigation } from "@app/types/navigation";

export function setupSecondRow(root: HTMLElement): {
  teardown: Teardown;
  allItems: HTMLElement[];
} {
  const selects = Array.from(
    root.querySelectorAll<HTMLSelectElement>("select")
  );
  const teardown: Teardown[] = [];

  console.log("selects", selects);
  selects.forEach((sel) => {
    console.log(sel, "value", sel.value);
  });

  // Create the custom select
  teardown.push(...selects.map((select) => setupCustomSelect(select)));

  const genreCustomSelect = root.querySelector<HTMLElement>(
    '.fgn-custom-select[aria-label="Genre"]'
  );
  const releaseYearCustomSelect = root.querySelector<HTMLElement>(
    '.fgn-custom-select[aria-label="Release year"]'
  );
  const systemCustomSelect = root.querySelector<HTMLElement>(
    '.fgn-custom-select[aria-label="System"]'
  );
  const rankedCustomSelect = root.querySelector<HTMLElement>(
    '.fgn-custom-select[aria-label="Ranked"]'
  );
  if (
    !genreCustomSelect ||
    !releaseYearCustomSelect ||
    !systemCustomSelect ||
    !rankedCustomSelect
  ) {
    console.warn(
      `Could not initialize filters, looks like something is missing: Genre="${genreCustomSelect}" Release_Year="${releaseYearCustomSelect} System="${systemCustomSelect}" ranked="${rankedCustomSelect}"`
    );
    return {
      teardown: () => {},
      allItems: [],
    };
  }
  return {
    teardown: () => {
      // Instead of remove all event listeners and such
      // We just delete the root node of the custom select
      // TODO: apparently the listeners continue existing?
      // https://stackoverflow.com/a/76239226
      const fakeSelects =
        root.querySelectorAll<HTMLElement>(".fgn-custom-select");

      console.log("tearing down all fake selects", fakeSelects);
      fakeSelects.forEach((el) => el.remove());

      teardown.forEach((v) => v());
    },
    allItems: [
      genreCustomSelect,
      releaseYearCustomSelect,
      systemCustomSelect,
      rankedCustomSelect,
    ],
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

  secondRowItems.forEach((el) => {
    el.addEventListener("keydown", onKeydown.bind(null, el));
  });

  return () => {
    secondRowItems.forEach((el) => {
      el.addEventListener("keydown", onKeydown.bind(null, el));
    });
  };
}
