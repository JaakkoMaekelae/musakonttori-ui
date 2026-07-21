import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
const cardVariants = cva("rounded-2xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] transition-shadow", {
    variants: {
        variant: {
            default: "bg-[var(--mk-palette-bg-surface,#1E2130)] shadow-sm",
            elevated: "bg-[var(--mk-palette-bg-surface,#1E2130)] shadow-lg hover:shadow-xl",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
/**
 * Musakonttori Card - card component for grouping content.
 * Use with CardHeader, CardContent, CardFooter subcomponents.
 *
 * @example
 * <Card variant="elevated">
 *   <CardHeader>Otsikko</CardHeader>
 *   <CardContent>Sisältöä...</CardContent>
 *   <CardFooter>Toiminnot</CardFooter>
 * </Card>
 */
export const Card = forwardRef(({ className, variant, size, padding, style, ...props }, ref) => {
    const sizeClasses = {
        sm: "p-2",
        md: "",
        lg: "p-6",
    };
    return (_jsx("div", { ref: ref, className: cn(cardVariants({ variant, className }), size && sizeClasses[size]), style: padding ? { ...style, padding } : style, ...props }));
});
Card.displayName = "Card";
/**
 * Card header area. Typically contains a CardTitle element.
 */
export const CardHeader = forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5 px-6 py-4 border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]", className), ...props })));
CardHeader.displayName = "CardHeader";
/**
 * Card title. Renders as <h3> element.
 */
export const CardTitle = forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("text-lg font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", className), ...props })));
CardTitle.displayName = "CardTitle";
/**
 * Card description text below title.
 */
export const CardDescription = forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-[var(--mk-palette-text-secondary,#B0B3C1)]", className), ...props })));
CardDescription.displayName = "CardDescription";
/**
 * Card main content area.
 */
export const CardContent = forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("px-6 py-4", className), ...props })));
CardContent.displayName = "CardContent";
/**
 * Card footer, typically for action buttons.
 */
export const CardFooter = forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex items-center gap-2 rounded-b-2xl border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] bg-[var(--mk-palette-bg,#0D0F17)]/50 px-6 py-4", className), ...props })));
CardFooter.displayName = "CardFooter";
