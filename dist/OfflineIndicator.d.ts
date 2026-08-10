export interface OfflineIndicatorProps {
    /** Text shown when offline. Default: "Ei verkkoyhteyttä" */
    label?: string;
    className?: string;
}
/**
 * Musakonttori OfflineIndicator - offline-tilan ilmaisin.
 *
 * Näyttää bannerin kun verkkoyhteys katkeaa.
 * Piilossa kun yhteys on kunnossa.
 *
 * @example
 * <OfflineIndicator />
 * <OfflineIndicator label="No network connection" />
 */
export declare function OfflineIndicator({ label, className, }: OfflineIndicatorProps): import("react").JSX.Element | null;
//# sourceMappingURL=OfflineIndicator.d.ts.map