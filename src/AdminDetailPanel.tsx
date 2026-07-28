"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";
import type { DetailState } from "./AdminShell";

export interface AdminDetailTab {
  id: string;
  label: string;
  href?: string;
  onSelect?: () => void;
}

export interface AdminDetailPanelProps {
  title: ReactNode;
  /** Secondary line: owner, artist, reference number. */
  subtitle?: ReactNode;
  /** Status chip or similar. Kept separate so it sits beside the title. */
  status?: ReactNode;
  /** Primary and secondary actions, right-aligned in the header. */
  actions?: ReactNode;
  /** Only rendered when expanded — a 320px panel has no room for tabs. */
  tabs?: AdminDetailTab[];
  activeTabId?: string;
  state?: DetailState;
  onToggleExpand?: () => void;
  onClose?: () => void;
  /** Position in the queue, e.g. "3 / 142". Shown only when expanded. */
  cursorLabel?: string;
  expandLabel?: string;
  collapseLabel?: string;
  closeLabel?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * The record view. One component, two widths.
 *
 * In `panel` it is a 320px summary: title, status, the fields worth seeing
 * before deciding, and the actions you would take without opening anything.
 * In `full` it gains tabs, the queue cursor, and room for real work.
 *
 * Tabs are hidden in `panel` rather than scrolled or truncated — a tab strip
 * that does not fit is worse than no tab strip, and the panel's job is to let
 * you decide whether to expand, not to be a cramped version of the full view.
 */
export function AdminDetailPanel({
  title,
  subtitle,
  status,
  actions,
  tabs,
  activeTabId,
  state = "panel",
  onToggleExpand,
  onClose,
  cursorLabel,
  expandLabel = "Expand",
  collapseLabel = "Collapse",
  closeLabel = "Close",
  children,
  className,
}: AdminDetailPanelProps) {
  const expanded = state === "full";

  return (
    <div className={cn("flex h-full flex-col", className)}>
      <header className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-3.5 py-3">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-[0.9375rem] font-bold tracking-[-0.01em] text-[var(--mk-palette-text-primary,#F0F0F3)]">
                {title}
              </h2>
              {status}
            </div>
            {subtitle && (
              <p className="mt-0.5 truncate text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {expanded && cursorLabel && (
              <span className="mr-1 whitespace-nowrap text-[0.6875rem] tabular-nums text-[var(--mk-palette-text-tertiary,#7E8292)]">
                {cursorLabel}
              </span>
            )}
            {actions}
            {onToggleExpand && (
              <button
                type="button"
                onClick={onToggleExpand}
                aria-expanded={expanded}
                className="rounded-lg border border-[var(--mk-palette-border-default,rgba(255,255,255,0.14))] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--mk-palette-text-primary,#F0F0F3)] transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]"
              >
                {expanded ? collapseLabel : expandLabel}
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="rounded-lg p-1 text-[var(--mk-palette-text-tertiary,#7E8292)] transition-colors hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {expanded && tabs && tabs.length > 0 && (
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex gap-0.5 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-3.5"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeTabId;
            const Tag = tab.href ? "a" : "button";
            return (
              <Tag
                key={tab.id}
                {...(tab.href ? { href: tab.href } : { type: "button" as const })}
                role="tab"
                aria-selected={active}
                onClick={tab.onSelect}
                className={cn(
                  "-mb-px border-b-2 px-2.5 py-2 text-xs transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]",
                  active
                    ? "border-[var(--mk-palette-accent-primary,#F44242)] font-semibold text-[var(--mk-palette-accent-primary,#F44242)]"
                    : "border-transparent text-[var(--mk-palette-text-secondary,#B0B3C1)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                )}
              >
                {tab.label}
              </Tag>
            );
          })}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export interface AdminFieldProps {
  label: ReactNode;
  children: ReactNode;
  /** Renders the value in tabular figures — money, counts, identifiers. */
  numeric?: boolean;
}

/** Label/value row. Numeric values get tabular figures so columns line up. */
export function AdminField({ label, children, numeric }: AdminFieldProps) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1">
      <dt className="text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
        {label}
      </dt>
      <dd
        className={cn(
          "text-right text-xs text-[var(--mk-palette-text-primary,#F0F0F3)]",
          numeric && "font-[var(--mk-font-mono)] tabular-nums",
        )}
      >
        {children}
      </dd>
    </div>
  );
}
