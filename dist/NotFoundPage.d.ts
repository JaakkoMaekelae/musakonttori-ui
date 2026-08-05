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
 *
 * The links are plain anchors rather than each app's router Link. An earlier
 * version took a renderLink function so apps could pass their locale-aware
 * Link; that cannot work. This module is re-exported through an index.ts
 * marked 'use client', so it is a client component, and not-found.tsx is a
 * server component — React refuses to serialize a function across that
 * boundary and the build fails on every prerendered page.
 *
 * A hard navigation is the right behaviour here anyway: the client router has
 * already failed to find this route, and unprefixed hrefs are redirected to
 * the right locale by each app's middleware.
 */
export declare function NotFoundPage({ product, initial, accent, title, description, links, footer, className, }: NotFoundPageProps): import("react").JSX.Element;
//# sourceMappingURL=NotFoundPage.d.ts.map