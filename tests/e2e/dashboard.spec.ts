import { expect, test } from "@playwright/test";

test.describe("Customer Intelligence Dashboard", () => {
  test("renders the CustomerCard demo with mock data", async ({ page }) => {
    await page.goto("/");

    // Page shell
    await expect(
      page.getByRole("heading", { name: "Customer Intelligence Dashboard" }),
    ).toBeVisible();

    // CustomerCard implemented banner + the first two mock customers
    await expect(page.getByText("CustomerCard implemented")).toBeVisible();
    await expect(page.getByText("John Smith")).toBeVisible();
    await expect(page.getByText("Acme Corp")).toBeVisible();
    await expect(page.getByText("Sarah Johnson")).toBeVisible();

    // Health badges reflect the health-color thresholds (SPEC-001)
    await expect(page.getByText(/85 · Healthy/)).toBeVisible(); // John Smith
    await expect(page.getByText(/45 · Warning/)).toBeVisible(); // Sarah Johnson
  });

  test("has no uncaught page errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await expect(page.getByText("John Smith")).toBeVisible();
    expect(errors).toEqual([]);
  });
});
