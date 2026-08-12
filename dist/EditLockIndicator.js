"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle, Eye, Edit3 } from "lucide-react";
import { Button } from "./Button";
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
export function EditLockIndicator({ lockedBy, message, readOnlyLabel = "Vain luku", editAnywayLabel = "Muokkaa silti", onReadOnly, onEditAnyway, }) {
    const msg = message ?? `${lockedBy} muokkaa parhaillaan`;
    return (_jsxs("div", { className: "rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 p-3 flex items-center gap-3", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-600 shrink-0" }), _jsx("div", { className: "flex-1", children: _jsx("p", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-300", children: msg }) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", variant: "outline", onClick: onReadOnly, children: [_jsx(Eye, { className: "h-3.5 w-3.5 mr-1" }), readOnlyLabel] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: onEditAnyway, children: [_jsx(Edit3, { className: "h-3.5 w-3.5 mr-1" }), editAnywayLabel] })] })] }));
}
