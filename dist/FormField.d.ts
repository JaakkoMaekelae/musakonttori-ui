import type { ReactNode } from "react";
export interface FormFieldProps {
    /** Label text */
    label: string;
    /** htmlFor attribute (auto-generated id if not provided) */
    htmlFor?: string;
    /** Error message */
    error?: string;
    /** Required field - shows * indicator */
    required?: boolean;
    /** Help / hint text */
    helpText?: string;
    /** Inner input component (Input, Select, etc.) */
    children: ReactNode;
    className?: string;
}
/**
 * Musakonttori FormField - form field wrapper.
 *
 * Wraps Input/Select field with consistent layout:
 * label, required indicator, error, hint.
 *
 * @example
 * <FormField label="Nimi" required error="Pakollinen tieto">
 *   <Input placeholder="Anna nimesi" />
 * </FormField>
 */
export declare function FormField({ label, htmlFor, error, required: isRequired, helpText, children, className, }: FormFieldProps): import("react").JSX.Element;
//# sourceMappingURL=FormField.d.ts.map