---
id: SPEC-002
title: CustomerSelector
type: spec
status: draft
description: >-
  Spec for the CustomerSelector container: search/filter across 100+ customers,
  single selection state, and CustomerCard grid composition.
owner: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
source: prds/PRD-002-customer-selector.md
related: [SPEC-001, SPEC-007]
tags: [customer, ui, search, selection]
---

# Feature: CustomerSelector Component

## Context
- Main customer selection interface for the Customer Intelligence Dashboard
- Users need to quickly find and select a customer among many
- Must handle 100+ customers efficiently
- Container for `CustomerCard`; owns selection state and search/filter

## Requirements

### Functional Requirements
- Display customer cards with name, company, and health score
- Search/filter customers by name or company
- Maintain visual selection state (highlight the selected customer)
- Persist the selection across page interactions
- Handle 100+ customers with responsive performance

### User Interface Requirements
- Search input with clear, immediate filtering feedback
- Responsive grid/list of `CustomerCard` components
- Empty state when no customers match the search
- Loading state while customers are being fetched

### Data Requirements
- Consumes `Customer[]` (initially `mockCustomers` from `src/data/mock-customers.ts`)
- Filters on `name` and `company` (case-insensitive)
- Tracks selected customer by `id`
- Persist selection (e.g. `localStorage` or URL search param) so it survives interactions

### Integration Requirements
- Renders `CustomerCard` with `selected` and `onSelect` (see customer-card-enhancement-spec)
- Exposes selection upward (callback/prop or shared state) for widgets that react to the selected customer (health, market intelligence)

### UI Components (shadcn/ui)
- **Input** (`@/components/ui/input`) — the search box
- **Command** (`@/components/ui/command`) — preferred for a searchable/filterable list at 100+ scale (built-in filtering + keyboard nav)
- **ScrollArea** (`@/components/ui/scroll-area`) — styled scrolling container for the long list
- **Skeleton** (`@/components/ui/skeleton`) — loading placeholders for cards
- **Toggle Group** (`@/components/ui/toggle-group`) — optional filter chips (by risk level / tier)
- lucide **Search** / **X** icons for the search field affordances

## Constraints

### Technical Stack
- Next.js 15 (App Router), React 19, TypeScript strict mode
- Tailwind CSS v4 with shadcn/ui theme tokens

### Performance Requirements
- Efficient filtering and rendering for 100+ customers (memoize filtered list; avoid unnecessary re-renders)
- Consider virtualization if the flat list grows large

### File Structure and Naming
- Component file: `src/components/CustomerSelector.tsx`
- Props interface: `CustomerSelectorProps`, exported
- Reuse shadcn primitives from `src/components/ui/`

### Security Considerations
- Treat search input as plain text; never interpolate into HTML
- Render all customer fields as text only

## Standards & References
Implement this spec per the repo's standards:
- **Code:** [GUIDE-004 House Style](../guides/GUIDE-004-house-style.md), [ADR-002 Code Comments](../adrs/ADR-002-code-comments.md), [GUIDE-010 Folder Structure](../guides/GUIDE-010-folder-structure.md)
- **UI:** [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md), [ADR-001 shadcn/ui Ownership](../adrs/ADR-001-shadcn-ownership-model.md), [GUIDE-003 Accessibility](../guides/GUIDE-003-accessibility.md)
- **Tests:** [GUIDE-006 Test Structure](../guides/GUIDE-006-test-structure.md)

## Acceptance Criteria

- [ ] Renders a grid/list of `CustomerCard`s from the provided customers
- [ ] Search filters by name and company, case-insensitively, in real time
- [ ] Selecting a card highlights it and updates single-selection state
- [ ] Selection persists across page interactions
- [ ] Empty and loading states are handled (Skeleton on load, empty message on no matches)
- [ ] Performs acceptably with 100+ customers
- [ ] Uses theme tokens throughout; dark mode works
- [ ] `CustomerSelectorProps` exported; passes TypeScript strict mode checks
