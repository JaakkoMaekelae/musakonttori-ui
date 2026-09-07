"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface ActivityFeedItem {
  id: string;
  /** Leading glyph or icon. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** Right-aligned: time, badge, or amount. */
  meta?: ReactNode;
}

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  className?: string;
}

/**
 * A compact activity/breakdown list: icon, title, caption and a trailing meta.
 *
 * Shared by "sales by category", "release state", "live activity" and "gate
 * activity" — the shape is identical, only the content differs.
 */
export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <ul
      className={cn(
        "divide-y divide-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
        >
          {item.icon && (
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] text-[0.6875rem] font-bold text-[var(--mk-palette-text-secondary,#B0B3C1)]"
            >
              {item.icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
              {item.title}
            </p>
            {item.description && (
              <p className="mt-0.5 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
                {item.description}
              </p>
            )}
          </div>
          {item.meta && (
            <div className="shrink-0 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
              {item.meta}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
