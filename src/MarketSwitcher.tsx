"use client";

import { useState } from "react";
import { MARKETS, MARKET_CURRENCIES, type CountryMarket, type Market } from "./markets";
import { cn } from "./utils";

interface MarketSwitcherProps {
  /** Current country code (ISO 3166-1 alpha-2). Defaults to FI. */
  country?: string;
  /** Current currency code (ISO 4217). Defaults to EUR. */
  currency?: string;
  /** Called when country changes. */
  onCountryChange?: (country: string) => void;
  /** Called when currency changes. */
  onCurrencyChange?: (currency: string) => void;
  /** Size variant. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Country and currency switcher.
 *
 * Displays current country flag + name, and currency.
 * Clicking opens a modal/dropdown to change country.
 * EUR is always available as a currency option.
 */
export function MarketSwitcher({
  country = "FI",
  currency = "EUR",
  onCountryChange,
  onCurrencyChange,
  size = "md",
  className,
}: MarketSwitcherProps) {
  const [open, setOpen] = useState(false);
  const current = MARKETS.find((m) => m.country === country) ?? (MARKETS[0] as CountryMarket);
  const currencies = MARKET_CURRENCIES;
  const currentCurrency = currencies.find((c) => c.code === currency) ?? currencies[0]!;

  const handleCountrySelect = (m: CountryMarket) => {
    onCountryChange?.(m.country);
    onCurrencyChange?.(m.currency);
    setOpen(false);
  };

  const handleCurrencySelect = (c: { code: string; symbol: string }) => {
    onCurrencyChange?.(c.code);
  };

  const isSm = size === "sm";

  return (
    <div className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors",
          isSm ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="leading-none">{current.flag}</span>
        <span className="font-medium text-zinc-700 dark:text-zinc-200">
          {isSm ? current.country : current.name}
        </span>
        <span className="text-zinc-400 dark:text-zinc-500 mx-0.5">·</span>
        <span className="font-medium text-zinc-600 dark:text-zinc-300">
          {currentCurrency.symbol}
        </span>
        <svg
          className={cn(
            "w-3 h-3 text-zinc-400 transition-transform",
            open && "rotate-180",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 w-72 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden">
            {/* Currency selector — always show EUR first */}
            <div className="p-2 border-b border-zinc-100 dark:border-zinc-700">
              <p className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Valuutta
              </p>
              <div className="flex flex-wrap gap-1 px-2 pb-1">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => handleCurrencySelect(c)}
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium transition-colors",
                      c.code === currency
                        ? "bg-brand/10 text-brand font-semibold"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700",
                    )}
                  >
                    {c.code} ({c.symbol})
                  </button>
                ))}
              </div>
            </div>

            {/* Country list */}
            <div className="max-h-72 overflow-y-auto p-2">
              <p className="px-3 py-1 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Maa
              </p>
              {MARKETS.map((m) => (
                <button
                  key={m.country}
                  onClick={() => handleCountrySelect(m)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    m.country === country
                      ? "bg-brand/10"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-700",
                  )}
                >
                  <span className="text-lg leading-none">{m.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        m.country === country
                          ? "text-brand"
                          : "text-zinc-700 dark:text-zinc-200",
                      )}
                    >
                      {m.name}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-zinc-400">
                    {m.currency}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
