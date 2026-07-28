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
export declare const brand: {
    /** Identity red — logo, lockup gradient start. */
    readonly red: "#BF2227";
    readonly redDark: "#A51E23";
    readonly redDeep: "#650506";
    /** Lockup gradient end. */
    readonly rose: "#E11D48";
};
export declare const status: {
    readonly success: "#10B981";
    readonly warning: "#F59E0B";
    readonly error: "#EF4444";
    readonly info: "#3B82F6";
};
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
export declare const light: ThemePalette;
export declare const dark: ThemePalette;
/** 4px base scale. Admin density leans on the small end. */
export declare const space: {
    readonly "0": "0";
    readonly px: "1px";
    readonly "1": "0.25rem";
    readonly "2": "0.5rem";
    readonly "3": "0.75rem";
    readonly "4": "1rem";
    readonly "5": "1.25rem";
    readonly "6": "1.5rem";
    readonly "8": "2rem";
    readonly "10": "2.5rem";
    readonly "12": "3rem";
    readonly "16": "4rem";
};
export declare const radius: {
    readonly sm: "6px";
    readonly md: "8px";
    readonly lg: "10px";
    readonly xl: "12px";
    readonly "2xl": "16px";
    readonly full: "999px";
};
export declare const type: {
    readonly family: {
        readonly sans: "\"Inter Variable\", Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        /** Numbers, identifiers, money. Always with tabular-nums. */
        readonly mono: "\"JetBrains Mono Variable\", \"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace";
    };
    readonly size: {
        readonly xs: "0.6875rem";
        readonly sm: "0.75rem";
        readonly base: "0.8125rem";
        readonly md: "0.875rem";
        readonly lg: "1rem";
        readonly xl: "1.25rem";
        readonly "2xl": "1.5rem";
        readonly "3xl": "1.875rem";
    };
    readonly weight: {
        readonly regular: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
        readonly black: "900";
    };
};
/** Layout constants the admin shell depends on. Exported so tests can assert. */
export declare const shell: {
    readonly railWidth: "44px";
    readonly navWidth: "200px";
    readonly detailWidth: "320px";
    /** Below this, the shell stacks instead of showing four columns. */
    readonly stackBelow: "1024px";
};
/**
 * Emit the full CSS variable layer.
 *
 * Light is the base so that a document with no `data-theme` renders light;
 * dark is applied by `[data-theme="dark"]` and by `.dark`, because products
 * are split between the two conventions (Stageflow and Ticketing use the
 * class, HQ and Sopimushallinta use the attribute).
 */
export declare function tokensCss(): string;
export declare const tokens: {
    readonly brand: {
        /** Identity red — logo, lockup gradient start. */
        readonly red: "#BF2227";
        readonly redDark: "#A51E23";
        readonly redDeep: "#650506";
        /** Lockup gradient end. */
        readonly rose: "#E11D48";
    };
    readonly status: {
        readonly success: "#10B981";
        readonly warning: "#F59E0B";
        readonly error: "#EF4444";
        readonly info: "#3B82F6";
    };
    readonly light: ThemePalette;
    readonly dark: ThemePalette;
    readonly space: {
        readonly "0": "0";
        readonly px: "1px";
        readonly "1": "0.25rem";
        readonly "2": "0.5rem";
        readonly "3": "0.75rem";
        readonly "4": "1rem";
        readonly "5": "1.25rem";
        readonly "6": "1.5rem";
        readonly "8": "2rem";
        readonly "10": "2.5rem";
        readonly "12": "3rem";
        readonly "16": "4rem";
    };
    readonly radius: {
        readonly sm: "6px";
        readonly md: "8px";
        readonly lg: "10px";
        readonly xl: "12px";
        readonly "2xl": "16px";
        readonly full: "999px";
    };
    readonly type: {
        readonly family: {
            readonly sans: "\"Inter Variable\", Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
            /** Numbers, identifiers, money. Always with tabular-nums. */
            readonly mono: "\"JetBrains Mono Variable\", \"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace";
        };
        readonly size: {
            readonly xs: "0.6875rem";
            readonly sm: "0.75rem";
            readonly base: "0.8125rem";
            readonly md: "0.875rem";
            readonly lg: "1rem";
            readonly xl: "1.25rem";
            readonly "2xl": "1.5rem";
            readonly "3xl": "1.875rem";
        };
        readonly weight: {
            readonly regular: "400";
            readonly medium: "500";
            readonly semibold: "600";
            readonly bold: "700";
            readonly black: "900";
        };
    };
    readonly shell: {
        readonly railWidth: "44px";
        readonly navWidth: "200px";
        readonly detailWidth: "320px";
        /** Below this, the shell stacks instead of showing four columns. */
        readonly stackBelow: "1024px";
    };
};
//# sourceMappingURL=tokens.d.ts.map