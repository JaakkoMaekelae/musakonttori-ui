export interface SkipLinkProps {
    /** Target element ID to focus. Default: "main-content" */
    targetId?: string;
    /** Link text. Default: "Siirry sisältöön" */
    label?: string;
    className?: string;
}
/**
 * Musakonttori SkipLink - WCAG 2.1 ohituslinkki.
 *
 * Siirtää fokuksen pääsisältöön. Piilotettu visuaalisesti,
 * näkyviin vain focus-tilassa (Tab-näppäin).
 *
 * @example
 * <SkipLink />
 * <SkipLink label="Skip to content" targetId="content" />
 */
export declare function SkipLink({ targetId, label, className, }: SkipLinkProps): import("react").JSX.Element;
//# sourceMappingURL=SkipLink.d.ts.map