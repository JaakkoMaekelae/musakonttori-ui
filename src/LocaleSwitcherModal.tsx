"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Check, Globe, MapPin, X } from "lucide-react";
import { cn } from "./utils";

const STORAGE_KEY = "mk-locale-prefs-v2";

interface LocalePrefs {
  locale: string;
  currency: string;
  country: string;
}

function readPrefs(): LocalePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed.locale === "string" &&
      typeof parsed.currency === "string" &&
      typeof parsed.country === "string"
    ) {
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
  if (lang.startsWith("de")) return "DE";
  if (lang.startsWith("fr")) return "FR";
  if (lang.startsWith("da")) return "DK";
  if (lang.startsWith("nb") || lang.startsWith("nn") || lang.startsWith("no")) return "NO";
  if (lang.startsWith("nl")) return "NL";
  if (lang.startsWith("es")) return "ES";
  if (lang.startsWith("it")) return "IT";
  if (lang.startsWith("en")) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Europe/London")) return "GB";
    if (tz.startsWith("America/") || tz.startsWith("Pacific/")) return "US";
    if (tz.startsWith("Europe/")) return "FI";
    return "US";
  }
  return "FI";
}

const COUNTRY_NAMES: Record<string, string> = {
  auto: "Automaattinen",
  FI: "Suomi",
  GB: "United Kingdom",
  US: "United States",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  DE: "Germany",
  FR: "France",
  NL: "Netherlands",
  ES: "Spain",
  IT: "Italy",
};

const LANGUAGES = [
  { code: "fi", flag: "🇫🇮", name: "Suomi", subtitle: "Selaa suomeksi" },
  { code: "en", flag: "🇬🇧", name: "English", subtitle: "Browse in English" },
  { code: "sv", flag: "🇸🇪", name: "Svenska", subtitle: "Bläddra på svenska" },
] as const;

const CURRENCIES = [
  { code: "EUR", symbol: "€", flag: "🇪🇺", name: "Euro" },
  { code: "USD", symbol: "$", flag: "🇺🇸", name: "US Dollar" },
  { code: "GBP", symbol: "£", flag: "🇬🇧", name: "Pound Sterling" },
  { code: "SEK", symbol: "kr", flag: "🇸🇪", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", flag: "🇳🇴", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", flag: "🇩🇰", name: "Danish Krone" },
] as const;

const COUNTRIES = [
  { code: "auto", flag: "", name: "Automaattinen (sijainnin perusteella)", icon: true },
  { code: "FI", flag: "🇫🇮", name: "Suomi" },
  { code: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "US", flag: "🇺🇸", name: "United States" },
  { code: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "FR", flag: "🇫🇷", name: "France" },
  { code: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "IT", flag: "🇮🇹", name: "Italy" },
] as const;

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

// Reusable light/dark-aware brand color variable.
// Falls back to #BF2227 when the MUI palette is not injected.
const BRAND = "var(--mk-palette-primary, #BF2227)";
const BRAND_BG = "var(--mk-palette-primary-subtle, rgba(191,34,39,0.08))";
const CHECK_BG = BRAND;

// Neutral surface / text tokens that auto-flip with data-theme or MUI providers
const SURFACE = "var(--mk-palette-bg-surface, var(--mk-color-surface, #FFFFFF))";
const SURFACE_MUTED = "var(--mk-palette-bg-surface-secondary, var(--mk-color-surface-secondary, #F4F4F5))";
const TEXT = "var(--mk-palette-text-primary, #111113)";
const TEXT_DIM = "var(--mk-palette-text-secondary, #5F6068)";
const TEXT_MUTED = "var(--mk-palette-text-muted, #9CA3AF)";
const BORDER = "var(--mk-palette-border-subtle, rgba(128,128,128,0.12))";
const BORDER_HOVER = "var(--mk-palette-border-default, rgba(128,128,128,0.25))";
const DIVIDER = "var(--mk-palette-border-subtle, rgba(128,128,128,0.08))";

export function LocaleSwitcherModal({
  open,
  onClose,
  currentLocale = "fi",
  currentCurrency = "EUR",
  currentCountry = "auto",
  onLocaleChange,
  onCurrencyChange,
  onCountryChange,
}: LocaleSwitcherModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [locale, setLocale] = useState(currentLocale);
  const [currency, setCurrency] = useState(currentCurrency);
  const [country, setCountry] = useState(currentCountry);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState("FI");

  useEffect(() => {
    const d = detectBrowserCountry();
    setDetectedCountry(d);
  }, []);

  useEffect(() => {
    const prefs = readPrefs();
    if (prefs) {
      setLocale(prefs.locale);
      setCurrency(prefs.currency);
      if (prefs.country === "auto") {
        setCountry("auto");
        onCountryChange?.(detectedCountry);
      } else {
        setCountry(prefs.country);
      }
    } else {
      setCountry("auto");
      onCountryChange?.(detectedCountry);
    }
  }, [detectedCountry]);

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

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleClose]);

  const handleLocaleChange = (loc: string) => {
    setLocale(loc);
    const prefs: LocalePrefs = { locale: loc, currency, country };
    writePrefs(prefs);
    onLocaleChange?.(loc);
  };

  const handleCurrencyChange = (cur: string) => {
    setCurrency(cur);
    const prefs: LocalePrefs = { locale, currency: cur, country };
    writePrefs(prefs);
    onCurrencyChange?.(cur);
  };

  const handleCountryChange = (c: string) => {
    setCountry(c);
    const prefs: LocalePrefs = { locale, currency, country: c };
    writePrefs(prefs);
    if (c === "auto") {
      onCountryChange?.(detectedCountry);
    } else {
      onCountryChange?.(c);
    }
  };

  const selectedClass = cn(
    "border-[var(--mk-palette-primary,#BF2227)] bg-[var(--mk-palette-primary-subtle,rgba(191,34,39,0.08))] ring-1 ring-[var(--mk-palette-primary-ring,rgba(191,34,39,0.3))]"
  );
  const unselectedClass = cn(
    "border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.12))] bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)]"
  );

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4 transition-all duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop — always dark, standard modal pattern */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Kieli-, valuutta- ja maa-asetukset"
        className={cn(
          "relative my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border shadow-2xl backdrop-blur-xl p-6",
          "transition-all duration-300",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0 pointer-events-none"
        )}
        style={{
          background: `color-mix(in srgb, ${SURFACE}, #0000 5%)`,
          borderColor: BORDER,
          color: TEXT,
        } as React.CSSProperties}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Sulje"
          style={{ color: TEXT_DIM } as React.CSSProperties}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="grid h-10 w-10 place-items-center rounded-xl"
            style={{ background: BRAND_BG } as React.CSSProperties}
          >
            <Globe className="h-5 w-5" style={{ color: BRAND } as React.CSSProperties} />
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{ color: TEXT }}>Alueasetukset</h2>
            <p className="text-sm" style={{ color: TEXT_DIM }}>Kieli, valuutta ja maa</p>
          </div>
        </div>

        {/* Language section */}
        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>
            Kieli
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLocaleChange(lang.code)}
                className={cn(
                  "relative flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all",
                  locale === lang.code ? selectedClass : unselectedClass,
                  locale !== lang.code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-2xl">{lang.flag}</span>
                  {locale === lang.code && (
                    <Check className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                  )}
                </div>
                <span className="mt-1 text-sm font-semibold" style={{ color: TEXT }}>
                  {lang.name}
                </span>
                <span className="text-[11px]" style={{ color: TEXT_DIM }}>{lang.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="my-5 h-px" style={{ background: DIVIDER }} />

        {/* Currency section */}
        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>
            Valuutta
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                type="button"
                onClick={() => handleCurrencyChange(cur.code)}
                className={cn(
                  "relative flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-all",
                  currency === cur.code ? selectedClass : unselectedClass,
                  currency !== cur.code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"
                )}
              >
                <span className="text-xl font-bold" style={{ color: TEXT }}>{cur.symbol}</span>
                <span className="text-[11px] font-medium" style={{ color: TEXT_DIM }}>{cur.code}</span>
                <span className="text-xs">{cur.flag}</span>
                {currency === cur.code && (
                  <div className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full" style={{ background: CHECK_BG }}>
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="my-5 h-px" style={{ background: DIVIDER }} />

        {/* Country section */}
        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: TEXT_MUTED }}>
            Maa
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCountryChange(c.code)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all",
                  country === c.code ? selectedClass : unselectedClass,
                  country !== c.code && "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.25))]"
                )}
              >
                {c.code === "auto" ? (
                  <MapPin className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                ) : (
                  <span className="text-base">{c.flag}</span>
                )}
                <div className="min-w-0">
                  <span className="text-sm font-medium truncate block" style={{ color: TEXT }}>
                    {c.code === "auto"
                      ? `Automaattinen \u2014 ${COUNTRY_NAMES[detectedCountry]}`
                      : c.name}
                  </span>
                  {c.code === "auto" && country === "auto" && (
                    <span className="text-[10px]" style={{ color: TEXT_MUTED }}>Sijaintisi perusteella</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${DIVIDER}` }}>
          <p className="text-xs" style={{ color: TEXT_MUTED }}>
            Asetukset tallennetaan selaimeen
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur transition"
            style={{
              borderColor: BORDER,
              background: SURFACE_MUTED,
              color: TEXT_DIM,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = BORDER_HOVER;
              (e.target as HTMLButtonElement).style.color = TEXT;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.borderColor = BORDER;
              (e.target as HTMLButtonElement).style.color = TEXT_DIM;
            }}
          >
            Sulje
          </button>
        </div>
      </div>
    </div>
  );
}
