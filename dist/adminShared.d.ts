import type { ReactNode } from "react";
import type { FunnelStep } from "./FunnelChart";
import type { BadgeTone } from "./Badge";
/**
 * Internal helpers and content types for the product admin dashboards.
 *
 * Not part of the public package surface — these exist so the four product
 * views share one icon set, one table shape and one content contract without
 * copying them.
 */
export declare function Icon({ d }: {
    d: string;
}): import("react").JSX.Element;
export declare const ICONS: {
    readonly home: "M3 11l9-8 9 8M5 10v10h14V10";
    readonly doc: "M9 12h6m-6 4h6M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z";
    readonly users: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a6 6 0 0112 0v2";
    readonly cart: "M3 3h2l2 12h11l2-8H6";
    readonly box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4";
    readonly card: "M3 10h18M6 19h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z";
    readonly chart: "M9 19V9m6 10V5M4 19h16";
    readonly music: "M9 18V6l12-2v12";
    readonly ticket: "M3 8a2 2 0 002 2 2 2 0 000 4 2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 000-4 2 2 0 000-4V6a2 2 0 00-2-2H5a2 2 0 00-2 2z";
    readonly scan: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z";
    readonly shield: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z";
    readonly megaphone: "M3 11l16-7v16L3 13v-2zM3 11v2";
    readonly calendar: "M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM3 8h18M8 2v4M16 2v4";
    readonly truck: "M1 5h13v11H1zM14 9h4l4 4v3h-8zM5 19a2 2 0 100-4 2 2 0 000 4zM18 19a2 2 0 100-4 2 2 0 000 4z";
};
export interface BarContent {
    ariaLabel: string;
    data: number[];
    legend?: string[];
}
export interface FunnelContent {
    ariaLabel: string;
    steps: FunnelStep[];
}
export interface MeterContent {
    title: string;
    value: string;
    caption?: string;
    progress: number;
    badge?: {
        label: string;
        tone?: BadgeTone;
    };
}
export interface QuickContent {
    label: string;
    value: ReactNode;
}
export interface TableContent {
    columns: {
        header: string;
        align?: "left" | "right";
    }[];
    /** Cell content per row, in column order. */
    rows: ReactNode[][];
}
export interface MiniTableColumn {
    header: string;
    align?: "left" | "right";
}
export declare function MiniTable({ columns, children, }: {
    columns: MiniTableColumn[];
    children: ReactNode;
}): import("react").JSX.Element;
export declare function TR({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function TD({ children, align, className, }: {
    children: ReactNode;
    align?: "left" | "right";
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=adminShared.d.ts.map