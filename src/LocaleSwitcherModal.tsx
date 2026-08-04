"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Globe, X } from "lucide-react";
import { cn } from "./utils";

const STORAGE_KEY = "mk-locale-prefs-v2";

export interface LocalePrefs {
  locale: string;
  currency: string;
  /**
   * Added after the first release of this component. Entries written by the
   * older version have no country, so it stays optional — a missing value
   * falls back to browser detection rather than resetting the whole record.
   */
  country?: string;
}

/** Broadcast so other controls on the page (a header flag, a price list) re-read. */
export const LOCALE_PREFS_EVENT = "mk-locale-prefs-changed";

export function readLocalePrefs(): LocalePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.locale === "string" && typeof parsed.currency === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writePrefs(prefs: LocalePrefs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // private mode, ignore
  }
  document.dispatchEvent(new Event(LOCALE_PREFS_EVENT));
}

function detectBrowserCountry(): string {
  if (typeof window === "undefined") return "FI";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("fi")) return "FI";
  if (lang.startsWith("sv")) return "SE";
  if (lang.startsWith("da")) return "DK";
  if (lang.startsWith("nb") || lang.startsWith("nn") || lang.startsWith("no")) return "NO";
  if (lang.startsWith("de")) {
    if (lang.includes("ch")) return "CH";
    if (lang.includes("at")) return "AT";
    if (lang.includes("lu")) return "LU";
    if (lang.includes("be")) return "BE";
    return "DE";
  }
  if (lang.startsWith("fr")) {
    if (lang.includes("ch")) return "CH";
    if (lang.includes("be")) return "BE";
    if (lang.includes("lu")) return "LU";
    return "FR";
  }
  if (lang.startsWith("nl")) {
    if (lang.includes("be")) return "BE";
    return "NL";
  }
  if (lang.startsWith("it")) {
    if (lang.includes("ch")) return "CH";
    return "IT";
  }
  if (lang.startsWith("es")) return "ES";
  if (lang.startsWith("pt")) return "PT";
  if (lang.startsWith("pl")) return "PL";
  if (lang.startsWith("cs")) return "CZ";
  if (lang.startsWith("hu")) return "HU";
  if (lang.startsWith("ro")) return "RO";
  if (lang.startsWith("bg")) return "BG";
  if (lang.startsWith("hr")) return "HR";
  if (lang.startsWith("sk")) return "SK";
  if (lang.startsWith("sl")) return "SI";
  if (lang.startsWith("et")) return "EE";
  if (lang.startsWith("lv")) return "LV";
  if (lang.startsWith("lt")) return "LT";
  if (lang.startsWith("el")) return "GR";
  if (lang.startsWith("is")) return "IS";
  if (lang.startsWith("mt")) return "MT";
  if (lang.startsWith("ga")) return "IE";
  if (lang.startsWith("en")) {
    if (lang.includes("ie")) return "IE";
    if (lang.includes("mt")) return "MT";
    return "FI";
  }
  return "FI";
}

// Languages offered per detected country — native languages + English
const COUNTRY_LANGUAGES: Record<string, string[]> = {
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
const COUNTRY_CURRENCY: Record<string, string> = {
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
const COUNTRIES_INFO: Record<string, { flag: string; name: string }> = {
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

/**
 * The modal's own chrome, in the languages the family actually ships UI in.
 *
 * The language tiles were always localized — each names itself — but the
 * headings around them were hardcoded Finnish, so an English page opened a
 * modal reading "Alueasetukset / Maa, kieli ja valuutta". Anything not listed
 * here falls back to English rather than to Finnish: a visitor whose language
 * we have no strings for is more likely to read English.
 *
 * Products with their own translations can override the whole set via `labels`.
 */
export interface LocaleSwitcherLabels {
  title: string;
  subtitle: string;
  country: string;
  countryHint: string;
  language: string;
  currency: string;
  saved: string;
  close: string;
  dialog: string;
  /**
   * Used in place of `subtitle` and `dialog` when `showCountry` is false.
   * Without these the modal keeps announcing a country section it is not
   * rendering — "Maa, kieli ja valuutta" above language and currency alone.
   */
  subtitleNoCountry: string;
  dialogNoCountry: string;
}

const LABELS: Record<string, LocaleSwitcherLabels> = {
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
    subtitleNoCountry: "Kieli ja valuutta",
    dialogNoCountry: "Kieli- ja valuutta-asetukset",
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
    subtitleNoCountry: "Language and currency",
    dialogNoCountry: "Language and currency settings",
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
    subtitleNoCountry: "Språk och valuta",
    dialogNoCountry: "Inställningar för språk och valuta",
  },
};

function labelsFor(
  locale: string,
  override?: Partial<LocaleSwitcherLabels>
): LocaleSwitcherLabels {
  const base = LABELS[locale] ?? LABELS.en!;
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
function languagesFor(
  country: string,
  supported?: readonly string[]
): string[] {
  const spoken = [...new Set(COUNTRY_LANGUAGES[country] ?? ["fi", "en"])];
  if (!supported?.length) return spoken;
  const offered = spoken.filter((code) => supported.includes(code));
  return offered.length > 0 ? offered : [...supported];
}

// All supported language metadata. Exported because the trigger renders the
// same flag and name as the tile the user picked — two tables would drift.
export const LANGUAGE_LABELS: Record<string, { flag: string; name: string; subtitle: string }> = {
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
const CURRENCIES_INFO: Record<string, { symbol: string; flag: string; name: string }> = {
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

export interface LocaleSwitcherModalProps {
  open: boolean;
  onClose: () => void;
  currentLocale?: string;
  currentCurrency?: string;
  /**
   * Server-known country. Omit to detect from the browser — but pass it when
   * the app already resolved a country (a geo cookie, an account setting),
   * otherwise detection will silently override that choice on every mount.
   */
  currentCountry?: string;
  /**
   * The locales this product actually routes. Omit only if the product serves
   * every language in LANGUAGE_LABELS — almost none do.
   *
   * Without it the modal offers whatever the selected country speaks, and
   * picking Sweden hands the app "sv". Sopimushallinta routes fi and en only,
   * so that produced a navigation to /en/sv/release and a 404.
   */
  supportedLocales?: readonly string[];
  /** Override any of the modal's own strings. Built-in: fi, en, sv. */
  labels?: Partial<LocaleSwitcherLabels>;
  onLocaleChange?: (locale: string) => void;
  onCurrencyChange?: (currency: string) => void;
  onCountryChange?: (country: string) => void;
  /**
   * Render the country picker. Default true.
   *
   * Turn it off where the country is not the visitor's to choose in this
   * dialog — SoundLaunch settles it on the pricing page, from which currency
   * follows, so offering it here as well invited two answers to one question.
   * The country is still tracked; only its control is hidden, and the heading
   * and dialog name switch to their no-country wording.
   */
  showCountry?: boolean;
}

export function LocaleSwitcherModal({
  open,
  onClose,
  currentLocale = "fi",
  currentCurrency = "EUR",
  currentCountry,
  supportedLocales,
  labels,
  onLocaleChange,
  onCurrencyChange,
  onCountryChange,
  showCountry = true,
}: LocaleSwitcherModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState(currentLocale);
  const [currency, setCurrency] = useState(currentCurrency);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [country, setCountry] = useState(currentCountry ?? "FI");

  // Detection is a fallback, not an override: it only runs when the app did not
  // supply a country and the browser has no stored preference. Running it
  // unconditionally would undo an explicit pick on the next mount.
  useEffect(() => {
    if (currentCountry) return;
    if (readLocalePrefs()?.country) return;
    setCountry(detectBrowserCountry());
  }, [currentCountry]);

  // Load saved prefs on mount
  useEffect(() => {
    const prefs = readLocalePrefs();
    if (prefs) {
      setLocale(prefs.locale);
      setCurrency(prefs.currency);
      if (prefs.country) setCountry(prefs.country);
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
    } else {
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
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  // Compute the language and currency options for the selected country
  const countryCur = COUNTRY_CURRENCY[country] || "EUR";
  const currencyCodes: string[] = countryCur === "EUR"
    ? ["EUR"]
    : ["EUR", countryCur];

  const uniqueLangCodes = languagesFor(country, supportedLocales);
  // Keyed on the selected language, not the page's — the heading should follow
  // the tile the user just picked, before the app has navigated.
  const l = labelsFor(locale, labels);

  const handleLocaleChange = (loc: string) => {
    setLocale(loc);
    writePrefs({ locale: loc, currency, country });
    onLocaleChange?.(loc);
  };

  const handleCurrencyChange = (cur: string) => {
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
  const handleCountryChange = (next: string) => {
    const nextLangs = languagesFor(next, supportedLocales);
    const nextCurrency = COUNTRY_CURRENCY[next] || "EUR";
    const nextLocale = nextLangs.includes(locale) ? locale : (nextLangs[0] as string);
    const keepsCurrency = currency === "EUR" || currency === nextCurrency;
    const resolvedCurrency = keepsCurrency ? currency : nextCurrency;

    setCountry(next);
    setLocale(nextLocale);
    setCurrency(resolvedCurrency);
    writePrefs({ locale: nextLocale, currency: resolvedCurrency, country: next });

    onCountryChange?.(next);
    if (resolvedCurrency !== currency) onCurrencyChange?.(resolvedCurrency);
    // Last, because consumers navigate on this one.
    if (nextLocale !== locale) onLocaleChange?.(nextLocale);
  };

  // Selected/unselected class strings (theme-aware via CSS variable fallbacks)
  const selectedClass = cn(
    "border-[var(--mk-palette-primary,#BF2227)] bg-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.08))] ring-1 ring-[var(--mk-palette-primary-ring,rgba(191,34,39,0.3))]"
  );
  const unselectedClass = cn(
    "border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.12))] bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)]"
  );

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 300ms",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={showCountry ? l.dialog : l.dialogNoCountry}
          className={cn(
            "relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border shadow-2xl p-6",
            "transition-all duration-300",
            visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0 pointer-events-none"
          )}
          style={{
            background: `var(--mk-palette-bg-surface, #FFFFFF)`,
            borderColor: `var(--mk-palette-border-subtle, rgba(128,128,128,0.12))`,
            color: `var(--mk-palette-text-primary, #111113)`,
          } as React.CSSProperties}
        >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label={l.close}
          style={{ color: `var(--mk-palette-text-secondary, #5F6068)` } as React.CSSProperties}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: `var(--mk-palette-primary-subtle, rgba(191,34,39,0.08))` } as React.CSSProperties}
          >
            <Globe className="h-5 w-5" style={{ color: `var(--mk-palette-primary, #BF2227)` } as React.CSSProperties} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: `var(--mk-palette-text-primary, #111113)` }}>{l.title}</h2>
            <p className="text-sm" style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}>{showCountry ? l.subtitle : l.subtitleNoCountry}</p>
          </div>
        </div>

        {/*
          Country is a native select, not a tile grid like the two sections
          below. Thirty tiles would dominate a modal whose actual subject is
          language, and a select gets the platform's own long-list handling on
          touch devices for free.
        */}
        {showCountry && (
        <section className="mb-6">
          <h3
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: `var(--mk-palette-text-muted, #9CA3AF)` }}
            id="mk-locale-country-label"
          >
            {l.country}
          </h3>
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
              unselectedClass
            )}
          >
            <span className="text-2xl" aria-hidden="true">
              {COUNTRIES_INFO[country]?.flag ?? "🌍"}
            </span>
            <select
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              aria-labelledby="mk-locale-country-label"
              className="w-full cursor-pointer text-sm font-semibold"
              // The native chrome is stripped inline rather than with utility
              // classes: the tile it sits in is already a bordered surface, and
              // the browser's own border drew a second box inside it. Inline
              // also survives a product's scoped form reset.
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                border: "none",
                outline: "none",
                background: "transparent",
                color: `var(--mk-palette-text-primary, #111113)`,
              } as React.CSSProperties}
            >
              {COUNTRY_CODES.map((code) => (
                <option key={code} value={code}>
                  {COUNTRIES_INFO[code]?.name ?? code}
                </option>
              ))}
            </select>
            <ChevronDown
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
              style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}
            />
          </div>
          <p className="mt-2 text-[11px]" style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}>
            {l.countryHint}
          </p>
        </section>
        )}

        <div className="my-5 h-px" style={{ background: `var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` }} />

        {/* Language section */}
        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: `var(--mk-palette-text-muted, #9CA3AF)` }}>
            {l.language}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {uniqueLangCodes.map((code) => {
              const lang = LANGUAGE_LABELS[code];
              if (!lang) return null;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLocaleChange(code)}
                  className={cn(
                    "relative flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all",
                    locale === code ? selectedClass : unselectedClass,
                    locale !== code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-2xl">{lang.flag}</span>
                    {locale === code && (
                      <Check className="h-4 w-4 shrink-0" style={{ color: `var(--mk-palette-primary, #BF2227)` }} />
                    )}
                  </div>
                  <span className="mt-1 text-sm font-semibold" style={{ color: `var(--mk-palette-text-primary, #111113)` }}>
                    {lang.name}
                  </span>
                  <span className="text-[11px]" style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}>{lang.subtitle}</span>
                </button>
              );
            })}
          </div>
        </section>

        {currencyCodes.length > 1 && (
          <>
            <div className="my-5 h-px" style={{ background: `var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` }} />

            {/* Currency section */}
            <section className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: `var(--mk-palette-text-muted, #9CA3AF)` }}>
                {l.currency}
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {currencyCodes.map((code) => {
                  const cur = CURRENCIES_INFO[code];
                  if (!cur) return null;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleCurrencyChange(code)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-all",
                        currency === code ? selectedClass : unselectedClass,
                        currency !== code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"
                      )}
                    >
                      <span className="text-xl font-bold" style={{ color: `var(--mk-palette-text-primary, #111113)` }}>{cur.symbol}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-medium" style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}>{code}</span>
                        <span className="text-xs">{cur.flag}</span>
                      </div>
                      {currency === code && (
                        <Check className="h-4 w-4 shrink-0" style={{ color: `var(--mk-palette-primary, #BF2227)` }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid var(--mk-palette-border-subtle, rgba(128,128,128,0.08))` }}>
          <p className="text-xs" style={{ color: `var(--mk-palette-text-muted, #9CA3AF)` }}>
            {l.saved}
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur transition hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))] hover:text-[var(--mk-palette-text-primary,#111113)]"
            style={{
              borderColor: `var(--mk-palette-border-subtle, rgba(128,128,128,0.12))`,
              background: `var(--mk-palette-bg-surface-secondary, #F4F4F5)`,
              color: `var(--mk-palette-text-secondary, #5F6068)`,
            } as React.CSSProperties}
          >
            {l.close}
          </button>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
