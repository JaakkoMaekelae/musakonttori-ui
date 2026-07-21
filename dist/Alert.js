import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "./utils";
const variantClasses = {
    info: "border-l-blue-500 bg-blue-500/10 text-blue-400",
    success: "border-l-emerald-500 bg-emerald-500/10 text-emerald-400",
    warning: "border-l-amber-500 bg-amber-500/10 text-amber-400",
    error: "border-l-red-500 bg-red-500/10 text-red-400",
};
const iconPaths = {
    success: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};
/**
 * Musakonttori Alert - notification/notice component.
 *
 * Variants: info, success, warning, error.
 * Contains icon, title, text and optional dismiss button.
 * Uses `role="alert"` for accessibility.
 *
 * @example
 * <Alert variant="success" title="Tallennettu!">Tapahtuma on luotu onnistuneesti.</Alert>
 * <Alert variant="error" onDismiss={() => setError(null)}>Jotain meni pieleen.</Alert>
 */
export function Alert({ variant = "info", title, children, onDismiss, className, }) {
    return (_jsxs("div", { className: cn("flex rounded-lg border-l-4 p-4", variantClasses[variant], className), role: "alert", children: [_jsx("svg", { className: "mr-3 mt-0.5 h-5 w-5 shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: iconPaths[variant] }) }), _jsxs("div", { className: "flex-1", children: [title && _jsx("h4", { className: "mb-1 text-sm font-semibold", children: title }), _jsx("div", { className: "text-sm", children: children })] }), onDismiss && (_jsx("button", { onClick: onDismiss, className: "ml-3 shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current", "aria-label": "Sulje ilmoitus", children: _jsx("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] }));
}
