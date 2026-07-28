"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * The header every non-workspace archetype starts with.
 *
 * Deliberately does not own the page's scroll container: dashboards scroll as
 * one block, reports keep their parameter bar fixed while results scroll, and
 * settings pin their section nav. Owning scroll here would force all three
 * into the same behaviour.
 */
export function AdminPageHeader({ title, description, eyebrow, actions, toolbar, className, }) {
    return (_jsxs("header", { className: cn("border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)]", className), children: [_jsxs("div", { className: "flex items-start gap-3 px-5 pb-3.5 pt-4", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [eyebrow && (_jsx("div", { className: "pb-1 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: eyebrow })), _jsx("h1", { className: "truncate text-xl font-bold tracking-[-0.025em] text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), description && (_jsx("p", { className: "mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: description }))] }), actions && (_jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions }))] }), toolbar && _jsx("div", { className: "px-5", children: toolbar })] }));
}
