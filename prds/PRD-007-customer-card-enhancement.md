---
id: PRD-007
title: CustomerCard Enhancement
type: prd
status: accepted
description: >-
  Product requirements for adding click-to-select behavior and selected-state
  visual feedback to CustomerCard, preserving existing behavior.
created: 2026-07-23
updated: 2026-07-23
spec: SPEC-007
related: [SPEC-007, GUIDE-001, ADR-001, GUIDE-003]
---

# CustomerCard Enhancement Requirements

## Business Context
- Enhance existing CustomerCard component to support selection functionality
- Enable users to click on customer cards to select them
- Provide visual feedback for selected state
- Build incrementally on the working CustomerCard component

## Functional Requirements
- Make CustomerCard clickable to select/deselect
- Show visual indication when customer is selected (border highlight, background change)
- Support only single selection at a time
- Maintain all existing CustomerCard functionality (health score colors, styling)
- Pass selection events up to parent component

## Incremental Development Approach
- **Loop 1**: Add click handling without breaking existing functionality
- **Loop 2**: Add visual selection state with clear feedback
- Preserve all current CustomerCard features throughout enhancement

## UI Components (shadcn/ui)
- Reuse the existing `Card` primitive (`src/components/ui/card.tsx`); express the selected state with theme tokens (`ring`/`ring-primary`, `border-primary`, or `bg-accent`) via conditional classes — do not fork the component
- Optionally use `Toggle` (`src/components/ui/toggle.tsx`) if a dedicated pressable affordance is preferred over a clickable card
- Mark the selected card with a lucide `Check` icon and correct `aria-pressed` / selection semantics
- Keep the health-score `Badge` from the base CustomerCard intact