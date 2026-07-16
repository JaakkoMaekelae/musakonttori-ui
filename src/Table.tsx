import type { ReactNode } from "react";
import { cn } from "./utils";

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]">
        {children}
      </tr>
    </thead>
  );
}

export function TableHeaderCell({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-[var(--mk-palette-text-tertiary,#7E8292)] font-medium",
        align === "left" && "text-left",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] last:border-b-0 hover:bg-[var(--mk-palette-bg-muted,#2A2E3D)] transition-colors",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  align = "left",
  className,
  colSpan,
}: {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  colSpan?: number;
}) {
  return (
    <td
      colSpan={colSpan}
      className={cn(
        "px-6 py-3",
        align === "left" &&
          "text-left text-[var(--mk-palette-text-secondary,#B0B3C1)]",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
    >
      {children}
    </td>
  );
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] overflow-hidden">
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
}

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

const SKELETON_WIDTHS = ["75%", "60%", "80%", "50%", "70%"];

function DataTableSkeletonCell({ width }: { width: string }) {
  return (
    <td className="px-4 py-3">
      <div
        className="animate-pulse h-4 rounded bg-[var(--mk-palette-bg-surface,#1E2130)]"
        style={{ width }}
      />
    </td>
  );
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
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  loadingRowCount = 5,
  emptyMessage = "Ei tuloksia.",
  emptyDescription,
  striped = false,
  onRowClick,
  className,
}: DataTableProps<T>) {
  if (loading) {
    const rows = Array.from({ length: loadingRowCount }, (_, i) => i);

    return (
      <div className={cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className)}>
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]",
                    col.headerClassName,
                  )}
                  {...col.thProps}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <DataTableSkeletonCell
                    key={col.key}
                    width={SKELETON_WIDTHS[colIndex % SKELETON_WIDTHS.length] ?? "60%"}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className)}>
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]",
                    col.headerClassName,
                  )}
                  {...col.thProps}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#1E2130)]">
            <svg
              className="h-8 w-8 text-[var(--mk-palette-text-tertiary,#6B7280)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">{emptyMessage}</p>
          {emptyDescription && (
            <p className="mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]">{emptyDescription}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "h-10 px-4 text-left align-middle text-xs font-medium text-[var(--mk-palette-text-secondary,#B0B3C1)]",
                  col.headerClassName,
                )}
                {...col.thProps}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={(row.id as string | undefined) ?? rowIndex}
              className={cn(
                "border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] transition-colors",
                striped && rowIndex % 2 === 1 && "bg-[var(--mk-palette-bg,#0D0F17)]/40",
                onRowClick && "cursor-pointer hover:bg-[var(--mk-palette-bg-surface,#1E2130)]",
              )}
              onClick={() => onRowClick?.(row)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onRowClick?.(row);
                }
              }}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? "button" : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn("px-4 py-3 align-middle text-[var(--mk-palette-text-primary,#F0F0F3)]", col.cellClassName)}
                  {...col.tdProps}
                >
                  {col.render ? col.render(row) : (row[col.key] as ReactNode) ?? "\u2014"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
