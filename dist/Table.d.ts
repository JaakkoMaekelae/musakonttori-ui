import type { ReactNode } from "react";
export declare function TableHead({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function TableHeaderCell({ children, align, className, }: {
    children: React.ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
}): import("react").JSX.Element;
export declare function TableBody({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function TableRow({ children, className, onClick, }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}): import("react").JSX.Element;
export declare function TableCell({ children, align, className, colSpan, }: {
    children: React.ReactNode;
    align?: "left" | "right" | "center";
    className?: string;
    colSpan?: number;
}): import("react").JSX.Element;
export declare function Table({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export interface DataTableColumn<T = Record<string, unknown>> {
    key: string;
    header: string;
    render?: (row: T) => ReactNode;
    headerClassName?: string;
    cellClassName?: string;
    thProps?: React.ThHTMLAttributes<HTMLTableCellElement>;
    tdProps?: React.TdHTMLAttributes<HTMLTableCellElement>;
}
export interface DataTableProps<T extends Record<string, unknown>> {
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;
    loadingRowCount?: number;
    emptyMessage?: string;
    emptyDescription?: string;
    striped?: boolean;
    onRowClick?: (row: T) => void;
    className?: string;
}
/**
 * Musakonttori DataTable - data-driven table component.
 *
 * Features: column configuration, loading state (skeleton), empty state message,
 * striped rows, row click.
 *
 * @example
 * <DataTable
 *   columns={[{ key: "name", header: "Nimi" }, { key: "email", header: "Sähköposti" }]}
 *   data={[{ name: "Matti", email: "m@example.com" }]}
 *   striped
 * />
 */
export declare function DataTable<T extends Record<string, unknown>>({ columns, data, loading, loadingRowCount, emptyMessage, emptyDescription, striped, onRowClick, className, }: DataTableProps<T>): import("react").JSX.Element;
//# sourceMappingURL=Table.d.ts.map