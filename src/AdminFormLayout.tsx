"use client";

import type { ReactNode } from "react";
import { cn } from "./utils";

export type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "failed";

export interface AdminSaveStateProps {
  status: SaveStatus;
  /** Formatted time for the "saved" state, e.g. "14.32". */
  savedAt?: string;
  labels?: Partial<Record<SaveStatus, string>> & { savedAt?: (t: string) => string };
  className?: string;
}

const DEFAULT_LABELS: Record<SaveStatus, string> = {
  idle: "",
  unsaved: "Unsaved changes",
  saving: "Saving…",
  saved: "Saved",
  failed: "Save failed",
};

/**
 * The four save states MUSAKONTTORI_WIZARD_STANDARD.md §4.5 requires.
 *
 * Autosave without a visible state is the worst of both worlds: the user
 * cannot tell whether leaving the page loses work. `failed` is assertive
 * because it is the one state where the user must act.
 */
export function AdminSaveState({
  status,
  savedAt,
  labels,
  className,
}: AdminSaveStateProps) {
  if (status === "idle") return null;

  const text =
    status === "saved" && savedAt
      ? (labels?.savedAt?.(savedAt) ?? `${labels?.saved ?? DEFAULT_LABELS.saved} ${savedAt}`)
      : (labels?.[status] ?? DEFAULT_LABELS[status]);

  const tone =
    status === "failed"
      ? "var(--mk-status-error, #EF4444)"
      : status === "unsaved"
        ? "var(--mk-status-warning, #F59E0B)"
        : "var(--mk-palette-text-tertiary, #7E8292)";

  return (
    <p
      role="status"
      aria-live={status === "failed" ? "assertive" : "polite"}
      className={cn("flex items-center gap-1.5 text-[0.6875rem]", className)}
      style={{ color: tone }}
    >
      {status !== "saving" && (
        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: tone }} />
      )}
      {text}
    </p>
  );
}

export interface AdminFormLayoutProps {
  /** Step heading. The stepper is not the heading — see the wizard standard §6.3. */
  title: ReactNode;
  /** Short explanation of what this step is for. */
  description?: ReactNode;
  /** WizardStepper, or nothing for a plain form. */
  stepper?: ReactNode;
  children: ReactNode;
  /**
   * Back / Save and continue later / Continue. The primary action's label
   * must name its consequence — the standard forbids a vague "Done".
   */
  actions?: ReactNode;
  /** Secondary actions pinned left in the action bar, e.g. "Cancel draft". */
  secondaryActions?: ReactNode;
  saveStatus?: SaveStatus;
  savedAt?: string;
  saveLabels?: AdminSaveStateProps["labels"];
  /** Step-level validation summary, rendered above the fields. */
  errorSummary?: ReactNode;
  className?: string;
}

/**
 * A form or one wizard step.
 *
 * The action bar is sticky at the bottom rather than trailing the fields.
 * A long step otherwise hides its own primary action below the fold, and
 * "where is the Continue button" is the most common wizard complaint.
 *
 * The measure is capped: long single-column forms are unreadable at full
 * shell width, and the fields do not benefit from the extra room.
 */
export function AdminFormLayout({
  title,
  description,
  stepper,
  children,
  actions,
  secondaryActions,
  saveStatus = "idle",
  savedAt,
  saveLabels,
  errorSummary,
  className,
}: AdminFormLayoutProps) {
  return (
    <div className={cn("flex h-full min-h-0", className)}>
      {stepper && (
        <div className="w-52 shrink-0 overflow-auto border-r border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-2 py-4">
          {stepper}
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-2xl px-5 py-5">
            <h1 className="text-lg font-bold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">
                {description}
              </p>
            )}

            {errorSummary && (
              <div
                role="alert"
                className="mt-4 rounded-lg border px-3.5 py-3 text-xs"
                style={{
                  borderColor: "var(--mk-status-error, #EF4444)",
                  background: "rgba(239, 68, 68, 0.08)",
                  color: "var(--mk-palette-text-primary, #F0F0F3)",
                }}
              >
                {errorSummary}
              </div>
            )}

            <div className="mt-5">{children}</div>
          </div>
        </div>

        {(actions || secondaryActions || saveStatus !== "idle") && (
          <div className="flex shrink-0 items-center gap-3 border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-5 py-3">
            {secondaryActions}
            <AdminSaveState
              status={saveStatus}
              savedAt={savedAt}
              labels={saveLabels}
            />
            {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
