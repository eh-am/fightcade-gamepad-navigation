import { test, expect, Page } from "@playwright/test";
import { focusedElement } from "./snippets";

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
    await expect(input).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("combobox", { name: "Genre" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("combobox", { name: "Release Year" })
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("combobox", { name: "System", exact: true })
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("combobox", { name: "Ranked", exact: true })
    ).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(
      page.getByRole("combobox", { name: "System", exact: true })
    ).toBeFocused();
  });
});

test("navigates vertically", async ({ page }) => {
  await page.goto("/testdata/search-filter/");
  const INPUT_BOX = PO.INPUT_BOX(page);

  // TODO: navigate here via tab
  await INPUT_BOX.focus();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("combobox", { name: "Genre" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("button", { name: "Clear Filters" })
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  const focus = await focusedElement(page);

  await expect(
    page.getByRole("gridcell", {
      name: "The King of Fighters 2002 (NGM-2650) - Arcade FC2",
      exact: true,
    })
  ).toBeFocused();

  //  await expect(INPUT_BOX).toBeFocused();
});

test("selects items", async ({ page }) => {
  await page.goto("/testdata/search-filter/");

  await page.getByRole("combobox", { name: "Genre" }).focus();
  await page.keyboard.press("Enter");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("combobox", { name: "Genre" })).toHaveValue("1");

  await page.getByRole("combobox", { name: "Release Year" }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("combobox", { name: "Release Year" })
  ).toHaveValue("1");

  await page.getByRole("combobox", { name: "System", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("combobox", { name: "System", exact: true })
  ).toHaveValue("1");

  await page.getByRole("combobox", { name: "Ranked" }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("combobox", { name: "Ranked", exact: true })
  ).toHaveValue("1");

  await page.getByRole("button", { name: "Clear Filters" }).click();

  await expect(page.getByRole("combobox", { name: "Genre" })).toHaveValue("0");
  await expect(
    page.getByRole("combobox", { name: "Release Year" })
  ).toHaveValue("0");
  await expect(
    page.getByRole("combobox", { name: "System", exact: true })
  ).toHaveValue("0");
  await expect(
    page.getByRole("combobox", { name: "Ranked", exact: true })
  ).toHaveValue("0");
});
