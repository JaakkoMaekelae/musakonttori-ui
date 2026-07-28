"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AdminShell } from "./AdminShell";
/**
 * The frame for archetypes that have no list/detail split — dashboard,
 * settings, report, form, wizard.
 *
 * It is the same shell with the detail closed and the content occupying the
 * list zone, rather than a second layout component. That keeps the rail and
 * nav pixel-identical across every archetype: switching from a workspace to
 * settings must not shift the navigation by a pixel, or the whole product
 * feels like separate apps stitched together.
 */
export function AdminPage({ rail, nav, children, navCollapsed, label, className, }) {
    return (_jsx(AdminShell, { className: className, rail: rail, nav: nav, list: children, detailState: "closed", navCollapsed: navCollapsed, listLabel: label }));
}
/** Body padding and measure, shared by every non-workspace archetype. */
export function AdminContent({ children, width = "wide", className, }) {
    return (_jsx("div", { className: (width === "prose" ? "mx-auto w-full max-w-2xl " : "w-full ") +
            "px-5 py-5 " +
            (className ?? ""), children: children }));
}
/**
 * A titled block. Settings pages are a stack of these; dashboards use them
 * between widget groups.
 *
 * Renders as a real `section` with a heading rather than a styled div, so the
 * settings page has a usable heading outline — that outline is how screen
 * reader users navigate a long settings screen.
 */
export function AdminSection({ title, description, action, children, id, className, }) {
    return (_jsxs("section", { id: id, className: "rounded-xl border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] " +
            (className ?? ""), children: [_jsxs("div", { className: "flex items-start gap-3 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-4 py-3", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: "text-[0.8125rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), description && (_jsx("p", { className: "mt-0.5 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: description }))] }), action && _jsx("div", { className: "shrink-0", children: action })] }), children && _jsx("div", { className: "px-4 py-3.5", children: children })] }));
}
