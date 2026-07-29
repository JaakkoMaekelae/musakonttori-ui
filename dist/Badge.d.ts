import { type VariantProps } from "class-variance-authority";
export type BadgeTone = "success" | "warning" | "error" | "info" | "neutral" | "red" | "purple" | "blue" | "green" | "orange" | "amber" | "pink" | "gray";
declare const badgeVariants: (props?: ({
    variant?: "neutral" | "success" | "warning" | "error" | "info" | "brand" | "red" | "purple" | "blue" | "green" | "orange" | "amber" | "pink" | "gray" | "default" | "primary" | "secondary" | "destructive" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    /** Color tone — compatible with old local Badge */
    tone?: BadgeTone;
    /** Show colored dot before text */
    dot?: boolean;
    /** Show pulse animation on dot */
    pulse?: boolean;
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
export declare function Badge({ variant, tone, dot, pulse, className, children, ...props }: BadgeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Badge.d.ts.map