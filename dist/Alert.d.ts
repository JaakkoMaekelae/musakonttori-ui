type AlertVariant = "info" | "success" | "warning" | "error";
export interface AlertProps {
    /** Notification type */
    variant?: AlertVariant;
    /** Title (optional) */
    title?: string;
    /** Content text */
    children: React.ReactNode;
    /** Dismiss handler - if provided, shows X button */
    onDismiss?: () => void;
    /** Accessible label for the dismiss button. Override for the app's own locale. */
    dismissLabel?: string;
    className?: string;
}
/**
 * Musakonttori Alert - notification/notice component.
 *
 * Variants: info, success, warning, error.
 * Contains icon, title, text and optional dismiss button.
 * Uses `role="alert"` for accessibility.
 *
 * @example
 * <Alert variant="success" title="Tallennettu!">Tapahtuma on luotu onnistuneesti.</Alert>
 * <Alert variant="error" onDismiss={() => setError(null)}>Jotain meni pieleen.</Alert>
 */
export declare function Alert({ variant, title, children, onDismiss, dismissLabel, className, }: AlertProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Alert.d.ts.map