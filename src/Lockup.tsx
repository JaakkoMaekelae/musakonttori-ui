import { cn } from "./utils";

/**
 * The family gradient, from musakonttori-hq/docs/BRAND.md.
 *
 * Products with their own consumer identity — Stageflow, Soundstage — keep the
 * lockup's structure and pass their own accent instead. Everyone else should
 * leave this alone; that is the point of a shared lockup.
 */
const BRAND_ACCENT: readonly [string, string] = ["#BF2227", "#E11D48"];

export interface LockupProps {
  /** Product name, e.g. "SoundLaunch". Shown beside the icon. */
  product: string;
  /**
   * The icon's letter. Defaults to the product's first character, which is
   * right for every product today.
   */
  initial?: string;
  /**
   * Icon gradient as [from, to]. Defaults to the brand red. Only products with
   * their own consumer identity should override it, and it should match that
   * product's app icon.
   */
  accent?: readonly [string, string];
  /**
   * "full" is the lockup as specified — icon, name, MUSAKONTTORI eyebrow.
   * "compact" drops the eyebrow for tight bars; "mark" is the icon alone.
   */
  variant?: "full" | "compact" | "mark";
  className?: string;
}

/**
 * The Musakonttori lockup: icon, product name, MUSAKONTTORI.
 *
 * Twenty-nine files across the family drew this by hand, so the one thing that
 * should be identical everywhere was the thing most likely to differ — the
 * eyebrow's letter-spacing, the icon's radius, whether the name sat at weight
 * 600 or 700. BRAND.md specified it exactly and there was nothing to enforce
 * the spec.
 *
 * Sizes are the spec's, in px rather than utility classes, because several
 * products wrap their shell in a scoped reset that overrides padding and
 * border on descendants — the same reason LocaleSwitcherTrigger ships its own
 * stylesheet.
 */
export function Lockup({
  product,
  initial,
  accent = BRAND_ACCENT,
  variant = "full",
  className,
}: LockupProps) {
  const letter = (initial ?? product.charAt(0)).toUpperCase();

  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: 10 }}>
      <span
        aria-hidden="true"
        style={{
          width: 36,
          height: 36,
          flex: "0 0 auto",
          borderRadius: 10,
          background: `linear-gradient(135deg, ${accent[0]}, ${accent[1]})`,
          boxShadow: "0 4px 12px rgba(191,34,39,0.32)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "1.25rem",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {letter}
      </span>

      {variant !== "mark" && (
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              color: "var(--mk-palette-text-primary, #111113)",
            }}
          >
            {product}
          </span>
          {variant === "full" && (
            <span
              style={{
                fontWeight: 600,
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--mk-palette-text-tertiary, #7E8292)",
              }}
            >
              Musakonttori
            </span>
          )}
        </span>
      )}
    </span>
  );
}
