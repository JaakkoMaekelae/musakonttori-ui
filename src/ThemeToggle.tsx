"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "./utils";

const STORAGE_KEY = "mk-mode";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  const dark = theme === "dark";

  el.classList.toggle("dark", dark);
  el.classList.toggle("light", !dark);
  el.setAttribute("data-theme", theme);
  el.style.colorScheme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  document.cookie = `mk-mode=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  const root = document.documentElement;
  const rootTheme = root.getAttribute("data-theme");
  if (rootTheme === "light" || rootTheme === "dark") return rootTheme;
  if (root.classList.contains("dark")) return "dark";

  return "light";
}

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
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
    return <div className={cn("h-9 w-9 rounded-lg", className)} />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-lg transition hover:bg-white/[0.06]",
        className,
      )}
      suppressHydrationWarning
      aria-label={dark ? "Vaihda vaaleaan teemaan" : "Vaihda tummaan teemaan"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
