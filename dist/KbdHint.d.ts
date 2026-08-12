export interface KbdHintProps {
    keys: string[];
    className?: string;
}
/**
 * Musakonttori KbdHint - näppäinoikotietojen näyttö.
 *
 * Renderöi `<kbd>`-elementit + -erottimella.
 *
 * @example
 * <KbdHint keys={["⌘", "K"]} />
 * <KbdHint keys={["Ctrl", "S"]} />
 */
export declare function KbdHint({ keys, className }: KbdHintProps): import("react").JSX.Element;
//# sourceMappingURL=KbdHint.d.ts.map