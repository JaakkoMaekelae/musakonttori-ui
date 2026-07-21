import type { ComponentType, AnchorHTMLAttributes } from "react";
export interface BreadcrumbItem {
    label: string;
    href?: string;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
    homeHref?: string;
    homeLabel?: string;
    linkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    }>;
}
export declare function Breadcrumb({ items, className, homeHref, homeLabel, linkComponent: LinkComponent, }: BreadcrumbProps): import("react").JSX.Element;
//# sourceMappingURL=Breadcrumb.d.ts.map