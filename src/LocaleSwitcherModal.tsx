"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Globe, X } from "lucide-react";
import { cn } from "./utils";

const STORAGE_KEY = "mk-locale-prefs-v2";

interface LocalePrefs {
  locale: string;
  currency: string;
}

function readPrefs(): LocalePrefs | null {
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

// All supported language metadata
const LANGUAGES_MAP: Record<string, { flag: string; name: string; subtitle: string }> = {
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
  onLocaleChange?: (locale: string) => void;
  onCurrencyChange?: (currency: string) => void;
}

export function LocaleSwitcherModal({
  open,
  onClose,
  currentLocale = "fi",
  currentCurrency = "EUR",
  onLocaleChange,
  onCurrencyChange,
}: LocaleSwitcherModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState(currentLocale);
  const [currency, setCurrency] = useState(currentCurrency);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState("FI");

  // Detect user's country from browser
  useEffect(() => {
    const c = detectBrowserCountry();
    setDetectedCountry(c);
  }, []);

  // Load saved prefs on mount
  useEffect(() => {
    const prefs = readPrefs();
    if (prefs) {
      setLocale(prefs.locale);
      setCurrency(prefs.currency);
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

  // Compute the language and currency options for the detected country
  const country = detectedCountry;
  const langCodes = COUNTRY_LANGUAGES[country] || ["fi", "en"];
  const countryCur = COUNTRY_CURRENCY[country] || "EUR";
  const currencyCodes: string[] = countryCur === "EUR"
    ? ["EUR"]
    : ["EUR", countryCur];

  // Deduplicate languages if needed
  const uniqueLangCodes = [...new Set(langCodes)];

  const handleLocaleChange = (loc: string) => {
    setLocale(loc);
    const prefs: LocalePrefs = { locale: loc, currency };
    writePrefs(prefs);
    onLocaleChange?.(loc);
  };

  const handleCurrencyChange = (cur: string) => {
    setCurrency(cur);
    const prefs: LocalePrefs = { locale, currency: cur };
    writePrefs(prefs);
    onCurrencyChange?.(cur);
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
      className={cn(
        "fixed inset-0 z-[9999]",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      style={{ transition: "opacity 300ms" }}
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
          aria-label="Kieli- ja valuutta-asetukset"
          className={cn(
            "w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border shadow-2xl p-6",
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
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Sulje"
          style={{ color: `var(--mk-palette-text-secondary, #5F6068)` } as React.CSSProperties}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: `var(--mk-palette-primary-subtle, rgba(191,34,39,0.08))` } as React.CSSProperties}
          >
            <Globe className="h-5 w-5" style={{ color: `var(--mk-palette-primary, #BF2227)` } as React.CSSProperties} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: `var(--mk-palette-text-primary, #111113)` }}>Alueasetukset</h2>
            <p className="text-sm" style={{ color: `var(--mk-palette-text-secondary, #5F6068)` }}>Kieli ja valuutta</p>
          </div>
        </div>

        {/* Language section */}
        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: `var(--mk-palette-text-muted, #9CA3AF)` }}>
            Kieli
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {uniqueLangCodes.map((code) => {
              const lang = LANGUAGES_MAP[code];
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
                Valuutta
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
            Asetukset tallennetaan selaimeen
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
            Sulje
          </button>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
