import { setupCustomSelect } from "@app/sections/components/fake-select";
import * as list from "@app/ds/list";
import {
  fakeRovingTabIndex,
  getFakeRovingTabindex,
  makeFocusableIfNeeded,
} from "@app/dom";

export function updateSearchHeader(root: HTMLElement): Teardown {
  const teardown: Teardown[] = [];

  // First Row
  const firstRow = setupFirstRow(root);

  // Second row
  const secondRow = setupSecondRow(root);
  teardown.push(secondRow.teardown);

  // Third row
  const thirdRow = setupThirdRow(root);
  teardown.push(thirdRow.teardown);

  // Setup listeners
  teardown.push(setupFirstRowListeners(firstRow.allItems, secondRow.allItems));
  teardown.push(
    setupSecondRowListeners(
      firstRow.allItems,
      secondRow.allItems,
      thirdRow.allItems
    )
  );
  teardown.push(setupThirdRowListeners(secondRow.allItems, thirdRow.allItems));

  return () => {
    teardown.forEach((v) => v());
  };
}

function setupThirdRow(root: HTMLElement) {
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

function setupSecondRow(root: HTMLElement): {
  teardown: Teardown;
  allItems: HTMLElement[];
} {
  const selects = Array.from(
    root.querySelectorAll<HTMLSelectElement>("select")
  );
  const teardown: Teardown[] = [];

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
    throw new Error(
      "Could not initialize filters, looks like something is missing"
    );
  }
  return {
    teardown: () => {
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

function setupSecondRowListeners(
  firstRowItems: HTMLElement[],
  secondRowItems: HTMLElement[],
  thirdRowItems: HTMLElement[]
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
        console.log("Implement OOB", next.value);
      }
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();

      const next = list.next(secondRowItems, currEl);
      if (next.status === "OK") {
        fakeRovingTabIndex(currEl, next.value);
        next.value.focus();
      }
    } else if (keyPressed === "ArrowUp") {
      findFirstFocusable(firstRowItems)?.focus();
    } else if (keyPressed === "ArrowDown") {
      findFirstFocusable(thirdRowItems)?.focus();
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

function setupFirstRowListeners(
  firstRowItems: HTMLElement[],
  secondRowItems: HTMLElement[]
): Teardown {
  function onKeydown(currEl: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();

      const next = list.prev(firstRowItems, currEl);
      if (next.status === "OK") {
        next.value.focus();
      } else {
        console.log("Implement OOB", next.value);
      }
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();

      const next = list.next(firstRowItems, currEl);
      if (next.status === "OK") {
        next.value.focus();
      } else {
        console.log("Implement OOB", next.value);
      }
    } else if (keyPressed === "ArrowUp") {
      console.log("TODO: move between rows");
    } else if (keyPressed === "ArrowDown") {
      findFirstFocusable(secondRowItems)?.focus();
    } else if (keyPressed === "Enter") {
      currEl.click();
    }
  }

  firstRowItems.forEach((el) => {
    el.addEventListener("keydown", onKeydown.bind(null, el));
  });

  return () => {
    firstRowItems.forEach((el) => {
      el.removeEventListener("keydown", onKeydown.bind(null, el));
    });
  };
}

function findFirstFocusable(items: HTMLElement[]): HTMLElement | null {
  const firstFocusable = items.find((el) => {
    return getFakeRovingTabindex(el) === "0";
  });

  if (firstFocusable) {
    return firstFocusable;
  }
  return items[0];
}

function setupFirstRow(root: HTMLElement) {
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

function setupThirdRowListeners(
  secondRowItems: HTMLElement[],
  thirdRowItems: HTMLElement[]
) {
  function onKeydown(el: HTMLElement, e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowUp") {
      findFirstFocusable(secondRowItems)?.focus();
    } else if (keyPressed === "ArrowDown") {
      console.warn("TODO: implement OOB");
    } else if (keyPressed === "Enter") {
      el.click();
    }
  }

  thirdRowItems.forEach((el) => {
    el.addEventListener("keydown", onKeydown.bind(null, el));
  });

  return () => {
    thirdRowItems.forEach((el) => {
      el.addEventListener("keydown", onKeydown.bind(null, el));
    });
  };
}
