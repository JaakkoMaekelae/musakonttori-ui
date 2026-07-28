"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * The narrow always-dark column.
 *
 * Dark in both themes on purpose — it is the one element that carries the
 * brand at all times, and a light rail would make the product look like a
 * generic admin template in light mode. The only per-product variation
 * allowed here is the lockup gradient (BRAND.md: products with their own
 * consumer identity keep the lockup structure but use their own accent).
 */
export function AdminRail({ initial, productName, modules, activeModuleId, footer, gradient, className, }) {
    return (_jsxs("nav", { "aria-label": productName, className: cn("flex h-full flex-col items-center gap-2 py-2.5", className), children: [_jsx("span", { "aria-hidden": "true", title: productName, className: "flex size-7 shrink-0 items-center justify-center rounded-lg text-[0.8125rem] font-extrabold italic tracking-[-0.04em] text-white", style: {
                    background: gradient ?? "var(--mk-brand-gradient)",
                    boxShadow: "0 4px 12px rgba(191,34,39,0.32)",
                }, children: initial }), _jsx("span", { className: "sr-only", children: productName }), _jsx("ul", { className: "flex flex-col items-center gap-1.5 pt-1", children: modules.map((m) => {
                    const active = m.id === activeModuleId;
                    const Tag = m.href ? "a" : "button";
                    return (_jsxs("li", { className: "relative", children: [_jsx(Tag, { ...(m.href ? { href: m.href } : { type: "button" }), title: m.label, "aria-label": m.label, "aria-current": active ? "page" : undefined, onClick: m.onSelect, className: cn("flex size-7 items-center justify-center rounded-[7px] transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]", active
                                    ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] text-[var(--mk-palette-accent-primary,#F44242)] ring-1 ring-[var(--mk-palette-accent-primary,#F44242)]/45"
                                    : "text-white/55 hover:bg-white/10 hover:text-white", "[&_svg]:size-4"), children: m.icon }), m.badge != null && m.badge > 0 && (_jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[var(--mk-palette-accent-primary,#F44242)] ring-2 ring-[#0F1117]" }))] }, m.id));
                }) }), footer && _jsx("div", { className: "mt-auto pb-1", children: footer })] }));
}
