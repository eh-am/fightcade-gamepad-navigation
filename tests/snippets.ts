import { Page } from "@playwright/test";

export async function focusedElement(page: Page) {
  return await page.evaluate(() => ({
    tag: document.activeElement.tagName,
    attributes: Array.from(document.activeElement.attributes).map((att) => {
      return { [att.name]: att.value };
    }),
    content: document.activeElement.textContent,
  }));
}

// https://stackoverflow.com/a/74514875
export async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });
}
