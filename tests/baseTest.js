// Based on https://playwright.dev/docs/extensibility
// and https://github.com/cherniavskii/mui-x/blob/1ac52394955224269f7679b94eff2cc74ad0d73f/scripts/performance.mjs#L46
// https://github.com/cherniavskii/mui-x/blob/1ac52394955224269f7679b94eff2cc74ad0d73f/scripts/performance.mjs#L119
import { test as base } from "@playwright/test";
//import * as ally from "ally.js/esm/ally";
//import * as ally from "../node_modules/ally.js/esm/ally";
import * as ally from "../node_modules/ally.js/ally";

//console.log("ally", ally);
//console.log("tabasequence", query);
export { expect } from "@playwright/test";

// Must be a function that evaluates to a selector engine instance.
const createTagNameEngine = () => ({
  // Returns the first element matching given selector in the root's subtree.
  query(root, selector) {
    console.log("root", root, "Selector", selector);
    return root.querySelector(selector);
  },

  // Returns all elements matching given selector in the root's subtree.
  queryAll(root, selector) {
    //    const a = require("ally.js");
    console.log("ally", ally);
    console.log("query all");
    console.log("root", root, "Selector", selector);
    console.log("query", query);
    //    console.log(
    //      "first tabbable",
    //      query.firstTabbable({
    //        context: root,
    //        includeContext: true,
    //        strategy: "quick",
    //      })
    //    );
    //    console.log("tabbable elements", findTabbableElements(root));
    return Array.from(root.querySelectorAll(selector));
  },
});

export const test = base.extend({
  // Register selectors once per worker.
  selectorRegistration: [
    async ({ playwright }, use) => {
      // Register the engine. Selectors will be prefixed with "tag=".
      await playwright.selectors.register("tag", createTagNameEngine);
      await use();
    },
    { scope: "worker", auto: true },
  ],
});
