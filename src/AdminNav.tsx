"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface AdminNavItem {
  id: string;
  label: string;
  href?: string;
  onSelect?: () => void;
  /** Row count or pending count. Rendered right-aligned in tabular figures. */
  count?: number;
  /** Draws attention to the count — use for queues that need action. */
  urgent?: boolean;
  icon?: ReactNode;
}

export interface AdminNavGroup {
  id: string;
  /** Omit for the first, unlabelled group. */
  label?: string;
  items: AdminNavItem[];
}

export interface AdminNavProps {
  /** Module name, shown above the groups. */
  title: string;
  groups: AdminNavGroup[];
  activeItemId?: string;
  /** Rendered after the groups — typically "+ New view". */
  footer?: ReactNode;
  className?: string;
}

/**
 * The view column.
 *
 * Saved views live here alongside the fixed ones, and that is deliberate: they
 * are how a product with hundreds of routes keeps its nav under the ~12-item
 * ceiling the spec sets. Anything that does not earn a permanent slot becomes
 * a saved view or lives behind the command palette.
 */
export function AdminNav({
  title,
  groups,
  activeItemId,
  footer,
  className,
}: AdminNavProps) {
  return (
    <nav aria-label={title} className={cn("px-2 py-3", className)}>
      <h2 className="px-2.5 pb-2 text-[0.8125rem] font-bold text-[var(--mk-palette-text-primary,#F0F0F3)]">
        {title}
      </h2>

      {groups.map((group) => (
        <div key={group.id}>
          {group.label && (
            <h3 className="px-2.5 pb-1.5 pt-3.5 text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-[var(--mk-palette-text-tertiary,#7E8292)]">
              {group.label}
            </h3>
          )}
          <ul>
            {group.items.map((item) => {
              const active = item.id === activeItemId;
              const Tag = item.href ? "a" : "button";
              return (
                <li key={item.id}>
                  <Tag
                    {...(item.href
                      ? { href: item.href }
                      : { type: "button" as const })}
                    aria-current={active ? "page" : undefined}
                    onClick={item.onSelect}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]",
                      active
                        ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] font-semibold text-[var(--mk-palette-accent-primary,#F44242)]"
                        : "text-[var(--mk-palette-text-secondary,#B0B3C1)] hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                      "[&_svg]:size-3.5 [&_svg]:shrink-0",
                    )}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                    {item.count != null && (
                      <span
                        className={cn(
                          "ml-auto shrink-0 font-[var(--mk-font-mono)] text-[0.6875rem] tabular-nums",
                          item.urgent
                            ? "rounded-full bg-[var(--mk-palette-accent-primary,#F44242)] px-1.5 py-px font-semibold text-white"
                            : "text-[var(--mk-palette-text-tertiary,#7E8292)]",
                        )}
                      >
                        {item.count}
                      </span>
                    )}
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {footer && <div className="px-1 pt-3">{footer}</div>}
    </nav>
  );
}
