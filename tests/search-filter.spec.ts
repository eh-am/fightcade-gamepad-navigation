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
    await expect(page.getByRole("listbox", { name: "Genre" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("listbox", { name: "Release Year" })
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("listbox", { name: "System", exact: true })
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByRole("listbox", { name: "Ranked", exact: true })
    ).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(
      page.getByRole("listbox", { name: "System", exact: true })
    ).toBeFocused();
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

  await page.getByRole("listbox", { name: "Genre" }).focus();
  await page.getByRole("listbox", { name: "Genre" }).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-genre").nth(1)).toHaveValue("1");

  await page.getByRole("listbox", { name: "Release Year" }).focus();
  await page.getByRole("listbox", { name: "Release Year" }).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-release year").nth(1)).toHaveValue("1");

  await page.getByRole("listbox", { name: "System", exact: true }).focus();
  await page.getByRole("listbox", { name: "System", exact: true }).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-system").nth(1)).toHaveValue("1");

  await page.getByRole("listbox", { name: "Ranked" }).focus();
  await page.getByRole("listbox", { name: "Ranked" }).click();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.getByTestId("select-ranked").nth(1)).toHaveValue("1");

  await page.getByRole("button", { name: "Clear Filters" }).click();

  await expect(page.getByTestId("select-genre").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-release year").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-system").nth(1)).toHaveValue("0");
  await expect(page.getByTestId("select-ranked").nth(1)).toHaveValue("0");
});

// TODO:
test("upon clicking it should focus on the first item", async ({ page }) => {});

test("it escapes to next item when pressing right arrow in an open select", async ({
  page,
}) => {
  await page.goto("/testdata/search-filter/");

  await page.getByLabel("Genre").nth(1).focus();
  await page.getByLabel("Genre").nth(1).click();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Release year").nth(1)).toBeFocused();
});
