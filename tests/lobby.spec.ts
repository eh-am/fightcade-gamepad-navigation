import { test, expect, Page } from "@playwright/test";
//import { test, expect } from "./baseTest";
import { disableAnimations, focusedElement } from "snippets";

test("it navigates the toolbar", async ({ page }) => {
  await page.goto("/testdata/lobby-with-training/");

  await page.getByRole("button", { name: "Test Game" }).focus();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Training" })).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Test Game" })).toBeFocused();
});

test("it navigates the user list", async ({ page }) => {
  await page.goto("/testdata/lobby-with-training/");

  await page.locator("tag=.channelToolbar").focus();
  await expect(page.getByRole("button", { name: "Training" })).toBeFocused();
});

//test("it navigaaaaaaaaates", async ({ page }) => {
//  await page.goto("/testdata/lobby-with-training/");
//
//  await page.locator("tag=.channelToolbar").focus();
//  await expect(page.getByRole("button", { name: "Training" })).toBeFocused();
//});
