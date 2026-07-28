"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "./utils";
/**
 * Glyph and wording per state.
 *
 * The standard is explicit that state is never conveyed by colour alone, so
 * every state carries a glyph AND a word in its accessible name. The glyphs
 * are the ones the standard itself uses in its example (✓ ● ! ○), which keeps
 * the rendered stepper recognisable against the written spec.
 */
const STATE = {
    complete: { glyph: "✓", word: "valmis", tone: "var(--mk-status-success, #10B981)" },
    current: { glyph: "●", word: "nykyinen", tone: "var(--mk-palette-accent-primary, #F44242)" },
    hasErrors: { glyph: "!", word: "sisältää virheitä", tone: "var(--mk-status-error, #EF4444)" },
    inProgress: { glyph: "◐", word: "kesken", tone: "var(--mk-status-warning, #F59E0B)" },
    optional: { glyph: "○", word: "valinnainen", tone: "var(--mk-palette-text-tertiary, #7E8292)" },
    skipped: { glyph: "–", word: "ohitettu", tone: "var(--mk-palette-text-tertiary, #7E8292)", muted: true },
    locked: { glyph: "🔒", word: "lukittu", tone: "var(--mk-palette-text-tertiary, #7E8292)", muted: true },
    notStarted: { glyph: "○", word: "ei aloitettu", tone: "var(--mk-palette-text-tertiary, #7E8292)" },
};
/**
 * Progress through a wizard.
 *
 * Not a heading and not the page's navigation — the standard is firm on both
 * (§6.3, §6.4). The step below it still needs its own real heading, and the
 * product's normal navigation stays reachable.
 *
 * Locked and skipped steps render as plain text rather than links, because a
 * step you cannot enter should not look like something you can click.
 */
export function WizardStepper({ steps, label, className }) {
    return (_jsx("nav", { "aria-label": label, className: cn("px-1 py-2", className), children: _jsx("ol", { className: "flex flex-col gap-0.5", children: steps.map((step) => {
                const meta = STATE[step.state];
                const interactive = step.state !== "locked" && (step.href || step.onSelect);
                const accessibleName = `${step.label} — ${meta.word}${step.hint ? `, ${step.hint}` : ""}`;
                const inner = (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": "true", className: "w-4 shrink-0 text-center text-[0.75rem] leading-none", style: { color: meta.tone }, children: meta.glyph }), _jsx("span", { className: cn("truncate", step.state === "current" && "font-semibold", step.state === "skipped" && "line-through"), children: step.label }), step.hint && (_jsx("span", { className: "ml-auto shrink-0 truncate text-[0.625rem] text-[var(--mk-palette-text-tertiary,#7E8292)]", children: step.hint })), _jsxs("span", { className: "sr-only", children: ["\u2014 ", meta.word] })] }));
                const classes = cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-accent-primary,#F44242)]", step.state === "current"
                    ? "bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))] text-[var(--mk-palette-accent-primary,#F44242)]"
                    : meta.muted
                        ? "text-[var(--mk-palette-text-tertiary,#7E8292)]"
                        : "text-[var(--mk-palette-text-secondary,#B0B3C1)]", interactive &&
                    step.state !== "current" &&
                    "hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]");
                return (_jsx("li", { children: step.href && interactive ? (_jsx("a", { href: step.href, "aria-label": accessibleName, "aria-current": step.state === "current" ? "step" : undefined, className: classes, children: inner })) : interactive ? (_jsx("button", { type: "button", onClick: step.onSelect, "aria-label": accessibleName, "aria-current": step.state === "current" ? "step" : undefined, className: classes, children: inner })) : (_jsx("span", { "aria-label": accessibleName, "aria-disabled": step.state === "locked" || undefined, className: classes, children: inner })) }, step.id));
            }) }) }));
}
