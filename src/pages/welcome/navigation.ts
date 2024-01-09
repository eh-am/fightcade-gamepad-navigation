import { findFirstFocusableChild } from "@app/dom";
import { findFirstFocusableCardInCategory } from "@app/pages/welcome/category";
import { Direction, NavigationProps } from "@app/types/navigation";
import { dispatchOOBEvent } from "@app/oobNavigator";

export function onCardVerticalOOB(
  searchHeader: HTMLElement,
  direction: Direction
) {
  if (direction === "START") {
    const next = findFirstFocusableChild(searchHeader);
    next?.focus();
  }
}

export function onHeaderHorizontalNavigation(
  root: HTMLElement,
  props: NavigationProps
) {
  dispatchOOBEvent({ ...props, root });
}

export function onHeaderVerticalNavigation(
  categories: HTMLElement[],
  direction: Direction
) {
  if (direction === "END") {
    const lastCategory = categories[0];
    if (lastCategory) {
      // Focus on the next item in the grid
      const lastVisited = findFirstFocusableCardInCategory(lastCategory);
      lastVisited?.focus();
      // TODO: set tabindex to 0, and remove tabindex from other place?
    }
  }
}

export function onCategoryHorizontalOOB(
  root: HTMLElement,
  props: NavigationProps
) {
  dispatchOOBEvent({ ...props, root });
}
