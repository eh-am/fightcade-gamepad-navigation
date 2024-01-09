import { test, expect } from "@playwright/test";

test("it navigates the toolbar", async ({ page }) => {
  await page.goto("/testdata/lobby-with-training/");

  await page.getByRole("button", { name: "Test Game" }).focus();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Training" })).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("button", { name: "Test Game" })).toBeFocused();
});

test("it navigates the user list", async ({ page }) => {
  await page.goto("/testdata/lobby-with-training/");

  await page.getByRole("button", { name: "Player 1" }).focus();
  await expect(page.getByRole("button", { name: "Player 1" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 2" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 3" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 4" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 5" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 6" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Player 6" })).toBeFocused();
});

test("it allows focusing a challenge cancel", async ({ page }) => {
  await page.goto("/testdata/lobby-challenged/");

  await page.getByRole("button", { name: "Cancel Challenge" }).focus();
  await expect(
    page.getByRole("button", { name: "Cancel Challenge" })
  ).toBeFocused();
});

test("it allows focusing a challenge received", async ({ page }) => {
  await page.goto("/testdata/lobby-has-been-challenged/");

  await page.getByRole("button", { name: "Accept Challenge" }).focus();
  await expect(
    page.getByRole("button", { name: "Accept Challenge" })
  ).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Decline Challenge" })
  ).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByRole("button", { name: "Accept Challenge" })
  ).toBeFocused();
});
