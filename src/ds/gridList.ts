export function next(
  items: HTMLElement[],
  current: HTMLElement,
  perRow: number
): ReturnType<typeof list> {
  return list(items, current, 1, perRow);
}

export function prev(
  items: HTMLElement[],
  current: HTMLElement,
  perRow: number
): ReturnType<typeof list> {
  return list(items, current, -1, perRow);
}

//export function to(
//  items: HTMLElement[],
//  current: HTMLElement,
//  index: number,
//  perRow: number
//): ReturnType<typeof list> {
//  return list(items, current, index, perRow);
//}
//
function list(
  items: HTMLElement[],
  current: HTMLElement,
  addIndex: number,
  perRow: number
):
  | { status: "OK"; value: HTMLElement }
  | { status: "OOB"; value: "START" | "END" } {
  const myIndex = Array.from(items).findIndex((a) => a === current);

  if (myIndex === -1) {
    throw new Error(`Element ${current} could not be found`);
  }

  if (items.length <= 0) {
    throw new Error(`Array of elements is empty, nothing to iterate`);
  }

  const nextIndex = myIndex + addIndex;

  // TODO: it may be possible to go outside by multiple items
  if (nextIndex < 0) {
    return { status: "OOB", value: "START" };
  }

  if (nextIndex >= items.length) {
    return { status: "OOB", value: "END" };
  }

  if (nextIndex % perRow === 0 && nextIndex > myIndex) {
    return { status: "OOB", value: "END" };
  }

  if (nextIndex % perRow === perRow - 1 && nextIndex < myIndex) {
    return { status: "OOB", value: "START" };
  }

  return { status: "OK", value: items[nextIndex] };
}
