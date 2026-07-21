import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
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
export function FormField({ label, htmlFor, error, required: isRequired = false, helpText, children, className = "", }) {
    const autoId = useId();
    const fieldId = htmlFor ?? autoId;
    return (_jsxs("div", { className: `w-full ${className}`, children: [_jsxs("label", { htmlFor: fieldId, className: "mb-1.5 block text-sm font-medium text-[var(--mk-palette-text-primary,#F0F0F3)]", children: [label, isRequired && (_jsx("span", { className: "ml-0.5 text-red-500", "aria-hidden": "true", children: "*" }))] }), children, helpText && !error && (_jsx("p", { className: "mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: helpText })), error && (_jsx("p", { className: "mt-1 text-xs text-red-400", role: "alert", children: error }))] }));
}
