"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "./utils";
import {
  LocaleSwitcherModal,
  LOCALE_PREFS_EVENT,
  readLocalePrefs,
  LANGUAGE_LABELS,
  type LocaleSwitcherLabels,
} from "./LocaleSwitcherModal";

/**
 * The trigger's accessible name. It is the only text the trigger has — the
 * button itself shows a flag — so leaving it Finnish on an English page would
 * mean a screen reader announcing a language the page is not in.
 */
const TRIGGER_LABEL: Record<string, string> = {
  fi: "Vaihda kieli ja valuutta",
  en: "Change language and currency",
  sv: "Byt språk och valuta",
};

/**
 * Anything on the page can ask for the modal by dispatching this event. That
 * matters because several products put the trigger in a header that is
 * rendered by a server component, and also want a "change region" link in the
 * footer — two triggers, one modal, no shared React state between them.
 */
export const OPEN_LOCALE_MODAL_EVENT = "mk-open-locale-modal";

/**
 * The trigger's box model, as a stylesheet rather than Tailwind utilities.
 *
 * Several products wrap a section in a scoped reset — sopimushallinta's landing
 * and release shells carry `.mk-landing-root *, { padding: 0 }` and
 * `.mk-landing-root button { border-style: none }`. Those selectors are more
 * specific than a plain utility class, so `px-3 py-1.5 border` measured as
 * `padding: 0px; border-width: 0px` on a real page: a flag with no button
 * around it. That is the same failure that made products hand-roll their own
 * trigger against their own CSS.
 *
 * The doubled attribute selector is deliberate — one copy loses the tie to
 * `.mk-landing-root button` (class + type), two win it outright without
 * reaching for !important, which a consumer could not then override at all.
 */
const TRIGGER_CSS = `
[data-mk-switcher="language"][data-mk-switcher] {
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--mk-palette-border-subtle, rgba(128,128,128,0.18));
  background: transparent;
  color: var(--mk-palette-text-secondary, #5F6068);
  cursor: pointer;
  line-height: 1.25rem;
}
[data-mk-switcher="language"][data-mk-switcher]:hover {
  border-color: var(--mk-palette-border-default, rgba(128,128,128,0.32));
  color: var(--mk-palette-text-primary, #111113);
}
[data-mk-switcher="language"][data-mk-switcher]:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--mk-palette-primary-ring, rgba(191,34,39,0.3));
}
[data-mk-switcher="language"] .mk-locale-trigger-flag {
  font-size: 1rem;
  line-height: 1;
}
`;

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
    <>
      <style>{TRIGGER_CSS}</style>
      <button
        type="button"
        data-mk-switcher="language"
        onClick={handleClick}
        className={cn(
          "mk-locale-trigger inline-flex items-center gap-2 text-sm font-medium transition-colors",
          className
        )}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true" className="mk-locale-trigger-flag">
          {label?.flag ?? "🌍"}
        </span>
        {variant === "full" && <span>{label?.name ?? locale.toUpperCase()}</span>}
        <span className="sr-only">
          {TRIGGER_LABEL[locale] ?? TRIGGER_LABEL.en} —{" "}
          {label?.name ?? locale.toUpperCase()}, {shownCurrency}
        </span>
      </button>
    </>
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
   * The locales this product routes. Pass it — without it the modal offers
   * whatever the selected country speaks, and a country whose language the
   * product does not serve navigates to a 404.
   */
  supportedLocales?: readonly string[];
  /** Override any of the modal's own strings. Built-in: fi, en, sv. */
  labels?: Partial<LocaleSwitcherLabels>;
  /**
   * Called when the user picks a language. The app owns navigation: locale
   * path prefixes and localized slugs differ per product, so the library
   * cannot build the target URL correctly on its own.
   */
  onLocaleChange?: (locale: string) => void;
  onCurrencyChange?: (currency: string) => void;
  /** Hide the currency section in the modal. Currency still applies. */
  showCurrency?: boolean;
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
  supportedLocales,
  labels,
  onLocaleChange,
  onCurrencyChange,
  showCurrency = true,
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
        supportedLocales={supportedLocales}
        labels={labels}
        onLocaleChange={onLocaleChange}
        onCurrencyChange={onCurrencyChange}
        showCurrency={showCurrency}
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
