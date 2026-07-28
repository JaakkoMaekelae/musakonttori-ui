"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
const ARROW = {
    up: "↑",
    down: "↓",
    flat: "→",
};
function deltaTone(d) {
    if (d.direction === "flat")
        return "var(--mk-palette-text-secondary, #B0B3C1)";
    const good = (d.upIsGood ?? true) === (d.direction === "up");
    return good ? "var(--mk-status-success, #10B981)" : "var(--mk-status-error, #EF4444)";
}
/**
 * A number worth leading with.
 *
 * Two deliberate typographic choices, both easy to get wrong:
 *
 * 1. The value uses the font's *proportional* figures, not `tabular-nums`.
 *    Tabular gives every digit the width of a zero, which looks loose and
 *    gappy at display sizes. Tabular belongs in columns that must align
 *    vertically — table rows, axis ticks — not on a standalone figure.
 *
 * 2. The delta is never colour alone. It always carries a sign, an arrow and
 *    the period it is measured against, so it survives colour-blindness,
 *    grayscale print and forced-colors mode. `upIsGood` exists because for
 *    churn, error rate or cost, a rise is the bad news.
 */
export function StatTile({ label, value, delta, trend, hero, className, }) {
    return (_jsxs("div", { className: cn("rounded-xl border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-4 py-3.5", className), children: [_jsx("p", { className: "text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: label }), _jsx("p", { className: cn("mt-1 font-semibold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]", hero ? "text-5xl" : "text-2xl"), children: value }), delta && (_jsxs("p", { className: "mt-1 flex flex-wrap items-baseline gap-x-1.5 text-[0.6875rem]", children: [_jsxs("span", { className: "font-semibold", style: { color: deltaTone(delta) }, children: [_jsx("span", { "aria-hidden": "true", children: ARROW[delta.direction] }), " ", delta.value] }), _jsx("span", { className: "text-[var(--mk-palette-text-tertiary,#7E8292)]", children: delta.comparedTo })] })), trend && _jsx("div", { className: "mt-2.5", children: trend })] }));
}
/** Equal-width tiles that wrap instead of shrinking below readability. */
export function StatRow({ children, className }) {
    return (_jsx("div", { className: cn("grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]", className), children: children }));
}
