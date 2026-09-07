import type { ReactNode } from "react";
export interface ActivityFeedItem {
    id: string;
    /** Leading glyph or icon. */
    icon?: ReactNode;
    title: string;
    description?: string;
    /** Right-aligned: time, badge, or amount. */
    meta?: ReactNode;
}
export interface ActivityFeedProps {
    items: ActivityFeedItem[];
    className?: string;
}
/**
 * A compact activity/breakdown list: icon, title, caption and a trailing meta.
 *
 * Shared by "sales by category", "release state", "live activity" and "gate
 * activity" — the shape is identical, only the content differs.
 */
export declare function ActivityFeed({ items, className }: ActivityFeedProps): import("react").JSX.Element;
//# sourceMappingURL=ActivityFeed.d.ts.map