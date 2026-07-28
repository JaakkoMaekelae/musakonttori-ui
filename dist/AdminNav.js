"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * The view column.
 *
 * Saved views live here alongside the fixed ones, and that is deliberate: they
 * are how a product with hundreds of routes keeps its nav under the ~12-item
 * ceiling the spec sets. Anything that does not earn a permanent slot becomes
 * a saved view or lives behind the command palette.
 */
export function AdminNav({ title, groups, activeItemId, footer, className, }) {
    return (_jsxs("nav", { "aria-label": title, className: cn("px-2 py-3", className), children: [_jsx("h2", { className: "px-2.5 pb-2 text-[0.8125rem] font-bold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), groups.map((group) => (_jsxs("div", { children: [group.label && (_jsx("h3", { className: "px-2.5 pb-1.5 pt-3.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: group.label })), _jsx("ul", { children: group.items.map((item) => {
                            const active = item.id === activeItemId;
                            const Tag = item.href ? "a" : "button";
                            return (_jsx("li", { children: _jsxs(Tag, { ...(item.href
                                        ? { href: item.href }
                                        : { type: "button" }), "aria-current": active ? "page" : undefined, onClick: item.onSelect, className: cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", active
                                        ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] font-semibold text-[var(--mk-palette-accent-primary,#F44242)]"
                                        : "text-[var(--mk-palette-text-secondary,#B0B3C1)] hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]", "[&_svg]:size-3.5 [&_svg]:shrink-0"), children: [item.icon, _jsx("span", { className: "truncate", children: item.label }), item.count != null && (_jsx("span", { className: cn("ml-auto shrink-0 font-[var(--mk-font-mono)] text-[0.6875rem] tabular-nums", item.urgent
                                                ? "rounded-full bg-[var(--mk-palette-accent-primary,#F44242)] px-1.5 py-px font-semibold text-white"
                                                : "text-[var(--mk-palette-text-tertiary,#7E8292)]"), children: item.count }))] }) }, item.id));
                        }) })] }, group.id))), footer && _jsx("div", { className: "px-1 pt-3", children: footer })] }));
}
