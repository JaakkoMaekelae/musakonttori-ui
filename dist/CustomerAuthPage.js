"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
import { useId } from "react";
import { CustomerAuthForm } from "./CustomerAuthForm";
import { cn } from "./utils";
export function CustomerAuthPage({ form, brand, navigation, controls, className, }) {
    const titleId = useId();
    return (_jsxs("div", { className: cn("mk-auth mk-auth-page", className), children: [_jsxs("aside", { className: "mk-auth-brand", "aria-labelledby": titleId, children: [_jsxs("div", { className: "mk-auth-brand-name", children: [brand.logo ?? (_jsxs("span", { className: "mk-auth-equalizer", "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {})] })), _jsx("span", { children: brand.name })] }), _jsxs("div", { className: "mk-auth-orbit", "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {})] }), _jsxs("div", { className: "mk-auth-brand-copy", children: [_jsx("p", { className: "mk-auth-kicker", children: brand.eyebrow }), _jsxs("h1", { id: titleId, children: [brand.title, _jsx("span", { children: brand.accent })] }), _jsx("p", { children: brand.description })] }), _jsx("ul", { className: "mk-auth-benefits", children: brand.benefits.map((benefit) => (_jsxs("li", { children: [_jsx("strong", { children: benefit.title }), _jsx("span", { children: benefit.description })] }, benefit.title))) })] }), _jsxs("div", { className: "mk-auth-panel", children: [_jsxs("header", { className: "mk-auth-top", children: [_jsxs("a", { href: navigation.href, children: [_jsx(ArrowLeft, { size: 16, "aria-hidden": "true" }), navigation.label] }), _jsx("div", { className: "mk-auth-controls", children: controls })] }), _jsx(CustomerAuthForm, { ...form })] })] }));
}
