"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Globe, X } from "lucide-react";
import { cn } from "./utils";
const STORAGE_KEY = "mk-locale-prefs-v2";
/** Broadcast so other controls on the page (a header flag, a price list) re-read. */
export const LOCALE_PREFS_EVENT = "mk-locale-prefs-changed";
export function readLocalePrefs() {
    if (typeof window === "undefined")
        return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return null;
        const parsed = JSON.parse(raw);
        if (typeof parsed.locale === "string" && typeof parsed.currency === "string") {
            return parsed;
        }
        return null;
    }
    catch {
        return null;
    }
}
function writePrefs(prefs) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
    catch {
        // private mode, ignore
    }
    document.dispatchEvent(new Event(LOCALE_PREFS_EVENT));
}
function detectBrowserCountry() {
    if (typeof window === "undefined")
        return "FI";
    const lang = (navigator.language || "").toLowerCase();
    if (lang.startsWith("fi"))
        return "FI";
    if (lang.startsWith("sv"))
        return "SE";
    if (lang.startsWith("da"))
        return "DK";
    if (lang.startsWith("nb") || lang.startsWith("nn") || lang.startsWith("no"))
        return "NO";
    if (lang.startsWith("de")) {
        if (lang.includes("ch"))
            return "CH";
        if (lang.includes("at"))
            return "AT";
        if (lang.includes("lu"))
            return "LU";
        if (lang.includes("be"))
            return "BE";
        return "DE";
    }
    if (lang.startsWith("fr")) {
        if (lang.includes("ch"))
            return "CH";
        if (lang.includes("be"))
            return "BE";
        if (lang.includes("lu"))
            return "LU";
        return "FR";
    }
    if (lang.startsWith("nl")) {
        if (lang.includes("be"))
            return "BE";
        return "NL";
    }
    if (lang.startsWith("it")) {
        if (lang.includes("ch"))
            return "CH";
        return "IT";
    }
    if (lang.startsWith("es"))
        return "ES";
    if (lang.startsWith("pt"))
        return "PT";
    if (lang.startsWith("pl"))
        return "PL";
    if (lang.startsWith("cs"))
        return "CZ";
    if (lang.startsWith("hu"))
        return "HU";
    if (lang.startsWith("ro"))
        return "RO";
    if (lang.startsWith("bg"))
        return "BG";
    if (lang.startsWith("hr"))
        return "HR";
    if (lang.startsWith("sk"))
        return "SK";
    if (lang.startsWith("sl"))
        return "SI";
    if (lang.startsWith("et"))
        return "EE";
    if (lang.startsWith("lv"))
        return "LV";
    if (lang.startsWith("lt"))
        return "LT";
    if (lang.startsWith("el"))
        return "GR";
    if (lang.startsWith("is"))
        return "IS";
    if (lang.startsWith("mt"))
        return "MT";
    if (lang.startsWith("ga"))
        return "IE";
    if (lang.startsWith("en")) {
        if (lang.includes("ie"))
            return "IE";
        if (lang.includes("mt"))
            return "MT";
        return "FI";
    }
    return "FI";
}
// Languages offered per detected country — native languages + English
const COUNTRY_LANGUAGES = {
    FI: ["fi", "en"],
    SE: ["sv", "en"],
    DK: ["da", "en"],
    NO: ["no", "en"],
    DE: ["de", "en"],
    AT: ["de", "en"],
    CH: ["de", "fr", "it", "en"],
    FR: ["fr", "en"],
    BE: ["nl", "fr", "en"],
    NL: ["nl", "en"],
    LU: ["fr", "de", "en"],
    IT: ["it", "en"],
    ES: ["es", "en"],
    PT: ["pt", "en"],
    PL: ["pl", "en"],
    CZ: ["cs", "en"],
    HU: ["hu", "en"],
    RO: ["ro", "en"],
    BG: ["bg", "en"],
    HR: ["hr", "en"],
    SK: ["sk", "en"],
    SI: ["sl", "en"],
    EE: ["et", "en"],
    LV: ["lv", "en"],
    LT: ["lt", "en"],
    GR: ["el", "en"],
    IE: ["en"],
    MT: ["en"],
    IS: ["is", "en"],
};
// Currency per country
const COUNTRY_CURRENCY = {
    FI: "EUR", SE: "SEK", DK: "DKK", NO: "NOK", DE: "EUR",
    AT: "EUR", CH: "CHF", FR: "EUR", BE: "EUR", NL: "EUR",
    LU: "EUR", IT: "EUR", ES: "EUR", PT: "EUR", PL: "PLN",
    CZ: "CZK", HU: "HUF", RO: "RON", BG: "BGN", HR: "EUR",
    SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR",
    GR: "EUR", IE: "EUR", MT: "EUR", IS: "ISK",
};
// Country metadata for the country picker. Keyed the same as COUNTRY_LANGUAGES
// and COUNTRY_CURRENCY — a country listed here must appear in both, or the
// picker would offer a country with no language to browse it in.
const COUNTRIES_INFO = {
    FI: { flag: "🇫🇮", name: "Suomi" },
    SE: { flag: "🇸🇪", name: "Sverige" },
    DK: { flag: "🇩🇰", name: "Danmark" },
    NO: { flag: "🇳🇴", name: "Norge" },
    IS: { flag: "🇮🇸", name: "Ísland" },
    EE: { flag: "🇪🇪", name: "Eesti" },
    LV: { flag: "🇱🇻", name: "Latvija" },
    LT: { flag: "🇱🇹", name: "Lietuva" },
    DE: { flag: "🇩🇪", name: "Deutschland" },
    AT: { flag: "🇦🇹", name: "Österreich" },
    CH: { flag: "🇨🇭", name: "Schweiz" },
    NL: { flag: "🇳🇱", name: "Nederland" },
    BE: { flag: "🇧🇪", name: "België" },
    LU: { flag: "🇱🇺", name: "Luxembourg" },
    FR: { flag: "🇫🇷", name: "France" },
    IT: { flag: "🇮🇹", name: "Italia" },
    ES: { flag: "🇪🇸", name: "España" },
    PT: { flag: "🇵🇹", name: "Portugal" },
    IE: { flag: "🇮🇪", name: "Ireland" },
    MT: { flag: "🇲🇹", name: "Malta" },
    PL: { flag: "🇵🇱", name: "Polska" },
    CZ: { flag: "🇨🇿", name: "Česko" },
    SK: { flag: "🇸🇰", name: "Slovensko" },
    SI: { flag: "🇸🇮", name: "Slovenija" },
    HU: { flag: "🇭🇺", name: "Magyarország" },
    HR: { flag: "🇭🇷", name: "Hrvatska" },
    RO: { flag: "🇷🇴", name: "România" },
    BG: { flag: "🇧🇬", name: "България" },
    GR: { flag: "🇬🇷", name: "Ελλάδα" },
};
const COUNTRY_CODES = Object.keys(COUNTRIES_INFO);
const LABELS = {
    fi: {
        title: "Alueasetukset",
        subtitle: "Maa, kieli ja valuutta",
        country: "Maa",
        countryHint: "Maa määrää tarjolla olevat kielet ja valuutat.",
        language: "Kieli",
        currency: "Valuutta",
        saved: "Asetukset tallennetaan selaimeen",
        close: "Sulje",
        dialog: "Maa-, kieli- ja valuutta-asetukset",
    },
    en: {
        title: "Regional settings",
        subtitle: "Country, language and currency",
        country: "Country",
        countryHint: "Your country determines the available languages and currencies.",
        language: "Language",
        currency: "Currency",
        saved: "Saved in your browser",
        close: "Close",
        dialog: "Country, language and currency settings",
    },
    sv: {
        title: "Regionala inställningar",
        subtitle: "Land, språk och valuta",
        country: "Land",
        countryHint: "Landet avgör vilka språk och valutor som erbjuds.",
        language: "Språk",
        currency: "Valuta",
        saved: "Sparas i din webbläsare",
        close: "Stäng",
        dialog: "Inställningar för land, språk och valuta",
    },
};
function labelsFor(locale, override) {
    const base = LABELS[locale] ?? LABELS.en;
    return override ? { ...base, ...override } : base;
}
/**
 * Languages to offer for a country, narrowed to what the product routes.
 *
 * When a country speaks nothing the product serves — Greece, in an app that
 * routes fi and en — the answer is the product's own locales rather than an
 * empty grid. Offering a language that 404s is worse than offering one that is
 * not local.
 */
function languagesFor(country, supported) {
    const spoken = [...new Set(COUNTRY_LANGUAGES[country] ?? ["fi", "en"])];
    if (!supported?.length)
        return spoken;
    const offered = spoken.filter((code) => supported.includes(code));
    return offered.length > 0 ? offered : [...supported];
}
// All supported language metadata. Exported because the trigger renders the
// same flag and name as the tile the user picked — two tables would drift.
export const LANGUAGE_LABELS = {
    fi: { flag: "🇫🇮", name: "Suomi", subtitle: "Selaa suomeksi" },
    sv: { flag: "🇸🇪", name: "Svenska", subtitle: "Bläddra på svenska" },
    en: { flag: "🇬🇧", name: "English", subtitle: "Browse in English" },
    da: { flag: "🇩🇰", name: "Dansk", subtitle: "Gennemse på dansk" },
    no: { flag: "🇳🇴", name: "Norsk", subtitle: "Bla gjennom på norsk" },
    de: { flag: "🇩🇪", name: "Deutsch", subtitle: "Auf Deutsch durchsuchen" },
    fr: { flag: "🇫🇷", name: "Français", subtitle: "Parcourir en français" },
    nl: { flag: "🇳🇱", name: "Nederlands", subtitle: "Bladeren in het Nederlands" },
    it: { flag: "🇮🇹", name: "Italiano", subtitle: "Sfoglia in italiano" },
    es: { flag: "🇪🇸", name: "Español", subtitle: "Navegar en español" },
    pt: { flag: "🇵🇹", name: "Português", subtitle: "Navegar em português" },
    pl: { flag: "🇵🇱", name: "Polski", subtitle: "Przeglądaj po polsku" },
    cs: { flag: "🇨🇿", name: "Čeština", subtitle: "Procházet v češtině" },
    hu: { flag: "🇭🇺", name: "Magyar", subtitle: "Böngészés magyarul" },
    ro: { flag: "🇷🇴", name: "Română", subtitle: "Navigați în română" },
    bg: { flag: "🇧🇬", name: "Български", subtitle: "Разглеждайте на български" },
    hr: { flag: "🇭🇷", name: "Hrvatski", subtitle: "Pregledavaj na hrvatskom" },
    sk: { flag: "🇸🇰", name: "Slovenčina", subtitle: "Prehliadať v slovenčine" },
    sl: { flag: "🇸🇮", name: "Slovenščina", subtitle: "Brskaj v slovenščini" },
    et: { flag: "🇪🇪", name: "Eesti", subtitle: "Sirvi eesti keeles" },
    lv: { flag: "🇱🇻", name: "Latviešu", subtitle: "Pārlūkot latviešu valodā" },
    lt: { flag: "🇱🇹", name: "Lietuvių", subtitle: "Naršyti lietuviškai" },
    el: { flag: "🇬🇷", name: "Ελληνικά", subtitle: "Περιήγηση στα ελληνικά" },
    is: { flag: "🇮🇸", name: "Íslenska", subtitle: "Vafra á íslensku" },
};
// Currency metadata for the grid
const CURRENCIES_INFO = {
    EUR: { symbol: "€", flag: "🇪🇺", name: "Euro" },
    SEK: { symbol: "kr", flag: "🇸🇪", name: "Swedish Krona" },
    DKK: { symbol: "kr", flag: "🇩🇰", name: "Danish Krone" },
    NOK: { symbol: "kr", flag: "🇳🇴", name: "Norwegian Krone" },
    PLN: { symbol: "zł", flag: "🇵🇱", name: "Polish Złoty" },
    CZK: { symbol: "Kč", flag: "🇨🇿", name: "Czech Koruna" },
    HUF: { symbol: "Ft", flag: "🇭🇺", name: "Hungarian Forint" },
    RON: { symbol: "lei", flag: "🇷🇴", name: "Romanian Leu" },
    BGN: { symbol: "лв", flag: "🇧🇬", name: "Bulgarian Lev" },
    CHF: { symbol: "CHF", flag: "🇨🇭", name: "Swiss Franc" },
    ISK: { symbol: "kr", flag: "🇮🇸", name: "Icelandic Króna" },
};
export function LocaleSwitcherModal({ open, onClose, currentLocale = "fi", currentCurrency = "EUR", currentCountry, supportedLocales, labels, onLocaleChange, onCurrencyChange, onCountryChange, showCountry = true, }) {
    const modalRef = useRef(null);
    const [locale, setLocale] = useState(currentLocale);
    const [currency, setCurrency] = useState(currentCurrency);
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [country, setCountry] = useState(currentCountry ?? "FI");
    // Detection is a fallback, not an override: it only runs when the app did not
    // supply a country and the browser has no stored preference. Running it
    // unconditionally would undo an explicit pick on the next mount.
    useEffect(() => {
        if (currentCountry)
            return;
        if (readLocalePrefs()?.country)
            return;
        setCountry(detectBrowserCountry());
    }, [currentCountry]);
    // Load saved prefs on mount
    useEffect(() => {
        const prefs = readLocalePrefs();
        if (prefs) {
            setLocale(prefs.locale);
            setCurrency(prefs.currency);
            if (prefs.country)
                setCountry(prefs.country);
        }
    }, []);
    // Animate open/close
    useEffect(() => {
        if (open) {
            setMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
            document.body.style.overflow = "hidden";
            return;
        }
        else {
            setVisible(false);
            const timer = setTimeout(() => setMounted(false), 300);
            document.body.style.overflow = "";
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = "";
            };
        }
    }, [open]);
    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(onClose, 250);
    }, [onClose]);
    // Escape key
    useEffect(() => {
        if (!open)
            return;
        const handleKey = (e) => {
            if (e.key === "Escape")
                handleClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, handleClose]);
    // Compute the language and currency options for the selected country
    const countryCur = COUNTRY_CURRENCY[country] || "EUR";
    const currencyCodes = countryCur === "EUR"
        ? ["EUR"]
        : ["EUR", countryCur];
    const uniqueLangCodes = languagesFor(country, supportedLocales);
    // Keyed on the selected language, not the page's — the heading should follow
    // the tile the user just picked, before the app has navigated.
    const l = labelsFor(locale, labels);
    const handleLocaleChange = (loc) => {
        setLocale(loc);
        writePrefs({ locale: loc, currency, country });
        onLocaleChange?.(loc);
    };
    const handleCurrencyChange = (cur) => {
        setCurrency(cur);
        writePrefs({ locale, currency: cur, country });
        onCurrencyChange?.(cur);
    };
    /**
     * Changing country can invalidate the current language and currency — a
     * Finnish visitor switching to Greece cannot keep browsing in Finnish, and
     * EUR is not offered outside the eurozone list. Both are re-derived here so
     * the modal never sits in a state its own options cannot express.
     */
    const handleCountryChange = (next) => {
        const nextLangs = languagesFor(next, supportedLocales);
        const nextCurrency = COUNTRY_CURRENCY[next] || "EUR";
        const nextLocale = nextLangs.includes(locale) ? locale : nextLangs[0];
        const keepsCurrency = currency === "EUR" || currency === nextCurrency;
        const resolvedCurrency = keepsCurrency ? currency : nextCurrency;
        setCountry(next);
        setLocale(nextLocale);
        setCurrency(resolvedCurrency);
        writePrefs({ locale: nextLocale, currency: resolvedCurrency, country: next });
        onCountryChange?.(next);
        if (resolvedCurrency !== currency)
            onCurrencyChange?.(resolvedCurrency);
        // Last, because consumers navigate on this one.
        if (nextLocale !== locale)
            onLocaleChange?.(nextLocale);
    };
    // Selected/unselected class strings (theme-aware via CSS variable fallbacks)
    const selectedClass = cn("border-[var(--mk-palette-primary,#BF2227)] bg-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.08))] ring-1 ring-[var(--mk-palette-primary-ring,rgba(191,34,39,0.3))]");
    const unselectedClass = cn("border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.12))] bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)]");
    if (!mounted)
        return null;
    return createPortal(_jsxs("div", { style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2147483647,
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
            transition: "opacity 300ms",
        }, children: [_jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: handleClose, "aria-hidden": "true" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center p-4", children: _jsxs("div", { ref: modalRef, role: "dialog", "aria-modal": "true", "aria-label": l.dialog, className: cn("relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border shadow-2xl p-6", "transition-all duration-300", visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0 pointer-events-none"), style: {
                        background: `var(--mk-palette-bg-surface, #FFFFFF)`,
                        borderColor: `var(--mk-palette-border-subtle, rgba(128,128,128,0.12))`,
                        color: `var(--mk-palette-text-primary, #111113)`,
                    }, children: [_jsx("button", { type: "button", onClick: handleClose, className: "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10", "aria-label": l.close, style: { color: `var(--mk-palette-text-secondary, #5F6068)` }, children: _jsx(X, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl", style: { background: `var(--mk-palette-primary-subtle, rgba(191,34,39,0.08))` }, children: _jsx(Globe, { className: "h-5 w-5", style: { color: `var(--mk-palette-primary, #BF2227)` } }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold", style: { color: `var(--mk-palette-text-primary, #111113)` }, children: l.title }), _jsx("p", { className: "text-sm", style: { color: `var(--mk-palette-text-secondary, #5F6068)` }, children: l.subtitle })] })] }), showCountry && (_jsxs("section", { className: "mb-6", children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.2em]", style: { color: `var(--mk-palette-text-muted, #9CA3AF)` }, id: "mk-locale-country-label", children: l.country }), _jsxs("div", { className: cn("flex items-center gap-3 rounded-xl border px-4 py-3 transition-all", unselectedClass), children: [_jsx("span", { className: "text-2xl", "aria-hidden": "true", children: COUNTRIES_INFO[country]?.flag ?? "🌍" }), _jsx("select", { value: country, onChange: (e) => handleCountryChange(e.target.value), "aria-labelledby": "mk-locale-country-label", className: "w-full cursor-pointer text-sm font-semibold", 
                                            // The native chrome is stripped inline rather than with utility
                                            // classes: the tile it sits in is already a bordered surface, and
                                            // the browser's own border drew a second box inside it. Inline
                                            // also survives a product's scoped form reset.
                                            style: {
                                                appearance: "none",
                                                WebkitAppearance: "none",
                                                border: "none",
                                                outline: "none",
                                                background: "transparent",
                                                color: `var(--mk-palette-text-primary, #111113)`,
                                            }, children: COUNTRY_CODES.map((code) => (_jsx("option", { value: code, children: COUNTRIES_INFO[code]?.name ?? code }, code))) }), _jsx(ChevronDown, { className: "h-4 w-4 shrink-0", "aria-hidden": "true", style: { color: `var(--mk-palette-text-secondary, #5F6068)` } })] }), _jsx("p", { className: "mt-2 text-[11px]", style: { color: `var(--mk-palette-text-secondary, #5F6068)` }, children: l.countryHint })] })), _jsx("div", { className: "my-5 h-px", style: { background: `var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` } }), _jsxs("section", { className: "mb-6", children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.2em]", style: { color: `var(--mk-palette-text-muted, #9CA3AF)` }, children: l.language }), _jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: uniqueLangCodes.map((code) => {
                                        const lang = LANGUAGE_LABELS[code];
                                        if (!lang)
                                            return null;
                                        return (_jsxs("button", { type: "button", onClick: () => handleLocaleChange(code), className: cn("relative flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all", locale === code ? selectedClass : unselectedClass, locale !== code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"), children: [_jsxs("div", { className: "flex w-full items-center justify-between", children: [_jsx("span", { className: "text-2xl", children: lang.flag }), locale === code && (_jsx(Check, { className: "h-4 w-4 shrink-0", style: { color: `var(--mk-palette-primary, #BF2227)` } }))] }), _jsx("span", { className: "mt-1 text-sm font-semibold", style: { color: `var(--mk-palette-text-primary, #111113)` }, children: lang.name }), _jsx("span", { className: "text-[11px]", style: { color: `var(--mk-palette-text-secondary, #5F6068)` }, children: lang.subtitle })] }, code));
                                    }) })] }), currencyCodes.length > 1 && (_jsxs(_Fragment, { children: [_jsx("div", { className: "my-5 h-px", style: { background: `var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` } }), _jsxs("section", { className: "mb-6", children: [_jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.2em]", style: { color: `var(--mk-palette-text-muted, #9CA3AF)` }, children: l.currency }), _jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-4", children: currencyCodes.map((code) => {
                                                const cur = CURRENCIES_INFO[code];
                                                if (!cur)
                                                    return null;
                                                return (_jsxs("button", { type: "button", onClick: () => handleCurrencyChange(code), className: cn("flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-all", currency === code ? selectedClass : unselectedClass, currency !== code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"), children: [_jsx("span", { className: "text-xl font-bold", style: { color: `var(--mk-palette-text-primary, #111113)` }, children: cur.symbol }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "text-[11px] font-medium", style: { color: `var(--mk-palette-text-secondary, #5F6068)` }, children: code }), _jsx("span", { className: "text-xs", children: cur.flag })] }), currency === code && (_jsx(Check, { className: "h-4 w-4 shrink-0", style: { color: `var(--mk-palette-primary, #BF2227)` } }))] }, code));
                                            }) })] })] })), _jsxs("div", { className: "flex items-center justify-between pt-4", style: { borderTop: `1px solid var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` }, children: [_jsx("p", { className: "text-xs", style: { color: `var(--mk-palette-text-muted, #9CA3AF)` }, children: l.saved }), _jsx("button", { type: "button", onClick: handleClose, className: "rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur transition hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))] hover:text-[var(--mk-palette-text-primary,#111113)]", style: {
                                        borderColor: `var(--mk-palette-border-subtle, rgba(128,128,128,0.12))`,
                                        background: `var(--mk-palette-bg-surface-secondary, #F4F4F5)`,
                                        color: `var(--mk-palette-text-secondary, #5F6068)`,
                                    }, children: l.close })] })] }) })] }), document.body);
}
