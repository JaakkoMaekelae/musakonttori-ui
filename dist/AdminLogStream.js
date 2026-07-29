"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { cn } from "./utils";
const LEVEL = {
    debug: { glyph: "·", word: "debug", tone: "var(--mk-palette-text-tertiary, #7E8292)" },
    info: { glyph: "•", word: "info", tone: "var(--mk-status-info, #3B82F6)" },
    warn: { glyph: "▲", word: "warning", tone: "var(--mk-status-warning, #F59E0B)" },
    error: { glyph: "✕", word: "error", tone: "var(--mk-status-error, #EF4444)" },
};
/**
 * Audit and error logs.
 *
 * Two things make this its own archetype rather than a workspace:
 *
 * 1. A log row expands **inline**. Opening a stack trace in a side panel
 *    loses the surrounding lines, which are usually the point — you read a
 *    log to see what happened *around* an event.
 *
 * 2. Lists are long. Rows use `content-visibility: auto` with an intrinsic
 *    size hint, so the browser skips layout and paint for offscreen rows.
 *    That is deliberately not JS windowing: rows here have variable height
 *    once expanded, and offset-based virtualisation either fights that or
 *    forces every detail into a fixed box. The CSS approach handles variable
 *    heights for free and keeps Ctrl+F working across the whole list.
 */
export function AdminLogStream({ entries, label, expandedIds, onToggle, footer, className, }) {
    const [internal, setInternal] = useState([]);
    const controlled = expandedIds != null;
    const open = controlled ? expandedIds : internal;
    const toggle = useCallback((id) => {
        if (onToggle)
            onToggle(id);
        if (!controlled) {
            setInternal((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
        }
    }, [controlled, onToggle]);
    return (_jsxs("div", { className: cn("font-[var(--mk-font-mono)] text-[0.6875rem]", className), children: [_jsx("style", { children: `
        .mk-log-row {
          content-visibility: auto;
          contain-intrinsic-size: auto 28px;
        }
      ` }), _jsx("ul", { "aria-label": label, children: entries.map((entry) => {
                    const meta = LEVEL[entry.level];
                    const isOpen = open.includes(entry.id);
                    const expandable = entry.detail != null;
                    return (_jsxs("li", { className: "mk-log-row border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", children: [expandable ? (_jsx("button", { type: "button", onClick: () => toggle(entry.id), "aria-expanded": isOpen, className: "flex w-full items-baseline gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", children: _jsx(Row, { entry: entry, meta: meta, caret: isOpen ? "▾" : "▸" }) })) : (_jsx("div", { className: "flex w-full items-baseline gap-2.5 px-3 py-1.5", children: _jsx(Row, { entry: entry, meta: meta, caret: " " }) })), isOpen && entry.detail && (_jsx("div", { className: "border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-inset,#0B0D12)] px-3 py-2.5", children: entry.detail }))] }, entry.id));
                }) }), footer && _jsx("div", { className: "px-3 py-2.5", children: footer })] }));
}
function Row({ entry, meta, caret, }) {
    return (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": "true", className: "w-2 shrink-0 text-[var(--mk-palette-text-tertiary,#7E8292)]", children: caret }), _jsx("time", { className: "shrink-0 tabular-nums text-[var(--mk-palette-text-tertiary,#7E8292)]", children: entry.timestamp }), _jsxs("span", { className: "shrink-0", style: { color: meta.tone }, children: [_jsx("span", { "aria-hidden": "true", children: meta.glyph }), _jsx("span", { className: "sr-only", children: meta.word })] }), _jsx("span", { className: "min-w-0 flex-1 truncate text-[var(--mk-palette-text-primary,#F0F0F3)]", children: entry.message }), entry.meta && (_jsx("span", { className: "shrink-0 truncate text-[var(--mk-palette-text-tertiary,#7E8292)]", children: entry.meta }))] }));
}
