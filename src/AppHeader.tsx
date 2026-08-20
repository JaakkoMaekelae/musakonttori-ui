"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Building2, ChevronDown } from "lucide-react";
import { cn } from "./utils";
import { safeHref } from "./safeHref";
import { ThemeToggle } from "./ThemeToggle";

export interface AppHeaderLabels {
  mainNav?: string;
  openUserMenu?: string;
  userAvatar?: string;
  userMenu?: string;
  account?: string;
  organizations?: string;
  signOut?: string;
  signIn?: string;
  closeMenu?: string;
  openMenu?: string;
}

export interface AppHeaderProps {
  productName: string;
  productHref?: string;
  navItems?: { label: string; href: string }[];
  user?: { name?: string | null; email?: string | null; image?: string | null } | null;
  onSignOut?: () => void;
  signInHref?: string;
  className?: string;
  /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
  locale?: string;
  /** Override any of the header's own strings. Built-in: fi, en, sv. */
  labels?: AppHeaderLabels;
}

/**
 * The header's own chrome, in the languages the family actually ships UI in.
 *
 * Keyed per locale like LocaleSwitcherModal's `LABELS` — a product that does
 * not pass `locale` keeps today's Finnish text exactly (the historical
 * default, kept for backward compatibility), and a product in English or
 * Swedish gets real translations instead of Finnish leaking through every
 * consumer that forgot to override all ten strings by hand.
 */
const APP_HEADER_LABELS: Record<string, Required<AppHeaderLabels>> = {
  fi: {
    mainNav: "Päävalikko",
    openUserMenu: "Avaa käyttäjävalikko",
    userAvatar: "Käyttäjä",
    userMenu: "Käyttäjävalikko",
    account: "Tili",
    organizations: "Organisaatiot",
    signOut: "Kirjaudu ulos",
    signIn: "Kirjaudu",
    closeMenu: "Sulje valikko",
    openMenu: "Avaa valikko",
  },
  en: {
    mainNav: "Main menu",
    openUserMenu: "Open user menu",
    userAvatar: "User",
    userMenu: "User menu",
    account: "Account",
    organizations: "Organizations",
    signOut: "Sign out",
    signIn: "Sign in",
    closeMenu: "Close menu",
    openMenu: "Open menu",
  },
  sv: {
    mainNav: "Huvudmeny",
    openUserMenu: "Öppna användarmenyn",
    userAvatar: "Användare",
    userMenu: "Användarmeny",
    account: "Konto",
    organizations: "Organisationer",
    signOut: "Logga ut",
    signIn: "Logga in",
    closeMenu: "Stäng menyn",
    openMenu: "Öppna menyn",
  },
};

function headerLabelsFor(
  locale: string | undefined,
  override?: AppHeaderLabels
): Required<AppHeaderLabels> {
  const base = APP_HEADER_LABELS[locale ?? "fi"] ?? APP_HEADER_LABELS.fi!;
  return override ? { ...base, ...override } : base;
}

export function AppHeader({
  productName,
  productHref = "/",
  navItems,
  user,
  onSignOut,
  signInHref = "/auth/sign-in",
  className,
  locale,
  labels,
}: AppHeaderProps) {
  const L = headerLabelsFor(locale, labels);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const userMenuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setUserMenuOpen(false);
      userMenuTriggerRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    userMenuPanelRef.current
      ?.querySelector<HTMLElement>('[role="menuitem"]')
      ?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [userMenuOpen]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email
    ? (user.email[0] ?? productName[0] ?? "?").toUpperCase()
    : null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b",
        "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
        "bg-white/80 dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <a
          href={safeHref(productHref)}
          className="flex shrink-0 items-center gap-2 text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)] no-underline"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--mk-palette-bg-brand,#DC2626)] text-white text-xs font-bold">
            {productName[0]}
          </div>
          <span className="text-lg font-semibold tracking-tight">{productName}</span>
        </a>

        {/* Center: Nav (desktop) */}
        {navItems && navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 ml-4" aria-label={L.mainNav}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={safeHref(item.href)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]",
                  "hover:text-[var(--mk-palette-text-primary,#0F0F11)] dark:hover:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                  "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: Tools */}
        <div className="flex items-center gap-2">
          <ThemeToggle locale={locale} />

          {user ? (
            /* User menu */
            <div className="relative" ref={userMenuRef}>
              <button
                ref={userMenuTriggerRef}
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={cn(
                  "flex items-center gap-2 rounded-lg p-1.5 transition-colors",
                  "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                )}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-controls="mk-user-menu"
                aria-label={L.openUserMenu}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name ?? L.userAvatar}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mk-palette-bg-muted,#F4F4F5)] dark:bg-[var(--mk-palette-bg-muted,#2A2E3D)] text-xs font-semibold text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]">
                    {initials ?? <User className="h-3.5 w-3.5" />}
                  </div>
                )}
                <ChevronDown
                  className={cn(
                    "hidden sm:block h-3.5 w-3.5 text-[var(--mk-palette-text-tertiary,#A1A1AA)] dark:text-[var(--mk-palette-text-tertiary,#7E8292)] transition-transform",
                    userMenuOpen && "rotate-180",
                  )}
                />
              </button>

              {userMenuOpen && (
                <div
                  ref={userMenuPanelRef}
                  id="mk-user-menu"
                  role="menu"
                  aria-label={L.userMenu}
                  className={cn(
                    "absolute right-0 top-full mt-1 w-56 rounded-xl border p-1.5 shadow-xl",
                    "bg-[var(--mk-palette-bg-surface,#FFFFFF)] dark:bg-[var(--mk-palette-bg-surface,#1A1D27)]",
                    "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
                  )}
                >
                  {/* User info */}
                  <div className="px-3 py-2 border-b border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] mb-1">
                    {user.name && (
                      <p className="text-sm font-medium text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)] truncate">
                        {user.name}
                      </p>
                    )}
                    {user.email && (
                      <p className="text-xs text-[var(--mk-palette-text-tertiary,#A1A1AA)] dark:text-[var(--mk-palette-text-tertiary,#7E8292)] truncate">
                        {user.email}
                      </p>
                    )}
                  </div>

                  {/* Menu items */}
                  <a
                    href="/tili"
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                      "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                    )}
                  >
                    <User className="h-4 w-4" />
                    {L.account}
                  </a>
                  <a
                    href="/organisaatiot"
                    role="menuitem"
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                      "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                    )}
                  >
                    <Building2 className="h-4 w-4" />
                    {L.organizations}
                  </a>

                  <div className="border-t border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] mt-1 pt-1">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onSignOut?.();
                      }}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                        "text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]",
                        "hover:text-red-600 dark:hover:text-red-400",
                        "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                      )}
                    >
                      <LogOut className="h-4 w-4" />
                      {L.signOut}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Sign in button */
            <a
              href={safeHref(signInHref)}
              className={cn(
                "hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors h-9 px-4",
                "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white",
                "hover:bg-[var(--mk-palette-bg-brand-hover,#BF2227)]",
                "active:bg-[var(--mk-palette-bg-brand-active,#A51E23)]",
              )}
            >
              {L.signIn}
            </a>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
            )}
            aria-label={mobileOpen ? L.closeMenu : L.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={cn(
            "md:hidden border-t",
            "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
            "bg-[var(--mk-palette-bg-surface,#FFFFFF)] dark:bg-[var(--mk-palette-bg-surface,#1A1D27)]",
          )}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems?.map((item) => (
              <a
                key={item.label}
                href={safeHref(item.href)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]",
                  "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                )}
              >
                {item.label}
              </a>
            ))}
            {!user && (
              <a
                href={safeHref(signInHref)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition-colors mt-2",
                  "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white",
                  "hover:bg-[var(--mk-palette-bg-brand-hover,#BF2227)]",
                )}
              >
                {L.signIn}
              </a>
            )}
            {/* Mobile market switcher */}
            <div className="pt-2 pb-1">
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
