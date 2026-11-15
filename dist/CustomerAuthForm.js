"use client";
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import { Spinner } from "./Spinner";
/** Presentation only: the caller owns Accounts requests, sessions and redirects. */
export function CustomerAuthForm({ labels, links, providers = [], onSubmit, errorMessage, intent = "sign-in", beforeCredentials, afterCredentials, }) {
    const id = useId();
    const busy = useRef(false);
    const [pending, setPending] = useState(false);
    const [visible, setVisible] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [requestError, setRequestError] = useState(false);
    const error = requestError ? labels.requestFailed : errorMessage;
    async function submit(event) {
        event.preventDefault();
        if (busy.current)
            return;
        const data = new FormData(event.currentTarget);
        const email = String(data.get("email") ?? "").trim();
        const password = String(data.get("password") ?? "");
        busy.current = true;
        setRequestError(false);
        setPending(true);
        try {
            await onSubmit({ email, password });
        }
        catch {
            setRequestError(true);
        }
        finally {
            busy.current = false;
            setPending(false);
        }
    }
    return (_jsxs("section", { className: "mk-auth mk-auth-form", "aria-labelledby": `${id}-title`, children: [_jsx("p", { className: "mk-auth-kicker", children: labels.kicker }), _jsx("h2", { id: `${id}-title`, children: labels.title }), _jsx("p", { className: "mk-auth-description", children: labels.description }), providers.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "mk-auth-providers", children: providers.map((provider) => (_jsxs("a", { className: `mk-auth-provider mk-auth-provider-${provider.id}`, href: provider.href, "aria-disabled": pending || undefined, onClick: (event) => {
                                if (pending)
                                    event.preventDefault();
                            }, children: [_jsx(ProviderMark, { provider: provider.id }), provider.label] }, provider.id))) }), _jsx("p", { className: "mk-auth-divider", children: labels.divider })] })) : null, _jsx("form", { onSubmit: submit, "aria-busy": pending, "aria-describedby": error ? `${id}-error` : undefined, children: _jsxs("fieldset", { disabled: pending, className: "mk-auth-fields", children: [beforeCredentials, _jsx(Input, { id: `${id}-email`, name: "email", type: "email", label: labels.email, required: true, autoComplete: "username", className: "mk-auth-input" }), _jsx("div", { className: "mk-auth-password-field", children: _jsx(Input, { id: `${id}-password`, name: "password", value: passwordValue, onChange: (event) => setPasswordValue(event.target.value), type: visible ? "text" : "password", label: labels.password, required: true, autoComplete: intent === "sign-up" ? "new-password" : "current-password", minLength: intent === "sign-up" ? 8 : undefined, maxLength: intent === "sign-up" ? 200 : undefined, className: "mk-auth-input", rightIcon: _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "mk-auth-password-toggle", "aria-label": visible ? labels.hidePassword : labels.showPassword, "aria-pressed": visible, "aria-controls": `${id}-password`, onClick: () => setVisible(!visible), children: visible ? (_jsx(EyeOff, { "aria-hidden": "true" })) : (_jsx(Eye, { "aria-hidden": "true" })) }) }) }), afterCredentials, links.reset ? (_jsx("a", { className: "mk-auth-reset", href: links.reset, children: labels.reset })) : null, error ? (_jsx("p", { id: `${id}-error`, role: "alert", className: "mk-auth-error", children: error })) : null, _jsxs(Button, { type: "submit", className: "mk-auth-submit", disabled: pending, children: [pending ? (_jsx(Spinner, { size: "sm", variant: "white", label: labels.pending })) : null, pending ? labels.pending : labels.submit, !pending ? _jsx(ArrowRight, { "aria-hidden": "true" }) : null] })] }) }), _jsxs("p", { className: "mk-auth-register", children: [labels.registerPrompt, " ", _jsx("a", { href: links.register, children: labels.register })] }), _jsxs("p", { className: "mk-auth-security", children: [_jsx(ShieldCheck, { "aria-hidden": "true", size: 16 }), labels.securityNote] }), _jsxs("footer", { className: "mk-auth-legal", children: [_jsx("a", { href: links.privacy, children: labels.privacy }), links.terms ? _jsx("a", { href: links.terms, children: labels.terms }) : null] })] }));
}
function ProviderMark({ provider }) {
    return provider === "google" ? (_jsxs("svg", { className: "mk-auth-provider-mark", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("path", { fill: "#4285F4", d: "M21.6 12.23c0-.65-.06-1.3-.18-1.93H12v3.66h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.25c1.9-1.75 2.96-4.34 2.96-7.25Z" }), _jsx("path", { fill: "#34A853", d: "M12 22c2.7 0 4.96-.9 6.61-2.52l-3.25-2.5c-.9.6-2.04.97-3.36.97-2.6 0-4.8-1.76-5.59-4.13H3.06v2.59A10 10 0 0 0 12 22Z" }), _jsx("path", { fill: "#FBBC05", d: "M6.41 13.82A6 6 0 0 1 6.1 12c0-.63.11-1.25.31-1.82V7.59H3.06A10 10 0 0 0 2 12c0 1.61.38 3.14 1.06 4.41l3.35-2.59Z" }), _jsx("path", { fill: "#EA4335", d: "M12 6.05c1.47 0 2.78.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.59l3.35 2.59C7.2 7.81 9.4 6.05 12 6.05Z" })] })) : (_jsx("svg", { className: "mk-auth-provider-mark", width: "24", height: "24", viewBox: "0 0 24 24", "aria-hidden": "true", fill: "currentColor", children: _jsx("path", { d: "M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5C17.5 1.4 16.5 1 15 1c-3 0-5 2-5 5v3H7v4h3v9Z" }) }));
}
