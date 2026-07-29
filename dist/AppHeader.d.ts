export interface AppHeaderProps {
    productName: string;
    productHref?: string;
    navItems?: {
        label: string;
        href: string;
    }[];
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
    onSignOut?: () => void;
    signInHref?: string;
    className?: string;
}
export declare function AppHeader({ productName, productHref, navItems, user, onSignOut, signInHref, className, }: AppHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=AppHeader.d.ts.map