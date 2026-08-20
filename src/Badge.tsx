import { memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

export type BadgeTone =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "red"
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "amber"
  | "pink"
  | "gray";

type BadgeVariant =
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand"
  | "red"
  | "purple"
  | "blue"
  | "green"
  | "orange"
  | "amber"
  | "pink"
  | "gray"
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        neutral:
          "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-secondary,#B0B3C1)] border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        error: "bg-red-500/10 text-red-400 border-red-500/20",
        info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        brand:
          "bg-[var(--mk-palette-bg-brand,#DC2626)]/10 text-[var(--mk-palette-bg-brand,#DC2626)] border-[var(--mk-palette-bg-brand,#DC2626)]/20",
        red: "bg-red-500/20 text-red-400 border-red-500/40",
        purple: "bg-purple-500/20 text-purple-400 border-purple-500/40",
        blue: "bg-blue-500/20 text-blue-400 border-blue-500/40",
        green: "bg-green-500/20 text-green-400 border-green-500/40",
        orange: "bg-orange-500/20 text-orange-400 border-orange-500/40",
        amber: "bg-amber-500/20 text-amber-400 border-amber-500/40",
        pink: "bg-pink-500/20 text-pink-400 border-pink-500/40",
        gray: "bg-gray-500/20 text-gray-400 border-gray-500/40",
        default:
          "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-secondary,#B0B3C1)] border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]",
        primary:
          "bg-[var(--mk-palette-bg-brand,#DC2626)]/10 text-[var(--mk-palette-bg-brand,#DC2626)] border-[var(--mk-palette-bg-brand,#DC2626)]/20",
        secondary: "bg-gray-500/20 text-gray-400 border-gray-500/40",
        destructive: "bg-red-500/10 text-red-400 border-red-500/20",
        outline:
          "border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-transparent text-[var(--mk-palette-text-secondary,#B0B3C1)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

/**
 * Light-surface overrides.
 *
 * The variants above are dark-first: translucent fills with 400-weight text,
 * which reads correctly on a dark canvas and washes out on a white one. That
 * is why light-themed admin sections ended up hand-rolling their own badge
 * instead of using this component.
 *
 * `surface="light"` swaps in solid tints with 700/800-weight ink. It is opt-in,
 * so every existing consumer keeps exactly the badge it has today.
 */
const LIGHT_SURFACE: Record<string, string> = {
  neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
  default: "bg-zinc-100 text-zinc-700 border-zinc-200",
  success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  error: "bg-red-100 text-red-800 border-red-200",
  destructive: "bg-red-100 text-red-800 border-red-200",
  red: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  brand:
    "bg-[var(--mk-palette-accent-primary,#DC2626)]/10 text-[var(--mk-palette-accent-primary,#DC2626)] border-[var(--mk-palette-accent-primary,#DC2626)]/25",
  primary:
    "bg-[var(--mk-palette-accent-primary,#DC2626)]/10 text-[var(--mk-palette-accent-primary,#DC2626)] border-[var(--mk-palette-accent-primary,#DC2626)]/25",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  green: "bg-green-100 text-green-700 border-green-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  secondary: "bg-gray-100 text-gray-700 border-gray-200",
  outline: "border-zinc-300 bg-transparent text-zinc-700",
};

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
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

function resolveVariant(
  variant?: string | null,
  tone?: BadgeTone
): BadgeVariant {
  if (tone) return tone;
  return (variant as BadgeVariant) ?? "neutral";
}

function getDotColor(variant: BadgeVariant): string {
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
export const Badge = memo(function Badge({
  variant = "neutral",
  tone,
  dot = false,
  pulse = false,
  surface = "dark",
  className,
  children,
  ...props
}: BadgeProps) {
  const resolved = resolveVariant(variant, tone);
  // On a light surface the variant's own colours are replaced outright rather
  // than layered, so the dark fill cannot bleed through.
  const surfaceClass = surface === "light" ? LIGHT_SURFACE[resolved] : undefined;

  return (
    <span
      className={
        surfaceClass
          ? cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
              surfaceClass,
              className
            )
          : cn(badgeVariants({ variant: resolved, className }))
      }
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full",
              getDotColor(resolved)
            )}
          />
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                getDotColor(resolved)
              )}
            />
          )}
        </span>
      )}
      {children}
    </span>
  );
});
