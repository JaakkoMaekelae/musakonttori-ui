export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text above the field */
    label?: string;
    /** Error message */
    error?: string;
    /** Help / hint text */
    hint?: string;
    /** Required field - shows * indicator */
    required?: boolean;
}
/**
 * Musakonttori Textarea - monirivinen tekstikenttä.
 *
 * Tukee label, error, hint, required.
 * Seuraa WCAG 2.2 AA -saavutettavuutta (aria-invalid, aria-describedby).
 *
 * @example
 * <Textarea label="Kuvaus" placeholder="Kirjoita kuvaus..." />
 * <Textarea label="Viesti" error="Pakollinen kenttä" required />
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=Textarea.d.ts.map