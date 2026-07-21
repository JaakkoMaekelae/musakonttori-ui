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
export declare function Skeleton({ variant, className, ...props }: SkeletonProps): import("react").JSX.Element;
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
export declare function TableSkeleton({ rows, cols, className }: TableSkeletonProps): import("react").JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map