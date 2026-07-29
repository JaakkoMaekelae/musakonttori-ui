"use client";

import { useCallback, useState, type ReactNode } from "react";
import { cn } from "./utils";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  id: string;
  /** Pre-formatted and already in the viewer's timezone. */
  timestamp: string;
  level: LogLevel;
  message: string;
  /** Actor, request id, resource — rendered as dim trailing metadata. */
  meta?: string;
  /** Stack trace, payload, diff. Rendered inline when the row is expanded. */
  detail?: ReactNode;
}

export interface AdminLogStreamProps {
  entries: LogEntry[];
  label: string;
  /** Controlled expansion. Omit to let the component own it. */
  expandedIds?: readonly string[];
  onToggle?: (id: string) => void;
  /** Rendered under the last row — "Load more", or a live-tail indicator. */
  footer?: ReactNode;
  className?: string;
}

const LEVEL: Record<LogLevel, { glyph: string; word: string; tone: string }> = {
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
export function AdminLogStream({
  entries,
  label,
  expandedIds,
  onToggle,
  footer,
  className,
}: AdminLogStreamProps) {
  const [internal, setInternal] = useState<string[]>([]);
  const controlled = expandedIds != null;
  const open = controlled ? expandedIds : internal;

  const toggle = useCallback(
    (id: string) => {
      if (onToggle) onToggle(id);
      if (!controlled) {
        setInternal((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
      }
    },
    [controlled, onToggle],
  );

  return (
    <div className={cn("font-[var(--mk-font-mono)] text-[0.6875rem]", className)}>
      <style>{`
        .mk-log-row {
          content-visibility: auto;
          contain-intrinsic-size: auto 28px;
        }
      `}</style>
      <ul aria-label={label}>
        {entries.map((entry) => {
          const meta = LEVEL[entry.level];
          const isOpen = open.includes(entry.id);
          const expandable = entry.detail != null;

          return (
            <li
              key={entry.id}
              className="mk-log-row border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]"
            >
              {expandable ? (
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-baseline gap-2.5 px-3 py-1.5 text-left transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]"
                >
                  <Row entry={entry} meta={meta} caret={isOpen ? "▾" : "▸"} />
                </button>
              ) : (
                <div className="flex w-full items-baseline gap-2.5 px-3 py-1.5">
                  <Row entry={entry} meta={meta} caret=" " />
                </div>
              )}

              {isOpen && entry.detail && (
                <div className="border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-inset,#0B0D12)] px-3 py-2.5">
                  {entry.detail}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {footer && <div className="px-3 py-2.5">{footer}</div>}
    </div>
  );
}

function Row({
  entry,
  meta,
  caret,
}: {
  entry: LogEntry;
  meta: (typeof LEVEL)[LogLevel];
  caret: string;
}) {
  return (
    <>
      <span aria-hidden="true" className="w-2 shrink-0 text-[var(--mk-palette-text-tertiary,#7E8292)]">
        {caret}
      </span>
      <time className="shrink-0 tabular-nums text-[var(--mk-palette-text-tertiary,#7E8292)]">
        {entry.timestamp}
      </time>
      <span className="shrink-0" style={{ color: meta.tone }}>
        <span aria-hidden="true">{meta.glyph}</span>
        <span className="sr-only">{meta.word}</span>
      </span>
      <span className="min-w-0 flex-1 truncate text-[var(--mk-palette-text-primary,#F0F0F3)]">
        {entry.message}
      </span>
      {entry.meta && (
        <span className="shrink-0 truncate text-[var(--mk-palette-text-tertiary,#7E8292)]">
          {entry.meta}
        </span>
      )}
    </>
  );
}
