"use client";

import { cn } from "./utils";
import { safeHref } from "./safeHref";

export interface AppFooterLinkGroup {
  title: string;
  items: { label: string; href: string }[];
}

export interface AppFooterProps {
  productName: string;
  companyName?: string;
  links?: { label: string; href: string }[];
  linkGroups?: AppFooterLinkGroup[];
  className?: string;
}

export function AppFooter({
  productName,
  companyName = "Musakonttori",
  links,
  linkGroups,
  className,
}: AppFooterProps) {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-zinc-900 text-zinc-300",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="col-span-2 sm:col-span-1">
            <a
              href={safeHref("/")}
              className="inline-flex items-center gap-2 no-underline"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--mk-palette-bg-brand,#DC2626)] text-white text-xs font-bold">
                {productName[0]}
              </div>
              <span className="text-lg font-semibold text-white">{productName}</span>
            </a>
            <p className="mt-2 text-sm text-zinc-400">
              by {companyName}
            </p>
            {links && links.length > 0 && (
              <div className="mt-4 flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={safeHref(link.href)}
                    className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Columns 2-4: Link groups */}
          {linkGroups?.slice(0, 3).map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={safeHref(item.href)}
                      className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Fill remaining grid columns if fewer than 3 link groups */}
          {linkGroups && linkGroups.length < 3
            ? Array.from({ length: 3 - linkGroups.length }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden lg:block" />
              ))
            : !linkGroups &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={`empty-${i}`} className="hidden lg:block" />
              ))}
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            "mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4",
            "border-t border-zinc-800",
          )}
        >
          <p className="text-xs text-zinc-500">
            &copy; {year} {companyName}. Kaikki oikeudet pidätetään.
          </p>
        </div>
      </div>
    </footer>
  );
}
