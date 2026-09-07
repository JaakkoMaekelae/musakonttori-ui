"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * A compact activity/breakdown list: icon, title, caption and a trailing meta.
 *
 * Shared by "sales by category", "release state", "live activity" and "gate
 * activity" — the shape is identical, only the content differs.
 */
export function ActivityFeed({ items, className }) {
    return (_jsx("ul", { className: cn("divide-y divide-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", className), children: items.map((item) => (_jsxs("li", { className: "flex items-center gap-3 py-2.5 first:pt-0 last:pb-0", children: [item.icon && (_jsx("span", { "aria-hidden": "true", className: "flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] text-[0.6875rem] font-bold text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: item.icon })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "truncate text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: item.title }), item.description && (_jsx("p", { className: "mt-0.5 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: item.description }))] }), item.meta && (_jsx("div", { className: "shrink-0 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: item.meta }))] }, item.id))) }));
}
