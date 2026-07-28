import type { ReactNode } from "react";
export interface AdminNavItem {
    id: string;
    label: string;
    href?: string;
    onSelect?: () => void;
    /** Row count or pending count. Rendered right-aligned in tabular figures. */
    count?: number;
    /** Draws attention to the count — use for queues that need action. */
    urgent?: boolean;
    icon?: ReactNode;
}
export interface AdminNavGroup {
    id: string;
    /** Omit for the first, unlabelled group. */
    label?: string;
    items: AdminNavItem[];
}
export interface AdminNavProps {
    /** Module name, shown above the groups. */
    title: string;
    groups: AdminNavGroup[];
    activeItemId?: string;
    /** Rendered after the groups — typically "+ New view". */
    footer?: ReactNode;
    className?: string;
}
/**
 * The view column.
 *
 * Saved views live here alongside the fixed ones, and that is deliberate: they
 * are how a product with hundreds of routes keeps its nav under the ~12-item
 * ceiling the spec sets. Anything that does not earn a permanent slot becomes
 * a saved view or lives behind the command palette.
 */
export declare function AdminNav({ title, groups, activeItemId, footer, className, }: AdminNavProps): import("react").JSX.Element;
//# sourceMappingURL=AdminNav.d.ts.map