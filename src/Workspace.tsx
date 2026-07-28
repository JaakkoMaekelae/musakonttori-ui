"use client";

import type { ReactNode } from "react";
import { AdminShell, type DetailState } from "./AdminShell";
import { useViewCursor } from "./useViewCursor";

export interface WorkspaceProps {
  rail: ReactNode;
  nav: ReactNode;
  /** Receives the cursor so rows can reflect the keyboard selection. */
  list: ReactNode;
  /** Rendered only when something is selected. */
  detail?: (cursorLabel: string) => ReactNode;

  /** The view's ordered ids — the same order the list renders. */
  ids: readonly string[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onClear: () => void;

  expanded?: boolean;
  onNeedMore?: () => void;
  hasMore?: boolean;

  listLabel?: string;
  detailLabel?: string;
  navCollapsed?: boolean;
  className?: string;
}

/**
 * The default archetype: a view of records with one of them open.
 *
 * It owns exactly two things — the keyboard cursor over the view, and the
 * mapping from "is something selected / is it expanded" to the shell's detail
 * state. Everything else is passed in, because what a row looks like and what
 * a record contains are product decisions, not layout decisions.
 *
 * Selection lives in the URL in real usage (`/admin/contracts/c_4192?view=…`),
 * so `selectedId` and `expanded` are props rather than internal state: the
 * route is the source of truth, and the back button has to work.
 */
export function Workspace({
  rail,
  nav,
  list,
  detail,
  ids,
  selectedId,
  onSelect,
  onClear,
  expanded = false,
  onNeedMore,
  hasMore,
  listLabel,
  detailLabel,
  navCollapsed,
  className,
}: WorkspaceProps) {
  const cursor = useViewCursor({
    ids,
    selectedId,
    onSelect,
    onNeedMore,
    hasMore,
  });

  const detailState: DetailState = !selectedId
    ? "closed"
    : expanded
      ? "full"
      : "panel";

  return (
    <AdminShell
      className={className}
      rail={rail}
      nav={nav}
      list={list}
      detail={detail?.(cursor.label)}
      detailState={detailState}
      onCloseDetail={onClear}
      onSelectPrevious={cursor.selectPrevious}
      onSelectNext={cursor.selectNext}
      navCollapsed={navCollapsed}
      listLabel={listLabel}
      detailLabel={detailLabel}
    />
  );
}
