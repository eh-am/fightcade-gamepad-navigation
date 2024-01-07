import { test, expect, Page } from "@playwright/test";

const GAME_NAMES = {
  KOF_98:
    "The King of Fighters '98 - The Slugfest / King of Fighters '98 - dream match never ends (NGM-2420) - Arcade FC2",
  KOF_2002: "The King of Fighters 2002 (NGM-2650) - Arcade FC2",
  SF_3: "Street Fighter III 3rd Strike: Fight for the Future (Japan 990512, NO CD) - Arcade FC2",
  SF_2: "Super Street Fighter II X - grand master challenge (super street fighter 2 X 940223 Japan) - Arcade FC2",
  //  JOJO: "JoJo's Bizarre Adventure: Heritage for the Future / JoJo no Kimyou na Bouken: Mirai e no Isan (Japan 990913, NO CD) - Arcade FC2",
};

test("it navigates the grid", async ({ page }) => {
  await page.goto("/testdata/search-results/");

  await page.getByRole("grid").getByRole("gridcell").first().focus();
  await expect(
    page.getByRole("gridcell", {
      name: GAME_NAMES.KOF_98,
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("gridcell", {
      name: GAME_NAMES.KOF_2002,
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("gridcell", {
      name: GAME_NAMES.KOF_98,
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("gridcell", {
      name: GAME_NAMES.SF_2,
      exact: true,
    })
  ).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(
    page.getByRole("gridcell", {
      name: GAME_NAMES.KOF_98,
      exact: true,
    })
  ).toBeFocused();
});
