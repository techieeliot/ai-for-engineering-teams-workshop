---
description: Verify a component compiles, lints, tests, and renders with mock data
argument-hint: src/components/<Component>.tsx
allowed-tools: Bash(npm run type-check), Bash(npm run lint), Bash(npx vitest related --run:*), Read
---

Verify the component at **$1** and return a pass/fail summary.

Checks:
1. **Types:** `npm run type-check` (tsc --noEmit) — must pass.
2. **Lint:** `npm run lint` on the file — must pass.
3. **Tests:** `npx vitest related --run $1` — the related tests must pass. If none
   exist, note it and recommend adding a co-located `*.test.tsx` per
   `docs/guides/GUIDE-006-test-structure.md`.
4. **Renders with mock data:** confirm the component accepts `Customer` data from
   `src/data/mock-customers.ts` and renders its acceptance-criteria fields.
5. **Responsive/theme:** confirm it uses theme tokens (light/dark) and responsive
   classes rather than hard-coded colors/sizes.

Output a concise **PASS / FAIL** summary with a bullet per check and any specific
issues to fix.
