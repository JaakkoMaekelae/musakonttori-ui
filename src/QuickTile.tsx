"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface QuickTileProps {
  /** Bold heading, e.g. "Refunds". */
  label: string;
  /** Muted detail, e.g. "18 waiting". */
  value: ReactNode;
  className?: string;
}

/**
 * A compact label/value tile for queue overviews.
 *
 * Smaller than `StatTile` on purpose: these are "needs attention" counts, not
 * the headline numbers a dashboard leads with.
 */
export function QuickTile({ label, value, className }: QuickTileProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] p-3",
        className,
      )}
    >
      <p className="text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
        {label}
      </p>
      <p className="mt-0.5 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
        {value}
      </p>
    </div>
  );
}
