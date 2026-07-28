import { type ReactNode } from "react";
export type DetailState = "closed" | "panel" | "full";
export interface AdminShellProps {
    /** Narrow icon column: product lockup, modules, user. Always dark. */
    rail: ReactNode;
    /** Views and saved views for the active module. */
    nav: ReactNode;
    /** The rows. Stays mounted when `detailState` is "full". */
    list: ReactNode;
    /** The selected record. Not rendered when `detailState` is "closed". */
    detail?: ReactNode;
    detailState?: DetailState;
    /** Escape, or the panel's own close affordance. */
    onCloseDetail?: () => void;
    /** ArrowUp with focus inside the shell. */
    onSelectPrevious?: () => void;
    /** ArrowDown with focus inside the shell. */
    onSelectNext?: () => void;
    /** Collapses the nav column. The rail stays. */
    navCollapsed?: boolean;
    className?: string;
    /** Accessible name for the list region. Defaults to a generic label. */
    listLabel?: string;
    /** Accessible name for the detail region. */
    detailLabel?: string;
}
/**
 * The layout every admin surface sits in.
 *
 * Four zones on a CSS grid: rail | nav | list | detail.
 *
 * The important behaviour is what "full" does. It collapses the list column to
 * zero width with CSS — it does NOT unmount the list. That is what makes
 * ArrowUp/ArrowDown keep working while a record is expanded: the list's data,
 * scroll position and cursor survive, so moving through a queue never costs a
 * refetch and never loses ordering. Unmounting it would be simpler and would
 * break exactly that.
 *
 * Below 1024px the grid stacks: the rail becomes a bottom bar, the nav becomes
 * a drawer (the consumer decides how to trigger it), and list and detail each
 * take the full width — only one is visible at a time, chosen by detailState.
 *
 * Styling is injected once as a plain stylesheet rather than expressed in
 * utility classes, because the grid templates depend on the detail state and
 * on CSS variables that consumers may override per product.
 */
export declare const AdminShell: import("react").ForwardRefExoticComponent<AdminShellProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AdminShell.d.ts.map