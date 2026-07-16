import { cn } from "./utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant: text (line), circular (circle), rectangular */
  variant?: "text" | "circular" | "rectangular";
}

/**
 * Musakonttori Skeleton - loading animation placeholder.
 *
 * Variants:
 * - text: line (default), use width `className="w-64"` to adjust
 * - circular: round, e.g. avatar placeholder
 * - rectangular: rectangle, e.g. image placeholder
 *
 * @example
 * <Skeleton className="h-4 w-full" />
 * <Skeleton variant="circular" className="h-12 w-12" />
 * <Skeleton variant="rectangular" className="h-32 w-full" />
 */
export function Skeleton({ variant = "text", className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--mk-palette-bg-surface,#1E2130)]",
        variant === "text" && "h-4 w-full rounded-md",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className,
      )}
      role="status"
      aria-label="Ladataan..."
      {...props}
    />
  );
}

export interface TableSkeletonProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  cols?: number;
  className?: string;
}

/**
 * Special table loading Skeleton. Renders rows × columns
 * grid of loading animation elements.
 *
 * @example
 * <TableSkeleton rows={5} cols={4} />
 */
export function TableSkeleton({ rows = 5, cols = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-label="Ladataan taulukkoa...">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
