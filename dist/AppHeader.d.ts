export interface AppHeaderLabels {
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
}
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
    /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
    locale?: string;
    /** Override any of the header's own strings. Built-in: fi, en, sv. */
    labels?: AppHeaderLabels;
}
export declare function AppHeader({ productName, productHref, navItems, user, onSignOut, signInHref, className, locale, labels, }: AppHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=AppHeader.d.ts.map