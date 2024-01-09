import { findFocusableElements } from "@app/dom";

export function update(root: HTMLElement) {
  // We don't want to focus on any of the items
  // Since they currently only contain links
  // TODO: this is redundant with the makeExternalLinksNotFocusable() function in inject.ts
  findFocusableElements(root).forEach((el) => {
    el.setAttribute("tabIndex", "-1");
  });
}
