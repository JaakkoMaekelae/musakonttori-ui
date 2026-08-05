import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * The family gradient, from musakonttori-hq/docs/BRAND.md.
 *
 * Products with their own consumer identity — Stageflow, Soundstage — keep the
 * lockup's structure and pass their own accent instead. Everyone else should
 * leave this alone; that is the point of a shared lockup.
 */
const BRAND_ACCENT = ["#BF2227", "#E11D48"];
/**
 * The Musakonttori lockup: icon, product name, MUSAKONTTORI.
 *
 * Twenty-nine files across the family drew this by hand, so the one thing that
 * should be identical everywhere was the thing most likely to differ — the
 * eyebrow's letter-spacing, the icon's radius, whether the name sat at weight
 * 600 or 700. BRAND.md specified it exactly and there was nothing to enforce
 * the spec.
 *
 * Sizes are the spec's, in px rather than utility classes, because several
 * products wrap their shell in a scoped reset that overrides padding and
 * border on descendants — the same reason LocaleSwitcherTrigger ships its own
 * stylesheet.
 */
export function Lockup({ product, initial, accent = BRAND_ACCENT, variant = "full", className, }) {
    const letter = (initial ?? product.charAt(0)).toUpperCase();
    return (_jsxs("span", { className: cn("inline-flex items-center", className), style: { gap: 10 }, children: [_jsx("span", { "aria-hidden": "true", style: {
                    width: 36,
                    height: 36,
                    flex: "0 0 auto",
                    borderRadius: 10,
                    background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`,
                    boxShadow: "0 4px 12px rgba(191,34,39,0.32)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontStyle: "italic",
                    fontSize: "1.25rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                }, children: letter }), variant !== "mark" && (_jsxs("span", { style: { display: "flex", flexDirection: "column", lineHeight: 1.15 }, children: [_jsx("span", { style: {
                            fontWeight: 700,
                            fontSize: "1rem",
                            letterSpacing: "-0.01em",
                            color: "var(--mk-palette-text-primary, #111113)",
                        }, children: product }), variant === "full" && (_jsx("span", { style: {
                            fontWeight: 600,
                            fontSize: "0.6875rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "var(--mk-palette-text-tertiary, #7E8292)",
                        }, children: "Musakonttori" }))] }))] }));
}
