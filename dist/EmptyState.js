import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
function DefaultIcon() {
    return (_jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]", children: _jsx("svg", { className: "h-8 w-8 text-[var(--mk-palette-text-tertiary,#6B7280)]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" }) }) }));
}
/**
 * Musakonttori EmptyState - empty state display.
 *
 * Used when list/table is empty, no search results found, etc.
 * Contains icon, title, description and optional action button.
 *
 * @example
 * <EmptyState
 *   title="Ei tapahtumia"
 *   description="Et ole vielä luonut yhtään tapahtumaa."
 *   action={{ label: "Luo tapahtuma", onClick: () => {} }}
 * />
 */
export function EmptyState({ icon, title, description, action, className = "", }) {
    return (_jsxs("div", { className: `mx-auto flex max-w-md flex-col items-center justify-center py-12 text-center ${className}`, children: [icon ? (_jsx("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]", children: icon })) : (_jsx("div", { className: "mb-4", children: _jsx(DefaultIcon, {}) })), _jsx("h3", { className: "text-lg font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), description && (_jsx("p", { className: "mt-1 max-w-sm text-sm text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: description })), action && (_jsx("div", { className: "mt-6", children: typeof action === "object" && action !== null && "label" in action && "onClick" in action ? (_jsx(Button, { variant: "primary", onClick: action.onClick, children: action.label })) : action }))] }));
}
