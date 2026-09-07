"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * A compact label/value tile for queue overviews.
 *
 * Smaller than `StatTile` on purpose: these are "needs attention" counts, not
 * the headline numbers a dashboard leads with.
 */
export function QuickTile({ label, value, className }) {
    return (_jsxs("div", { className: cn("rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] p-3", className), children: [_jsx("p", { className: "text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: label }), _jsx("p", { className: "mt-0.5 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: value })] }));
}
