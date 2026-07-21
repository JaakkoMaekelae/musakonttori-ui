import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "primary" | "default" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-xs" | "xs" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    /** Render as a different element using the Slot component */
    asChild?: boolean;
    /** Show loading animation and prevent clicks */
    loading?: boolean;
}
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
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export { buttonVariants };
//# sourceMappingURL=Button.d.ts.map