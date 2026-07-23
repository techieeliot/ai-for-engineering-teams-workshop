---
description: Implement a component from its SPEC, per repo standards, and verify it
argument-hint: @docs/specs/SPEC-NNN-<feature>.md
---

Implement the component specified by **$1**.

Steps:
1. Read the spec at `$1` (and its `source:` PRD for context).
2. Create the component at `src/components/<ComponentName>.tsx` (the path in the
   spec's File Structure section; `src/components/`, not bare `components/`).
3. Follow the spec's **Standards & References**:
   - Build on shadcn primitives from `src/components/ui/`; never fork them (ADR-001)
   - Theme tokens only, no hard-coded colors (GUIDE-001)
   - Accessibility per GUIDE-003; house style + typed exported props per GUIDE-004
   - Reuse shared helpers (e.g. `src/lib/health.ts`) rather than duplicating logic
4. Verify against the spec's **Acceptance Criteria**; iterate until each is met.
5. Run `npm run type-check` and `npm run lint`; fix any issues.

If the component needs a pure-function library (calculator, engine), put it in
`src/lib/` per the spec and keep it testable.
