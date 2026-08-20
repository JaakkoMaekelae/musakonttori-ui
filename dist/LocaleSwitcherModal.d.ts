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
/**
 * The modal's own chrome, in the languages the family actually ships UI in.
 *
 * The language tiles were always localized — each names itself — but the
 * headings around them were hardcoded Finnish, so an English page opened a
 * modal reading "Alueasetukset / Maa, kieli ja valuutta". Anything not listed
 * here falls back to English rather than to Finnish: a visitor whose language
 * we have no strings for is more likely to read English.
 *
 * Products with their own translations can override the whole set via `labels`.
 */
export interface LocaleSwitcherLabels {
    title: string;
    subtitle: string;
    country: string;
    language: string;
    currency: string;
    saved: string;
    close: string;
    dialog: string;
}
export declare const LANGUAGE_LABELS: Record<string, {
    flag: string;
    name: string;
    subtitle: string;
}>;
/**
 * EU member states offered as an explicit country choice. The country drives
 * VAT (buyer's country = place of supply), so only VAT-bearing countries are
 * listed — not a general atlas. Ordering: the product's home market first,
 * then the rest of the EU alphabetically.
 */
export declare const EU_COUNTRY_OPTIONS: readonly {
    code: string;
    name: string;
    flag: string;
}[];
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
    /** Override any of the modal's own strings. Built-in: fi, en, sv. */
    labels?: Partial<LocaleSwitcherLabels>;
    onLocaleChange?: (locale: string) => void;
    onCurrencyChange?: (currency: string) => void;
    onCountryChange?: (country: string) => void;
    /** Hide the currency section. Currency still follows the selected country. */
    showCurrency?: boolean;
}
export declare function LocaleSwitcherModal({ open, onClose, currentLocale, currentCurrency, currentCountry, supportedLocales, labels, onLocaleChange, onCurrencyChange, onCountryChange, showCurrency, }: LocaleSwitcherModalProps): import("react").ReactPortal | null;
//# sourceMappingURL=LocaleSwitcherModal.d.ts.map