export declare const COUNTRY_COOKIE = "mk_country";
export declare const LOCALE_COOKIE = "mk_locale";
export declare const CURRENCY_COOKIE = "mk_currency";
interface MarketSwitcherProps {
    /** Server-provided default country (ISO 3166-1 alpha-2). Overridden by cookie on client. */
    defaultCountry?: string;
    /** Server-provided default locale. Overridden by cookie on client. */
    defaultLocale?: string;
    /** Server-provided default currency (ISO 4217). Overridden by cookie on client. */
    defaultCurrency?: string;
    /** Called when country changes (after cookie set + state update). */
    onCountryChange?: (country: string) => void;
    /** Called when locale changes. Return false to prevent page reload. */
    onLocaleChange?: (locale: string) => boolean | void;
    /** Called when currency changes. */
    onCurrencyChange?: (currency: string) => void;
    /** Size variant. */
    size?: "sm" | "md";
    className?: string;
}
/**
 * Country, language, and currency switcher. Self-contained cookie management.
 *
 * Trigger shows: 🇫🇮 Suomi · €
 * Dropdown has three sections: Valuutta, Kieli, Maa.
 * EUR is always available as a currency option.
 * Language changes trigger a full page reload to the new locale path.
 * Cookie hydration happens in useEffect — no SSR mismatch.
 */
export declare function MarketSwitcher({ defaultCountry, defaultLocale, defaultCurrency, onCountryChange, onLocaleChange, onCurrencyChange, size, className, }: MarketSwitcherProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MarketSwitcher.d.ts.map