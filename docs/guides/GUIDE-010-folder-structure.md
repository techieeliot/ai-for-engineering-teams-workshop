---
id: GUIDE-010
title: Folder Structure
type: guide
status: accepted
description: >-
  Where code lives in this repo (app/components/ui/lib/data) and placement
  rules for routes, features, primitives, logic, and types.
updated: 2026-07-23
related: [ADR-001, GUIDE-004]
---

# GUIDE-010: Folder Structure

Where things live in this repo, and where new code should go.

## Layout

```
src/
  app/                  # Next.js App Router (routes, layouts, API handlers)
    layout.tsx          # root layout (fonts, html shell)
    page.tsx            # dashboard home
    globals.css         # Tailwind import + theme tokens (light/dark)
    api/                # Route Handlers: api/<resource>/route.ts
  components/           # feature components (CustomerCard, widgets, forms)
    ui/                 # shadcn/ui primitives (owned but pristine — ADR-001)
  lib/                  # framework-agnostic logic (utils, services, helpers)
    utils.ts            # cn() and shared helpers
  data/                 # mock data + domain types (Customer)

docs/                   # documentation system (see docs/README.md)
  prds/                 # PRD-NNN-*.md product requirements (input to specs)
  specs/                # SPEC-NNN-*.md specifications
  adrs/                 # ADR-NNN-*.md decisions
  guides/               # GUIDE-NNN-*.md standards & how-tos
  rfcs/                 # RFC-NNN-*.md proposals
tests/                  # shared test setup/utilities (see GUIDE-006)
exercises/              # EXERCISE-NNN-*.md workshop exercises
```

## Placement rules

- **Routes & API** → `src/app/`. App Router only (no `pages/`). Server Components
  by default; `"use client"` only when needed.
- **Feature components** → `src/components/<Name>.tsx`. These compose primitives
  and hold feature logic. One component per file; export a typed props interface.
- **Primitives** → `src/components/ui/`. Do not put feature logic here (see
  [ADR-001](../adrs/ADR-001-shadcn-ownership-model.md)).
- **Business logic / services / pure functions** → `src/lib/` (e.g.
  `healthCalculator.ts`, `alerts.ts`, `CustomerService.ts`). Keep them pure and
  testable; UI imports from here.
- **Types & mock data** → `src/data/`. Domain types (e.g. `Customer`) have a
  single source of truth.
- **Tests** → co-located next to the unit (see
  [GUIDE-006](./GUIDE-006-test-structure.md)).

## Import aliases (from `tsconfig`/`components.json`)
- `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`
- Prefer aliases over deep relative paths (`../../..`).

## Rule of thumb
> If it renders, it's in `components/`. If it computes, it's in `lib/`. If it's a
> route, it's in `app/`. If it's a primitive, it's in `components/ui/`.
