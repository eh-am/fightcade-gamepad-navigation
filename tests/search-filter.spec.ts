import { test, expect, Page } from "@playwright/test";

const PO = {
  FILTER_BTN: (page: Page) => page.getByRole("button", { name: "filters" }),

  // TODO: find a better selector
  INPUT_BOX: (page: Page) =>
    page.getByRole("textbox", { name: "Search games" }),
};

test.describe("navigates back and forth horizontally", () => {
  test("first row", async ({ page }) => {
    await page.goto("/testdata/search-filter/");

    const FILTER_BTN = PO.FILTER_BTN(page);
    const INPUT_BOX = PO.INPUT_BOX(page);

    // TODO: navigate here via tab
    await INPUT_BOX.focus();

    await page.keyboard.press("ArrowRight");
    await expect(FILTER_BTN).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(INPUT_BOX).toBeFocused();
  });

  test("second row", async ({ page }) => {
    await page.goto("/testdata/search-filter/");

    const FILTER_BTN = PO.FILTER_BTN(page);
    const INPUT_BOX = PO.INPUT_BOX(page);

    // TODO: navigate here via tab
    await INPUT_BOX.focus();

    await page.keyboard.press("ArrowDown");

    //  await page.keyboard.press("ArrowRight");
    //  await expect(FILTER_BTN).toBeFocused();
    //
    //  await page.keyboard.press("ArrowLeft");
    //  await expect(INPUT_BOX).toBeFocused();
    //
    //  await page.keyboard.press("ArrowLeft");
    //  await expect(INPUT_BOX).toBeFocused();
  });
});
