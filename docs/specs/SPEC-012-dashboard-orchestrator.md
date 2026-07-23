---
id: SPEC-012
title: Dashboard Orchestrator
type: spec
status: draft
description: >-
  Integration spec that composes every widget into a resilient dashboard: shared
  selection state, error-isolated layout, and export, per PRD-006.
owner: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
source: docs/prds/PRD-006-production-ready-dashboard.md
related: [SPEC-001, SPEC-002, SPEC-003, SPEC-004, SPEC-005, SPEC-006, SPEC-009]
tags: [integration, orchestration, dashboard]
---

# Feature: Dashboard Orchestrator

Derived from **PRD-006** (production-ready dashboard). Composes all widgets into
one cohesive, resilient dashboard. Distinct from [SPEC-006](./SPEC-006-production-ready-dashboard.md),
which specifies the cross-cutting *hardening* (error boundaries, export, perf,
security) this orchestrator applies.

## Context
- Single entry point that assembles CustomerSelector + the widgets into a layout
- Owns shared selection state and distributes it; isolates widget failures
- Applies the production hardening from SPEC-006

## Dependencies
| Spec | Role |
| --- | --- |
| [SPEC-002](./SPEC-002-customer-selector.md) | Selection source (owns selected customer) |
| [SPEC-001](./SPEC-001-customer-card.md) | Card rendered within the selector |
| [SPEC-003](./SPEC-003-health-score-calculator.md) | Health widget consumer |
| [SPEC-004](./SPEC-004-market-intelligence.md) | Market widget consumer (uses company) |
| [SPEC-005](./SPEC-005-predictive-alerts.md) | Alerts widget consumer |
| [SPEC-006](./SPEC-006-production-ready-dashboard.md) | Error boundaries, export, perf, security |
| [SPEC-009](./SPEC-009-accessibility.md) | A11y landmarks/keyboard across the shell |

## Requirements
- App shell with landmarks/navigation; responsive grid hosting each widget
- **Shared selection state:** one source of truth (context/store) for the selected customer,
  distributed to health/market/alerts widgets
- **Error isolation:** each widget wrapped in `WidgetErrorBoundary` (SPEC-006) so one failure
  degrades gracefully without crashing the dashboard
- **Export:** aggregate export (SPEC-006 `ExportUtils`) pulls from all widget data sources
- Consistent loading/empty/error states; light/dark via theme tokens

## Data Flow
```
                 ┌───────────────► CustomerHealthDisplay (SPEC-003)
CustomerSelector │  selectedCustomer
   (SPEC-002) ───┼───────────────► MarketIntelligenceWidget (SPEC-004, via company)
   selection     │
   state ────────┼───────────────► PredictiveAlertsWidget (SPEC-005)
                 │
                 └──────► ExportUtils (SPEC-006) ◀── reads all widget data → CSV/JSON
Each widget is wrapped in WidgetErrorBoundary (SPEC-006); shell = DashboardErrorBoundary.
```

## Integration Architecture
- **Component interaction:** `DashboardOrchestrator` renders the shell + a
  `SelectionProvider`; `CustomerSelector` updates selection; widgets read it via context.
- **Data flow:** selection → context → each widget derives its own data (health/market/alerts);
  export reads the aggregate.
- **Key integration points:** the `SelectionContext` contract; per-widget error-boundary
  wrapping; the export data-source registry.
- **Dependencies on prior specs:** SPEC-001–005 (widgets), SPEC-006 (hardening), SPEC-009 (a11y).

## Constraints
- Next.js 15 App Router, React 19, TypeScript strict mode
- Server Components by default; the SelectionProvider + interactive widgets are Client Components
- Reuse shadcn primitives + theme tokens; never fork primitives (ADR-001)

## Testing Requirements
- Integration: selecting a customer updates all three widgets from shared state
- Resilience: a thrown error in one widget shows its fallback; siblings keep working
- Export: aggregate export includes each source; cancellation works

## Standards & References
- **Code:** [GUIDE-004 House Style](../guides/GUIDE-004-house-style.md), [GUIDE-010 Folder Structure](../guides/GUIDE-010-folder-structure.md)
- **UI:** [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md), [ADR-001 shadcn/ui Ownership](../adrs/ADR-001-shadcn-ownership-model.md)
- **Resilience & release:** [SPEC-006](./SPEC-006-production-ready-dashboard.md), [GUIDE-005 Code Review](../guides/GUIDE-005-code-review.md), [GUIDE-006 Test Structure](../guides/GUIDE-006-test-structure.md)
- **Accessibility:** [GUIDE-003 Accessibility](../guides/GUIDE-003-accessibility.md), [SPEC-009](./SPEC-009-accessibility.md)

## Acceptance Criteria
- [ ] Shared selection state drives health/market/alerts widgets from one source
- [ ] Each widget is error-isolated (one failure does not crash the dashboard)
- [ ] Aggregate CSV/JSON export pulls from all widget data sources
- [ ] Responsive shell with landmarks; light/dark via tokens
- [ ] Integration + resilience tests pass; passes TypeScript strict mode
