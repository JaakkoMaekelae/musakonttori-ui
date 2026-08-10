export interface AppFooterLinkGroup {
    title: string;
    items: {
        label: string;
        href: string;
    }[];
}
export interface AppFooterProps {
    productName: string;
    companyName?: string;
    links?: {
        label: string;
        href: string;
    }[];
    linkGroups?: AppFooterLinkGroup[];
    /** Copyright line after the year and company name. Override for the app's own locale. */
    rightsText?: string;
    className?: string;
}
export declare function AppFooter({ productName, companyName, links, linkGroups, rightsText, className, }: AppFooterProps): import("react").JSX.Element;
//# sourceMappingURL=AppFooter.d.ts.map