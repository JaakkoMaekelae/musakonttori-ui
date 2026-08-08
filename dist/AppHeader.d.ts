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
    /** Translation labels. Finnish defaults for backward compatibility. */
    labels?: {
        mainNav?: string;
        openUserMenu?: string;
        userAvatar?: string;
        userMenu?: string;
        account?: string;
        organizations?: string;
        signOut?: string;
        signIn?: string;
        closeMenu?: string;
        openMenu?: string;
    };
}
export declare function AppHeader({ productName, productHref, navItems, user, onSignOut, signInHref, className, labels, }: AppHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=AppHeader.d.ts.map