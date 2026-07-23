import { describe, expect, it } from "vitest";
import { HEALTH_LABEL, healthLevel } from "@/lib/health";

describe("healthLevel", () => {
  it("maps score thresholds: red 0-30, yellow 31-70, green 71-100", () => {
    expect(healthLevel(0)).toBe("critical");
    expect(healthLevel(30)).toBe("critical");
    expect(healthLevel(31)).toBe("warning");
    expect(healthLevel(70)).toBe("warning");
    expect(healthLevel(71)).toBe("healthy");
    expect(healthLevel(100)).toBe("healthy");
  });

  it("labels each level", () => {
    expect(HEALTH_LABEL[healthLevel(15)]).toBe("Critical");
    expect(HEALTH_LABEL[healthLevel(60)]).toBe("Warning");
    expect(HEALTH_LABEL[healthLevel(85)]).toBe("Healthy");
  });
});
