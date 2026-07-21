import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "./utils";
const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-[3px]",
};
/**
 * Musakonttori Spinner - loading animation.
 *
 * Sizes: sm, md, lg.
 * Variants: default (red brand color), white.
 *
 * @example
 * <Spinner />
 * <Spinner size="lg" variant="white" />
 */
export function Spinner({ size = "md", variant = "default", className, label = "Ladataan", }) {
    return (_jsx("div", { className: cn("animate-spin rounded-full", variant === "default"
            ? "border-[var(--mk-palette-bg-surface,#1E2130)] border-t-[var(--mk-palette-bg-brand,#DC2626)]"
            : "border-white/20 border-t-white", sizeClasses[size], className), role: "status", "aria-label": label, children: _jsx("span", { className: "sr-only", children: label }) }));
}
