interface MarketSwitcherProps {
    /** Current country code (ISO 3166-1 alpha-2). Defaults to FI. */
    country?: string;
    /** Current locale code. Defaults to fi. */
    locale?: string;
    /** Current currency code (ISO 4217). Defaults to EUR. */
    currency?: string;
    /** Called when country changes. */
    onCountryChange?: (country: string) => void;
    /** Called when locale changes. */
    onLocaleChange?: (locale: string) => void;
    /** Called when currency changes. */
    onCurrencyChange?: (currency: string) => void;
    /** Size variant. */
    size?: "sm" | "md";
    className?: string;
}
/**
 * Country, language, and currency switcher.
 *
 * Trigger shows: 🇫🇮 Suomi · €
 * Dropdown has three sections: Valuutta, Kieli, Maa.
 * EUR is always available as a currency option.
 * Language can be changed independently from country.
 */
export declare function MarketSwitcher({ country, locale, currency, onCountryChange, onLocaleChange, onCurrencyChange, size, className, }: MarketSwitcherProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MarketSwitcher.d.ts.map