import type { ReactNode } from "react";
export interface AdminReportLayoutProps {
    /** Date range, dimension pickers, grouping. One row, above the results. */
    parameters: ReactNode;
    /** Run/refresh and export. Kept apart from parameters so "export" is never
     *  mistaken for "apply". */
    actions?: ReactNode;
    /** What the current parameters resolve to: "1.1.–31.3.2026 · 1 284 riviä". */
    summary?: ReactNode;
    children: ReactNode;
    /**
     * Set while a run is in flight. Dims the previous result instead of blanking
     * it, so the user keeps their reference point and can still read the numbers
     * they were comparing against.
     */
    stale?: boolean;
    className?: string;
}
/**
 * Parameters on top, result below.
 *
 * The parameter row does not scroll away: reading a number halfway down a
 * long report is useless if you cannot see which period it covers. Only the
 * result scrolls.
 *
 * A re-run dims the old result rather than clearing it — a blank screen
 * between runs destroys the comparison the user was in the middle of making.
 */
export declare function AdminReportLayout({ parameters, actions, summary, children, stale, className, }: AdminReportLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=AdminReportLayout.d.ts.map