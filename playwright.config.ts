import { defineConfig, devices } from "@playwright/test";

// End-to-end tests run against the Next.js app in a real browser.
// Specs live in tests/e2e (excluded from Vitest). Run with `npm run test:e2e`.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
  },
  // Spins up a dedicated dev server on :8080 for tests, separate from any
  // manually-run dev server on :3000.
  webServer: {
    command: "npm run dev -- --port 8080",
    url: "http://localhost:8080",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
