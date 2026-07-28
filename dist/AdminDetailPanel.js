"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * The record view. One component, two widths.
 *
 * In `panel` it is a 320px summary: title, status, the fields worth seeing
 * before deciding, and the actions you would take without opening anything.
 * In `full` it gains tabs, the queue cursor, and room for real work.
 *
 * Tabs are hidden in `panel` rather than scrolled or truncated — a tab strip
 * that does not fit is worse than no tab strip, and the panel's job is to let
 * you decide whether to expand, not to be a cramped version of the full view.
 */
export function AdminDetailPanel({ title, subtitle, status, actions, tabs, activeTabId, state = "panel", onToggleExpand, onClose, cursorLabel, expandLabel = "Expand", collapseLabel = "Collapse", closeLabel = "Close", children, className, }) {
    const expanded = state === "full";
    return (_jsxs("div", { className: cn("flex h-full flex-col", className), children: [_jsx("header", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-3.5 py-3", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "truncate text-[0.9375rem] font-bold tracking-[-0.01em] text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), status] }), subtitle && (_jsx("p", { className: "mt-0.5 truncate text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: subtitle }))] }), _jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [expanded && cursorLabel && (_jsx("span", { className: "mr-1 whitespace-nowrap text-[0.6875rem] tabular-nums text-[var(--mk-palette-text-tertiary,#7E8292)]", children: cursorLabel })), actions, onToggleExpand && (_jsx("button", { type: "button", onClick: onToggleExpand, "aria-expanded": expanded, className: "rounded-lg border border-[var(--mk-palette-border-default,rgba(255,255,255,0.14))] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--mk-palette-text-primary,#F0F0F3)] transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", children: expanded ? collapseLabel : expandLabel })), onClose && (_jsx("button", { type: "button", onClick: onClose, "aria-label": closeLabel, className: "rounded-lg p-1 text-[var(--mk-palette-text-tertiary,#7E8292)] transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", children: _jsx("svg", { viewBox: "0 0 20 20", fill: "none", className: "size-4", "aria-hidden": "true", children: _jsx("path", { d: "M5 5l10 10M15 5L5 15", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }) }) }))] })] }) }), expanded && tabs && tabs.length > 0 && (_jsx("div", { role: "tablist", "aria-orientation": "horizontal", className: "flex gap-0.5 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-3.5", children: tabs.map((tab) => {
                    const active = tab.id === activeTabId;
                    const Tag = tab.href ? "a" : "button";
                    return (_jsx(Tag, { ...(tab.href ? { href: tab.href } : { type: "button" }), role: "tab", "aria-selected": active, onClick: tab.onSelect, className: cn("-mb-px border-b-2 px-2.5 py-2 text-xs transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", active
                            ? "border-[var(--mk-palette-accent-primary,#F44242)] font-semibold text-[var(--mk-palette-accent-primary,#F44242)]"
                            : "border-transparent text-[var(--mk-palette-text-secondary,#B0B3C1)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]"), children: tab.label }, tab.id));
                }) })), _jsx("div", { className: "min-h-0 flex-1 overflow-auto", children: children })] }));
}
/** Label/value row. Numeric values get tabular figures so columns line up. */
export function AdminField({ label, children, numeric }) {
    return (_jsxs("div", { className: "flex items-baseline justify-between gap-3 py-1", children: [_jsx("dt", { className: "text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: label }), _jsx("dd", { className: cn("text-right text-xs text-[var(--mk-palette-text-primary,#F0F0F3)]", numeric && "font-[var(--mk-font-mono)] tabular-nums"), children: children })] }));
}
