export interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "danger";
    onConfirm: () => void;
}
/**
 * Musakonttori ConfirmationDialog - varmistusdialogi.
 *
 * Tukee default ja danger -variantteja. Danger näyttää AlertTriangle-ikonin.
 *
 * @example
 * <ConfirmationDialog
 *   open={showConfirm}
 *   onOpenChange={setShowConfirm}
 *   title="Poista tapahtuma"
 *   description="Tätä toimintoa ei voi peruuttaa."
 *   variant="danger"
 *   confirmLabel="Poista"
 *   onConfirm={handleDelete}
 * />
 */
export declare function ConfirmationDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, variant, onConfirm, }: ConfirmationDialogProps): import("react").JSX.Element;
//# sourceMappingURL=ConfirmationDialog.d.ts.map