---
id: GUIDE-004
title: House Style
type: guide
status: accepted
description: >-
  Baseline naming, TypeScript, React/Next.js (server/client boundary), export,
  and loading/error-state conventions for all code.
updated: 2026-07-23
related: [SPEC-010, ADR-002, GUIDE-001]
---

# GUIDE-004: House Style

Baseline conventions for all code in this repo. Backs
[SPEC-010-code-quality](../specs/SPEC-010-code-quality.md).

## Naming
- Descriptive names; no abbreviations (`button` not `btn`, `user` not `usr`).
- `camelCase` for variables/functions, `PascalCase` for components and types,
  `SCREAMING_SNAKE_CASE` for module-level constants.
- Files: components `PascalCase.tsx`; utilities/hooks `camelCase.ts`; docs follow
  the `TYPE-NNN-kebab` convention (see
  [GUIDE-008](./GUIDE-008-documentation-standards.md)).

## TypeScript
- `strict` mode is on; no `any` — prefer precise types or `unknown` + narrowing.
- Every component exports a typed props interface (`CustomerCardProps`).
- Share domain types (e.g. `Customer`) from a single source
  (`src/data/mock-customers.ts`); don't redefine them per component.

## React / Next.js
- **Server Components by default**; add `"use client"` only when a component
  needs state, effects, or browser APIs.
- Prefer **named exports** for components. Use `export default` where the
  framework or the dashboard's dynamic loader expects it — e.g. `app/page.tsx`,
  and dashboard components loaded via `require(...).default` (such as
  `CustomerCard`). See [ADR-003](../adrs/ADR-003-documentation-precedence.md).
- Extract reusable logic into custom hooks (`useX`).
- Always render explicit **loading** and **error** states for async work.
- Use semantic JSX that describes purpose, not appearance.

## Styling
- Follow [GUIDE-001 CSS & UI Systems](./GUIDE-001-css-ui-systems.md): tokens only,
  compose shadcn primitives, no forking.

## Comments
- Follow [ADR-002 Code Comments](../adrs/ADR-002-code-comments.md): explain the
  *why*, not the *what*.

## Checklist
- [ ] Descriptive names; correct casing
- [ ] Typed props interface exported; no `any`
- [ ] Server/Client boundary correct (`"use client"` only when needed)
- [ ] Named exports; reusable logic in hooks
- [ ] Explicit loading/error states
- [ ] `npm run lint` and `npm run type-check` pass
