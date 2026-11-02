"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * A conversion funnel. Each step tapers from the one before it.
 *
 * Like `BarChart`, the pillars are decorative; the counts live in `value`,
 * which stays readable text.
 */
export function FunnelChart({ steps, ariaLabel = "Funnel chart", className, }) {
    return (_jsx("div", { role: "img", "aria-label": ariaLabel, className: cn("grid items-end gap-2 pt-3", className), style: { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }, children: steps.map((step) => (_jsxs("div", { className: "flex flex-col items-center text-center", children: [_jsx("div", { "aria-hidden": "true", className: "mb-1.5 rounded-t", style: {
                        height: `${Math.max(2, step.height)}px`,
                        width: `${Math.max(20, Math.min(100, step.width))}%`,
                        background: "linear-gradient(180deg, var(--mk-palette-accent-primary,#C9252D), var(--mk-brand-red-deep,#720D0D))",
                    } }), _jsx("span", { className: "text-xs font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: step.value }), _jsx("span", { className: "text-[0.625rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: step.label })] }, step.label))) }));
}
