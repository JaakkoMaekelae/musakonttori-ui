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
    className?: string;
}
export declare function AppFooter({ productName, companyName, links, linkGroups, className, }: AppFooterProps): import("react").JSX.Element;
//# sourceMappingURL=AppFooter.d.ts.map