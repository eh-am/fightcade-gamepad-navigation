import { ListOfHTML } from "./types";

/*
 * Finds the next item in a circular list
 */
export function next(array: ListOfHTML, index: number) {
  return circularList(array, index + 1);
}

/*
 * Finds the previous item in a circular list
 */
export function prev(array: ListOfHTML, index: number) {
  return circularList(array, index - 1);
}

function circularList(array: ListOfHTML, index: number) {
  let i = index;

  // Support negative values
  if (i < 0) {
    i = i + array.length;
  }

  i = i % array.length;
  return array[i];
}

export function next2(array: ListOfHTML, el: HTMLElement) {
  const index = Array.from(array).findIndex((a) => a === el);

  return next(array, index);
}

export function prev2(array: ListOfHTML, el: HTMLElement) {
  const index = Array.from(array).findIndex((a) => a === el);

  return prev(array, index);
}
