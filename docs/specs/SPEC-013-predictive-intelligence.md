---
id: SPEC-013
title: Predictive Customer Intelligence
type: spec
status: draft
description: >-
  Integration spec composing predictive alerts (SPEC-005) and market
  intelligence (SPEC-004) into a combined risk + sentiment view for the selected
  customer.
owner: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
source: docs/prds/PRD-005-predictive-alerts.md
related: [SPEC-002, SPEC-004, SPEC-005]
tags: [integration, alerts, market, intelligence]
---

# Feature: Predictive Customer Intelligence

Derived from **PRD-005** (predictive alerts) + **PRD-004** (market intelligence).
Combines internal risk signals with external market sentiment.

## Context
- Blend risk alerts (internal signals) with market sentiment (external signals)
  for the selected customer's company into one predictive view
- Helps analysts see when internal risk aligns with negative market news

## Dependencies
| Spec | Role |
| --- | --- |
| [SPEC-002](./SPEC-002-customer-selector.md) | Provides the selected customer + company |
| [SPEC-004](./SPEC-004-market-intelligence.md) | Company sentiment + headlines |
| [SPEC-005](./SPEC-005-predictive-alerts.md) | Risk alerts for the customer |

## Requirements
- For the selected customer, fetch market sentiment (SPEC-004) by company and evaluate
  risk alerts (SPEC-005) in parallel
- Combine into an intelligence summary: risk level + market sentiment + a derived
  "watch" signal when both are negative (high-priority alert AND negative sentiment)
- Show top alerts alongside top headlines with a combined indicator
- Consistent loading/error states; degrade gracefully if the market API fails
  (still show alerts) or vice versa

## Data Flow
```
CustomerSelector ──selectedCustomer──▶ PredictiveIntelligence
     (SPEC-002)         │ company            │
                        ├──▶ MarketIntelligenceService (SPEC-004) ──sentiment, headlines──┐
                        └──▶ alertEngine (SPEC-005) ──alerts[]──────────────────────────┐ │
                                                                                        ▼ ▼
                                                              combine() ──▶ watch signal + summary view
```

## Integration Architecture
- **Component interaction:** a `PredictiveIntelligence` container reads the selection,
  calls the market service and the alert engine concurrently, and renders a combined panel.
- **Data flow:** company → market sentiment; customer → alerts; both → `combine()` →
  a derived watch signal (e.g. High-priority alert ∧ negative sentiment).
- **Key integration points:** company extraction from the selected customer; the
  concurrent fetch/evaluate; the `combine()` contract producing the watch signal.
- **Dependencies on prior specs:** SPEC-002 (selection), SPEC-004 (market), SPEC-005 (alerts).

## Constraints
- Next.js 15 App Router, React 19, TypeScript strict mode
- `combine()` is a pure function (testable); UI is a Client Component
- Reuse shadcn primitives + shared color mapping (risk vs sentiment kept visually distinct)

## Testing Requirements
- Unit: `combine()` watch-signal logic across all risk×sentiment combinations
- Resilience: market failure still renders alerts; alert failure still renders sentiment
- Deterministic (mock service + engine)

## Standards & References
- **Code:** [GUIDE-004 House Style](../guides/GUIDE-004-house-style.md), [GUIDE-010 Folder Structure](../guides/GUIDE-010-folder-structure.md)
- **UI & API:** [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md), [GUIDE-009 Technical Recipes](../guides/GUIDE-009-technical-recipes.md)
- **Tests:** [GUIDE-006 Test Structure](../guides/GUIDE-006-test-structure.md)

## Acceptance Criteria
- [ ] Combines market sentiment and risk alerts for the selected customer
- [ ] Derives a watch signal when a high-priority alert coincides with negative sentiment
- [ ] Degrades gracefully if either the market API or alert evaluation fails
- [ ] `combine()` is pure and unit-tested across combinations
- [ ] Passes TypeScript strict mode
