import type { ReactNode } from "react";
export interface ModalProps {
    /** Whether the modal is shown */
    isOpen: boolean;
    /** Close handler */
    onClose: () => void;
    /** Title (optional) */
    title?: string;
    /** Content */
    children: ReactNode;
    /** Footer (typically action buttons) */
    footer?: ReactNode;
    /** Accessible label for the close button. Override for the app's own locale. */
    closeLabel?: string;
    /** Accessible name for the dialog when no title is given. Override for the app's own locale. */
    dialogLabel?: string;
    className?: string;
}
/**
 * Musakonttori Modal - animated modal overlay.
 *
 * Features: backdrop blur, escape to close, focus trap,
 * smooth enter/exit animation, body-scroll lock.
 *
 * @example
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="Vahvista">
 *   <p>Oletko varma?</p>
 * </Modal>
 */
export declare function Modal({ isOpen, onClose, title, children, footer, closeLabel, dialogLabel, className, }: ModalProps): import("react").JSX.Element | null;
//# sourceMappingURL=Modal.d.ts.map