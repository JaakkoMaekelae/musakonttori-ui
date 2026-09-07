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
export declare function FunnelChart({ steps, ariaLabel, className, }: FunnelChartProps): import("react").JSX.Element;
//# sourceMappingURL=FunnelChart.d.ts.map