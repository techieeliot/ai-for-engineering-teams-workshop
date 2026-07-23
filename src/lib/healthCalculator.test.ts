import { describe, expect, it } from "vitest";
import {
  HealthCalculatorError,
  HEALTH_WEIGHTS,
  calculateHealthScore,
  scoreContract,
  scoreEngagement,
  scorePayment,
  scoreSupport,
  type HealthInput,
} from "@/lib/healthCalculator";

const perfect: HealthInput = {
  payment: { daysSinceLastPayment: 5, averagePaymentDelayDays: 0, overdueAmount: 0 },
  engagement: { loginsLast30Days: 25, featureUsageCount: 12, supportTickets: 0 },
  contract: { daysUntilRenewal: 300, contractValue: 100_000, recentUpgrades: 2 },
  support: { averageResolutionHours: 2, satisfactionScore: 100, escalations: 0 },
};

const poor: HealthInput = {
  payment: { daysSinceLastPayment: 90, averagePaymentDelayDays: 30, overdueAmount: 5000 },
  engagement: { loginsLast30Days: 0, featureUsageCount: 0, supportTickets: 10 },
  contract: { daysUntilRenewal: 5, contractValue: 100_000, recentUpgrades: 0 },
  support: { averageResolutionHours: 72, satisfactionScore: 10, escalations: 5 },
};

describe("factor scorers", () => {
  it("payment: full marks when on-time with nothing overdue", () => {
    expect(scorePayment({ daysSinceLastPayment: 0, averagePaymentDelayDays: 0, overdueAmount: 0 })).toBe(100);
  });

  it("payment: floors at 0 for worst case", () => {
    expect(scorePayment({ daysSinceLastPayment: 90, averagePaymentDelayDays: 30, overdueAmount: 1 })).toBe(0);
  });

  it("engagement: rewards logins + feature breadth, penalizes many tickets", () => {
    expect(scoreEngagement({ loginsLast30Days: 20, featureUsageCount: 10, supportTickets: 0 })).toBe(100);
    expect(scoreEngagement({ loginsLast30Days: 0, featureUsageCount: 0, supportTickets: 0 })).toBe(0);
  });

  it("contract: upgrades boost, imminent renewal reduces", () => {
    expect(scoreContract({ daysUntilRenewal: 300, contractValue: 1, recentUpgrades: 0 })).toBe(70);
    expect(
      scoreContract({ daysUntilRenewal: 0, contractValue: 1, recentUpgrades: 0 }),
    ).toBe(30); // 70 - 40 renewal risk
  });

  it("support: anchored on CSAT, reduced by slow resolution + escalations", () => {
    expect(scoreSupport({ averageResolutionHours: 0, satisfactionScore: 100, escalations: 0 })).toBe(100);
  });
});

describe("calculateHealthScore", () => {
  it("weights factors 40/30/20/10 and classifies a healthy customer", () => {
    const r = calculateHealthScore(perfect);
    expect(r.score).toBeGreaterThanOrEqual(71);
    expect(r.level).toBe("healthy");
    // score is the weighted sum of the factor breakdown (rounded)
    const expected = Math.round(
      r.factors.payment * HEALTH_WEIGHTS.payment +
        r.factors.engagement * HEALTH_WEIGHTS.engagement +
        r.factors.contract * HEALTH_WEIGHTS.contract +
        r.factors.support * HEALTH_WEIGHTS.support,
    );
    expect(r.score).toBe(expected);
  });

  it("classifies a poor customer as critical", () => {
    const r = calculateHealthScore(poor);
    expect(r.score).toBeLessThanOrEqual(30);
    expect(r.level).toBe("critical");
  });

  it("returns a per-factor breakdown", () => {
    const r = calculateHealthScore(perfect);
    expect(Object.keys(r.factors)).toEqual(["payment", "engagement", "contract", "support"]);
  });

  it("throws HealthCalculatorError on missing sections", () => {
    // @ts-expect-error intentionally invalid
    expect(() => calculateHealthScore({ payment: perfect.payment })).toThrow(HealthCalculatorError);
  });

  it("throws HealthCalculatorError on a negative field", () => {
    expect(() =>
      calculateHealthScore({ ...perfect, payment: { ...perfect.payment, overdueAmount: -1 } }),
    ).toThrow(HealthCalculatorError);
  });
});
