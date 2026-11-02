import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { brand, dark, light, tokensCss } from "../tokens";

describe("tokens", () => {
  it("uses the current Musakonttori red ladder in both themes", () => {
    // Identity red — logo and lockup gradient, theme-independent.
    expect(brand.red).toBe("#C9252D");
    expect(brand.redDark).toBe("#981F20");
    expect(brand.redDeep).toBe("#720D0D");
    expect(light.accent.primary).toBe("#C9252D");
    expect(light.accent.hover).toBe("#981F20");
    expect(light.accent.active).toBe("#720D0D");
    expect(dark.accent.primary).toBe("#C9252D");
    expect(dark.accent.hover).toBe("#981F20");
    expect(dark.accent.active).toBe("#720D0D");
  });

  it("emits the canonical Musakonttori red in shared tokens", () => {
    expect(tokensCss().toUpperCase()).toContain("#C9252D");
    expect(tokensCss().toUpperCase()).toContain("#981F20");
    expect(tokensCss().toUpperCase()).toContain("#720D0D");
  });

  it("emits light as the base and dark behind both conventions", () => {
    const css = tokensCss();
    expect(css).toContain(":root {");
    // Products are split: Stageflow and Ticketing set a class, HQ and
    // Sopimushallinta set the attribute. Both have to work.
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain(".dark");
  });

  it("maps bg-brand to the canonical primary action", () => {
    // Shared buttons read this token as the primary action color.
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

  it("does not override the light token base with a dark :root block", () => {
    const globalsCss = readFileSync(resolve("src/globals.css"), "utf8");

    expect(globalsCss).not.toMatch(/:root,\s*\[data-theme=["']dark["']\]/);
    expect(globalsCss).toContain('@import "./tokens.css"');
  });
});
