"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "./utils";
import {
  LocaleSwitcherModal,
  LOCALE_PREFS_EVENT,
  readLocalePrefs,
  LANGUAGE_LABELS,
} from "./LocaleSwitcherModal";

/**
 * Anything on the page can ask for the modal by dispatching this event. That
 * matters because several products put the trigger in a header that is
 * rendered by a server component, and also want a "change region" link in the
 * footer — two triggers, one modal, no shared React state between them.
 */
export const OPEN_LOCALE_MODAL_EVENT = "mk-open-locale-modal";

export interface LocaleSwitcherTriggerProps {
  /** Current language, e.g. "fi". Normally `useLocale()` from next-intl. */
  locale: string;
  /** Current currency, ISO 4217 — announced, not painted. */
  currency?: string;
  /**
   * "flag" shows the language flag alone — the default, and what the header
   * of every product uses. "full" adds the language name, for footers and
   * settings pages where there is room and no surrounding context.
   */
  variant?: "flag" | "full";
  className?: string;
  /** Called instead of dispatching the open event. Rarely needed. */
  onOpen?: () => void;
}

/**
 * The button alone. Use this when the product already owns the modal — for
 * example a first-visit gate that has to decide whether to open it unprompted,
 * or suppress it on a route that runs its own locale flow.
 *
 * It asks for the modal by dispatching {@link OPEN_LOCALE_MODAL_EVENT} on the
 * document, so the trigger and the modal need no shared React state and can
 * live in different trees.
 */
export function LocaleSwitcherTrigger({
  locale,
  currency = "EUR",
  variant = "flag",
  className,
  onOpen,
}: LocaleSwitcherTriggerProps) {
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

  return (
    <button
      type="button"
      data-mk-switcher="language"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
        "border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.18))]",
        "text-[var(--mk-palette-text-secondary,#5F6068)]",
        "hover:border-[var(--mk-palette-border-default,rgba(128,128,128,0.32))]",
        "hover:text-[var(--mk-palette-text-primary,#111113)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-primary-ring,rgba(191,34,39,0.3))]",
        className
      )}
      aria-haspopup="dialog"
    >
      <span aria-hidden="true" className="text-base leading-none">
        {label?.flag ?? "🌍"}
      </span>
      {variant === "full" && <span>{label?.name ?? locale.toUpperCase()}</span>}
      <span className="sr-only">
        Vaihda maa, kieli ja valuutta — {label?.name ?? locale.toUpperCase()},{" "}
        {shownCurrency}
      </span>
    </button>
  );
}

export interface LocaleSwitcherProps {
  /** Current language, e.g. "fi". Normally `useLocale()` from next-intl. */
  locale: string;
  /** Current currency, ISO 4217. */
  currency?: string;
  /** Current country, ISO 3166-1 alpha-2. Omit to let the modal detect it. */
  country?: string;
  /**
   * Called when the user picks a language. The app owns navigation: locale
   * path prefixes and localized slugs differ per product, so the library
   * cannot build the target URL correctly on its own.
   */
  onLocaleChange?: (locale: string) => void;
  onCurrencyChange?: (currency: string) => void;
  onCountryChange?: (country: string) => void;
  /**
   * "flag" shows the language flag alone — the default, and what the header
   * of every product uses. "full" adds the language name, for footers and
   * settings pages where there is room and no surrounding context.
   */
  variant?: "flag" | "full";
  className?: string;
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
export function LocaleSwitcher({
  locale,
  currency = "EUR",
  country,
  onLocaleChange,
  onCurrencyChange,
  onCountryChange,
  variant = "flag",
  className,
}: LocaleSwitcherProps) {
  const [open, setOpen] = useState(false);

  // Any trigger, anywhere on the page, can open this modal.
  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
    return () => document.removeEventListener(OPEN_LOCALE_MODAL_EVENT, handler);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <LocaleSwitcherTrigger
        locale={locale}
        currency={currency}
        variant={variant}
        className={className}
        onOpen={() => setOpen(true)}
      />

      <LocaleSwitcherModal
        open={open}
        onClose={handleClose}
        currentLocale={locale}
        currentCurrency={currency}
        currentCountry={country}
        onLocaleChange={onLocaleChange}
        onCurrencyChange={onCurrencyChange}
        onCountryChange={onCountryChange}
      />
    </>
  );
}

function subscribePrefs(onChange: () => void): () => void {
  document.addEventListener(LOCALE_PREFS_EVENT, onChange);
  return () => document.removeEventListener(LOCALE_PREFS_EVENT, onChange);
}

function readStoredCurrency(): string | null {
  return readLocalePrefs()?.currency ?? null;
}
