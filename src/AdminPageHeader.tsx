"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface AdminPageHeaderProps {
  title: ReactNode;
  /** One line of context. Counts, freshness, scope — not marketing copy. */
  description?: ReactNode;
  /** Breadcrumb or back link, rendered above the title. */
  eyebrow?: ReactNode;
  /**
   * Actions, right-aligned. Exactly one should be primary — the spec's "one
   * view, one primary action" rule is enforced by review, not by types.
   */
  actions?: ReactNode;
  /** Tabs or a filter bar, rendered below and flush with the bottom border. */
  toolbar?: ReactNode;
  className?: string;
}

/**
 * The header every non-workspace archetype starts with.
 *
 * Deliberately does not own the page's scroll container: dashboards scroll as
 * one block, reports keep their parameter bar fixed while results scroll, and
 * settings pin their section nav. Owning scroll here would force all three
 * into the same behaviour.
 */
export function AdminPageHeader({
  title,
  description,
  eyebrow,
  actions,
  toolbar,
  className,
}: AdminPageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)]",
        className,
      )}
    >
      <div className="flex items-start gap-3 px-5 pb-3.5 pt-4">
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <div className="pb-1 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
              {eyebrow}
            </div>
          )}
          <h1 className="truncate text-xl font-bold tracking-[-0.025em] text-[var(--mk-palette-text-primary,#F0F0F3)]">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        )}
      </div>
      {toolbar && <div className="px-5">{toolbar}</div>}
    </header>
  );
}
