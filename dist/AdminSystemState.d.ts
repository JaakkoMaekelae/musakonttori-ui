import type { ReactNode } from "react";
export type SystemStateKind = "loading" | "empty" | "error" | "forbidden";
export interface AdminSystemStateProps {
    kind: SystemStateKind;
    title: ReactNode;
    description?: ReactNode;
    /** Retry, clear filters, request access — whatever unblocks the user. */
    action?: ReactNode;
    /**
     * "zone" fills the column it sits in (list, detail, nav). "inline" is for a
     * card or a section inside an otherwise healthy page.
     */
    size?: "zone" | "inline";
    className?: string;
}
/**
 * Empty, loading, error and no-permission — as one component.
 *
 * The spec asks for these per zone rather than per page, because in a
 * four-column shell they rarely apply to the whole screen: the list can be
 * empty while the nav is fine, the detail can 403 while the list is fine.
 * A page-level state would blank out working UI.
 *
 * `loading` renders an indeterminate bar rather than a spinner, and announces
 * politely — a spinner in a zone that also owns a keyboard cursor tends to
 * read as "frozen" rather than "working".
 */
export declare function AdminSystemState({ kind, title, description, action, size, className, }: AdminSystemStateProps): import("react").JSX.Element;
//# sourceMappingURL=AdminSystemState.d.ts.map