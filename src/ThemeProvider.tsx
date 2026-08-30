"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  useCallback,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  setTheme: () => {},
});

const DEFAULT_STORAGE_KEY = "mk-mode";

function getStoredTheme(storageKey: string): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage ei saatavilla */
  }
  return "dark";
}

function subscribeTheme(
  storageKey: string,
  onStoreChange: () => void,
) {
  if (typeof window === "undefined") return () => {};

  function onStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === "mk-mode") onStoreChange();
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
}

function persistTheme(theme: Theme, storageKey: string) {
  try {
    localStorage.setItem(storageKey, theme);
    localStorage.setItem("mk-mode", theme);
    document.cookie = `mk-mode=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* storage / cookie ei saatavilla */
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Default theme (before stored preference loaded). Default: "dark" */
  defaultTheme?: Theme;
  /** localStorage key. Default: "mk-mode" */
  storageKey?: string;
}

/**
 * Musakonttori ThemeProvider - teematilan hallinta.
 *
 * Tarjoaa `useTheme()`-hookin kautta:
 * - `theme`: nykyinen teema ("dark" | "light")
 * - `toggle()`: vaihda dark ↔ light
 * - `setTheme(t)`: aseta suoraan
 *
 * Synkronoi automaattisesti localStorageen, cookieen (mk-mode),
 * DOM-attribuutteihin (data-theme, dark/light-luokat, color-scheme).
 *
 * Käyttää `useSyncExternalStore` SSR-yhteensopivuuteen.
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = DEFAULT_STORAGE_KEY,
}: ThemeProviderProps) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => subscribeTheme(storageKey, onStoreChange),
    [storageKey],
  );

  const theme = useSyncExternalStore(
    subscribe,
    () => getStoredTheme(storageKey),
    () => defaultTheme,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback(
    (t: Theme) => {
      applyTheme(t);
      persistTheme(t, storageKey);
    },
    [storageKey],
  );

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme - lue ja ohjaa teematilaa.
 *
 * Vaatii `<ThemeProvider>` yläpuolella.
 *
 * @returns {{ theme: Theme, toggle: () => void, setTheme: (t: Theme) => void }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}
