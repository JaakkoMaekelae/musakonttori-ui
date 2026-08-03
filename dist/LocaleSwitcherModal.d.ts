export interface LocalePrefs {
    locale: string;
    currency: string;
    /**
     * Added after the first release of this component. Entries written by the
     * older version have no country, so it stays optional — a missing value
     * falls back to browser detection rather than resetting the whole record.
     */
    country?: string;
}
/** Broadcast so other controls on the page (a header flag, a price list) re-read. */
export declare const LOCALE_PREFS_EVENT = "mk-locale-prefs-changed";
export declare function readLocalePrefs(): LocalePrefs | null;
export declare const LANGUAGE_LABELS: Record<string, {
    flag: string;
    name: string;
    subtitle: string;
}>;
export interface LocaleSwitcherModalProps {
    open: boolean;
    onClose: () => void;
    currentLocale?: string;
    currentCurrency?: string;
    /**
     * Server-known country. Omit to detect from the browser — but pass it when
     * the app already resolved a country (a geo cookie, an account setting),
     * otherwise detection will silently override that choice on every mount.
     */
    currentCountry?: string;
    /**
     * The locales this product actually routes. Omit only if the product serves
     * every language in LANGUAGE_LABELS — almost none do.
     *
     * Without it the modal offers whatever the selected country speaks, and
     * picking Sweden hands the app "sv". Sopimushallinta routes fi and en only,
     * so that produced a navigation to /en/sv/release and a 404.
     */
    supportedLocales?: readonly string[];
    onLocaleChange?: (locale: string) => void;
    onCurrencyChange?: (currency: string) => void;
    onCountryChange?: (country: string) => void;
}
export declare function LocaleSwitcherModal({ open, onClose, currentLocale, currentCurrency, currentCountry, supportedLocales, onLocaleChange, onCurrencyChange, onCountryChange, }: LocaleSwitcherModalProps): import("react").ReactPortal | null;
//# sourceMappingURL=LocaleSwitcherModal.d.ts.map