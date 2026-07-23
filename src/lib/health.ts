/**
 * Shared health-score visual logic.
 *
 * Centralized so CustomerCard, the health widget, market intelligence, and the
 * alerts widget all map scores to the same colors and labels
 * (see GUIDE-001 CSS & UI Systems §4).
 */

export type HealthLevel = "critical" | "warning" | "healthy";

/**
 * Map a 0-100 health score to a risk level.
 * Thresholds per SPEC-001 / SPEC-003: red 0-30, yellow 31-70, green 71-100.
 */
export function healthLevel(score: number): HealthLevel {
  if (score <= 30) return "critical";
  if (score <= 70) return "warning";
  return "healthy";
}

/** Human-readable risk label per level. */
export const HEALTH_LABEL: Record<HealthLevel, string> = {
  critical: "Critical",
  warning: "Warning",
  healthy: "Healthy",
};

/**
 * Badge classes per level (dark-mode aware). Traffic-light colors are semantic
 * data, so they use explicit color utilities rather than theme chrome tokens.
 */
export const HEALTH_BADGE_CLASS: Record<HealthLevel, string> = {
  critical: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  healthy: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
};
