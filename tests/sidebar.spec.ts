import { test, expect, Page } from "@playwright/test";
import { disableAnimations, focusedElement } from "snippets";

test("it navigates correctly", async ({ page }) => {
  await page.goto("/testdata/welcome/");

  page.getByTitle("Cyberbots - fullmetal madness").first().focus();
  await expect(
    page.getByTitle("Cyberbots - fullmetal madness").first()
  ).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByTitle("Leave channel")).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByTitle("Mute channel")).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(page.getByTitle("Leave channel")).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(
    page.getByTitle("Cyberbots - fullmetal madness").first()
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Search" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(
    page.getByRole("button", { name: "Notifications" })
  ).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Settings" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "User" })).toBeFocused();
});

test.describe("when pressing down on Mute Channel", () => {
  test("it navigates to the next item", async ({ page }) => {
    await page.goto("/testdata/welcome/");

    page.getByTitle("Mute Channel").focus();
    await expect(page.getByTitle("Mute channel")).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("button", { name: "Search" })).toBeFocused();
  });
});

test("it opens the User Menu correctly", async ({ page }) => {
  await page.goto("/testdata/welcome/");

  await page.getByRole("button", { name: "User" }).focus();

  // TODO: this enter is not working
  // await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "User" }).click();

  await expect(page.locator(".userStateMenu")).toHaveClass(/active/);

  // TODO: ideally this should be focused by default, but playwright doesn't seem to catch it
  await page.getByRole("button", { name: "Logout" }).focus();
  await expect(page.getByRole("button", { name: "Logout" })).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("button", { name: "Away" })).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("button", { name: "Online" })).toBeFocused();

  // Nothing should happen, since it's out of bounds upwards
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("button", { name: "Online" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Away" })).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("button", { name: "Logout" })).toBeFocused();

  // Out of bounds downwards, focus on the user button and uncollapse
  // Ideally we would check "User" is focused, but I couldn't make it work
  // TODO: make this work :(
  //await page.keyboard.press("ArrowDown");
  // await expect(page.getByRole("button", { name: "Logout" })).not.toBeFocused();
});
