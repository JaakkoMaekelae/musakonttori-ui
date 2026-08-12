"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./Dialog";
import { Button } from "./Button";
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
export function ConfirmationDialog({ open, onOpenChange, title, description, confirmLabel = "Vahvista", cancelLabel = "Peruuta", variant = "default", onConfirm, }) {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [variant === "danger" && (_jsx(AlertTriangle, { className: "h-5 w-5 text-red-500" })), _jsx(DialogTitle, { children: title })] }), _jsx(DialogDescription, { children: description })] }), _jsxs("div", { className: "flex justify-end gap-2 pt-4", children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: cancelLabel }), _jsx(Button, { variant: variant === "danger" ? "destructive" : "primary", onClick: () => {
                                onConfirm();
                                onOpenChange(false);
                            }, children: confirmLabel })] })] }) }));
}
