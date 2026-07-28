"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
const TONE = {
    loading: "var(--mk-palette-text-tertiary, #7E8292)",
    empty: "var(--mk-palette-text-tertiary, #7E8292)",
    error: "var(--mk-status-error, #EF4444)",
    forbidden: "var(--mk-status-warning, #F59E0B)",
};
/**
 * Empty, loading, error and no-permission — as one component.
 *
 * The spec asks for these per zone rather than per page, because in a
 * four-column shell they rarely apply to the whole screen: the list can be
 * empty while the nav is fine, the detail can 403 while the list is fine.
 * A page-level state would blank out working UI.
 *
 * `loading` renders an indeterminate bar rather than a spinner, and announces
 * politely — a spinner in a zone that also owns a keyboard cursor tends to
 * read as "frozen" rather than "working".
 */
export function AdminSystemState({ kind, title, description, action, size = "zone", className, }) {
    const isLoading = kind === "loading";
    return (_jsxs("div", { role: "status", "aria-live": kind === "error" ? "assertive" : "polite", "aria-busy": isLoading || undefined, "data-mk-state": kind, className: cn("flex flex-col items-center justify-center gap-2.5 text-center", size === "zone" ? "h-full min-h-48 px-6 py-10" : "px-4 py-8", className), children: [isLoading ? (_jsx("span", { "aria-hidden": "true", className: "mk-state-track relative h-[3px] w-32 overflow-hidden rounded-full bg-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", children: _jsx("style", { children: `
            .mk-state-track::after {
              content: '';
              position: absolute;
              inset-block: 0;
              left: 0;
              width: 42%;
              border-radius: 999px;
              background: var(--mk-palette-accent-primary, #F44242);
              animation: mk-state-sweep 1.25s cubic-bezier(0.65, 0, 0.35, 1) infinite;
            }
            @keyframes mk-state-sweep {
              0%   { transform: translateX(-110%); }
              100% { transform: translateX(340%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .mk-state-track::after { animation: none; width: 100%; opacity: 0.5; }
            }
          ` }) })) : (_jsx("span", { "aria-hidden": "true", className: "size-2 rounded-full", style: { background: TONE[kind] } })), _jsx("p", { className: "text-[0.8125rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", style: kind === "error" ? { color: TONE.error } : undefined, children: title }), description && (_jsx("p", { className: "max-w-xs text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: description })), action && _jsx("div", { className: "pt-1", children: action })] }));
}
