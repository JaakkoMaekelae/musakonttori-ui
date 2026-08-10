"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "./utils";
const STORAGE_KEY = "mk-mode";
function applyTheme(theme) {
    const el = document.documentElement;
    const dark = theme === "dark";
    el.classList.toggle("dark", dark);
    el.classList.toggle("light", !dark);
    el.setAttribute("data-theme", theme);
    el.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    document.cookie = `mk-mode=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}
function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark")
        return stored;
    const root = document.documentElement;
    const rootTheme = root.getAttribute("data-theme");
    if (rootTheme === "light" || rootTheme === "dark")
        return rootTheme;
    if (root.classList.contains("dark"))
        return "dark";
    return "light";
}
/**
 * The toggle's only accessible name — it renders a bare icon, so this is all a
 * screen reader announces. Keyed per locale like LocaleSwitcherModal's own
 * labels, so a product not in Finnish does not get a Finnish announcement by
 * default; anything not listed here falls back to Finnish, the family's
 * historical default for this component.
 */
const THEME_TOGGLE_LABELS = {
    fi: { toLight: "Vaihda vaaleaan teemaan", toDark: "Vaihda tummaan teemaan" },
    en: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    sv: { toLight: "Byt till ljust tema", toDark: "Byt till mörkt tema" },
};
function themeLabelsFor(locale, override) {
    const base = THEME_TOGGLE_LABELS[locale ?? "fi"] ?? THEME_TOGGLE_LABELS.fi;
    return override ? { ...base, ...override } : base;
}
export function ThemeToggle({ className, locale, labels }) {
    const L = themeLabelsFor(locale, labels);
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const initial = getInitialTheme();
        setDark(initial === "dark");
        applyTheme(initial);
        setMounted(true);
    }, []);
    const toggle = useCallback(() => {
        const next = !dark;
        setDark(next);
        applyTheme(next ? "dark" : "light");
    }, [dark]);
    if (!mounted) {
        return _jsx("div", { className: cn("h-9 w-9 rounded-lg", className) });
    }
    return (_jsx("button", { type: "button", onClick: toggle, className: cn("grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/[0.06]", className), suppressHydrationWarning: true, "aria-label": dark ? L.toLight : L.toDark, children: dark ? _jsx(Sun, { className: "h-4 w-4" }) : _jsx(Moon, { className: "h-4 w-4" }) }));
}
