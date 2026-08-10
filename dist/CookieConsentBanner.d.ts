export interface CookieConsentBannerProps {
    privacyHref?: string;
    /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
    locale?: string;
    /** Override any of the banner's own built-in copy and button labels. Built-in: fi, en, sv. */
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
export declare function CookieConsentBanner({ privacyHref, locale, labels }: CookieConsentBannerProps): import("react").JSX.Element | null;
//# sourceMappingURL=CookieConsentBanner.d.ts.map