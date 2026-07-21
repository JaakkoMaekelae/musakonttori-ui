import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-bg-brand,#DC2626)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mk-palette-bg,#0D0F17)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4", {
    variants: {
        variant: {
            primary: "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white hover:bg-[var(--mk-palette-bg-brand-hover,#B91C1C)] active:bg-[var(--mk-palette-bg-brand-active,#991B1B)]",
            default: "bg-[var(--mk-palette-bg-brand,#DC2626)] text-white hover:bg-[var(--mk-palette-bg-brand-hover,#B91C1C)] active:bg-[var(--mk-palette-bg-brand-active,#991B1B)]",
            secondary: "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-primary,#F0F0F3)] border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
            outline: "border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] text-[var(--mk-palette-text-primary,#F0F0F3)] bg-transparent hover:bg-[var(--mk-palette-bg-surface,#1E2130)]",
            ghost: "text-[var(--mk-palette-text-secondary,#B0B3C1)] bg-transparent hover:text-[var(--mk-palette-text-primary,#F0F0F3)] hover:bg-[var(--mk-palette-bg-surface,#1E2130)]",
            destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        },
        size: {
            sm: "h-8 rounded-md px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 rounded-xl px-6 text-base",
            default: "h-10 px-4 text-sm",
            icon: "h-10 w-10",
            "icon-sm": "h-8 w-8",
            "icon-xs": "h-6 w-6",
            xs: "h-6 rounded-md px-2 text-xs",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
/**
 * Musakonttori Button - primary action button.
 *
 * Variants: primary (brand red), secondary, outline, ghost, destructive.
 * Sizes: sm, md, lg.
 * Supports `loading` state and `asChild` pattern (Radix Slot).
 *
 * @example
 * <Button variant="primary" size="lg">Tallenna</Button>
 * <Button loading>Ladataan...</Button>
 */
export const Button = forwardRef(({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    return (_jsxs(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, disabled: isDisabled, "aria-disabled": isDisabled, "aria-busy": loading, ...props, children: [loading && (_jsxs("svg", { className: "animate-spin h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] })), children] }));
});
Button.displayName = "Button";
export { buttonVariants };
