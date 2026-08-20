import { type ReactNode } from "react";
export interface StatTileDelta {
    /** Signed change, already formatted: "+12.4 %", "−1 240 €". */
    value: string;
    direction: "up" | "down" | "flat";
    /** Names the comparison: "vs. edellinen kuukausi". Required — a bare delta is unreadable. */
    comparedTo: string;
    /**
     * Whether "up" is the good direction. Churn and error rates invert it, so
     * the tile cannot infer this. Defaults to true.
     */
    upIsGood?: boolean;
}
export interface StatTileProps {
    /** Sentence case, no trailing colon. */
    label: string;
    /** Pre-formatted and compacted: "1 284", "12,9 k", "4,2 M€". */
    value: ReactNode;
    delta?: StatTileDelta;
    /** Sparkline or meter. Kept as a slot — the tile does not draw. */
    trend?: ReactNode;
    /** Lifts the tile to hero size. Exactly one per view. */
    hero?: boolean;
    className?: string;
}
/**
 * A number worth leading with.
 *
 * Two deliberate typographic choices, both easy to get wrong:
 *
 * 1. The value uses the font's *proportional* figures, not `tabular-nums`.
 *    Tabular gives every digit the width of a zero, which looks loose and
 *    gappy at display sizes. Tabular belongs in columns that must align
 *    vertically — table rows, axis ticks — not on a standalone figure.
 *
 * 2. The delta is never colour alone. It always carries a sign, an arrow and
 *    the period it is measured against, so it survives colour-blindness,
 *    grayscale print and forced-colors mode. `upIsGood` exists because for
 *    churn, error rate or cost, a rise is the bad news.
 */
export declare const StatTile: import("react").NamedExoticComponent<StatTileProps>;
export interface StatRowProps {
    children: ReactNode;
    className?: string;
}
/** Equal-width tiles that wrap instead of shrinking below readability. */
export declare const StatRow: import("react").NamedExoticComponent<StatRowProps>;
//# sourceMappingURL=StatTile.d.ts.map