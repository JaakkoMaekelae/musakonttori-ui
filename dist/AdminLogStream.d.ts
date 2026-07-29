import { type ReactNode } from "react";
export type LogLevel = "debug" | "info" | "warn" | "error";
export interface LogEntry {
    id: string;
    /** Pre-formatted and already in the viewer's timezone. */
    timestamp: string;
    level: LogLevel;
    message: string;
    /** Actor, request id, resource — rendered as dim trailing metadata. */
    meta?: string;
    /** Stack trace, payload, diff. Rendered inline when the row is expanded. */
    detail?: ReactNode;
}
export interface AdminLogStreamProps {
    entries: LogEntry[];
    label: string;
    /** Controlled expansion. Omit to let the component own it. */
    expandedIds?: readonly string[];
    onToggle?: (id: string) => void;
    /** Rendered under the last row — "Load more", or a live-tail indicator. */
    footer?: ReactNode;
    className?: string;
}
/**
 * Audit and error logs.
 *
 * Two things make this its own archetype rather than a workspace:
 *
 * 1. A log row expands **inline**. Opening a stack trace in a side panel
 *    loses the surrounding lines, which are usually the point — you read a
 *    log to see what happened *around* an event.
 *
 * 2. Lists are long. Rows use `content-visibility: auto` with an intrinsic
 *    size hint, so the browser skips layout and paint for offscreen rows.
 *    That is deliberately not JS windowing: rows here have variable height
 *    once expanded, and offset-based virtualisation either fights that or
 *    forces every detail into a fixed box. The CSS approach handles variable
 *    heights for free and keeps Ctrl+F working across the whole list.
 */
export declare function AdminLogStream({ entries, label, expandedIds, onToggle, footer, className, }: AdminLogStreamProps): import("react").JSX.Element;
//# sourceMappingURL=AdminLogStream.d.ts.map