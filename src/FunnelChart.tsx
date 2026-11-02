"use client";

import { cn } from "./utils";

export interface FunnelStep {
  label: string;
  value: string;
  /** Bar height in pixels. */
  height: number;
  /** Bar width as a percentage of the column, 0–100. */
  width: number;
}

export interface FunnelChartProps {
  steps: FunnelStep[];
  ariaLabel?: string;
  className?: string;
}

/**
 * A conversion funnel. Each step tapers from the one before it.
 *
 * Like `BarChart`, the pillars are decorative; the counts live in `value`,
 * which stays readable text.
 */
export function FunnelChart({
  steps,
  ariaLabel = "Funnel chart",
  className,
}: FunnelChartProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("grid items-end gap-2 pt-3", className)}
      style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
    >
      {steps.map((step) => (
        <div key={step.label} className="flex flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="mb-1.5 rounded-t"
            style={{
              height: `${Math.max(2, step.height)}px`,
              width: `${Math.max(20, Math.min(100, step.width))}%`,
              background:
                "linear-gradient(180deg, var(--mk-palette-accent-primary,#C9252D), var(--mk-brand-red-deep,#720D0D))",
            }}
          />
          <span className="text-xs font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
            {step.value}
          </span>
          <span className="text-[0.625rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
