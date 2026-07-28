import { describe, expect, it } from "vitest";
import { brand, dark, light, tokensCss } from "../tokens";

describe("tokens", () => {
  it("uses the canonical two-level red from BRAND.md", () => {
    // Identity red — logo and lockup gradient, theme-independent.
    expect(brand.red).toBe("#BF2227");
    // Application accent — brightened in dark so it keeps its visual weight.
    expect(light.accent.primary).toBe("#DC2626");
    expect(dark.accent.primary).toBe("#F44242");
  });

  it("does not reintroduce the legacy #C9252D red", () => {
    // The competing "Product Experience Standard v1.0" red. 143 hardcoded
    // occurrences across the products are being replaced by these tokens;
    // it must not creep back in through the token layer itself.
    expect(tokensCss().toUpperCase()).not.toContain("C9252D");
  });

  it("emits light as the base and dark behind both conventions", () => {
    const css = tokensCss();
    expect(css).toContain(":root {");
    // Products are split: Stageflow and Ticketing set a class, HQ and
    // Sopimushallinta set the attribute. Both have to work.
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain(".dark");
  });

  it("maps bg-brand to the application accent, not the identity red", () => {
    // Button and friends have always read --mk-palette-bg-brand as "the
    // primary action colour". Pointing it at the identity red would darken
    // every primary button and break contrast expectations.
    const css = tokensCss();
    const rootBlock = css.slice(0, css.indexOf('[data-theme="dark"]'));
    expect(rootBlock).toContain(`--mk-palette-bg-brand: ${light.accent.primary};`);
  });

  it("keeps every dark surface distinguishable from the canvas", () => {
    // THEME.md: canvas → surface → muted → elevated must each step lighter.
    const order = [dark.bg.canvas, dark.bg.surface, dark.bg.muted];
    const luminance = (hex: string) => {
      const n = parseInt(hex.slice(1), 16);
      return ((n >> 16) & 255) + ((n >> 8) & 255) + (n & 255);
    };
    expect(luminance(order[0]!)).toBeLessThan(luminance(order[1]!));
    expect(luminance(order[1]!)).toBeLessThan(luminance(order[2]!));
  });

  it("never emits a bare hex for dark borders", () => {
    // Dark borders are alpha-based so they read correctly over any surface.
    expect(dark.border.subtle.startsWith("rgba")).toBe(true);
    expect(dark.border.default.startsWith("rgba")).toBe(true);
  });
});
