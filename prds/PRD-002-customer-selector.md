---
id: PRD-002
title: CustomerSelector
type: prd
status: accepted
description: >-
  Product requirements for the CustomerSelector: search/filter and select among
  100+ customers with a persisted visual selection state.
created: 2026-07-23
updated: 2026-07-23
spec: SPEC-002
related: [SPEC-002, GUIDE-001, ADR-001, GUIDE-003]
---

# CustomerSelector Requirements

## Business Context
- Main customer selection interface for the dashboard
- Users need to quickly find and select customers
- Must handle 100+ customers efficiently

## Functional Requirements
- Display customer cards with name, company, health score
- Search/filter customers by name or company
- Visual selection state (highlight selected customer)
- Persist selection across page interactions

## UI Components (shadcn/ui)
- `Input` (`src/components/ui/input.tsx`) — search box
- `Command` (`src/components/ui/command.tsx`) — preferred searchable/filterable list at 100+ scale (built-in filtering + keyboard navigation)
- `ScrollArea` (`src/components/ui/scroll-area.tsx`) — styled scrolling container for the long list
- `Skeleton` (`src/components/ui/skeleton.tsx`) — loading placeholders for cards
- `Toggle Group` — optional filter chips (by risk level / tier)
- lucide `Search` / `X` icons for the search field affordances
- Renders `CustomerCard` with `selected` / `onSelect` (see customer-card-enhancement)