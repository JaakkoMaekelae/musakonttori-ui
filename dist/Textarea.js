import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import { cn } from "./utils";
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
export const Textarea = forwardRef(({ label, error, hint, required: isRequired, className, id, ...props }, ref) => {
    const autoId = useId();
    const textareaId = id ?? autoId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;
    const describedBy = [
        error ? errorId : null,
        !error && hint ? hintId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;
    return (_jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [label && (_jsxs("label", { htmlFor: textareaId, className: "text-sm font-medium text-[var(--mk-palette-text-primary,#111113)]", children: [label, isRequired && (_jsx("span", { className: "ml-0.5 text-red-500", "aria-hidden": "true", children: "*" }))] })), _jsx("textarea", { ref: ref, id: textareaId, className: cn("min-h-[80px] w-full rounded-xl px-4 py-2 text-sm transition-all duration-150", "bg-[var(--mk-palette-bg-surface-secondary,#F4F4F5)] text-[var(--mk-palette-text-primary,#111113)]", "placeholder:text-[var(--mk-palette-text-muted,#9CA3AF)]", "hover:bg-[var(--mk-palette-bg-surface-hover,#EBEBEE)]", "focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-primary,#BF2227)] focus:ring-offset-0 focus:bg-[var(--mk-palette-bg,#FFFFFF)]", "disabled:opacity-50 disabled:cursor-not-allowed", error && "border-red-500 focus:ring-red-500", className), "aria-invalid": error ? "true" : undefined, "aria-describedby": describedBy, "aria-required": isRequired, ...props }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [error && (_jsx("p", { id: errorId, className: "text-xs text-red-400", role: "alert", children: error })), !error && hint && (_jsx("p", { id: hintId, className: "text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]", children: hint }))] }) })] }));
});
Textarea.displayName = "Textarea";
