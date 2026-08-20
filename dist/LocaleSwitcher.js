"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "./utils";
import { LocaleSwitcherModal, LOCALE_PREFS_EVENT, readLocalePrefs, LANGUAGE_LABELS, } from "./LocaleSwitcherModal";
/**
 * The trigger's accessible name. It is the only text the trigger has — the
 * button itself shows a flag — so leaving it Finnish on an English page would
 * mean a screen reader announcing a language the page is not in.
 */
const TRIGGER_LABEL = {
    fi: "Vaihda kieli ja valuutta",
    en: "Change language and currency",
    sv: "Byt språk och valuta",
};
/**
 * Anything on the page can ask for the modal by dispatching this event. That
 * matters because several products put the trigger in a header that is
 * rendered by a server component, and also want a "change region" link in the
 * footer — two triggers, one modal, no shared React state between them.
 */
export const OPEN_LOCALE_MODAL_EVENT = "mk-open-locale-modal";
/**
 * The trigger's box model, as a stylesheet rather than Tailwind utilities.
 *
 * Several products wrap a section in a scoped reset — sopimushallinta's landing
 * and release shells carry `.mk-landing-root *, { padding: 0 }` and
 * `.mk-landing-root button { border-style: none }`. Those selectors are more
 * specific than a plain utility class, so `px-3 py-1.5 border` measured as
 * `padding: 0px; border-width: 0px` on a real page: a flag with no button
 * around it. That is the same failure that made products hand-roll their own
 * trigger against their own CSS.
 *
 * The doubled attribute selector is deliberate — one copy loses the tie to
 * `.mk-landing-root button` (class + type), two win it outright without
 * reaching for !important, which a consumer could not then override at all.
 */
const TRIGGER_CSS = `
[data-mk-switcher="language"][data-mk-switcher] {
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--mk-palette-border-subtle, rgba(128,128,128,0.18));
  background: transparent;
  color: var(--mk-palette-text-secondary, #5F6068);
  cursor: pointer;
  line-height: 1.25rem;
}
[data-mk-switcher="language"][data-mk-switcher]:hover {
  border-color: var(--mk-palette-border-default, rgba(128,128,128,0.32));
  color: var(--mk-palette-text-primary, #111113);
}
[data-mk-switcher="language"][data-mk-switcher]:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--mk-palette-primary-ring, rgba(191,34,39,0.3));
}
[data-mk-switcher="language"] .mk-locale-trigger-flag {
  font-size: 1rem;
  line-height: 1;
}
`;
/**
 * The button alone. Use this when the product already owns the modal — for
 * example a first-visit gate that has to decide whether to open it unprompted,
 * or suppress it on a route that runs its own locale flow.
 *
 * It asks for the modal by dispatching {@link OPEN_LOCALE_MODAL_EVENT} on the
 * document, so the trigger and the modal need no shared React state and can
 * live in different trees.
 */
export function LocaleSwitcherTrigger({ locale, currency = "EUR", variant = "flag", className, onOpen, }) {
    const stored = useSyncExternalStore(subscribePrefs, readStoredCurrency, () => null);
    const shownCurrency = stored ?? currency;
    const label = LANGUAGE_LABELS[locale];
    const handleClick = useCallback(() => {
        if (onOpen) {
            onOpen();
            return;
        }
        document.dispatchEvent(new Event(OPEN_LOCALE_MODAL_EVENT));
    }, [onOpen]);
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: TRIGGER_CSS }), _jsxs("button", { type: "button", "data-mk-switcher": "language", onClick: handleClick, className: cn("mk-locale-trigger inline-flex items-center gap-2 text-sm font-medium transition-colors", className), "aria-haspopup": "dialog", children: [_jsx("span", { "aria-hidden": "true", className: "mk-locale-trigger-flag", children: label?.flag ?? "🌍" }), variant === "full" && _jsx("span", { children: label?.name ?? locale.toUpperCase() }), _jsxs("span", { className: "sr-only", children: [TRIGGER_LABEL[locale] ?? TRIGGER_LABEL.en, " \u2014", " ", label?.name ?? locale.toUpperCase(), ", ", shownCurrency] })] })] }));
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
export function LocaleSwitcher({ locale, currency = "EUR", country, supportedLocales, labels, onLocaleChange, onCurrencyChange, showCurrency = true, showCountry = true, variant = "flag", className, }) {
    const [open, setOpen] = useState(false);
    // Any trigger, anywhere on the page, can open this modal.
    useEffect(() => {
        const handler = () => setOpen(true);
        document.addEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
        return () => document.removeEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
    }, []);
    const handleClose = useCallback(() => setOpen(false), []);
    return (_jsxs(_Fragment, { children: [_jsx(LocaleSwitcherTrigger, { locale: locale, currency: currency, variant: variant, className: className, onOpen: () => setOpen(true) }), _jsx(LocaleSwitcherModal, { open: open, onClose: handleClose, currentLocale: locale, currentCurrency: currency, currentCountry: country, supportedLocales: supportedLocales, labels: labels, onLocaleChange: onLocaleChange, onCurrencyChange: onCurrencyChange, showCurrency: showCurrency, showCountry: showCountry })] }));
}
function subscribePrefs(onChange) {
    document.addEventListener(LOCALE_PREFS_EVENT, onChange);
    return () => document.removeEventListener(LOCALE_PREFS_EVENT, onChange);
}
function readStoredCurrency() {
    return readLocalePrefs()?.currency ?? null;
}
