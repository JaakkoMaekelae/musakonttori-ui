"use client";

import { useState, useEffect } from "react";
import { MARKETS, MARKET_CURRENCIES, APP_LOCALES, type CountryMarket } from "./markets";
import { cn } from "./utils";

export const COUNTRY_COOKIE = "mk_country";
export const LOCALE_COOKIE = "mk_locale";
export const CURRENCY_COOKIE = "mk_currency";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1] ?? null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
}

interface MarketSwitcherProps {
  /** Server-provided default country (ISO 3166-1 alpha-2). Overridden by cookie on client. */
  defaultCountry?: string;
  /** Server-provided default locale. Overridden by cookie on client. */
  defaultLocale?: string;
  /** Server-provided default currency (ISO 4217). Overridden by cookie on client. */
  defaultCurrency?: string;
  /** Called when country changes (after cookie set + state update). */
  onCountryChange?: (country: string) => void;
  /** Called when locale changes. Return false to prevent page reload. */
  onLocaleChange?: (locale: string) => boolean | void;
  /** Called when currency changes. */
  onCurrencyChange?: (currency: string) => void;
  /** Size variant. */
  size?: "sm" | "md";
  className?: string;
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
export function MarketSwitcher({
  defaultCountry = "FI",
  defaultLocale = "fi",
  defaultCurrency = "EUR",
  onCountryChange,
  onLocaleChange,
  onCurrencyChange,
  size = "md",
  className,
}: MarketSwitcherProps) {
  // Initialize from props (server-safe defaults). Client hydrates from cookies in useEffect.
  const [country, setCountry] = useState(defaultCountry);
  const [locale, setLocale] = useState(defaultLocale);
  const [currency, setCurrency] = useState(defaultCurrency);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from cookies on mount (client-only)
  useEffect(() => {
    const c = readCookie(COUNTRY_COOKIE);
    const l = readCookie(LOCALE_COOKIE);
    const cur = readCookie(CURRENCY_COOKIE);
    if (c) setCountry(c);
    if (l) setLocale(l);
    if (cur) setCurrency(cur);
    setMounted(true);
  }, []);

  const current = MARKETS.find((m) => m.country === country) ?? (MARKETS[0] as CountryMarket);
  const currencies = MARKET_CURRENCIES;
  const currentCurrency = currencies.find((c) => c.code === currency) ?? currencies[0]!;
  const currentLocale = APP_LOCALES.find((l) => l.code === locale) ?? APP_LOCALES[0]!;

  const handleCountrySelect = (m: CountryMarket) => {
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
        } else {
          segments.unshift(m.locale);
        }
        window.location.href = "/" + segments.join("/") + window.location.search;
      }
    }
  };

  const handleLocaleSelect = (l: { code: string; flag: string; label: string }) => {
    setLocale(l.code);
    setCookie(LOCALE_COOKIE, l.code);
    const handled = onLocaleChange?.(l.code);
    if (handled !== false) {
      const path = window.location.pathname;
      const segments = path.split("/").filter(Boolean);
      if (segments.length > 0 && APP_LOCALES.some((loc) => loc.code === segments[0])) {
        segments[0] = l.code;
      } else {
        segments.unshift(l.code);
      }
      window.location.href = "/" + segments.join("/") + window.location.search;
    }
  };

  const handleCurrencySelect = (c: { code: string; symbol: string }) => {
    setCurrency(c.code);
    setCookie(CURRENCY_COOKIE, c.code);
    onCurrencyChange?.(c.code);
  };

  const isSm = size === "sm";

  // Don't render until client-mounted to avoid hydration mismatch
  if (!mounted && typeof window !== "undefined") {
    // Small delay for mounting — show nothing briefly
    return null;
  }

  return (
    <div className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        suppressHydrationWarning
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors",
          isSm ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="leading-none">{current.flag}</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          {isSm ? currentLocale.label : current.name}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500 mx-0.5">·</span>
        <span className="font-medium text-zinc-600 dark:text-zinc-300">
          {currentCurrency.symbol}
        </span>
        <svg
          className={cn("w-3 h-3 text-zinc-400 transition-transform", open && "rotate-180")}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 w-72 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
            {/* Currency */}
            <div className="p-2 border-b border-zinc-100 dark:border-zinc-700">
              <p className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Valuutta</p>
              <div className="flex flex-wrap gap-1 px-2 pb-1">
                {currencies.map((c) => (
                  <button key={c.code} onClick={() => handleCurrencySelect(c)}
                    className={cn("px-2 py-0.5 rounded text-xs font-medium transition-colors",
                      c.code === currency ? "bg-brand/10 text-brand font-semibold" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700")}>
                    {c.code} ({c.symbol})
                  </button>
                ))}
              </div>
            </div>
            {/* Language */}
            <div className="p-2 border-b border-zinc-100 dark:border-zinc-700">
              <p className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Kieli</p>
              <div className="flex flex-wrap gap-1 px-2 pb-1">
                {APP_LOCALES.map((l) => (
                  <button key={l.code} onClick={() => handleLocaleSelect(l)}
                    className={cn("px-2 py-0.5 rounded text-xs font-medium transition-colors",
                      l.code === locale ? "bg-brand/10 text-brand font-semibold" : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700")}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Country */}
            <div className="max-h-64 overflow-y-auto p-2">
              <p className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Maa</p>
              {MARKETS.map((m) => (
                <button key={m.country} onClick={() => handleCountrySelect(m)}
                  className={cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    m.country === country ? "bg-brand/10" : "hover:bg-zinc-50 dark:hover:bg-zinc-700")}>
                  <span className="text-lg leading-none">{m.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium", m.country === country ? "text-brand" : "text-zinc-700 dark:text-zinc-200")}>{m.name}</p>
                  </div>
                  <span className="text-xs font-medium text-zinc-400">{m.currency}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
