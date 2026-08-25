/**
 * Musakonttori design tokens — the single source of truth.
 *
 * Values come from musakonttori-hq/docs/BRAND.md, which is canonical. The
 * competing "Product Experience Standard v1.0" red (#C9252D) is legacy and is
 * being replaced by these tokens across all products.
 *
 * Two levels of red, deliberately:
 *   - `brand.*`  identity. Logo lockup, gradients, marketing. Same in both
 *                themes, because a logo does not change colour with a theme.
 *   - `accent.*` application. Active nav, primary action, critical numbers.
 *                Brightened in dark mode so it keeps the same visual weight.
 *
 * Consumers should never read these values directly — they read the CSS
 * variables emitted by `tokensCss()` (or `tokens.css`). This file exists so
 * the values have one home, and so tooling can assert against them.
 */

export const brand = {
  /** Identity red — logo, lockup gradient start. */
  red: "#BF2227",
  redDark: "#A51E23",
  redDeep: "#650506",
  /** Lockup gradient end. */
  rose: "#E11D48",
} as const;

export const status = {
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
} as const;

export interface ThemePalette {
  bg: {
    canvas: string;
    surface: string;
    surfaceHover: string;
    muted: string;
    elevated: string;
    inset: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: {
    subtle: string;
    default: string;
    hover: string;
  };
  accent: {
    primary: string;
    hover: string;
    active: string;
    soft: string;
  };
}

export const light: ThemePalette = {
  bg: {
    canvas: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceHover: "#F4F4F5",
    muted: "#F4F4F5",
    elevated: "#FFFFFF",
    inset: "#F4F4F5",
  },
  text: {
    primary: "#0F0F11",
    secondary: "#52525B",
    tertiary: "#A1A1AA",
  },
  border: {
    subtle: "#E4E4E7",
    default: "#D4D4D8",
    hover: "#A1A1AA",
  },
  accent: {
    primary: "#DC2626",
    hover: "#BF2227",
    active: "#A51E23",
    soft: "rgba(220, 38, 38, 0.10)",
  },
};

export const dark: ThemePalette = {
  bg: {
    canvas: "#0F1117",
    surface: "#1A1D27",
    surfaceHover: "#2A2E3D",
    muted: "#2A2E3D",
    elevated: "#222633",
    inset: "#0B0D12",
  },
  text: {
    primary: "#F0F0F3",
    secondary: "#B0B3C1",
    tertiary: "#7E8292",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    default: "rgba(255, 255, 255, 0.14)",
    hover: "rgba(255, 255, 255, 0.20)",
  },
  accent: {
    primary: "#F44242",
    hover: "#FB7185",
    active: "#DC2626",
    soft: "rgba(244, 66, 66, 0.16)",
  },
};

/** 4px base scale. Admin density leans on the small end. */
export const space = {
  "0": "0",
  px: "1px",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
} as const;

export const radius = {
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "12px",
  "2xl": "16px",
  full: "999px",
} as const;

export const type = {
  family: {
    sans: '"Inter Variable", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    /** Numbers, identifiers, money. Always with tabular-nums. */
    mono: '"JetBrains Mono Variable", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  size: {
    xs: "0.6875rem",
    sm: "0.75rem",
    base: "0.8125rem",
    md: "0.875rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },
} as const;

/** Layout constants the admin shell depends on. Exported so tests can assert. */
export const shell = {
  railWidth: "44px",
  navWidth: "200px",
  detailWidth: "320px",
  /** Below this, the shell stacks instead of showing four columns. */
  stackBelow: "1024px",
} as const;

const flat = (palette: ThemePalette): Record<string, string> => ({
  "--mk-palette-bg-canvas": palette.bg.canvas,
  // Legacy alias: several apps still read --mk-palette-bg.
  "--mk-palette-bg": palette.bg.canvas,
  "--mk-palette-bg-surface": palette.bg.surface,
  "--mk-palette-bg-surface-hover": palette.bg.surfaceHover,
  // Secondary surface — form fields, unselected tiles (LocaleSwitcherModal).
  "--mk-palette-bg-surface-secondary": palette.bg.surfaceHover,
  "--mk-palette-bg-muted": palette.bg.muted,
  "--mk-palette-bg-elevated": palette.bg.elevated,
  "--mk-palette-bg-inset": palette.bg.inset,
  "--mk-palette-text-primary": palette.text.primary,
  "--mk-palette-text-secondary": palette.text.secondary,
  "--mk-palette-text-tertiary": palette.text.tertiary,
  // Muted/tertiary text alias (section labels) — same ramp as tertiary.
  "--mk-palette-text-muted": palette.text.tertiary,
  "--mk-palette-border-subtle": palette.border.subtle,
  "--mk-palette-border-default": palette.border.default,
  "--mk-palette-border-hover": palette.border.hover,
  "--mk-palette-accent-primary": palette.accent.primary,
  "--mk-palette-accent-soft": palette.accent.soft,
  // "primary" selection colour + its tints. `primary` itself is the identity
  // red (theme-constant, added in `constants`); the subtle/ring tints follow
  // the accent ramp so they stay visible on both themes.
  "--mk-palette-primary-subtle": palette.accent.soft,
  "--mk-palette-primary-ring": palette.accent.soft,
  // bg-brand is the *application* accent, not the identity red — Button and
  // friends have always read it as "the primary action colour".
  "--mk-palette-bg-brand": palette.accent.primary,
  "--mk-palette-bg-brand-hover": palette.accent.hover,
  "--mk-palette-bg-brand-active": palette.accent.active,
});

const constants: Record<string, string> = {
  "--mk-brand-red": brand.red,
  "--mk-brand-red-dark": brand.redDark,
  "--mk-brand-red-deep": brand.redDeep,
  "--mk-brand-rose": brand.rose,
  // Identity red — the "primary" selection/brand colour. Same in both themes
  // (a logo does not change colour with a theme).
  "--mk-palette-primary": brand.red,
  "--mk-brand-gradient": `linear-gradient(135deg, ${brand.red}, ${brand.rose})`,
  "--mk-status-success": status.success,
  "--mk-status-warning": status.warning,
  "--mk-status-error": status.error,
  "--mk-status-info": status.info,
  "--mk-font-sans": type.family.sans,
  "--mk-font-mono": type.family.mono,
  "--mk-shell-rail-width": shell.railWidth,
  "--mk-shell-nav-width": shell.navWidth,
  "--mk-shell-detail-width": shell.detailWidth,
  ...Object.fromEntries(
    Object.entries(radius).map(([k, v]) => [`--mk-radius-${k}`, v]),
  ),
  ...Object.fromEntries(
    Object.entries(space).map(([k, v]) => [`--mk-space-${k}`, v]),
  ),
};

const block = (selector: string, vars: Record<string, string>): string =>
  `${selector} {\n${Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n")}\n}`;

/**
 * Emit the full CSS variable layer.
 *
 * Light is the base so that a document with no `data-theme` renders light;
 * dark is applied by `[data-theme="dark"]` and by `.dark`, because products
 * are split between the two conventions (Stageflow and Ticketing use the
 * class, HQ and Sopimushallinta use the attribute).
 */
export function tokensCss(): string {
  return [
    block(":root", { ...constants, ...flat(light) }),
    block('[data-theme="dark"], :root.dark, .dark', flat(dark)),
  ].join("\n\n");
}

export const tokens = {
  brand,
  status,
  light,
  dark,
  space,
  radius,
  type,
  shell,
} as const;
