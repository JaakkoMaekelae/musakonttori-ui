"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface AdminRailModule {
  id: string;
  /** Accessible name. Shown as a tooltip via title. */
  label: string;
  icon: ReactNode;
  href?: string;
  onSelect?: () => void;
  /** Unread/pending count. Rendered as a dot when > 0. */
  badge?: number;
}

export interface AdminRailProps {
  /** Product initial for the lockup icon, e.g. "S" for Sopimushallinta. */
  initial: string;
  productName: string;
  modules: AdminRailModule[];
  activeModuleId?: string;
  /** Rendered at the bottom: avatar, theme toggle, whatever the product needs. */
  footer?: ReactNode;
  /** Overrides the lockup gradient for products with their own identity. */
  gradient?: string;
  className?: string;
}

/**
 * The narrow always-dark column.
 *
 * Dark in both themes on purpose — it is the one element that carries the
 * brand at all times, and a light rail would make the product look like a
 * generic admin template in light mode. The only per-product variation
 * allowed here is the lockup gradient (BRAND.md: products with their own
 * consumer identity keep the lockup structure but use their own accent).
 */
export function AdminRail({
  initial,
  productName,
  modules,
  activeModuleId,
  footer,
  gradient,
  className,
}: AdminRailProps) {
  return (
    <nav
      aria-label={productName}
      className={cn("flex h-full flex-col items-center gap-2 py-2.5", className)}
    >
      <span
        aria-hidden="true"
        title={productName}
        className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[0.8125rem] font-extrabold italic tracking-[-0.04em] text-white"
        style={{
          background: gradient ?? "var(--mk-brand-gradient)",
          boxShadow: "0 4px 12px rgba(191,34,39,0.32)",
        }}
      >
        {initial}
      </span>
      <span className="sr-only">{productName}</span>

      <ul className="flex flex-col items-center gap-1.5 pt-1">
        {modules.map((m) => {
          const active = m.id === activeModuleId;
          const Tag = m.href ? "a" : "button";
          return (
            <li key={m.id} className="relative">
              <Tag
                {...(m.href ? { href: m.href } : { type: "button" as const })}
                title={m.label}
                aria-label={m.label}
                aria-current={active ? "page" : undefined}
                onClick={m.onSelect}
                className={cn(
                  "flex size-7 items-center justify-center rounded-[7px] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]",
                  active
                    ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] text-[var(--mk-palette-accent-primary,#F44242)] ring-1 ring-[var(--mk-palette-accent-primary,#F44242)]/45"
                    : "text-white/55 hover:bg-white/10 hover:text-white",
                  "[&_svg]:size-4",
                )}
              >
                {m.icon}
              </Tag>
              {m.badge != null && m.badge > 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[var(--mk-palette-accent-primary,#F44242)] ring-2 ring-[#0F1117]"
                />
              )}
            </li>
          );
        })}
      </ul>

      {footer && <div className="mt-auto pb-1">{footer}</div>}
    </nav>
  );
}
