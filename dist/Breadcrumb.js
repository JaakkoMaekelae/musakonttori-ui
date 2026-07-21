"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "./utils";
export function Breadcrumb({ items, className, homeHref, homeLabel = "Etusivu", linkComponent: LinkComponent, }) {
    const Link = LinkComponent ?? "a";
    return (_jsxs("nav", { "aria-label": "Murupolku", className: cn("flex items-center gap-1 text-sm text-text-muted", className), children: [homeHref ? (_jsx(Link, { href: homeHref, className: "hover:text-text-primary transition-colors", "aria-label": homeLabel, children: _jsx(Home, { className: "h-4 w-4" }) })) : (_jsx("span", { "aria-label": homeLabel, children: _jsx(Home, { className: "h-4 w-4" }) })), items.map((item, i) => (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(ChevronRight, { className: "h-3 w-3" }), item.href ? (_jsx(Link, { href: item.href, className: "hover:text-text-primary transition-colors", children: item.label })) : (_jsx("span", { className: "text-text-primary font-medium", children: item.label }))] }, i)))] }));
}
