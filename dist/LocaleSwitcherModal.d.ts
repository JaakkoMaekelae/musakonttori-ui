export interface LocaleSwitcherModalProps {
    open: boolean;
    onClose: () => void;
    currentLocale?: string;
    currentCurrency?: string;
    onLocaleChange?: (locale: string) => void;
    onCurrencyChange?: (currency: string) => void;
}
export declare function LocaleSwitcherModal({ open, onClose, currentLocale, currentCurrency, onLocaleChange, onCurrencyChange, }: LocaleSwitcherModalProps): import("react").JSX.Element | null;
//# sourceMappingURL=LocaleSwitcherModal.d.ts.map