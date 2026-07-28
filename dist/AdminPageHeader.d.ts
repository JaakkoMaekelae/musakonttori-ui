import type { ReactNode } from "react";
export interface AdminPageHeaderProps {
    title: ReactNode;
    /** One line of context. Counts, freshness, scope — not marketing copy. */
    description?: ReactNode;
    /** Breadcrumb or back link, rendered above the title. */
    eyebrow?: ReactNode;
    /**
     * Actions, right-aligned. Exactly one should be primary — the spec's "one
     * view, one primary action" rule is enforced by review, not by types.
     */
    actions?: ReactNode;
    /** Tabs or a filter bar, rendered below and flush with the bottom border. */
    toolbar?: ReactNode;
    className?: string;
}
/**
 * The header every non-workspace archetype starts with.
 *
 * Deliberately does not own the page's scroll container: dashboards scroll as
 * one block, reports keep their parameter bar fixed while results scroll, and
 * settings pin their section nav. Owning scroll here would force all three
 * into the same behaviour.
 */
export declare function AdminPageHeader({ title, description, eyebrow, actions, toolbar, className, }: AdminPageHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=AdminPageHeader.d.ts.map