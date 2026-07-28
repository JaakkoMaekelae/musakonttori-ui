"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * Parameters on top, result below.
 *
 * The parameter row does not scroll away: reading a number halfway down a
 * long report is useless if you cannot see which period it covers. Only the
 * result scrolls.
 *
 * A re-run dims the old result rather than clearing it — a blank screen
 * between runs destroys the comparison the user was in the middle of making.
 */
export function AdminReportLayout({ parameters, actions, summary, children, stale, className, }) {
    return (_jsxs("div", { className: cn("flex h-full min-h-0 flex-col", className), children: [_jsxs("div", { className: "shrink-0 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-5 py-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("div", { className: "flex flex-wrap items-center gap-2", children: parameters }), actions && _jsx("div", { className: "ml-auto flex items-center gap-2", children: actions })] }), summary && (_jsx("p", { className: "mt-2 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: summary }))] }), _jsx("div", { className: cn("min-h-0 flex-1 overflow-auto px-5 py-4 transition-opacity", stale && "pointer-events-none opacity-50"), "aria-busy": stale || undefined, children: children })] }));
}
