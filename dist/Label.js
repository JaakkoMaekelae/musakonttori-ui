"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * Musakonttori Label - lomakekentän otsikko.
 *
 * Tukee required-indikaattoria (punainen tähti).
 *
 * @example
 * <Label htmlFor="email">Sähköposti</Label>
 * <Label required>Nimi</Label>
 */
function Label({ className, children, required: isRequired, ...props }) {
    return (_jsxs("label", { className: cn("text-sm font-medium leading-none text-[var(--mk-palette-text-primary,#111113)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className), ...props, children: [children, isRequired && (_jsx("span", { className: "ml-1 text-red-500", "aria-hidden": "true", children: "*" }))] }));
}
export { Label };
