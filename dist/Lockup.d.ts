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
export declare function Lockup({ product, initial, accent, variant, className, }: LockupProps): import("react").JSX.Element;
//# sourceMappingURL=Lockup.d.ts.map