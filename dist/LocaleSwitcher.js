"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "./utils";
import { LocaleSwitcherModal, LOCALE_PREFS_EVENT, readLocalePrefs, LANGUAGE_LABELS, } from "./LocaleSwitcherModal";
/**
 * Anything on the page can ask for the modal by dispatching this event. That
 * matters because several products put the trigger in a header that is
 * rendered by a server component, and also want a "change region" link in the
 * footer — two triggers, one modal, no shared React state between them.
 */
export const OPEN_LOCALE_MODAL_EVENT = "mk-open-locale-modal";
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
    return (_jsxs("button", { type: "button", "data-mk-switcher": "language", onClick: handleClick, className: cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors", "border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.18))]", "text-[var(--mk-palette-text-secondary,#5F6068)]", "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.32))]", "hover:text-[var(--mk-palette-text-primary,#111113)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-primary-ring,rgba(191,34,39,0.3))]", className), "aria-haspopup": "dialog", children: [_jsx("span", { "aria-hidden": "true", className: "text-base leading-none", children: label?.flag ?? "🌍" }), variant === "full" && _jsx("span", { children: label?.name ?? locale.toUpperCase() }), _jsxs("span", { className: "sr-only", children: ["Vaihda maa, kieli ja valuutta \u2014 ", label?.name ?? locale.toUpperCase(), ",", " ", shownCurrency] })] }));
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
export function LocaleSwitcher({ locale, currency = "EUR", country, onLocaleChange, onCurrencyChange, onCountryChange, variant = "flag", className, }) {
    const [open, setOpen] = useState(false);
    // Any trigger, anywhere on the page, can open this modal.
    useEffect(() => {
        const handler = () => setOpen(true);
        document.addEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
        return () => document.removeEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
    }, []);
    const handleClose = useCallback(() => setOpen(false), []);
    return (_jsxs(_Fragment, { children: [_jsx(LocaleSwitcherTrigger, { locale: locale, currency: currency, variant: variant, className: className, onOpen: () => setOpen(true) }), _jsx(LocaleSwitcherModal, { open: open, onClose: handleClose, currentLocale: locale, currentCurrency: currency, currentCountry: country, onLocaleChange: onLocaleChange, onCurrencyChange: onCurrencyChange, onCountryChange: onCountryChange })] }));
}
function subscribePrefs(onChange) {
    document.addEventListener(LOCALE_PREFS_EVENT, onChange);
    return () => document.removeEventListener(LOCALE_PREFS_EVENT, onChange);
}
function readStoredCurrency() {
    return readLocalePrefs()?.currency ?? null;
}
