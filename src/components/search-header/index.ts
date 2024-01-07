import { setupFirstRow, setupFirstRowListeners } from "./first-row";
import { setupSecondRow, setupSecondRowListeners } from "./second-row";
import { setupThirdRow, setupThirdRowListeners } from "./third-row";

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
  teardown.push(
    setupFirstRowListeners(
      firstRow.allItems,
      secondRow.allItems,
      onHorizontalOOB,
      onVerticalOOB
    )
  );
  teardown.push(
    setupSecondRowListeners(
      firstRow.allItems,
      secondRow.allItems,
      thirdRow.allItems,
      onHorizontalOOB,
      onVerticalOOB
    )
  );
  teardown.push(
    setupThirdRowListeners(
      secondRow.allItems,
      thirdRow.allItems,
      onVerticalOOB,
      onHorizontalOOB
    )
  );

  return () => {
    teardown.forEach((v) => v());
  };
}

function onHorizontalOOB(direction: "START" | "END") {
  console.warn("Should move to next section horizontally", direction);
}

function onVerticalOOB(direction: "START" | "END") {
  console.warn("Should move to next section vertically", direction);
}
