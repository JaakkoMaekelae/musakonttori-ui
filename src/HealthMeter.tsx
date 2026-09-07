"use client";

import { cn } from "./utils";
import { Badge, type BadgeTone } from "./Badge";
import { Progress } from "./Progress";

export interface HealthMeterProps {
  title: string;
  /** The figure that matters: a percentage, a latency, a count. */
  value: string;
  /** One line under the value, e.g. "on-time shipment". */
  caption?: string;
  /** 0–100. */
  progress: number;
  /** Right-aligned status chip. */
  badge?: { label: string; tone?: BadgeTone };
  className?: string;
}

/**
 * A single health/status cell with a labelled progress meter.
 *
 * Used for seller health, DSP health, discovery intelligence and live event
 * command — anywhere a name needs a score and a status at a glance.
 */
export function HealthMeter({
  title,
  value,
  caption,
  progress,
  badge,
  className,
}: HealthMeterProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] p-3",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
          {title}
        </span>
        {badge && <Badge tone={badge.tone ?? "neutral"}>{badge.label}</Badge>}
      </div>
      <span className="mt-2 block text-lg font-semibold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]">
        {value}
      </span>
      {caption && (
        <span className="mt-0.5 block text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
          {caption}
        </span>
      )}
      <Progress value={progress} className="mt-2.5" />
    </div>
  );
}
