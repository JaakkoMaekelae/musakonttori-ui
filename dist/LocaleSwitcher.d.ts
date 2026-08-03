import { type LocaleSwitcherLabels } from "./LocaleSwitcherModal";
/**
 * Anything on the page can ask for the modal by dispatching this event. That
 * matters because several products put the trigger in a header that is
 * rendered by a server component, and also want a "change region" link in the
 * footer — two triggers, one modal, no shared React state between them.
 */
export declare const OPEN_LOCALE_MODAL_EVENT = "mk-open-locale-modal";
export interface LocaleSwitcherTriggerProps {
    /** Current language, e.g. "fi". Normally `useLocale()` from next-intl. */
    locale: string;
    /** Current currency, ISO 4217 — announced, not painted. */
    currency?: string;
    /**
     * "flag" shows the language flag alone — the default, and what the header
     * of every product uses. "full" adds the language name, for footers and
     * settings pages where there is room and no surrounding context.
     */
    variant?: "flag" | "full";
    className?: string;
    /** Called instead of dispatching the open event. Rarely needed. */
    onOpen?: () => void;
}
/**
 * The button alone. Use this when the product already owns the modal — for
 * example a first-visit gate that has to decide whether to open it unprompted,
 * or suppress it on a route that runs its own locale flow.
 *
 * It asks for the modal by dispatching {@link OPEN_LOCALE_MODAL_EVENT} on the
 * document, so the trigger and the modal need no shared React state and can
 * live in different trees.
 */
export declare function LocaleSwitcherTrigger({ locale, currency, variant, className, onOpen, }: LocaleSwitcherTriggerProps): import("react").JSX.Element;
export interface LocaleSwitcherProps {
    /** Current language, e.g. "fi". Normally `useLocale()` from next-intl. */
    locale: string;
    /** Current currency, ISO 4217. */
    currency?: string;
    /** Current country, ISO 3166-1 alpha-2. Omit to let the modal detect it. */
    country?: string;
    /**
     * The locales this product routes. Pass it — without it the modal offers
     * whatever the selected country speaks, and a country whose language the
     * product does not serve navigates to a 404.
     */
    supportedLocales?: readonly string[];
    /** Override any of the modal's own strings. Built-in: fi, en, sv. */
    labels?: Partial<LocaleSwitcherLabels>;
    /**
     * Called when the user picks a language. The app owns navigation: locale
     * path prefixes and localized slugs differ per product, so the library
     * cannot build the target URL correctly on its own.
     */
    onLocaleChange?: (locale: string) => void;
    onCurrencyChange?: (currency: string) => void;
    onCountryChange?: (country: string) => void;
    /**
     * "flag" shows the language flag alone — the default, and what the header
     * of every product uses. "full" adds the language name, for footers and
     * settings pages where there is room and no surrounding context.
     */
    variant?: "flag" | "full";
    className?: string;
}
/**
 * The one language, country and currency control for the whole product family.
 *
 * It replaces the per-product dropdowns, pill pairs and country selects that
 * had accumulated — sixteen implementations across nine apps, each with its
 * own persistence and its own idea of which languages exist.
 *
 * The trigger shows the *language* only. Earlier versions read "FI · FI · EUR";
 * two of those three repeat for almost every visitor, so the row was mostly
 * noise and the duplicated "FI · FI" read as a bug. Country and currency live
 * inside the modal and stay in the accessible name.
 */
export declare function LocaleSwitcher({ locale, currency, country, supportedLocales, labels, onLocaleChange, onCurrencyChange, onCountryChange, variant, className, }: LocaleSwitcherProps): import("react").JSX.Element;
//# sourceMappingURL=LocaleSwitcher.d.ts.map