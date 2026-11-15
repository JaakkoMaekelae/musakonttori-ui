"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "./Dialog";
import { CustomerAuthForm } from "./CustomerAuthForm";
export function CustomerAuthDialog({ form, productName, open, onOpenChange, closeLabel, trigger, controls, }) {
    return (_jsxs(Dialog, { open: open, onOpenChange: onOpenChange, children: [trigger ? _jsx(DialogTrigger, { asChild: true, children: trigger }) : null, _jsxs(DialogContent, { className: "mk-auth mk-auth-dialog", closeLabel: closeLabel, children: [_jsx(DialogTitle, { className: "sr-only", children: form.labels.title }), _jsx(DialogDescription, { className: "sr-only", children: form.labels.description }), _jsxs("header", { className: "mk-auth-dialog-top", children: [_jsx("strong", { children: productName }), _jsx("div", { className: "mk-auth-controls", children: controls })] }), _jsx(CustomerAuthForm, { ...form })] })] }));
}
