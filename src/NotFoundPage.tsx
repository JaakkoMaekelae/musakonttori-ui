import type { ReactNode } from "react";
import { cn } from "./utils";

export interface NotFoundLink {
  label: string;
  href: string;
  /** Optional one-line hint under the label. */
  hint?: string;
}

export interface NotFoundPageProps {
  /** Product name, shown in the lockup. e.g. "Ticketing". */
  product: string;
  /** Lockup initial. Matches the product's tab icon. */
  initial: string;
  /**
   * The product's own gradient, as [from, to]. Matches app/icon.tsx, so a
   * visitor who lost their way still sees the product they came for.
   */
  accent: [string, string];
  title: string;
  description: string;
  /**
   * Where to go instead. This is the part that has to be the product's own —
   * a 404 that offers only "back to home" is the same page everywhere and
   * helps nobody. Two to four entries.
   */
  links: NotFoundLink[];
  /** Shown under the links, e.g. a support address. */
  footer?: ReactNode;
  className?: string;
}

/**
 * The shared 404 page.
 *
 * Three products shipped a byte-identical generic 404 — the same "Sivua ei
 * löytynyt / palaa etusivulle" with nothing to say which product had just
 * lost you, and one dead-end link back to the root. That is the same failure
 * as the create-next-app favicon: correct, and interchangeable.
 *
 * This component keeps the frame and the lockup consistent across the family
 * and makes the products supply what is genuinely theirs: their accent, their
 * initial, and above all the destinations worth offering.
 *
 * The links are plain anchors rather than each app's router Link. An earlier
 * version took a renderLink function so apps could pass their locale-aware
 * Link; that cannot work. This module is re-exported through an index.ts
 * marked 'use client', so it is a client component, and not-found.tsx is a
 * server component — React refuses to serialize a function across that
 * boundary and the build fails on every prerendered page.
 *
 * A hard navigation is the right behaviour here anyway: the client router has
 * already failed to find this route, and unprefixed hrefs are redirected to
 * the right locale by each app's middleware.
 */
export function NotFoundPage({
  product,
  initial,
  accent,
  title,
  description,
  links,
  footer,
  className,
}: NotFoundPageProps) {
  return (
    <main
      className={cn(
        "flex min-h-svh flex-col items-center justify-center px-6 py-16",
        "bg-[var(--mk-palette-bg,#0D0F17)] text-[var(--mk-palette-text-primary,#F0F0F3)]",
        className
      )}
    >
      <div className="w-full max-w-lg">
        {/* Lockup — same geometry as the tab icon, per hq/docs/BRAND.md */}
        <div className="mb-8 flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-lg font-extrabold italic tracking-[-0.04em] text-white"
            style={{
              background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`,
            }}
          >
            {initial}
          </div>
          <div className="leading-[1.15]">
            <div className="text-base font-bold tracking-[-0.01em]">{product}</div>
            <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--mk-palette-text-tertiary,#7E8292)]">
              Musakonttori
            </div>
          </div>
        </div>

        <p
          className="text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent[1] }}
        >
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-[var(--mk-palette-text-secondary,#B0B3C1)]">
          {description}
        </p>

        <nav className="mt-8 flex flex-col gap-2" aria-label={`${product} — ${title}`}>
          {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors",
                  "border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
                  "hover:border-[var(--mk-palette-border-default,rgba(255,255,255,0.16))]",
                  "hover:bg-[var(--mk-palette-bg-surface,#1A1D27)]"
                )}
              >
                <span>
                  <span className="block font-medium">{link.label}</span>
                  {link.hint && (
                    <span className="block text-sm text-[var(--mk-palette-text-tertiary,#7E8292)]">
                      {link.hint}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[var(--mk-palette-text-tertiary,#7E8292)] transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
          ))}
        </nav>

        {footer && (
          <p className="mt-8 text-sm text-[var(--mk-palette-text-tertiary,#7E8292)]">
            {footer}
          </p>
        )}
      </div>
    </main>
  );
}
