"use client";

import type { ReactNode } from "react";
import { AdminShell } from "./AdminShell";

export interface AdminPageProps {
  rail: ReactNode;
  nav: ReactNode;
  /** Header, body — whatever the archetype needs. Scrolls as one column. */
  children: ReactNode;
  navCollapsed?: boolean;
  label?: string;
  className?: string;
}

/**
 * The frame for archetypes that have no list/detail split — dashboard,
 * settings, report, form, wizard.
 *
 * It is the same shell with the detail closed and the content occupying the
 * list zone, rather than a second layout component. That keeps the rail and
 * nav pixel-identical across every archetype: switching from a workspace to
 * settings must not shift the navigation by a pixel, or the whole product
 * feels like separate apps stitched together.
 */
export function AdminPage({
  rail,
  nav,
  children,
  navCollapsed,
  label,
  className,
}: AdminPageProps) {
  return (
    <AdminShell
      className={className}
      rail={rail}
      nav={nav}
      list={children}
      detailState="closed"
      navCollapsed={navCollapsed}
      listLabel={label}
    />
  );
}

export interface AdminContentProps {
  children: ReactNode;
  /**
   * "prose" caps the measure for settings and forms, where long lines hurt.
   * "wide" lets dashboards and reports use the full width.
   */
  width?: "prose" | "wide";
  className?: string;
}

/** Body padding and measure, shared by every non-workspace archetype. */
export function AdminContent({
  children,
  width = "wide",
  className,
}: AdminContentProps) {
  return (
    <div
      className={
        (width === "prose" ? "mx-auto w-full max-w-2xl " : "w-full ") +
        "px-5 py-5 " +
        (className ?? "")
      }
    >
      {children}
    </div>
  );
}

export interface AdminSectionProps {
  title: ReactNode;
  description?: ReactNode;
  /** Save/reset for this section, or a single switch. */
  action?: ReactNode;
  children?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * A titled block. Settings pages are a stack of these; dashboards use them
 * between widget groups.
 *
 * Renders as a real `section` with a heading rather than a styled div, so the
 * settings page has a usable heading outline — that outline is how screen
 * reader users navigate a long settings screen.
 */
export function AdminSection({
  title,
  description,
  action,
  children,
  id,
  className,
}: AdminSectionProps) {
  return (
    <section
      id={id}
      className={
        "rounded-xl border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] " +
        (className ?? "")
      }
    >
      <div className="flex items-start gap-3 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-4 py-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-[0.8125rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children && <div className="px-4 py-3.5">{children}</div>}
    </section>
  );
}
