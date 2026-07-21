import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "./utils";
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
export function Skeleton({ variant = "text", className, ...props }) {
    return (_jsx("div", { className: cn("animate-pulse bg-[var(--mk-palette-bg-surface,#1E2130)]", variant === "text" && "h-4 w-full rounded-md", variant === "circular" && "rounded-full", variant === "rectangular" && "rounded-lg", className), role: "status", "aria-label": "Ladataan...", ...props }));
}
/**
 * Special table loading Skeleton. Renders rows × columns
 * grid of loading animation elements.
 *
 * @example
 * <TableSkeleton rows={5} cols={4} />
 */
export function TableSkeleton({ rows = 5, cols = 4, className }) {
    return (_jsx("div", { className: cn("space-y-3", className), role: "status", "aria-label": "Ladataan taulukkoa...", children: Array.from({ length: rows }).map((_, i) => (_jsx("div", { className: "flex gap-4", children: Array.from({ length: cols }).map((_, j) => (_jsx(Skeleton, { className: "h-8 flex-1" }, j))) }, i))) }));
}
