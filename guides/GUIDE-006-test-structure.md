---
id: GUIDE-006
title: Test Structure
type: guide
status: accepted
description: >-
  Vitest + React Testing Library setup, co-located files, arrange/act/assert,
  and what to cover (pure functions, boundaries, component states).
updated: 2026-07-23
related: [SPEC-003, SPEC-005, GUIDE-005]
---

# GUIDE-006: Test Structure

How to structure tests in this repo. Several specs (health-score calculator,
predictive alerts) require comprehensive unit coverage; this guide defines the
shape that coverage should take.

## Tooling

The repo does not ship a test runner yet. Recommended setup for Next.js 15 +
React 19:

- **Vitest** as the runner (fast, ESM-native, TS out of the box)
- **@testing-library/react** + **@testing-library/jest-dom** for components
- Add a `test` script: `"test": "vitest"` and `"test:run": "vitest run"`

## File placement & naming
- Co-locate tests next to the unit under test: `healthCalculator.test.ts` beside
  `healthCalculator.ts`; `CustomerCard.test.tsx` beside the component.
- One test file per module; describe blocks per function/behavior.

## Structure — Arrange / Act / Assert
```ts
import { describe, it, expect } from "vitest"
import { calculateHealthScore } from "./healthCalculator"

describe("calculateHealthScore", () => {
  it("weights payment 40%, engagement 30%, contract 20%, support 10%", () => {
    const input = /* arrange: realistic factor inputs */
    const result = calculateHealthScore(input)          // act
    expect(result.score).toBeCloseTo(/* expected */)    // assert
  })
})
```

## What to cover (per the specs)
- **Pure functions first** — the calculator and alert rules are pure; test them
  directly with no mocks.
- **Boundaries** — risk thresholds (0, 30, 31, 70, 71, 100), empty/missing data,
  new-customer defaults.
- **Validation & errors** — invalid inputs throw the documented error classes.
- **Realistic scenarios** — representative customer profiles from
  `src/data/mock-customers.ts`.
- **Components** — render with mock data; assert visible output and states
  (loading, error, empty), not implementation details.
- **Accessibility** — where practical, assert roles/names (pairs with
  [GUIDE-003](./GUIDE-003-accessibility.md)); consider axe-core in integration
  tests.

## Principles
- Deterministic: no real time/network/randomness — inject or mock them.
- Test behavior and contracts, not internals.
- A bug fix gets a regression test.

## Checklist
- [ ] Pure logic unit-tested directly, including boundaries
- [ ] Validation/error paths asserted
- [ ] Component states (loading/error/empty) covered
- [ ] Deterministic (no real time/network/random)
- [ ] `npm run test:run` passes
