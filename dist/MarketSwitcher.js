"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useId, useRef } from "react";
import { MARKETS, MARKET_CURRENCIES, APP_LOCALES } from "./markets";
import { cn } from "./utils";
export const COUNTRY_COOKIE = "mk_country";
export const LOCALE_COOKIE = "mk_locale";
export const CURRENCY_COOKIE = "mk_currency";
function readCookie(name) {
    if (typeof document === "undefined")
        return null;
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
    return match?.[1] ?? null;
}
function setCookie(name, value) {
    if (typeof document === "undefined")
        return;
    document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
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
export function MarketSwitcher({ defaultCountry = "FI", defaultLocale = "fi", defaultCurrency = "EUR", onCountryChange, onLocaleChange, onCurrencyChange, size = "md", className, }) {
    // Initialize from props (server-safe defaults). Client hydrates from cookies in useEffect.
    const [country, setCountry] = useState(defaultCountry);
    const [locale, setLocale] = useState(defaultLocale);
    const [currency, setCurrency] = useState(defaultCurrency);
    const [open, setOpen] = useState(false);
    const triggerRef = useRef(null);
    const panelId = useId();
    // Hydrate from cookies on mount (client-only)
    useEffect(() => {
        const c = readCookie(COUNTRY_COOKIE);
        const l = readCookie(LOCALE_COOKIE);
        const cur = readCookie(CURRENCY_COOKIE);
        if (c)
            setCountry(c);
        if (l)
            setLocale(l);
        if (cur)
            setCurrency(cur);
    }, []);
    useEffect(() => {
        if (!open)
            return;
        const handleKeyDown = (event) => {
            if (event.key !== "Escape")
                return;
            setOpen(false);
            triggerRef.current?.focus();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open]);
    const current = MARKETS.find((m) => m.country === country) ?? MARKETS[0];
    const currencies = MARKET_CURRENCIES;
    const currentCurrency = currencies.find((c) => c.code === currency) ?? currencies[0];
    const currentLocale = APP_LOCALES.find((l) => l.code === locale) ?? APP_LOCALES[0];
    const handleCountrySelect = (m) => {
        setCountry(m.country);
        setLocale(m.locale);
        setCurrency(m.currency);
        setCookie(COUNTRY_COOKIE, m.country);
        setCookie(LOCALE_COOKIE, m.locale);
        setCookie(CURRENCY_COOKIE, m.currency);
        onCountryChange?.(m.country);
        onCurrencyChange?.(m.currency);
        setOpen(false);
        // Reload page with new locale
        if (m.locale !== locale) {
            const handled = onLocaleChange?.(m.locale);
            if (handled !== false) {
                const path = window.location.pathname;
                const segments = path.split("/").filter(Boolean);
                // Replace first segment (locale) with new locale
                if (segments.length > 0 && APP_LOCALES.some((l) => l.code === segments[0])) {
                    segments[0] = m.locale;
                }
                else {
                    segments.unshift(m.locale);
                }
                window.location.href = "/" + segments.join("/") + window.location.search;
            }
        }
    };
    const handleLocaleSelect = (l) => {
        setLocale(l.code);
        setCookie(LOCALE_COOKIE, l.code);
        const handled = onLocaleChange?.(l.code);
        if (handled !== false) {
            const path = window.location.pathname;
            const segments = path.split("/").filter(Boolean);
            if (segments.length > 0 && APP_LOCALES.some((loc) => loc.code === segments[0])) {
                segments[0] = l.code;
            }
            else {
                segments.unshift(l.code);
            }
            window.location.href = "/" + segments.join("/") + window.location.search;
        }
    };
    const handleCurrencySelect = (c) => {
        setCurrency(c.code);
        setCookie(CURRENCY_COOKIE, c.code);
        onCurrencyChange?.(c.code);
    };
    const isSm = size === "sm";
    return (_jsxs("div", { className: cn("relative", className), children: [_jsxs("button", { ref: triggerRef, type: "button", onClick: () => setOpen(!open), suppressHydrationWarning: true, className: cn("flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors", isSm ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"), "aria-expanded": open, "aria-haspopup": "dialog", "aria-controls": panelId, "aria-label": "Vaihda maa, kieli ja valuutta", children: [_jsx("span", { className: "leading-none", children: current.flag }), _jsx("span", { className: "font-medium text-zinc-700 dark:text-zinc-200", children: isSm ? currentLocale.label : current.name }), _jsx("span", { className: "text-zinc-400 dark:text-zinc-500 mx-0.5", children: "\u00B7" }), _jsx("span", { className: "font-medium text-zinc-600 dark:text-zinc-300", children: currentCurrency.symbol }), _jsx("svg", { className: cn("w-3 h-3 text-zinc-400 transition-transform", open && "rotate-180"), fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), open && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) }), _jsxs("div", { id: panelId, role: "dialog", "aria-label": "Maa-, kieli- ja valuutta-asetukset", className: "absolute top-full left-0 mt-1 z-50 w-72 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden", children: [_jsxs("div", { className: "p-2 border-b border-zinc-100 dark:border-zinc-700", children: [_jsx("p", { className: "px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider", children: "Valuutta" }), _jsx("div", { className: "flex flex-wrap gap-1 px-2 pb-1", children: currencies.map((c) => (_jsxs("button", { onClick: () => handleCurrencySelect(c), className: cn("px-2 py-0.5 rounded text-xs font-medium transition-colors", c.code === currency ? "bg-brand/10 text-brand font-semibold" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"), children: [c.code, " (", c.symbol, ")"] }, c.code))) })] }), _jsxs("div", { className: "p-2 border-b border-zinc-100 dark:border-zinc-700", children: [_jsx("p", { className: "px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider", children: "Kieli" }), _jsx("div", { className: "flex flex-wrap gap-1 px-2 pb-1", children: APP_LOCALES.map((l) => (_jsxs("button", { onClick: () => handleLocaleSelect(l), className: cn("px-2 py-0.5 rounded text-xs font-medium transition-colors", l.code === locale ? "bg-brand/10 text-brand font-semibold" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"), children: [l.flag, " ", l.label] }, l.code))) })] }), _jsxs("div", { className: "max-h-64 overflow-y-auto p-2", children: [_jsx("p", { className: "px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider", children: "Maa" }), MARKETS.map((m) => (_jsxs("button", { onClick: () => handleCountrySelect(m), className: cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors", m.country === country ? "bg-brand/10" : "hover:bg-zinc-50 dark:hover:bg-zinc-700"), children: [_jsx("span", { className: "text-lg leading-none", children: m.flag }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: cn("text-sm font-medium", m.country === country ? "text-brand" : "text-zinc-700 dark:text-zinc-200"), children: m.name }) }), _jsx("span", { className: "text-xs font-medium text-zinc-400", children: m.currency })] }, m.country)))] })] })] }))] }));
}
