"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  /** Render as link. If provided, onClick is ignored. */
  href?: string;
}

export interface EmptyStateProps {
  /** Custom icon (lucide-react component) */
  icon?: ReactNode;
  /** Title */
  title: string;
  /** Description text */
  description?: string;
  /** Action button (either label+onClick/href object or direct ReactNode) */
  action?: EmptyStateAction | ReactNode;
  className?: string;
}

function DefaultIcon() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]">
      <svg
        className="h-8 w-8 text-[var(--mk-palette-text-tertiary,#6B7280)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    </div>
  );
}

/**
 * Musakonttori EmptyState - empty state display.
 *
 * Used when list/table is empty, no search results found, etc.
 * Contains icon, title, description and optional action button.
 *
 * @example
 * <EmptyState
 *   title="Ei tapahtumia"
 *   description="Et ole vielä luonut yhtään tapahtumaa."
 *   action={{ label: "Luo tapahtuma", onClick: () => {} }}
 * />
 * <EmptyState
 *   title="Ei tuotteita"
 *   action={{ label: "Selaa tuotteita", href: "/products" }}
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`mx-auto flex max-w-md flex-col items-center justify-center py-12 text-center ${className}`}
    >
      {icon ? (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]">
          {icon}
        </div>
      ) : (
        <div className="mb-4">
          <DefaultIcon />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-[var(--mk-palette-text-secondary,#B0B3C1)]">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-6">
          {typeof action === "object" && action !== null && "label" in action ? (
            (action as EmptyStateAction).href ? (
              <a
                href={(action as EmptyStateAction).href}
                className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition-colors bg-[var(--mk-palette-bg-brand,#DC2626)] text-white hover:bg-[var(--mk-palette-bg-brand-hover,#B91C1C)]"
              >
                {(action as EmptyStateAction).label}
              </a>
            ) : (
              <Button variant="primary" onClick={(action as EmptyStateAction).onClick}>
                {(action as EmptyStateAction).label}
              </Button>
            )
          ) : (
            action as ReactNode
          )}
        </div>
      )}
    </div>
  );
}
