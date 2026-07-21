export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    /** Label text above the field */
    label?: string;
    /** Error message */
    error?: string;
    /** Help / hint text */
    hint?: string;
    /** Required field - shows * indicator */
    required?: boolean;
    /** Left icon (lucide-react etc.) */
    leftIcon?: React.ReactNode;
    /** Right icon */
    rightIcon?: React.ReactNode;
}
/**
 * Musakonttori Input - text input field.
 *
 * Supports label, error, hint, required, leftIcon, rightIcon.
 * Follows WCAG 2.2 AA accessibility (aria-invalid, aria-describedby).
 *
 * @example
 * <Input label="Sähköposti" type="email" placeholder="sinä@esimerkki.fi" />
 * <Input label="Nimi" error="Pakollinen kenttä" required />
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map