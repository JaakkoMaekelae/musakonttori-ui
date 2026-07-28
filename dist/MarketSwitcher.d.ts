interface MarketSwitcherProps {
    /** Current country code (ISO 3166-1 alpha-2). Defaults to FI. */
    country?: string;
    /** Current currency code (ISO 4217). Defaults to EUR. */
    currency?: string;
    /** Called when country changes. */
    onCountryChange?: (country: string) => void;
    /** Called when currency changes. */
    onCurrencyChange?: (currency: string) => void;
    /** Size variant. */
    size?: "sm" | "md";
    className?: string;
}
/**
 * Country and currency switcher.
 *
 * Displays current country flag + name, and currency.
 * Clicking opens a modal/dropdown to change country.
 * EUR is always available as a currency option.
 */
export declare function MarketSwitcher({ country, currency, onCountryChange, onCurrencyChange, size, className, }: MarketSwitcherProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=MarketSwitcher.d.ts.map