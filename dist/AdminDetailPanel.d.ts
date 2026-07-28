import type { ReactNode } from "react";
import type { DetailState } from "./AdminShell";
export interface AdminDetailTab {
    id: string;
    label: string;
    href?: string;
    onSelect?: () => void;
}
export interface AdminDetailPanelProps {
    title: ReactNode;
    /** Secondary line: owner, artist, reference number. */
    subtitle?: ReactNode;
    /** Status chip or similar. Kept separate so it sits beside the title. */
    status?: ReactNode;
    /** Primary and secondary actions, right-aligned in the header. */
    actions?: ReactNode;
    /** Only rendered when expanded — a 320px panel has no room for tabs. */
    tabs?: AdminDetailTab[];
    activeTabId?: string;
    state?: DetailState;
    onToggleExpand?: () => void;
    onClose?: () => void;
    /** Position in the queue, e.g. "3 / 142". Shown only when expanded. */
    cursorLabel?: string;
    expandLabel?: string;
    collapseLabel?: string;
    closeLabel?: string;
    children?: ReactNode;
    className?: string;
}
/**
 * The record view. One component, two widths.
 *
 * In `panel` it is a 320px summary: title, status, the fields worth seeing
 * before deciding, and the actions you would take without opening anything.
 * In `full` it gains tabs, the queue cursor, and room for real work.
 *
 * Tabs are hidden in `panel` rather than scrolled or truncated — a tab strip
 * that does not fit is worse than no tab strip, and the panel's job is to let
 * you decide whether to expand, not to be a cramped version of the full view.
 */
export declare function AdminDetailPanel({ title, subtitle, status, actions, tabs, activeTabId, state, onToggleExpand, onClose, cursorLabel, expandLabel, collapseLabel, closeLabel, children, className, }: AdminDetailPanelProps): import("react").JSX.Element;
export interface AdminFieldProps {
    label: ReactNode;
    children: ReactNode;
    /** Renders the value in tabular figures — money, counts, identifiers. */
    numeric?: boolean;
}
/** Label/value row. Numeric values get tabular figures so columns line up. */
export declare function AdminField({ label, children, numeric }: AdminFieldProps): import("react").JSX.Element;
//# sourceMappingURL=AdminDetailPanel.d.ts.map