export interface ThemeToggleLabels {
    toLight: string;
    toDark: string;
}
export interface ThemeToggleProps {
    className?: string;
    /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
    locale?: string;
    /** Override either accessible label directly. */
    labels?: Partial<ThemeToggleLabels>;
}
export declare function ThemeToggle({ className, locale, labels }: ThemeToggleProps): import("react").JSX.Element;
//# sourceMappingURL=ThemeToggle.d.ts.map