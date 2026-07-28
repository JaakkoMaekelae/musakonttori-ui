"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
const DEFAULT_LABELS = {
    idle: "",
    unsaved: "Unsaved changes",
    saving: "Saving…",
    saved: "Saved",
    failed: "Save failed",
};
/**
 * The four save states MUSAKONTTORI_WIZARD_STANDARD.md §4.5 requires.
 *
 * Autosave without a visible state is the worst of both worlds: the user
 * cannot tell whether leaving the page loses work. `failed` is assertive
 * because it is the one state where the user must act.
 */
export function AdminSaveState({ status, savedAt, labels, className, }) {
    if (status === "idle")
        return null;
    const text = status === "saved" && savedAt
        ? (labels?.savedAt?.(savedAt) ?? `${labels?.saved ?? DEFAULT_LABELS.saved} ${savedAt}`)
        : (labels?.[status] ?? DEFAULT_LABELS[status]);
    const tone = status === "failed"
        ? "var(--mk-status-error, #EF4444)"
        : status === "unsaved"
            ? "var(--mk-status-warning, #F59E0B)"
            : "var(--mk-palette-text-tertiary, #7E8292)";
    return (_jsxs("p", { role: "status", "aria-live": status === "failed" ? "assertive" : "polite", className: cn("flex items-center gap-1.5 text-[0.6875rem]", className), style: { color: tone }, children: [status !== "saving" && (_jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full", style: { background: tone } })), text] }));
}
/**
 * A form or one wizard step.
 *
 * The action bar is sticky at the bottom rather than trailing the fields.
 * A long step otherwise hides its own primary action below the fold, and
 * "where is the Continue button" is the most common wizard complaint.
 *
 * The measure is capped: long single-column forms are unreadable at full
 * shell width, and the fields do not benefit from the extra room.
 */
export function AdminFormLayout({ title, description, stepper, children, actions, secondaryActions, saveStatus = "idle", savedAt, saveLabels, errorSummary, className, }) {
    return (_jsxs("div", { className: cn("flex h-full min-h-0", className), children: [stepper && (_jsx("div", { className: "w-52 shrink-0 overflow-auto border-r border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] px-2 py-4", children: stepper })), _jsxs("div", { className: "flex min-h-0 min-w-0 flex-1 flex-col", children: [_jsx("div", { className: "min-h-0 flex-1 overflow-auto", children: _jsxs("div", { className: "mx-auto w-full max-w-2xl px-5 py-5", children: [_jsx("h1", { className: "text-lg font-bold tracking-[-0.02em] text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), description && (_jsx("p", { className: "mt-1 text-xs text-[var(--mk-palette-text-secondary,#B0B3C1)]", children: description })), errorSummary && (_jsx("div", { role: "alert", className: "mt-4 rounded-lg border px-3.5 py-3 text-xs", style: {
                                        borderColor: "var(--mk-status-error, #EF4444)",
                                        background: "rgba(239, 68, 68, 0.08)",
                                        color: "var(--mk-palette-text-primary, #F0F0F3)",
                                    }, children: errorSummary })), _jsx("div", { className: "mt-5", children: children })] }) }), (actions || secondaryActions || saveStatus !== "idle") && (_jsxs("div", { className: "flex shrink-0 items-center gap-3 border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] bg-[var(--mk-palette-bg-surface,#1A1D27)] px-5 py-3", children: [secondaryActions, _jsx(AdminSaveState, { status: saveStatus, savedAt: savedAt, labels: saveLabels }), actions && _jsx("div", { className: "ml-auto flex items-center gap-2", children: actions })] }))] })] }));
}
