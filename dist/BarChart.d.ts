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
export declare function BarChart({ data, legend, ariaLabel, className, }: BarChartProps): import("react").JSX.Element;
//# sourceMappingURL=BarChart.d.ts.map