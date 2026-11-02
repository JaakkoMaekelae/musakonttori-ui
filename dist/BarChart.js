"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * A minimal bar chart for admin dashboards.
 *
 * Bars are decorative — the numbers a dashboard needs are in the accompanying
 * tiles and tables, so this chart is a trend shape, not a data source. The
 * `ariaLabel` carries the meaning for assistive tech.
 */
export function BarChart({ data, legend, ariaLabel = "Bar chart", className, }) {
    return (_jsxs("div", { className: cn("flex flex-col", className), children: [_jsx("div", { role: "img", "aria-label": ariaLabel, className: "flex items-end gap-2 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] pt-4", style: { height: 220 }, children: data.map((value, i) => (_jsx("div", { className: "min-w-2 flex-1 rounded-t", style: {
                        height: `${Math.max(2, Math.min(100, value))}%`,
                        background: "linear-gradient(180deg, var(--mk-palette-accent-primary,#C9252D), var(--mk-brand-red-deep,#720D0D))",
                    } }, i))) }), legend && legend.length > 0 && (_jsx("div", { className: "mt-2.5 flex flex-wrap gap-4 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: legend.map((entry) => (_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx("span", { "aria-hidden": "true", className: "size-2 rounded-full", style: { background: "var(--mk-palette-accent-primary,#C9252D)" } }), entry] }, entry))) }))] }));
}
