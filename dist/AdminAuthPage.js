"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { ArrowRight, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { cn } from "./utils";
const DEFAULT_ENDPOINTS = {
    login: "/api/admin-auth/login",
    mfaVerify: "/api/admin-auth/mfa/verify",
    mfaEnroll: "/api/admin-auth/mfa/enroll",
    password: "/api/admin-auth/password",
};
async function postJson(url, body) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const data = (await response.json().catch(() => ({})));
    if (!response.ok)
        throw new Error(data.error ?? "request_failed");
    return data;
}
export function AdminAuthPage({ brand, labels, endpoints, product, returnTo, successHref = "/admin", onSuccess, className, }) {
    const titleId = useId();
    const urls = { ...DEFAULT_ENDPOINTS, ...endpoints };
    const [step, setStep] = useState("credentials");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [otpauth, setOtpauth] = useState("");
    const [qrDataUrl, setQrDataUrl] = useState("");
    const [backupCodes, setBackupCodes] = useState([]);
    const [mustChangePassword, setMustChangePassword] = useState(false);
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);
    const errorText = error ? (labels.errors[error] ?? labels.genericError) : null;
    function finish(result) {
        if (result.mustChangePassword) {
            setMustChangePassword(true);
            setStep("password");
            return;
        }
        setStep("done");
        onSuccess?.();
        if (product) {
            const params = new URLSearchParams({ product });
            if (returnTo)
                params.set("returnTo", returnTo);
            window.location.assign(`/api/admin-auth/handoff?${params.toString()}`);
            return;
        }
        window.location.assign(successHref);
    }
    async function submitCredentials(event) {
        event.preventDefault();
        setError(null);
        setBusy(true);
        try {
            const result = await postJson(urls.login, { identifier, password });
            setMustChangePassword(Boolean(result.mustChangePassword));
            if (result.enrollmentRequired) {
                const start = await postJson(urls.mfaEnroll, { step: "start" });
                setSecret(start.secret);
                setOtpauth(start.otpauthUri);
                setQrDataUrl(start.qrDataUrl ?? "");
                setStep("enroll");
            }
            else {
                setStep("mfa");
            }
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "request_failed");
        }
        finally {
            setBusy(false);
        }
    }
    async function submitMfa(event) {
        event.preventDefault();
        setError(null);
        setBusy(true);
        try {
            const result = await postJson(urls.mfaVerify, {
                code,
            });
            finish(result);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "request_failed");
        }
        finally {
            setBusy(false);
        }
    }
    async function confirmEnrollment(event) {
        event.preventDefault();
        setError(null);
        setBusy(true);
        try {
            const result = await postJson(urls.mfaEnroll, { step: "confirm", code });
            setBackupCodes(result.backupCodes ?? []);
            setMustChangePassword(Boolean(result.mustChangePassword));
            setStep("backup");
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "request_failed");
        }
        finally {
            setBusy(false);
        }
    }
    async function submitPassword(event) {
        event.preventDefault();
        setError(null);
        setBusy(true);
        try {
            await postJson(urls.password, { password: newPassword, confirm: confirmPassword });
            finish({});
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "request_failed");
        }
        finally {
            setBusy(false);
        }
    }
    const inputClass = "w-full rounded-lg border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] px-3 py-3 text-[var(--mk-auth-text)]";
    const buttonClass = "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--mk-auth-accent)] px-4 text-sm font-bold text-white transition-colors hover:bg-[var(--mk-auth-accent-hover)] disabled:opacity-50";
    return (_jsxs("div", { className: cn("mk-auth mk-auth-page", className), children: [_jsxs("aside", { className: "mk-auth-brand", "aria-labelledby": titleId, children: [_jsxs("div", { className: "mk-auth-brand-name", children: [brand.logo ?? (_jsxs("span", { className: "mk-auth-equalizer", "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {})] })), _jsx("span", { children: brand.name })] }), _jsxs("div", { className: "mk-auth-orbit", "aria-hidden": "true", children: [_jsx("i", {}), _jsx("i", {}), _jsx("i", {}), _jsx("i", {})] }), _jsxs("div", { className: "mk-auth-brand-copy", children: [_jsx("p", { className: "mk-auth-kicker", children: brand.name }), _jsxs("h1", { id: titleId, children: [brand.title, brand.accent ? _jsx("span", { children: brand.accent }) : null] }), brand.description ? _jsx("p", { children: brand.description }) : null] }), brand.benefits?.length ? (_jsx("ul", { className: "mk-auth-benefits", children: brand.benefits.map((benefit) => (_jsxs("li", { children: [_jsx("strong", { children: benefit.title }), _jsx("span", { children: benefit.description })] }, benefit.title))) })) : null] }), _jsxs("div", { className: "mk-auth-panel", children: [_jsx("header", { className: "mk-auth-top", children: _jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mk-auth-muted)]", children: [_jsx(ShieldCheck, { size: 16, "aria-hidden": "true" }), " HQ Admin"] }) }), _jsxs("div", { className: "mk-auth-form", children: [errorText ? (_jsx("p", { role: "alert", className: "mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300", children: errorText })) : null, step === "credentials" ? (_jsxs("form", { onSubmit: submitCredentials, className: "mk-auth-fields", children: [_jsx("h2", { children: labels.signInHeading }), _jsx("p", { className: "mk-auth-description", children: labels.signInDescription }), _jsxs("div", { children: [_jsx("label", { htmlFor: "admin-identifier", children: labels.identifier }), _jsx("input", { id: "admin-identifier", autoComplete: "username", required: true, value: identifier, onChange: (event) => setIdentifier(event.target.value), className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "admin-password", children: labels.password }), _jsx("input", { id: "admin-password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: (event) => setPassword(event.target.value), className: inputClass })] }), _jsxs("button", { type: "submit", disabled: busy, className: buttonClass, children: [_jsx(Lock, { size: 16, "aria-hidden": "true" }), busy ? labels.signingIn : labels.signIn, _jsx(ArrowRight, { size: 16, "aria-hidden": "true" })] })] })) : null, step === "mfa" || step === "enroll" ? (_jsxs("form", { onSubmit: step === "mfa" ? submitMfa : confirmEnrollment, className: "mk-auth-fields", children: [_jsx("h2", { children: step === "mfa" ? labels.mfaHeading : labels.enrollHeading }), _jsx("p", { className: "mk-auth-description", children: step === "mfa" ? labels.mfaDescription : labels.enrollDescription }), step === "enroll" ? (_jsxs("div", { className: "rounded-lg border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] p-4 text-sm", children: [qrDataUrl ? (_jsx("img", { src: qrDataUrl, alt: labels.qrAlt, width: 220, height: 220, className: "mx-auto rounded bg-white p-2" })) : null, _jsx("p", { className: "mt-3 text-xs text-[var(--mk-auth-muted)]", children: labels.secretLabel }), _jsx("p", { className: "mt-1 font-mono text-base tracking-widest break-all", children: secret }), _jsx("a", { className: "mt-2 inline-block text-xs underline", href: otpauth, children: labels.openInAuthenticator })] })) : null, _jsxs("div", { children: [_jsx("label", { htmlFor: "admin-code", children: labels.code }), _jsx("input", { id: "admin-code", inputMode: "numeric", autoComplete: "one-time-code", required: true, value: code, onChange: (event) => setCode(event.target.value), className: inputClass })] }), _jsxs("button", { type: "submit", disabled: busy, className: buttonClass, children: [_jsx(KeyRound, { size: 16, "aria-hidden": "true" }), busy ? labels.verifying : labels.verify] })] })) : null, step === "backup" ? (_jsxs("div", { className: "mk-auth-fields", children: [_jsx("h2", { children: labels.backupHeading }), _jsx("p", { className: "mk-auth-description", children: labels.backupDescription }), _jsx("ul", { className: "grid grid-cols-2 gap-2 font-mono text-sm", children: backupCodes.map((backupCode) => (_jsx("li", { className: "rounded border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] px-2 py-2 text-center", children: backupCode }, backupCode))) }), _jsx("button", { type: "button", onClick: () => finish({ mustChangePassword }), className: buttonClass, children: labels.backupSaved })] })) : null, step === "password" ? (_jsxs("form", { onSubmit: submitPassword, className: "mk-auth-fields", children: [_jsx("h2", { children: labels.passwordHeading }), _jsx("p", { className: "mk-auth-description", children: labels.passwordDescription }), _jsxs("div", { children: [_jsx("label", { htmlFor: "admin-new-password", children: labels.newPassword }), _jsx("input", { id: "admin-new-password", type: "password", autoComplete: "new-password", required: true, value: newPassword, onChange: (event) => setNewPassword(event.target.value), className: inputClass })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "admin-confirm-password", children: labels.confirmPassword }), _jsx("input", { id: "admin-confirm-password", type: "password", autoComplete: "new-password", required: true, value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), className: inputClass })] }), _jsx("button", { type: "submit", disabled: busy, className: buttonClass, children: busy ? labels.saving : labels.savePassword })] })) : null, step === "done" ? (_jsxs("div", { className: "mk-auth-fields", role: "status", "aria-live": "polite", children: [_jsx("h2", { children: labels.doneHeading }), _jsx("p", { className: "mk-auth-description", children: labels.doneDescription })] })) : null] })] })] }));
}
