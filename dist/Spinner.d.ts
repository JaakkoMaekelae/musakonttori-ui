declare const sizeClasses: {
    readonly sm: "h-4 w-4 border-2";
    readonly md: "h-6 w-6 border-2";
    readonly lg: "h-10 w-10 border-[3px]";
};
export interface SpinnerProps {
    /** Size: sm, md, lg */
    size?: keyof typeof sizeClasses;
    /** Variant: default (brand red), white */
    variant?: "default" | "white";
    /** Extra classes */
    className?: string;
    /** Accessibility label (screen reader only) */
    label?: string;
}
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
export declare function Spinner({ size, variant, className, label, }: SpinnerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Spinner.d.ts.map