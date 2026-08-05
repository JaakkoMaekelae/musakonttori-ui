import type { ReactNode } from "react";
export interface NotFoundLink {
    label: string;
    href: string;
    /** Optional one-line hint under the label. */
    hint?: string;
}
export interface NotFoundPageProps {
    /** Product name, shown in the lockup. e.g. "Ticketing". */
    product: string;
    /** Lockup initial. Matches the product's tab icon. */
    initial: string;
    /**
     * The product's own gradient, as [from, to]. Matches app/icon.tsx, so a
     * visitor who lost their way still sees the product they came for.
     */
    accent: [string, string];
    title: string;
    description: string;
    /**
     * Where to go instead. This is the part that has to be the product's own —
     * a 404 that offers only "back to home" is the same page everywhere and
     * helps nobody. Two to four entries.
     */
    links: NotFoundLink[];
    /**
     * Renders one link. The app supplies this because locale prefixes and
     * localized slugs differ per product, and the library cannot build a correct
     * href on its own.
     */
    renderLink: (href: string, children: ReactNode) => ReactNode;
    /** Shown under the links, e.g. a support address. */
    footer?: ReactNode;
    className?: string;
}
/**
 * The shared 404 page.
 *
 * Three products shipped a byte-identical generic 404 — the same "Sivua ei
 * löytynyt / palaa etusivulle" with nothing to say which product had just
 * lost you, and one dead-end link back to the root. That is the same failure
 * as the create-next-app favicon: correct, and interchangeable.
 *
 * This component keeps the frame and the lockup consistent across the family
 * and makes the products supply what is genuinely theirs: their accent, their
 * initial, and above all the destinations worth offering.
 */
export declare function NotFoundPage({ product, initial, accent, title, description, links, renderLink, footer, className, }: NotFoundPageProps): import("react").JSX.Element;
//# sourceMappingURL=NotFoundPage.d.ts.map