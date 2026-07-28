import type { ReactNode } from "react";
export interface AdminRailModule {
    id: string;
    /** Accessible name. Shown as a tooltip via title. */
    label: string;
    icon: ReactNode;
    href?: string;
    onSelect?: () => void;
    /** Unread/pending count. Rendered as a dot when > 0. */
    badge?: number;
}
export interface AdminRailProps {
    /** Product initial for the lockup icon, e.g. "S" for Sopimushallinta. */
    initial: string;
    productName: string;
    modules: AdminRailModule[];
    activeModuleId?: string;
    /** Rendered at the bottom: avatar, theme toggle, whatever the product needs. */
    footer?: ReactNode;
    /** Overrides the lockup gradient for products with their own identity. */
    gradient?: string;
    className?: string;
}
/**
 * The narrow always-dark column.
 *
 * Dark in both themes on purpose — it is the one element that carries the
 * brand at all times, and a light rail would make the product look like a
 * generic admin template in light mode. The only per-product variation
 * allowed here is the lockup gradient (BRAND.md: products with their own
 * consumer identity keep the lockup structure but use their own accent).
 */
export declare function AdminRail({ initial, productName, modules, activeModuleId, footer, gradient, className, }: AdminRailProps): import("react").JSX.Element;
//# sourceMappingURL=AdminRail.d.ts.map