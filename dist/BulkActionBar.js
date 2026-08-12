"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import { Button } from "./Button";
import { cn } from "./utils";
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
export function BulkActionBar({ selectedCount, countLabel, onClear, actions, className, }) {
    if (selectedCount === 0)
        return null;
    const label = countLabel ?? `${selectedCount} valittu`;
    return (_jsxs("div", { className: cn("fixed bottom-4 left-[50%] translate-x-[-50%] z-50 flex items-center gap-3 rounded-lg border border-[var(--mk-palette-border-brand,rgba(220,38,38,0.2))] bg-[var(--mk-palette-bg-surface-elevated,#FFFFFF)] px-4 py-3 shadow-lg animate-in slide-in-from-bottom-2", className), children: [_jsx("span", { className: "text-sm font-medium text-[var(--mk-palette-text-primary,#111113)]", children: label }), _jsx("div", { className: "flex gap-1", children: actions.map((a) => {
                    const Icon = a.icon;
                    return (_jsxs(Button, { size: "sm", variant: a.danger ? "destructive" : "ghost", onClick: a.onClick, children: [Icon && _jsx(Icon, { className: "h-3.5 w-3.5 mr-1" }), a.label] }, a.label));
                }) }), _jsx("button", { onClick: onClear, className: "p-1 rounded hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", "aria-label": "Sulje", children: _jsx(X, { className: "h-4 w-4" }) })] }));
}
