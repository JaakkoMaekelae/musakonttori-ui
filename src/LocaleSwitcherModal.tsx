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

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4 transition-all duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
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
          "relative my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-black/80 p-6 shadow-2xl backdrop-blur-xl",
          "transition-all duration-300",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.97] opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-white/50 transition hover:bg-white/[0.06] hover:text-white"
          aria-label="Sulje"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C9252D]/20">
            <Globe className="h-5 w-5 text-brand" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Alueasetukset</h2>
            <p className="text-sm text-white/50">Kieli, valuutta ja maa</p>
          </div>
        </div>

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
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
                  locale === lang.code
                    ? "border-brand bg-[#C9252D]/10 ring-1 ring-brand/30"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-2xl">{lang.flag}</span>
                  {locale === lang.code && (
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                  )}
                </div>
                <span className="mt-1 text-sm font-semibold text-white">
                  {lang.name}
                </span>
                <span className="text-[11px] text-white/40">{lang.subtitle}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="my-5 h-px bg-white/[0.06]" />

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
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
                  currency === cur.code
                    ? "border-brand bg-[#C9252D]/10 ring-1 ring-brand/30"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                )}
              >
                <span className="text-xl font-bold text-white">{cur.symbol}</span>
                <span className="text-[11px] font-medium text-white/60">{cur.code}</span>
                <span className="text-xs">{cur.flag}</span>
                {currency === cur.code && (
                  <div className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#C9252D]">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <div className="my-5 h-px bg-white/[0.06]" />

        <section className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
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
                  country === c.code
                    ? "border-brand bg-[#C9252D]/10 ring-1 ring-brand/30"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                )}
              >
                {c.code === "auto" ? (
                  <MapPin className="h-4 w-4 shrink-0 text-brand" />
                ) : (
                  <span className="text-base">{c.flag}</span>
                )}
                <div className="min-w-0">
                  <span className="text-sm font-medium text-white truncate block">
                    {c.code === "auto"
                      ? `Automaattinen \u2014 ${COUNTRY_NAMES[detectedCountry]}`
                      : c.name}
                  </span>
                  {c.code === "auto" && country === "auto" && (
                    <span className="text-[10px] text-white/30">Sijaintisi perusteella</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
          <p className="text-xs text-white/30">
            Asetukset tallennetaan selaimeen
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-white/60 backdrop-blur transition hover:border-white/20 hover:text-white"
          >
            Sulje
          </button>
        </div>
      </div>
    </div>
  );
}
