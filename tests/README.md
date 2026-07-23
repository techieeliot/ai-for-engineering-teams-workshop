# Tests

Shared test setup and cross-cutting test utilities. Per
[GUIDE-006 Test Structure](../docs/guides/GUIDE-006-test-structure.md), unit and
component tests live **co-located** next to the code they cover
(`healthCalculator.test.ts` beside `healthCalculator.ts`); this directory is for
things that don't belong to a single unit.

## What lives here
- `setup.ts` — Vitest setup (registers jest-dom matchers)
- `e2e/` — Playwright end-to-end specs (run in a real browser)
- Shared fixtures/factories, custom matchers, and test helpers

## What does not
- Per-unit tests — keep those co-located with the source (see GUIDE-006).

## Running tests
- **Unit / component** — Vitest + Testing Library (jsdom); co-located `*.test.ts(x)`.
  - `npm test` (watch) · `npm run test:run` (one-shot)
- **End-to-end** — Playwright (real browser); specs in `tests/e2e/`.
  - `npm run test:e2e` — spins up a dedicated dev server on `:8080` and drives Chromium
  - First run needs the browser + OS libs: `npx playwright install --with-deps chromium`

Config: `vitest.config.ts` (excludes `tests/e2e/`) and `playwright.config.ts`.
See [GUIDE-006](../docs/guides/GUIDE-006-test-structure.md) for structure and coverage.
