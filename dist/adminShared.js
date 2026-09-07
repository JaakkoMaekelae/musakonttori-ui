"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Internal helpers and content types for the product admin dashboards.
 *
 * Not part of the public package surface — these exist so the four product
 * views share one icon set, one table shape and one content contract without
 * copying them.
 */
export function Icon({ d }) {
    return (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: d, stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
export const ICONS = {
    home: "M3 11l9-8 9 8M5 10v10h14V10",
    doc: "M9 12h6m-6 4h6M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    users: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a6 6 0 0112 0v2",
    cart: "M3 3h2l2 12h11l2-8H6",
    box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    card: "M3 10h18M6 19h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    chart: "M9 19V9m6 10V5M4 19h16",
    music: "M9 18V6l12-2v12",
    ticket: "M3 8a2 2 0 002 2 2 2 0 000 4 2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 000-4 2 2 0 000-4V6a2 2 0 00-2-2H5a2 2 0 00-2 2z",
    scan: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    shield: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z",
    megaphone: "M3 11l16-7v16L3 13v-2zM3 11v2",
    calendar: "M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM3 8h18M8 2v4M16 2v4",
    truck: "M1 5h13v11H1zM14 9h4l4 4v3h-8zM5 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z",
};
export function MiniTable({ columns, children, }) {
    return (_jsxs("table", { className: "w-full text-[0.8125rem]", children: [_jsx("thead", { children: _jsx("tr", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", children: columns.map((column) => (_jsx("th", { className: "py-2 text-[0.625rem] font-medium uppercase tracking-[0.06em] text-[var(--mk-palette-text-tertiary,#7E8292)] " +
                            (column.align === "right" ? "text-right" : "text-left"), children: column.header }, column.header))) }) }), _jsx("tbody", { children: children })] }));
}
export function TR({ children }) {
    return (_jsx("tr", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] last:border-b-0", children: children }));
}
export function TD({ children, align = "left", className = "", }) {
    return (_jsx("td", { className: "py-2 text-[var(--mk-palette-text-secondary,#B0B3C1)] " +
            (align === "right" ? "text-right " : "text-left ") +
            className, children: children }));
}
