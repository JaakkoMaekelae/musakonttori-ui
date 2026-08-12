export interface BulkAction {
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    onClick: () => void;
    danger?: boolean;
}
export interface BulkActionBarProps {
    selectedCount: number;
    /** Label for "N selected". Default: "{count} valittu" */
    countLabel?: string;
    onClear: () => void;
    actions: BulkAction[];
    className?: string;
}
/**
 * Musakonttori BulkActionBar - massatoimintojen kelluva palkki.
 *
 * Näkyviin kun vähintään yksi rivi valittu. Näyttää valittujen määrän,
 * toimintonapit ja sulkemisnapin.
 *
 * @example
 * <BulkActionBar
 *   selectedCount={3}
 *   countLabel="3 selected"
 *   onClear={() => setSelected([])}
 *   actions={[{ label: "Poista", onClick: handleDelete, danger: true }]}
 * />
 */
export declare function BulkActionBar({ selectedCount, countLabel, onClear, actions, className, }: BulkActionBarProps): import("react").JSX.Element | null;
//# sourceMappingURL=BulkActionBar.d.ts.map