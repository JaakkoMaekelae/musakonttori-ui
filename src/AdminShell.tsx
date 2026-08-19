"use client";

import { forwardRef, useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "./utils";

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

const STYLE_ID = "mk-admin-shell-styles";

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
export const AdminShell = forwardRef<HTMLDivElement, AdminShellProps>(
  function AdminShell(
    {
      rail,
      nav,
      list,
      detail,
      detailState = "closed",
      onCloseDetail,
      onSelectPrevious,
      onSelectNext,
      navCollapsed = false,
      className,
      listLabel = "List",
      detailLabel = "Details",
    },
    ref,
  ) {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (typeof document === "undefined") return;
      if (document.getElementById(STYLE_ID)) return;
      const el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = SHELL_CSS;
      document.head.appendChild(el);
    }, []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Never hijack keys while the user is typing or working a menu.
        const target = event.target as HTMLElement | null;
        if (target) {
          const tag = target.tagName;
          if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT" ||
            target.isContentEditable ||
            target.getAttribute("role") === "combobox"
          ) {
            return;
          }
        }

        if (event.key === "Escape" && detailState !== "closed" && onCloseDetail) {
          event.preventDefault();
          onCloseDetail();
          return;
        }
        if (event.key === "ArrowUp" && onSelectPrevious) {
          event.preventDefault();
          onSelectPrevious();
          return;
        }
        if (event.key === "ArrowDown" && onSelectNext) {
          event.preventDefault();
          onSelectNext();
        }
      },
      [detailState, onCloseDetail, onSelectPrevious, onSelectNext],
    );

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn("mk-shell", className)}
        data-mk-shell=""
        data-detail={detailState}
        data-nav-collapsed={navCollapsed ? "" : undefined}
        onKeyDown={handleKeyDown}
      >
        <div className="mk-shell-rail" data-mk-zone="rail">
          {rail}
        </div>

        <div className="mk-shell-nav" data-mk-zone="nav" hidden={navCollapsed}>
          {nav}
        </div>

        <main className="mk-shell-list" data-mk-zone="list" aria-label={listLabel}>
          {list}
        </main>

        {detailState !== "closed" && (
          <aside
            className="mk-shell-detail"
            data-mk-zone="detail"
            aria-label={detailLabel}
          >
            {detail}
          </aside>
        )}
      </div>
    );
  },
);

const SHELL_CSS = `
.mk-shell {
  display: grid;
  grid-template-columns:
    var(--mk-shell-rail-width, 44px)
    var(--mk-shell-nav-width, 200px)
    minmax(0, 1fr)
    0;
  grid-template-rows: minmax(0, 1fr);
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: var(--mk-palette-bg-canvas, #0F1117);
  color: var(--mk-palette-text-primary, #F0F0F3);
  font-family: var(--mk-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
}

.mk-shell[data-nav-collapsed] {
  grid-template-columns: var(--mk-shell-rail-width, 44px) 0 minmax(0, 1fr) 0;
}

.mk-shell[data-detail="panel"] {
  grid-template-columns:
    var(--mk-shell-rail-width, 44px)
    var(--mk-shell-nav-width, 200px)
    minmax(0, 1fr)
    var(--mk-shell-detail-width, 320px);
}

.mk-shell[data-detail="panel"][data-nav-collapsed] {
  grid-template-columns:
    var(--mk-shell-rail-width, 44px)
    0
    minmax(0, 1fr)
    var(--mk-shell-detail-width, 320px);
}

/* "full" keeps the list mounted at zero width — see the component doc. */
.mk-shell[data-detail="full"] {
  grid-template-columns: var(--mk-shell-rail-width, 44px) var(--mk-shell-nav-width, 200px) 0 minmax(0, 1fr);
}

.mk-shell[data-detail="full"][data-nav-collapsed] {
  grid-template-columns: var(--mk-shell-rail-width, 44px) 0 0 minmax(0, 1fr);
}

.mk-shell-rail,
.mk-shell-nav,
.mk-shell-list,
.mk-shell-detail {
  min-width: 0;
  min-height: 0;
  overflow: auto;
}

.mk-shell-rail {
  /* Dark in both themes: the brand anchor must not disappear in light mode. */
  background: #0F1117;
  color: #F0F0F3;
  border-right: 1px solid var(--mk-palette-border-subtle, rgba(255, 255, 255, 0.08));
  overflow: visible;
}

.mk-shell-nav {
  background: var(--mk-palette-bg-surface, #1A1D27);
  border-right: 1px solid var(--mk-palette-border-subtle, rgba(255, 255, 255, 0.08));
}

.mk-shell-list {
  background: var(--mk-palette-bg-canvas, #0F1117);
}

.mk-shell-detail {
  background: var(--mk-palette-bg-surface, #1A1D27);
  border-left: 1px solid var(--mk-palette-border-subtle, rgba(255, 255, 255, 0.08));
}

.mk-shell[data-detail="full"] .mk-shell-list {
  /* Zero-width but still in the tree, so its state survives. */
  visibility: hidden;
  pointer-events: none;
}

.mk-shell[data-detail="full"] .mk-shell-detail {
  border-left: 0;
  background: var(--mk-palette-bg-canvas, #0F1117);
}

@media (max-width: 1023px) {
  .mk-shell,
  .mk-shell[data-detail="panel"],
  .mk-shell[data-detail="full"],
  .mk-shell[data-nav-collapsed],
  .mk-shell[data-detail="panel"][data-nav-collapsed],
  .mk-shell[data-detail="full"][data-nav-collapsed] {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .mk-shell-nav {
    display: none;
  }

  .mk-shell-rail {
    grid-row: 2;
    border-right: 0;
    border-top: 1px solid var(--mk-palette-border-subtle, rgba(255, 255, 255, 0.08));
    overflow-x: auto;
  }

  .mk-shell-list,
  .mk-shell-detail {
    grid-row: 1;
    grid-column: 1;
    border-left: 0;
  }

  /* One at a time on a phone: the detail replaces the list. */
  .mk-shell[data-detail="panel"] .mk-shell-list,
  .mk-shell[data-detail="full"] .mk-shell-list {
    display: none;
  }
}
`;
