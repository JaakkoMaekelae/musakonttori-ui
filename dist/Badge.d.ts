import { type VariantProps } from "class-variance-authority";
export type BadgeTone = "success" | "warning" | "error" | "info" | "neutral" | "red" | "purple" | "blue" | "green" | "orange" | "amber" | "pink" | "gray";
declare const badgeVariants: (props?: ({
    variant?: "amber" | "blue" | "brand" | "default" | "destructive" | "error" | "gray" | "green" | "info" | "neutral" | "orange" | "outline" | "pink" | "primary" | "purple" | "red" | "secondary" | "success" | "warning" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    /** Color tone — compatible with old local Badge */
    tone?: BadgeTone;
    /** Show colored dot before text */
    dot?: boolean;
    /** Show pulse animation on dot */
    pulse?: boolean;
    /**
     * Which background the badge sits on. Defaults to "dark", which is what
     * every current consumer already renders — light-themed sections opt in.
     */
    surface?: "dark" | "light";
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
export declare const Badge: import("react").MemoExoticComponent<({ variant, tone, dot, pulse, surface, className, children, ...props }: BadgeProps) => import("react").JSX.Element>;
export {};
//# sourceMappingURL=Badge.d.ts.map