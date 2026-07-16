import { useId } from "react";
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
export function FormField({
  label,
  htmlFor,
  error,
  required: isRequired = false,
  helpText,
  children,
  className = "",
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = htmlFor ?? autoId;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-sm font-medium text-[var(--mk-palette-text-primary,#F0F0F3)]"
      >
        {label}
        {isRequired && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {helpText && !error && (
        <p className="mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
