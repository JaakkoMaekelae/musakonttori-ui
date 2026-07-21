import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import { cn } from "./utils";
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
export const Input = forwardRef(({ label, error, hint, required: isRequired, className, id, leftIcon, rightIcon, maxLength, value, defaultValue, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const currentLength = typeof value === "string"
        ? value.length
        : typeof defaultValue === "string"
            ? defaultValue.length
            : 0;
    const showCharCount = typeof maxLength === "number" && maxLength > 0;
    const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
        .filter(Boolean)
        .join(" ") || undefined;
    return (_jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [label && (_jsxs("label", { htmlFor: inputId, className: "text-sm font-medium text-[var(--mk-palette-text-primary,#F0F0F3)]", children: [label, isRequired && _jsx("span", { className: "ml-0.5 text-red-500", "aria-hidden": "true", children: "*" })] })), _jsxs("div", { className: "relative", children: [leftIcon && (_jsx("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[var(--mk-palette-text-tertiary,#6B7280)]", children: leftIcon })), _jsx("input", { ref: ref, id: inputId, maxLength: maxLength, value: value, defaultValue: defaultValue, className: cn("h-10 w-full rounded-lg border bg-[var(--mk-palette-bg,#0D0F17)] px-3 text-sm text-[var(--mk-palette-text-primary,#F0F0F3)] placeholder:text-[var(--mk-palette-text-tertiary,#6B7280)] transition-colors", "border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", "hover:border-[var(--mk-palette-border-hover,rgba(255,255,255,0.2))]", "focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-bg-brand,#DC2626)] focus:border-transparent", "disabled:opacity-50 disabled:cursor-not-allowed", error && "border-red-500 focus:ring-red-500", leftIcon && "pl-10", rightIcon && "pr-10", className), "aria-invalid": error ? "true" : undefined, "aria-describedby": describedBy, "aria-required": isRequired, ...props }), rightIcon && (_jsx("span", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--mk-palette-text-tertiary,#6B7280)]", children: rightIcon }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [error && (_jsx("p", { id: errorId, className: "text-xs text-red-400", role: "alert", children: error })), !error && hint && (_jsx("p", { id: hintId, className: "text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]", children: hint }))] }), showCharCount && (_jsxs("span", { className: "text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]", children: [currentLength, "/", maxLength] }))] })] }));
});
Input.displayName = "Input";
