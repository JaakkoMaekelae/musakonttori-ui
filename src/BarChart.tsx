"use client";

import { cn } from "./utils";

export interface BarChartProps {
  /** Bar heights, 0–100, relative to the tallest bar. */
  data: number[];
  /** Legend entries, rendered below the bars with accent markers. */
  legend?: string[];
  /** Accessible name describing the whole chart. */
  ariaLabel?: string;
  className?: string;
}

/**
 * A minimal bar chart for admin dashboards.
 *
 * Bars are decorative — the numbers a dashboard needs are in the accompanying
 * tiles and tables, so this chart is a trend shape, not a data source. The
 * `ariaLabel` carries the meaning for assistive tech.
 */
export function BarChart({
  data,
  legend,
  ariaLabel = "Bar chart",
  className,
}: BarChartProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        role="img"
        aria-label={ariaLabel}
        className="flex items-end gap-2 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] pt-4"
        style={{ height: 220 }}
      >
        {data.map((value, i) => (
          <div
            key={i}
            className="min-w-2 flex-1 rounded-t"
            style={{
              height: `${Math.max(2, Math.min(100, value))}%`,
              background:
                "linear-gradient(180deg, var(--mk-palette-accent-primary,#F44242), var(--mk-brand-red-deep,#650506))",
            }}
          />
        ))}
      </div>
      {legend && legend.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-4 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
          {legend.map((entry) => (
            <span key={entry} className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ background: "var(--mk-palette-accent-primary,#F44242)" }}
              />
              {entry}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
