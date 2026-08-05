"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Building2, ChevronDown } from "lucide-react";
import { cn } from "./utils";
import { safeHref } from "./safeHref";
import { ThemeToggle } from "./ThemeToggle";
export function AppHeader({ productName, productHref = "/", navItems, user, onSignOut, signInHref = "/auth/sign-in", className, }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const userMenuTriggerRef = useRef(null);
    const userMenuPanelRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        if (!userMenuOpen)
            return;
        const handleKeyDown = (event) => {
            if (event.key !== "Escape")
                return;
            setUserMenuOpen(false);
            userMenuTriggerRef.current?.focus();
        };
        document.addEventListener("keydown", handleKeyDown);
        userMenuPanelRef.current
            ?.querySelector('[role="menuitem"]')
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
            ? user.email[0].toUpperCase()
            : null;
    return (_jsxs("header", { className: cn("sticky top-0 z-40 w-full border-b", "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", "bg-white/80 dark:bg-zinc-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-zinc-900/70", className), children: [_jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8", children: [_jsxs("a", { href: safeHref(productHref), className: "flex shrink-0 items-center gap-2 text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)] no-underline", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md bg-[var(--mk-palette-bg-brand,#DC2626)] text-white text-xs font-bold", children: productName[0] }), _jsx("span", { className: "text-lg font-semibold tracking-tight", children: productName })] }), navItems && navItems.length > 0 && (_jsx("nav", { className: "hidden md:flex items-center gap-1 ml-4", "aria-label": "P\u00E4\u00E4valikko", children: navItems.map((item) => (_jsx("a", { href: safeHref(item.href), className: cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", "text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]", "hover:text-[var(--mk-palette-text-primary,#0F0F11)] dark:hover:text-[var(--mk-palette-text-primary,#F0F0F3)]", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), children: item.label }, item.label))) })), _jsx("div", { className: "flex-1" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ThemeToggle, {}), user ? (
                            /* User menu */
                            _jsxs("div", { className: "relative", ref: userMenuRef, children: [_jsxs("button", { ref: userMenuTriggerRef, type: "button", onClick: () => setUserMenuOpen(!userMenuOpen), className: cn("flex items-center gap-2 rounded-lg p-1.5 transition-colors", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), "aria-expanded": userMenuOpen, "aria-haspopup": "menu", "aria-controls": "mk-user-menu", "aria-label": "Avaa k\u00E4ytt\u00E4j\u00E4valikko", children: [user.image ? (_jsx("img", { src: user.image, alt: user.name ?? "Käyttäjä", className: "h-7 w-7 rounded-full object-cover" })) : (_jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-[var(--mk-palette-bg-muted,#F4F4F5)] dark:bg-[var(--mk-palette-bg-muted,#2A2E3D)] text-xs font-semibold text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: initials ?? _jsx(User, { className: "h-3.5 w-3.5" }) })), _jsx(ChevronDown, { className: cn("hidden sm:block h-3.5 w-3.5 text-[var(--mk-palette-text-tertiary,#A1A1AA)] dark:text-[var(--mk-palette-text-tertiary,#7E8292)] transition-transform", userMenuOpen && "rotate-180") })] }), userMenuOpen && (_jsxs("div", { ref: userMenuPanelRef, id: "mk-user-menu", role: "menu", "aria-label": "K\u00E4ytt\u00E4j\u00E4valikko", className: cn("absolute right-0 top-full mt-1 w-56 rounded-xl border p-1.5 shadow-xl", "bg-[var(--mk-palette-bg-surface,#FFFFFF)] dark:bg-[var(--mk-palette-bg-surface,#1A1D27)]", "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]"), children: [_jsxs("div", { className: "px-3 py-2 border-b border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] mb-1", children: [user.name && (_jsx("p", { className: "text-sm font-medium text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)] truncate", children: user.name })), user.email && (_jsx("p", { className: "text-xs text-[var(--mk-palette-text-tertiary,#A1A1AA)] dark:text-[var(--mk-palette-text-tertiary,#7E8292)] truncate", children: user.email }))] }), _jsxs("a", { href: "/tili", role: "menuitem", className: cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), children: [_jsx(User, { className: "h-4 w-4" }), "Tili"] }), _jsxs("a", { href: "/organisaatiot", role: "menuitem", className: cn("flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), children: [_jsx(Building2, { className: "h-4 w-4" }), "Organisaatiot"] }), _jsx("div", { className: "border-t border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] mt-1 pt-1", children: _jsxs("button", { type: "button", role: "menuitem", onClick: () => {
                                                        setUserMenuOpen(false);
                                                        onSignOut?.();
                                                    }, className: cn("flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors", "text-[var(--mk-palette-text-secondary,#52525B)] dark:text-[var(--mk-palette-text-secondary,#B0B3C1)]", "hover:text-red-600 dark:hover:text-red-400", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), children: [_jsx(LogOut, { className: "h-4 w-4" }), "Kirjaudu ulos"] }) })] }))] })) : (
                            /* Sign in button */
                            _jsx("a", { href: safeHref(signInHref), className: cn("hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors h-9 px-4", "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white", "hover:bg-[var(--mk-palette-bg-brand-hover,#BF2227)]", "active:bg-[var(--mk-palette-bg-brand-active,#A51E23)]"), children: "Kirjaudu" })), _jsx("button", { type: "button", onClick: () => setMobileOpen(!mobileOpen), className: cn("md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), "aria-label": mobileOpen ? "Sulje valikko" : "Avaa valikko", "aria-expanded": mobileOpen, children: mobileOpen ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }) })] })] }), mobileOpen && (_jsx("div", { className: cn("md:hidden border-t", "border-[var(--mk-palette-border-subtle,#E4E4E7)] dark:border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]", "bg-[var(--mk-palette-bg-surface,#FFFFFF)] dark:bg-[var(--mk-palette-bg-surface,#1A1D27)]"), children: _jsxs("div", { className: "px-4 py-3 space-y-1", children: [navItems?.map((item) => (_jsx("a", { href: safeHref(item.href), onClick: () => setMobileOpen(false), className: cn("block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", "text-[var(--mk-palette-text-primary,#0F0F11)] dark:text-[var(--mk-palette-text-primary,#F0F0F3)]", "hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] dark:hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]"), children: item.label }, item.label))), !user && (_jsx("a", { href: safeHref(signInHref), onClick: () => setMobileOpen(false), className: cn("block rounded-lg px-3 py-2.5 text-center text-sm font-semibold transition-colors mt-2", "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white", "hover:bg-[var(--mk-palette-bg-brand-hover,#BF2227)]"), children: "Kirjaudu" })), _jsx("div", { className: "pt-2 pb-1" })] }) }))] }));
}
