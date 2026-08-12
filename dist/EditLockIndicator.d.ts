export interface EditLockIndicatorProps {
    /** Name/email of the user who is currently editing */
    lockedBy: string;
    /** Message shown, e.g. "{user} is currently editing". Default: "{lockedBy} muokkaa parhaillaan" */
    message?: string;
    /** Label for read-only button. Default: "Vain luku" */
    readOnlyLabel?: string;
    /** Label for edit-anyway button. Default: "Muokkaa silti" */
    editAnywayLabel?: string;
    onReadOnly: () => void;
    onEditAnyway: () => void;
}
/**
 * Musakonttori EditLockIndicator - muokkauslukon ilmaisin.
 *
 * Näyttää varoituksen kun toinen käyttäjä muokkaa samaa tietuetta.
 *
 * @example
 * <EditLockIndicator
 *   lockedBy="Matti Meikäläinen"
 *   onReadOnly={() => setMode("read")}
 *   onEditAnyway={() => setMode("edit")}
 * />
 */
export declare function EditLockIndicator({ lockedBy, message, readOnlyLabel, editAnywayLabel, onReadOnly, onEditAnyway, }: EditLockIndicatorProps): import("react").JSX.Element;
//# sourceMappingURL=EditLockIndicator.d.ts.map