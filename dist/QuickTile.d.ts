import type { ReactNode } from "react";
export interface QuickTileProps {
    /** Bold heading, e.g. "Refunds". */
    label: string;
    /** Muted detail, e.g. "18 waiting". */
    value: ReactNode;
    className?: string;
}
/**
 * A compact label/value tile for queue overviews.
 *
 * Smaller than `StatTile` on purpose: these are "needs attention" counts, not
 * the headline numbers a dashboard leads with.
 */
export declare function QuickTile({ label, value, className }: QuickTileProps): import("react").JSX.Element;
//# sourceMappingURL=QuickTile.d.ts.map