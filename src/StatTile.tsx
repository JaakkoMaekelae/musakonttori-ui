"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export interface StatTileDelta {
  /** Signed change, already formatted: "+12.4 %", "−1 240 €". */
  value: string;
  direction: "up" | "down" | "flat";
  /** Names the comparison: "vs. edellinen kuukausi". Required — a bare delta is unreadable. */
  comparedTo: string;
  /**
   * Whether "up" is the good direction. Churn and error rates invert it, so
   * the tile cannot infer this. Defaults to true.
   */
  upIsGood?: boolean;
}

export interface StatTileProps {
  /** Sentence case, no trailing colon. */
  label: string;
  /** Pre-formatted and compacted: "1 284", "12,9 k", "4,2 M€". */
  value: ReactNode;
  delta?: StatTileDelta;
  /** Sparkline or meter. Kept as a slot — the tile does not draw. */
  trend?: ReactNode;
  /** Lifts the tile to hero size. Exactly one per view. */
  hero?: boolean;
  className?: string;
}

const ARROW: Record<StatTileDelta["direction"], string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

function deltaTone(d: StatTileDelta): string {
  if (d.direction === "flat") return "var(--mk-palette-text-secondary, #B0B3C1)";
  const good = (d.upIsGood ?? true) === (d.direction === "up");
  return good ? "var(--mk-status-success, #10B981)" : "var(--mk-status-error, #EF4444)";
}

/**
 * A number worth leading with.
 *
 * Two deliberate typographic choices, both easy to get wrong:
 *
 * 1. The value uses the font's *proportional* figures, not `tabular-nums`.
 *    Tabular gives every digit the width of a zero, which looks loose and
 *    gappy at display sizes. Tabular belongs in columns that must align
 *    vertically — table rows, axis ticks — not on a standalone figure.
 *
 * 2. The delta is never colour alone. It always carries a sign, an arrow and
 *    the period it is measured against, so it survives colour-blindness,
 *    grayscale print and forced-colors mode. `upIsGood` exists because for
 *    churn, error rate or cost, a rise is the bad news.
 */
export function StatTile({
  label,
  value,
  delta,
  trend,
  hero,
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-4 py-3.5",
        className,
      )}
    >
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[var(--mk-palette-text-tertiary,#7E8292)]">
        {label}
      </p>

      <p
        className={cn(
          "mt-1 font-semibold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]",
          hero ? "text-5xl" : "text-2xl",
        )}
      >
        {value}
      </p>

      {delta && (
        <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-[0.6875rem]">
          <span
            className="font-semibold"
            style={{ color: deltaTone(delta) }}
          >
            <span aria-hidden="true">{ARROW[delta.direction]}</span> {delta.value}
          </span>
          <span className="text-[var(--mk-palette-text-tertiary,#7E8292)]">
            {delta.comparedTo}
          </span>
        </p>
      )}

      {trend && <div className="mt-2.5">{trend}</div>}
    </div>
  );
}

export interface StatRowProps {
  children: ReactNode;
  className?: string;
}

/** Equal-width tiles that wrap instead of shrinking below readability. */
export function StatRow({ children, className }: StatRowProps) {
  return (
    <div
      className={cn(
        "grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
