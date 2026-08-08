/** The eight states MUSAKONTTORI_WIZARD_STANDARD.md §6.2 requires. */
export type WizardStepState = "notStarted" | "current" | "complete" | "inProgress" | "hasErrors" | "optional" | "skipped" | "locked";
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
 * Progress through a wizard.
 *
 * Not a heading and not the page's navigation — the standard is firm on both
 * (§6.3, §6.4). The step below it still needs its own real heading, and the
 * product's normal navigation stays reachable.
 *
 * Locked and skipped steps render as plain text rather than links, because a
 * step you cannot enter should not look like something you can click.
 */
export declare function WizardStepper({ steps, label, className, stateLabels }: WizardStepperProps): import("react").JSX.Element;
//# sourceMappingURL=WizardStepper.d.ts.map