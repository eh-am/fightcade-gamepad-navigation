import { test, expect, Page } from "@playwright/test";

const PO = {
  FILTER_BTN: (page: Page) =>
    page.getByRole("button", { name: "filters", exact: true }),

  // TODO: find a better selector
  INPUT_BOX: (page: Page) =>
    page.getByRole("textbox", { name: "Search games" }),
};

test("it navigates the grid", async ({ page }) => {
  await page.goto("/testdata/search-results/");

  await page.getByRole("grid").getByRole("gridcell").first().focus();
  await expect(
    page.getByRole("gridcell", {
      name: "The King of Fighters 2002 (NGM-2650) - Arcade FC2",
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("gridcell", {
      name: "Street Fighter III 3rd Strike: Fight for the Future (Japan 990512, NO CD) - Arcade FC2",
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("gridcell", {
      name: "JoJo's Bizarre Adventure: Heritage for the Future / JoJo no Kimyou na Bouken: Mirai e no Isan (Japan 990913, NO CD) - Arcade FC2",
      exact: true,
    })
  ).toBeFocused();
});
