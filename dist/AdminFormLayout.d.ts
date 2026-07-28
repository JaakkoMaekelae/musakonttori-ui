import type { ReactNode } from "react";
export type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "failed";
export interface AdminSaveStateProps {
    status: SaveStatus;
    /** Formatted time for the "saved" state, e.g. "14.32". */
    savedAt?: string;
    labels?: Partial<Record<SaveStatus, string>> & {
        savedAt?: (t: string) => string;
    };
    className?: string;
}
/**
 * The four save states MUSAKONTTORI_WIZARD_STANDARD.md §4.5 requires.
 *
 * Autosave without a visible state is the worst of both worlds: the user
 * cannot tell whether leaving the page loses work. `failed` is assertive
 * because it is the one state where the user must act.
 */
export declare function AdminSaveState({ status, savedAt, labels, className, }: AdminSaveStateProps): import("react").JSX.Element | null;
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
export declare function AdminFormLayout({ title, description, stepper, children, actions, secondaryActions, saveStatus, savedAt, saveLabels, errorSummary, className, }: AdminFormLayoutProps): import("react").JSX.Element;
//# sourceMappingURL=AdminFormLayout.d.ts.map