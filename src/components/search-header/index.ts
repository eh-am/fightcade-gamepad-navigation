import { onHorizontalOOB, onVerticalOOB } from "@app/types/navigation";
import { setupFirstRow, setupFirstRowListeners } from "./first-row";
import { setupSecondRow, setupSecondRowListeners } from "./second-row";
import { setupThirdRow, setupThirdRowListeners } from "./third-row";

export function updateSearchHeader({
  root,
  onHorizontalOOB,
  onVerticalOOB,
}: {
  root: HTMLElement;
  onHorizontalOOB: onHorizontalOOB;
  onVerticalOOB: onVerticalOOB;
}): Teardown {
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
      onVerticalOOB,
      onHorizontalOOB
    )
  );
  teardown.push(
    setupThirdRowListeners(
      secondRow.allItems,
      thirdRow.allItems,
      onHorizontalOOB,
      onVerticalOOB
    )
  );

  return () => {
    teardown.forEach((v) => v());
  };
}
