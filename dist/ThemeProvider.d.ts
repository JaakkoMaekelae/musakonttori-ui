import { type ReactNode } from "react";
type Theme = "dark" | "light";
interface ThemeContextValue {
    theme: Theme;
    toggle: () => void;
    setTheme: (theme: Theme) => void;
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
export declare function ThemeProvider({ children, defaultTheme, storageKey, }: ThemeProviderProps): import("react").JSX.Element;
/**
 * useTheme - lue ja ohjaa teematilaa.
 *
 * Vaatii `<ThemeProvider>` yläpuolella.
 *
 * @returns {{ theme: Theme, toggle: () => void, setTheme: (t: Theme) => void }}
 */
export declare function useTheme(): ThemeContextValue;
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map