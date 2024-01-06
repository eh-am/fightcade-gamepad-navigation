import {
  addCSS,
  findFocusableElements,
  isHidden,
  makeFocusableIfNeeded,
  rovingTabIndex,
} from "@app/dom";
import * as list from "@app/ds/list";
import { handleFocusOut, setupCardKeydown } from "./card";

const actionSel = ".channelActions, .eventActions, .categoryActions";

export function update() {
  const root = document.querySelector<HTMLElement>(".welcomeWrapper");
  if (!root) {
    return false;
  }

  //  if (!root || isHidden(document.querySelector(".welcomeWrapper"))) {
  //    return false;
  //  }

  // Find all categories
  const categories = document.querySelectorAll<HTMLElement>(
    ".welcomeWrapper .contentWrapper .welcomeListWrapper"
  );

  if (categories.length <= 0) {
    console.warn("Search: No items found. Returning early");
    return false;
  }

  // makeFirstCardFocusable(root);
  // TODO: this won't be necessary
  // makeFirstCardFocusable();

  // log("setting up categories...");

  // For each category
  categories.forEach((category) => {
    const cards = Array.from(
      category.querySelectorAll<HTMLElement>(".gridWrapper")
    );
    if (!cards.length) {
      return;
    }

    makeFocusableIfNeeded(cards[0], true, "0");
    cards.forEach((el) => makeFocusableIfNeeded(el, true));

    const teardown = cards.map(
      setupCardKeydown.bind(null, Array.from(categories), cards, category)
    );

    Array.from(cards).map((el) => handleFocusOut(el));

    makeActionButtonsFocusable(category);
    // TODO: teardown
    //setupFocus(category);
    //    setupCardFocusOut(category);
    //    setupKeyDownListeners(category);
  });

  return true;
}

function makeActionButtonsFocusable(section: HTMLElement) {
  section.querySelectorAll<HTMLElement>(actionSel).forEach((actions) => {
    const buttons = Array.from(actions.querySelectorAll<HTMLElement>("a"));

    buttons
      .filter((a) => !a.hasAttribute("href"))
      .forEach((a) => {
        a.setAttribute("href", "#");

        // By default <a> tags are tabbable, so let's disable it
        // since we will handle that manually
        a.setAttribute("tabIndex", "-1");
      });
  });
}
