export interface CookieConsentBannerProps {
    privacyHref?: string;
    /** Built-in copy and button labels. Finnish defaults. */
    labels?: {
        regionLabel?: string;
        title?: string;
        description?: string;
        details?: string;
        privacyLink?: string;
        showDetails?: string;
        hideDetails?: string;
        necessaryOnly?: string;
        acceptAll?: string;
    };
}
export declare function CookieConsentBanner({ privacyHref, labels }: CookieConsentBannerProps): import("react").JSX.Element | null;
//# sourceMappingURL=CookieConsentBanner.d.ts.map