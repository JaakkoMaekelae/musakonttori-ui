"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "./utils";

export interface AdminReportLayoutProps {
  /** Date range, dimension pickers, grouping. One row, above the results. */
  parameters: ReactNode;
  /** Run/refresh and export. Kept apart from parameters so "export" is never
   *  mistaken for "apply". */
  actions?: ReactNode;
  /** What the current parameters resolve to: {t("auto.113132026__1_284_riviä")}. */
  summary?: ReactNode;
  children: ReactNode;
  /**
   * Set while a run is in flight. Dims the previous result instead of blanking
   * it, so the user keeps their reference point and can still read the numbers
   * they were comparing against.
   */
  stale?: boolean;
  className?: string;
}

/**
 * Parameters on top, result below.
 *
 * The parameter row does not scroll away: reading a number halfway down a
 * long report is useless if you cannot see which period it covers. Only the
 * result scrolls.
 *
 * A re-run dims the old result rather than clearing it — a blank screen
 * between runs destroys the comparison the user was in the middle of making.
 */
export function AdminReportLayout({
  parameters,
  actions,
  summary,
  children,
  stale,
  className,
}: AdminReportLayoutProps) {
  const t = useTranslations();
  return (
    <div className={cn("flex h-full min-h-0 flex-col", className)}>
      <div className="shrink-0 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-5 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">{parameters}</div>
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </div>
        {summary && (
          <p className="mt-2 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
            {summary}
          </p>
        )}
      </div>

      <div
        className={cn(
          "min-h-0 flex-1 overflow-auto px-5 py-4 transition-opacity",
          stale && "pointer-events-none opacity-50",
        )}
        aria-busy={stale || undefined}
      >
        {children}
      </div>
    </div>
  );
}
