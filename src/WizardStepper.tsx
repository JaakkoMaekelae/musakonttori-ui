"use client";

import { cn } from "./utils";

/** The eight states MUSAKONTTORI_WIZARD_STANDARD.md §6.2 requires. */
export type WizardStepState =
  | "notStarted"
  | "current"
  | "complete"
  | "inProgress"
  | "hasErrors"
  | "optional"
  | "skipped"
  | "locked";

export interface WizardStep {
  id: string;
  label: string;
  state: WizardStepState;
  /** Every step needs a stable URL — the standard forbids client-only steps. */
  href?: string;
  onSelect?: () => void;
  /** Short qualifier: "tietoja puuttuu", "ohitettu". */
  hint?: string;
}

export interface WizardStepperProps {
  steps: WizardStep[];
  /** Names the wizard for screen readers. */
  label: string;
  className?: string;
  /** Override the per-state word announced to screen readers. Finnish by default. */
  stateLabels?: Partial<Record<WizardStepState, string>>;
}

/**
 * Glyph and wording per state.
 *
 * The standard is explicit that state is never conveyed by colour alone, so
 * every state carries a glyph AND a word in its accessible name. The glyphs
 * are the ones the standard itself uses in its example (✓ ● ! ○), which keeps
 * the rendered stepper recognisable against the written spec.
 */
const STATE: Record<
  WizardStepState,
  { glyph: string; word: string; tone: string; muted?: boolean }
> = {
  complete: { glyph: "✓", word: "valmis", tone: "var(--mk-status-success, #10B981)" },
  current: { glyph: "●", word: "nykyinen", tone: "var(--mk-palette-accent-primary, #F44242)" },
  hasErrors: { glyph: "!", word: "sisältää virheitä", tone: "var(--mk-status-error, #EF4444)" },
  inProgress: { glyph: "◐", word: "kesken", tone: "var(--mk-status-warning, #F59E0B)" },
  optional: { glyph: "○", word: "valinnainen", tone: "var(--mk-palette-text-tertiary, #7E8292)" },
  skipped: { glyph: "–", word: "ohitettu", tone: "var(--mk-palette-text-tertiary, #7E8292)", muted: true },
  locked: { glyph: "🔒", word: "lukittu", tone: "var(--mk-palette-text-tertiary, #7E8292)", muted: true },
  notStarted: { glyph: "○", word: "ei aloitettu", tone: "var(--mk-palette-text-tertiary, #7E8292)" },
};

/**
 * Progress through a wizard.
 *
 * Not a heading and not the page's navigation — the standard is firm on both
 * (§6.3, §6.4). The step below it still needs its own real heading, and the
 * product's normal navigation stays reachable.
 *
 * Locked and skipped steps render as plain text rather than links, because a
 * step you cannot enter should not look like something you can click.
 */
export function WizardStepper({ steps, label, className, stateLabels }: WizardStepperProps) {
  return (
    <nav aria-label={label} className={cn("px-1 py-2", className)}>
      <ol className="flex flex-col gap-0.5">
        {steps.map((step) => {
          const meta = STATE[step.state];
          const word = stateLabels?.[step.state] ?? meta.word;
          const interactive =
            step.state !== "locked" && (step.href || step.onSelect);
          const accessibleName = `${step.label} — ${word}${step.hint ? `, ${step.hint}` : ""}`;

          const inner = (
            <>
              <span
                aria-hidden="true"
                className="w-4 shrink-0 text-center text-[0.75rem] leading-none"
                style={{ color: meta.tone }}
              >
                {meta.glyph}
              </span>
              <span
                className={cn(
                  "truncate",
                  step.state === "current" && "font-semibold",
                  step.state === "skipped" && "line-through",
                )}
              >
                {step.label}
              </span>
              {step.hint && (
                <span className="ml-auto shrink-0 truncate text-[0.625rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
                  {step.hint}
                </span>
              )}
              <span className="sr-only">— {word}</span>
            </>
          );

          const classes = cn(
            "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]",
            step.state === "current"
              ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] text-[var(--mk-palette-accent-primary,#F44242)]"
              : meta.muted
                ? "text-[var(--mk-palette-text-tertiary,#7E8292)]"
                : "text-[var(--mk-palette-text-secondary,#B0B3C1)]",
            interactive &&
              step.state !== "current" &&
              "hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]",
          );

          return (
            <li key={step.id}>
              {step.href && interactive ? (
                <a
                  href={step.href}
                  aria-label={accessibleName}
                  aria-current={step.state === "current" ? "step" : undefined}
                  className={classes}
                >
                  {inner}
                </a>
              ) : interactive ? (
                <button
                  type="button"
                  onClick={step.onSelect}
                  aria-label={accessibleName}
                  aria-current={step.state === "current" ? "step" : undefined}
                  className={classes}
                >
                  {inner}
                </button>
              ) : (
                <span
                  aria-label={accessibleName}
                  aria-disabled={step.state === "locked" || undefined}
                  className={classes}
                >
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
