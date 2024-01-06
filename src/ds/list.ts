export function next(
  items: HTMLElement[],
  current: HTMLElement
): ReturnType<typeof list> {
  return list(items, current, 1);
}

export function prev(
  items: HTMLElement[],
  current: HTMLElement
): ReturnType<typeof list> {
  return list(items, current, -1);
}

function list(
  items: HTMLElement[],
  current: HTMLElement,
  addIndex: number
): HTMLElement | "OOB" | "OOB" {
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
    return "OOB";
  }

  if (nextIndex >= items.length) {
    return "OOB";
  }

  return items[nextIndex];
}
