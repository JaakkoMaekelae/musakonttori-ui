export interface LocaleSwitcherModalProps {
    open: boolean;
    onClose: () => void;
    currentLocale?: string;
    currentCurrency?: string;
    currentCountry?: string;
    onLocaleChange?: (locale: string) => void;
    onCurrencyChange?: (currency: string) => void;
    onCountryChange?: (country: string) => void;
}
export declare function LocaleSwitcherModal({ open, onClose, currentLocale, currentCurrency, currentCountry, onLocaleChange, onCurrencyChange, onCountryChange, }: LocaleSwitcherModalProps): import("react").JSX.Element | null;
//# sourceMappingURL=LocaleSwitcherModal.d.ts.map