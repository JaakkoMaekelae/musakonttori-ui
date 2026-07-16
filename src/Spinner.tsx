import { cn } from "./utils";

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-[3px]",
} as const;

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
export function Spinner({
  size = "md",
  variant = "default",
  className,
  label = "Ladataan",
}: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full",
        variant === "default"
          ? "border-[var(--mk-palette-bg-surface,#1E2130)] border-t-[var(--mk-palette-bg-brand,#DC2626)]"
          : "border-white/20 border-t-white",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  );
}
