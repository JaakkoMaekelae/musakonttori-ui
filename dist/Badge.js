import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors", {
    variants: {
        variant: {
            neutral: "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-secondary,#B0B3C1)] border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]",
            success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            error: "bg-red-500/10 text-red-400 border-red-500/20",
            info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            brand: "bg-[var(--mk-palette-bg-brand,#DC2626)]/10 text-[var(--mk-palette-bg-brand,#DC2626)] border-[var(--mk-palette-bg-brand,#DC2626)]/20",
            red: "bg-red-500/20 text-red-400 border-red-500/40",
            purple: "bg-purple-500/20 text-purple-400 border-purple-500/40",
            blue: "bg-blue-500/20 text-blue-400 border-blue-500/40",
            green: "bg-green-500/20 text-green-400 border-green-500/40",
            orange: "bg-orange-500/20 text-orange-400 border-orange-500/40",
            amber: "bg-amber-500/20 text-amber-400 border-amber-500/40",
            pink: "bg-pink-500/20 text-pink-400 border-pink-500/40",
            gray: "bg-gray-500/20 text-gray-400 border-gray-500/40",
            default: "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-secondary,#B0B3C1)] border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]",
            primary: "bg-[var(--mk-palette-bg-brand,#DC2626)]/10 text-[var(--mk-palette-bg-brand,#DC2626)] border-[var(--mk-palette-bg-brand,#DC2626)]/20",
            secondary: "bg-gray-500/20 text-gray-400 border-gray-500/40",
            destructive: "bg-red-500/10 text-red-400 border-red-500/20",
            outline: "border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-transparent text-[var(--mk-palette-text-secondary,#B0B3C1)]",
        },
    },
    defaultVariants: {
        variant: "neutral",
    },
});
function resolveVariant(variant, tone) {
    if (tone)
        return tone;
    return variant ?? "neutral";
}
function getDotColor(variant) {
    switch (variant) {
        case "success":
        case "green":
            return "bg-emerald-500";
        case "warning":
        case "orange":
        case "amber":
            return "bg-amber-500";
        case "error":
        case "red":
        case "destructive":
            return "bg-red-500";
        case "info":
        case "blue":
            return "bg-blue-500";
        case "brand":
        case "primary":
            return "bg-[var(--mk-palette-bg-brand,#DC2626)]";
        case "purple":
            return "bg-purple-500";
        case "pink":
            return "bg-pink-500";
        case "gray":
        case "secondary":
            return "bg-gray-500";
        case "neutral":
        case "default":
        case "outline":
            return "bg-zinc-400";
    }
}
/**
 * Musakonttori Badge - compact status indicator.
 *
 * Variants: neutral, success, warning, error, info, brand.
 * Supports `dot` indicator and `pulse` animation.
 * Use `Chip` for categories, filters and removable values.
 *
 * @example
 * <Badge variant="success">Aktiivinen</Badge>
 * <Badge tone="error" dot pulse>Virhe</Badge>
 */
export function Badge({ variant = "neutral", tone, dot = false, pulse = false, className, children, ...props }) {
    const resolved = resolveVariant(variant, tone);
    return (_jsxs("span", { className: cn(badgeVariants({ variant: resolved, className })), ...props, children: [dot && (_jsxs("span", { className: "relative flex h-2 w-2", children: [_jsx("span", { className: cn("absolute inline-flex h-full w-full rounded-full", getDotColor(resolved)) }), pulse && (_jsx("span", { className: cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", getDotColor(resolved)) }))] })), children] }));
}
