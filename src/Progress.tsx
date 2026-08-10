"use client";

import * as React from "react";
import { cn } from "./utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value 0-100 */
  value?: number;
}

/**
 * Musakonttori Progress - edistymispalkki.
 *
 * @example
 * <Progress value={60} />
 * <Progress value={100} className="h-3" />
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)]",
        className,
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-[var(--mk-palette-bg-brand,#DC2626)] transition-all duration-300"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </div>
  ),
);
Progress.displayName = "Progress";

export { Progress };
