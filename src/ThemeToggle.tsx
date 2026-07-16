"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "./utils";

const STORAGE_KEY = "mk-mode";

function applyTheme(dark: boolean) {
  const el = document.documentElement;
  if (dark) {
    el.classList.remove("light");
    el.classList.add("dark");
  } else {
    el.classList.add("light");
    el.classList.remove("dark");
  }
  localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  document.cookie = `mk-mode=${dark ? "dark" : "light"}; path=/; max-age=31536000; SameSite=Lax`;
}

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light") {
      setDark(false);
      applyTheme(false);
    } else {
      applyTheme(true);
    }
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    applyTheme(next);
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
      aria-label={dark ? "Vaihda vaaleaan teemaan" : "Vaihda tummaan teemaan"}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
