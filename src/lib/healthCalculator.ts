/**
 * Customer health scoring (SPEC-003).
 *
 * Pure, side-effect-free functions: four factor scorers (each 0-100) combined by
 * a weighted average into an overall 0-100 score, then classified into a risk
 * level via the shared mapping in `./health`.
 *
 * Weighting (per PRD-003): Payment 40%, Engagement 30%, Contract 20%, Support 10%.
 * Payment is weighted highest because non-payment is the strongest, most direct
 * churn/again signal; support is lowest because it is noisier and lags.
 */
import { healthLevel, type HealthLevel } from "./health";

/** Thrown for invalid inputs so callers can distinguish domain errors. */
export class HealthCalculatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HealthCalculatorError";
  }
}

/** Relative weight of each factor; sums to 1. */
export const HEALTH_WEIGHTS = {
  payment: 0.4,
  engagement: 0.3,
  contract: 0.2,
  support: 0.1,
} as const;

export interface PaymentData {
  /** Days since the customer's most recent payment. */
  daysSinceLastPayment: number;
  /** Average number of days invoices are paid late. */
  averagePaymentDelayDays: number;
  /** Currently overdue amount (same currency; 0 if none). */
  overdueAmount: number;
}

export interface EngagementData {
  /** Distinct login days in the last 30 days. */
  loginsLast30Days: number;
  /** Number of distinct features used recently. */
  featureUsageCount: number;
  /** Open/recent support tickets (a mild engagement-friction signal). */
  supportTickets: number;
}

export interface ContractData {
  /** Days until contract renewal. */
  daysUntilRenewal: number;
  /** Annual contract value (used for prioritization, not the score itself). */
  contractValue: number;
  /** Count of recent upgrades/expansions (a positive signal). */
  recentUpgrades: number;
}

export interface SupportData {
  /** Average ticket resolution time, in hours. */
  averageResolutionHours: number;
  /** Satisfaction/CSAT on a 0-100 scale. */
  satisfactionScore: number;
  /** Number of escalated tickets. */
  escalations: number;
}

export interface HealthInput {
  payment: PaymentData;
  engagement: EngagementData;
  contract: ContractData;
  support: SupportData;
}

export interface FactorBreakdown {
  payment: number;
  engagement: number;
  contract: number;
  support: number;
}

export interface HealthResult {
  /** Weighted overall score, 0-100 (rounded). */
  score: number;
  /** Risk level derived from `score` (SPEC-003 thresholds). */
  level: HealthLevel;
  /** Per-factor sub-scores, each 0-100. */
  factors: FactorBreakdown;
}

const clamp = (n: number, min = 0, max = 100) => Math.min(Math.max(n, min), max);

/** Validate that a field is a finite, non-negative number. */
function requireNonNegative(value: number, field: string): void {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new HealthCalculatorError(
      `${field} must be a finite number >= 0 (got ${value})`,
    );
  }
}

/**
 * Payment factor (0-100). Full marks for on-time payment with nothing overdue;
 * penalized by average lateness, any overdue balance, and long payment gaps.
 */
export function scorePayment(d: PaymentData): number {
  requireNonNegative(d.daysSinceLastPayment, "daysSinceLastPayment");
  requireNonNegative(d.averagePaymentDelayDays, "averagePaymentDelayDays");
  requireNonNegative(d.overdueAmount, "overdueAmount");

  const delayPenalty = Math.min(d.averagePaymentDelayDays, 30) * 2; // 0..60
  const overduePenalty = d.overdueAmount > 0 ? 25 : 0; // 0 or 25
  const stalePenalty = Math.min(Math.max(d.daysSinceLastPayment - 30, 0), 30) * 0.5; // 0..15
  return clamp(100 - delayPenalty - overduePenalty - stalePenalty);
}

/**
 * Engagement factor (0-100). Driven by login frequency and feature breadth;
 * lightly penalized by a high volume of support tickets.
 */
export function scoreEngagement(d: EngagementData): number {
  requireNonNegative(d.loginsLast30Days, "loginsLast30Days");
  requireNonNegative(d.featureUsageCount, "featureUsageCount");
  requireNonNegative(d.supportTickets, "supportTickets");

  const loginScore = Math.min(d.loginsLast30Days / 20, 1) * 60; // 20+ logins => full 60
  const featureScore = Math.min(d.featureUsageCount / 10, 1) * 40; // 10+ features => full 40
  const ticketPenalty = Math.min(d.supportTickets, 10) * 2; // up to -20
  return clamp(loginScore + featureScore - ticketPenalty);
}

/**
 * Contract factor (0-100). Baseline health reduced as renewal approaches without
 * expansion, and boosted by recent upgrades. `contractValue` is intentionally not
 * part of the score — it feeds prioritization (ARR), not health.
 */
export function scoreContract(d: ContractData): number {
  requireNonNegative(d.daysUntilRenewal, "daysUntilRenewal");
  requireNonNegative(d.contractValue, "contractValue");
  requireNonNegative(d.recentUpgrades, "recentUpgrades");

  const renewalRisk = d.daysUntilRenewal < 90 ? (1 - d.daysUntilRenewal / 90) * 40 : 0; // up to -40
  const upgradeBonus = Math.min(d.recentUpgrades, 3) * 10; // up to +30
  return clamp(70 - renewalRisk + upgradeBonus);
}

/**
 * Support factor (0-100). Anchored on satisfaction, reduced by slow resolution
 * times and escalations.
 */
export function scoreSupport(d: SupportData): number {
  requireNonNegative(d.averageResolutionHours, "averageResolutionHours");
  requireNonNegative(d.satisfactionScore, "satisfactionScore");
  requireNonNegative(d.escalations, "escalations");

  const satScore = clamp(d.satisfactionScore); // 0..100 CSAT
  const resolutionPenalty = (Math.min(d.averageResolutionHours, 72) / 72) * 20; // up to -20
  const escalationPenalty = Math.min(d.escalations, 5) * 6; // up to -30
  return clamp(satScore - resolutionPenalty - escalationPenalty);
}

/**
 * Combine all factors into an overall health score and risk level.
 * @throws {HealthCalculatorError} if any factor input is missing or invalid.
 */
export function calculateHealthScore(input: HealthInput): HealthResult {
  if (!input || !input.payment || !input.engagement || !input.contract || !input.support) {
    throw new HealthCalculatorError("input must include payment, engagement, contract, and support data");
  }

  const factors: FactorBreakdown = {
    payment: scorePayment(input.payment),
    engagement: scoreEngagement(input.engagement),
    contract: scoreContract(input.contract),
    support: scoreSupport(input.support),
  };

  const weighted =
    factors.payment * HEALTH_WEIGHTS.payment +
    factors.engagement * HEALTH_WEIGHTS.engagement +
    factors.contract * HEALTH_WEIGHTS.contract +
    factors.support * HEALTH_WEIGHTS.support;

  const score = Math.round(clamp(weighted));
  return { score, level: healthLevel(score), factors };
}
