function circularList(array: ListOfHTML, index: number) {
  let i = index;

  // Support negative values
  if (i < 0) {
    i = i + array.length;
  }

  i = i % array.length;
  return array[i];
}

/*
 * Finds the previous item in a circular list
 */
export function prev2(array: ListOfHTML, el: HTMLElement) {
  const index = Array.from(array).findIndex((a) => a === el);

  return circularList(array, index - 1);
}

/*
 * Finds the next item in a circular list
 */
export function next2(array: ListOfHTML, el: HTMLElement) {
  const index = Array.from(array).findIndex((a) => a === el);

  return circularList(array, index + 1);
}
