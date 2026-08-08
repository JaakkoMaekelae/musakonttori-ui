import { forwardRef, useId } from "react";
import { cn } from "./utils";

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
 * <Input label={t("auto.sähköposti")} type="email" placeholder={t("auto.sinäesimerkkifi")} />
 * <Input label="Nimi" error={t("auto.pakollinen_kenttä")} required />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required: isRequired, className, id, leftIcon, rightIcon, maxLength, value, defaultValue, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const currentLength =
      typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
          ? defaultValue.length
          : 0;

    const showCharCount = typeof maxLength === "number" && maxLength > 0;

    const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--mk-palette-text-primary,#111113)]"
          >
            {label}
            {isRequired && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--mk-palette-text-tertiary,#6B7280)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              "h-11 w-full rounded-xl px-4 text-sm transition-all duration-150",
              "bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)] text-[var(--mk-palette-text-primary,#111113)]",
              "placeholder:text-[var(--mk-palette-text-muted,#9CA3AF)]",
              "hover:bg-[var(--mk-palette-bg-surface-hover,#EBEBEE)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-primary,#BF2227)] focus:ring-offset-0 focus:bg-[var(--mk-palette-bg,#FFFFFF)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={describedBy}
            aria-required={isRequired}
            {...props}
          />
          {rightIcon && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--mk-palette-text-tertiary,#6B7280)]">
              {rightIcon}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {error && (
              <p id={errorId} className="text-xs text-red-400" role="alert">
                {error}
              </p>
            )}
            {!error && hint && (
              <p id={hintId} className="text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]">
                {hint}
              </p>
            )}
          </div>
          {showCharCount && (
            <span className="text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
