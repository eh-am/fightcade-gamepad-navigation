import { test, expect, Page } from "@playwright/test";

const PO = {
  FILTER_BTN: (page: Page) =>
    page.getByRole("button", { name: "filters", exact: true }),

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

    const input = PO.INPUT_BOX(page);

    await input.focus();
    // TODO: navigate here via tab
    //    await PO.INPUT_BOX(page).focus();

    await page.keyboard.press("ArrowDown");
    await expect(page.getByLabel("Genre").nth(1)).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByLabel("Release year").nth(1)).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByLabel("System").nth(1)).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByLabel("Ranked").nth(1)).toBeFocused();
  });
});

test("navigates vertically", async ({ page }) => {
  await page.goto("/testdata/search-filter/");
  const INPUT_BOX = PO.INPUT_BOX(page);

  // TODO: navigate here via tab
  await INPUT_BOX.focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByLabel("Genre").nth(1)).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("button", { name: "Clear Filters" })
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  expect(INPUT_BOX).toBeFocused();
});

test("selects items", async ({ page }) => {
  await page.goto("/testdata/search-filter/");

  await page.getByLabel("Genre").nth(1).focus();
  await page.getByLabel("Genre").nth(1).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-genre").nth(1)).toHaveValue("1");

  await page.getByLabel("Release Year").nth(1).focus();
  await page.getByLabel("Release Year").nth(1).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-release year").nth(1)).toHaveValue("1");

  await page.getByLabel("System").nth(1).focus();
  await page.getByLabel("System").nth(1).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-system").nth(1)).toHaveValue("1");

  await page.getByLabel("Ranked").nth(1).focus();
  await page.getByLabel("Ranked").nth(1).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-ranked").nth(1)).toHaveValue("1");

  await page.getByRole("button", { name: "Clear Filters" }).click();

  await expect(page.getByTestId("select-genre").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-release year").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-system").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-ranked").nth(1)).toHaveValue("0");
});

// TODO: when hitting right from an option it should focus the next option
