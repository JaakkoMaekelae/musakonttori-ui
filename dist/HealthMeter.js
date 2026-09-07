"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
import { Badge } from "./Badge";
import { Progress } from "./Progress";
/**
 * A single health/status cell with a labelled progress meter.
 *
 * Used for seller health, DSP health, discovery intelligence and live event
 * command — anywhere a name needs a score and a status at a glance.
 */
export function HealthMeter({ title, value, caption, progress, badge, className, }) {
    return (_jsxs("div", { className: cn("rounded-lg border border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface-secondary,#1A1D27)] p-3", className), children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("span", { className: "text-[0.75rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), badge && _jsx(Badge, { tone: badge.tone ?? "neutral", children: badge.label })] }), _jsx("span", { className: "mt-2 block text-lg font-semibold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]", children: value }), caption && (_jsx("span", { className: "mt-0.5 block text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: caption })), _jsx(Progress, { value: progress, className: "mt-2.5" })] }));
}
