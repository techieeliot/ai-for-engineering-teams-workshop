# Tests

Shared test setup and cross-cutting test utilities. Per
[GUIDE-006 Test Structure](../docs/guides/GUIDE-006-test-structure.md), unit and
component tests live **co-located** next to the code they cover
(`healthCalculator.test.ts` beside `healthCalculator.ts`); this directory is for
things that don't belong to a single unit.

## What lives here
- Test runner setup (e.g. `vitest.setup.ts`, jsdom/RTL config)
- Shared fixtures and factories (e.g. realistic `Customer` builders)
- Custom matchers and test helpers
- Integration/e2e suites that span multiple units

## What does not
- Per-unit tests — keep those co-located with the source (see GUIDE-006).

## Setup (not yet installed)
The repo does not ship a test runner yet. Recommended stack: **Vitest** +
**@testing-library/react** + **@testing-library/jest-dom**, with
`"test": "vitest"` in `package.json`. See GUIDE-006 for structure and coverage
expectations.
