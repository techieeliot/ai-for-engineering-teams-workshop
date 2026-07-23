---
id: SPEC-011
title: Customer Health Monitoring Integration
type: spec
status: draft
description: >-
  Integration spec composing the health score calculator (SPEC-003) and
  predictive alerts (SPEC-005) into real-time health monitoring driven by the
  selected customer.
owner: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
source: docs/prds/PRD-003-health-score-calculator.md
related: [SPEC-002, SPEC-003, SPEC-005]
tags: [integration, health, alerts, monitoring]
---

# Feature: Customer Health Monitoring Integration

Derived from **PRD-003** (health score calculator) + **PRD-005** (predictive
alerts). Composes existing single-feature specs into one monitoring flow.

## Context
- Continuously monitor the selected customer's health and raise alerts as it degrades
- Ties the pure-function scoring engine to the rule-based alerts engine
- Real-time, explainable, and testable end-to-end

## Dependencies
| Spec | Role |
| --- | --- |
| [SPEC-002](./SPEC-002-customer-selector.md) | Provides the selected customer (selection source) |
| [SPEC-003](./SPEC-003-health-score-calculator.md) | `calculateHealthScore` + `CustomerHealthDisplay` |
| [SPEC-005](./SPEC-005-predictive-alerts.md) | `alertEngine` + `PredictiveAlertsWidget` |

## Requirements
- Subscribe to the current selection (from `CustomerSelector`) and recompute on change
- Compute health via `calculateHealthScore` (SPEC-003) for the selected customer
- Feed score + factor breakdown into `alertEngine` (SPEC-005); evaluate health-derived rules
  (Payment Risk, Contract Expiration Risk that reference `health score < 50`)
- Detect **health-score deltas over time** (e.g. drop > 20 points in 7 days → Payment Risk)
  — requires retaining prior scores per customer (customer state tracking)
- Surface results in both widgets: `CustomerHealthDisplay` (current) and
  `PredictiveAlertsWidget` (raised alerts), kept in sync
- Consistent loading/error states across both widgets

## Data Flow
```
CustomerSelector ──selectedCustomer──▶ HealthMonitoring
        │                                   │
        │                        calculateHealthScore()  (SPEC-003)
        │                                   │ score + factors
        │                          prior-score store ──delta──┐
        │                                   ▼                 ▼
        │                              alertEngine(customer, score, delta)  (SPEC-005)
        ▼                                   │ alerts[]
  CustomerHealthDisplay ◀──score/factors────┘──alerts──▶ PredictiveAlertsWidget
```

## Integration Architecture
- **Component interaction:** `CustomerSelector` owns selection → a `HealthMonitoring`
  container (or shared context) derives score and alerts → renders `CustomerHealthDisplay`
  and `PredictiveAlertsWidget`.
- **Data flow:** selection id → `Customer` → `calculateHealthScore` → `{score, factors}` →
  combined with a per-customer prior-score store to compute deltas → `alertEngine` → `alerts[]`.
- **Key integration points:** selection subscription; the score→alerts hand-off contract
  (`HealthResult` shape from SPEC-003 consumed by SPEC-005); shared risk-level/color mapping.
- **Dependencies on prior specs:** SPEC-002 (selection), SPEC-003 (score), SPEC-005 (alerts).

## Constraints
- Next.js 15 App Router, React 19, TypeScript strict mode
- Pure functions for score + rules; the monitoring layer holds the only stateful piece
  (prior-score store) and stays thin and testable
- Reuse shadcn primitives; shared risk-level color mapping (no duplication)

## Testing Requirements
- Unit: delta detection (boundary at 20-point drop / 7-day window), score→alert hand-off
- Scenario: a declining customer over time raises the expected alerts; a stable one does not
- Deterministic (inject clock/prior-score store; no real time)

## Standards & References
- **Code:** [GUIDE-004 House Style](../guides/GUIDE-004-house-style.md), [GUIDE-010 Folder Structure](../guides/GUIDE-010-folder-structure.md)
- **UI:** [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md), [GUIDE-003 Accessibility](../guides/GUIDE-003-accessibility.md)
- **Tests:** [GUIDE-006 Test Structure](../guides/GUIDE-006-test-structure.md)

## Acceptance Criteria
- [ ] Selecting a customer recomputes score and alerts in real time
- [ ] Health-score deltas over time are detected and drive the health-derived rules
- [ ] `CustomerHealthDisplay` and `PredictiveAlertsWidget` stay in sync for the selection
- [ ] Score→alert hand-off uses a typed contract shared by SPEC-003/SPEC-005
- [ ] Unit + scenario tests pass; passes TypeScript strict mode
