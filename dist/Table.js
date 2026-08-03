import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * Which background the table sits on.
 *
 * The default styling is dark-first — it reads its colours from
 * `--mk-palette-*`, whose fallbacks are dark. That is correct on a dark canvas
 * and wrong on a light one: several admin sections hardcode a white background
 * while the document still carries `data-theme="dark"`, so the tokens resolve
 * to near-white ink on white. That mismatch is why those sections kept their
 * own copy of this component.
 *
 * The surface is applied as a data attribute on the wrapper and the light
 * overrides come from a stylesheet, NOT from React context. Context would need
 * `createContext`, which is unavailable in a server component — and these
 * tables are rendered by server components, so it broke the build with
 * "(0 , c.createContext) is not a function".
 */
const SURFACE_CSS = `
[data-mk-table="light"] { background: #fff; border-color: #e4e4e7; }
[data-mk-table="light"] thead tr { border-color: #e4e4e7; }
[data-mk-table="light"] th { color: #71717a; }
[data-mk-table="light"] tbody tr { border-color: #e4e4e7; }
[data-mk-table="light"] tbody tr:hover { background: #fafafa; }
[data-mk-table="light"] td { color: #3f3f46; }
`;
const SHELL = {
    dark: "border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)]",
    light: "border-zinc-200 bg-white",
};
export function TableHead({ children }) {
    return (_jsx("thead", { children: _jsx("tr", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", children: children }) }));
}
export function TableHeaderCell({ children, align = "left", className, }) {
    return (_jsx("th", { className: cn("px-6 py-3 font-medium text-[var(--mk-palette-text-tertiary,#7E8292)]", align === "left" && "text-left", align === "right" && "text-right", align === "center" && "text-center", className), children: children }));
}
export function TableBody({ children }) {
    return _jsx("tbody", { children: children });
}
export function TableRow({ children, className, onClick, }) {
    return (_jsx("tr", { onClick: onClick, className: cn("border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] last:border-b-0 hover:bg-[var(--mk-palette-bg-muted,#2A2E3D)] transition-colors", className), children: children }));
}
export function TableCell({ children, align = "left", className, colSpan, }) {
    return (_jsx("td", { colSpan: colSpan, className: cn("px-6 py-3", align === "left" &&
            "text-left text-[var(--mk-palette-text-secondary,#B0B3C1)]", align === "right" && "text-right", align === "center" && "text-center", className), children: children }));
}
export function Table({ children, surface = "dark", }) {
    return (_jsxs(_Fragment, { children: [surface === "light" && _jsx("style", { children: SURFACE_CSS }), _jsx("div", { "data-mk-table": surface, className: cn("rounded-xl border overflow-hidden", SHELL[surface]), children: _jsx("div", { className: "overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0", children: _jsx("table", { className: "w-full text-sm", children: children }) }) })] }));
}
const SKELETON_WIDTHS = ["75%", "60%", "80%", "50%", "70%"];
function DataTableSkeletonCell({ width }) {
    return (_jsx("td", { className: "px-4 py-3", children: _jsx("div", { className: "animate-pulse h-4 rounded bg-[var(--mk-palette-bg-surface,#1E2130)]", style: { width } }) }));
}
/**
 * Musakonttori DataTable - data-driven table component.
 *
 * Features: column configuration, loading state (skeleton), empty state message,
 * striped rows, row click.
 *
 * @example
 * <DataTable
 *   columns={[{ key: "name", header: "Nimi" }, { key: "email", header: "Sähköposti" }]}
 *   data={[{ name: "Matti", email: "m@example.com" }]}
 *   striped
 * />
 */
export function DataTable({ columns, data, loading = false, loadingRowCount = 5, emptyMessage = "Ei tuloksia.", emptyDescription, striped = false, onRowClick, className, }) {
    if (loading) {
        const rows = Array.from({ length: loadingRowCount }, (_, i) => i);
        return (_jsx("div", { className: cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className), children: _jsxs("table", { className: "w-full caption-bottom text-sm", children: [_jsx("thead", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]", children: _jsx("tr", { children: columns.map((col) => (_jsx("th", { className: cn("h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]", col.headerClassName), ...col.thProps, children: col.header }, col.key))) }) }), _jsx("tbody", { children: rows.map((rowIndex) => (_jsx("tr", { children: columns.map((col, colIndex) => (_jsx(DataTableSkeletonCell, { width: SKELETON_WIDTHS[colIndex % SKELETON_WIDTHS.length] ?? "60%" }, col.key))) }, rowIndex))) })] }) }));
    }
    if (data.length === 0) {
        return (_jsxs("div", { className: cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className), children: [_jsx("table", { className: "w-full caption-bottom text-sm", children: _jsx("thead", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]", children: _jsx("tr", { children: columns.map((col) => (_jsx("th", { className: cn("h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]", col.headerClassName), ...col.thProps, children: col.header }, col.key))) }) }) }), _jsxs("div", { className: "flex flex-col items-center justify-center px-4 py-16 text-center", children: [_jsx("div", { className: "mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]", children: _jsx("svg", { className: "h-8 w-8 text-[var(--mk-palette-text-tertiary,#6B7280)]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" }) }) }), _jsx("p", { className: "text-sm font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: emptyMessage }), emptyDescription && (_jsx("p", { className: "mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: emptyDescription }))] })] }));
    }
    return (_jsx("div", { className: cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className), children: _jsxs("table", { className: "w-full caption-bottom text-sm", children: [_jsx("thead", { className: "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]", children: _jsx("tr", { children: columns.map((col) => (_jsx("th", { className: cn("h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]", col.headerClassName), ...col.thProps, children: col.header }, col.key))) }) }), _jsx("tbody", { children: data.map((row, rowIndex) => (_jsx("tr", { className: cn("border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] transition-colors", striped && rowIndex % 2 === 1 && "bg-[var(--mk-palette-bg,#0D0F17)]/40", onRowClick && "cursor-pointer hover:bg-[var(--mk-palette-bg-surface,#1E2130)]"), onClick: () => onRowClick?.(row), onKeyDown: (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                onRowClick?.(row);
                            }
                        }, tabIndex: onRowClick ? 0 : undefined, role: onRowClick ? "button" : undefined, children: columns.map((col) => (_jsx("td", { className: cn("px-4 py-3 align-middle text-[var(--mk-palette-text-primary,#F0F0F3)]", col.cellClassName), ...col.tdProps, children: col.render ? col.render(row) : row[col.key] ?? "\u2014" }, col.key))) }, row.id ?? rowIndex))) })] }) }));
}
