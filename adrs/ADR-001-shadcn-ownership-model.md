---
id: ADR-001
title: shadcn/ui Ownership Model
type: adr
status: accepted
description: >-
  Decision to treat src/components/ui as owned-but-pristine: extend via
  composition, theme via tokens, add/update via the shadcn CLI.
deciders: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
related: [GUIDE-001, SPEC-010]
---

# ADR-001: shadcn/ui Ownership Model

- **Status:** Accepted
- **Date:** 2026-07-23
- **Deciders:** Dashboard maintainers

## Context

shadcn/ui is not a dependency in the usual sense. The CLI **copies component
source into this repo** at `src/components/ui/` (configured by `components.json`,
`radix-luma` style, `zinc` base color, lucide icons). Because we hold the source,
we own it — which raises governance questions a normal npm library never does:

- May feature work edit the primitives directly, or should they stay pristine?
- Where do customizations live?
- How do we pull upstream fixes without clobbering local changes?
- Who is responsible for the primitives vs the features built on them?

Without a decision, `src/components/ui/` drifts: business logic leaks into
primitives, colors get hard-coded, and upstream fixes become impossible to apply.

## Decision

Treat `src/components/ui/` as **owned but pristine**.

1. **Edit policy — pristine primitives.** Do not add feature logic to files in
   `src/components/ui/`. Edit them only for cross-cutting concerns (e.g. a global
   style/behavior change that applies to every usage), and keep such edits small
   and documented.
2. **Customization boundary.** All feature-specific behavior lives in
   `src/components/` (e.g. `CustomerCard.tsx`, widgets) which *compose* the
   primitives. Extend a primitive via `className` merged with `cn()`
   (`@/lib/utils`) and composition — never by forking it.
3. **Theming is centralized.** Visual theming lives in `src/app/globals.css` as
   design tokens (light + dark). Components consume tokens (`bg-card`,
   `text-foreground`, `text-muted-foreground`, `border`, `primary`,
   `destructive`) — never hard-coded colors.
4. **Add/update via the CLI.** New primitives are added with
   `npx shadcn@latest add <name>`; `components.json` is authoritative. When a
   component is unavailable under the current style, author it manually following
   the existing primitives' conventions (see `src/components/ui/form.tsx`, added
   this way against the combined `radix-ui` import style).
5. **Drift management — overwrite + diff-review.** To pull an upstream fix,
   re-run `shadcn add <name> --overwrite` on a clean working tree and review the
   diff, re-applying any intentional local edits. Keep local edits minimal so
   this stays cheap.
6. **Relaxed rules for generated files.** `src/components/ui/` follows shadcn's
   generated conventions and is exempt from house-style rules that would fight
   the generator (e.g. it may use default exports and terse internal names).
   Feature components in `src/components/` follow the full house style.

## Consequences

**Positive**
- Upstream fixes remain applyable; primitives stay recognizable to anyone who
  knows shadcn/ui.
- A clear seam (primitive vs feature) keeps business logic testable and the
  design system consistent.
- Dark mode and rebrands are one place (tokens), not N components.

**Negative / trade-offs**
- Requires discipline: the temptation to "just tweak the primitive" must be
  redirected into a wrapper.
- Manual components (like `form.tsx`) are not CLI-updatable and must be
  maintained by hand.

## Related

- Guide: [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md)
- Spec: [SPEC-010-code-quality](../specs/SPEC-010-code-quality.md)
