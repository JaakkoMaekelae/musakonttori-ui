"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useTransition } from "react";
import { cn } from "./utils";
/**
 * The form's own built-in chrome — field labels, the show/hide password
 * toggle, delegated-sign-in copy — keyed per locale like LocaleSwitcherModal's
 * `LABELS`. All product-specific copy (`productName`, `formTitle`,
 * `securityNote`, etc.) stays a required prop; this table only covers the
 * handful of small strings the form owns so every consumer does not have to
 * spell out "email" and "password" by hand. Unlisted locales fall back to
 * Finnish — the historical default, kept for backward compatibility with
 * consumers that render this layout without passing `locale`.
 */
const SIGN_IN_FORM_LABELS = {
    fi: {
        emailLabel: "Sähköposti",
        emailPlaceholder: "sinä@esimerkki.fi",
        passwordLabel: "Salasana",
        passwordPlaceholder: "••••••••",
        showPassword: "Näytä salasana",
        hidePassword: "Piilota salasana",
        signInButton: "Kirjaudu",
        clerkRedirect: "Kirjaudu Clerk-tunnuksella",
        accountsRedirect: "Kirjaudu Musakonttori-tunnuksella",
        orDivider: "tai",
    },
    en: {
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        passwordLabel: "Password",
        passwordPlaceholder: "••••••••",
        showPassword: "Show password",
        hidePassword: "Hide password",
        signInButton: "Sign in",
        clerkRedirect: "Sign in with Clerk",
        accountsRedirect: "Sign in with your Musakonttori account",
        orDivider: "or",
    },
    sv: {
        emailLabel: "E-post",
        emailPlaceholder: "du@exempel.se",
        passwordLabel: "Lösenord",
        passwordPlaceholder: "••••••••",
        showPassword: "Visa lösenord",
        hidePassword: "Dölj lösenord",
        signInButton: "Logga in",
        clerkRedirect: "Logga in med Clerk",
        accountsRedirect: "Logga in med ditt Musakonttori-konto",
        orDivider: "eller",
    },
};
function formLabelsFor(locale, override) {
    const base = SIGN_IN_FORM_LABELS[locale ?? "fi"] ?? SIGN_IN_FORM_LABELS.fi;
    return override ? { ...base, ...override } : base;
}
/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */
function BrandMark() {
    return (_jsxs("div", { className: "relative grid h-[42px] w-[42px] place-items-center", style: { background: "var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))" }, "aria-hidden": "true", children: [_jsx("span", { className: "absolute h-[6px] w-[18px] border-2 border-white", style: { transform: "rotate(30deg) skewX(-22deg)" } }), _jsx("span", { className: "absolute h-[6px] w-[18px] border-2 border-white", style: { transform: "translateY(7px) rotate(30deg) skewX(-22deg)" } })] }));
}
function ArrowLeftIcon() {
    return (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M19 12H5M12 19l-7-7 7-7" }) }));
}
function MailIcon() {
    return (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }), _jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })] }));
}
function LockIcon() {
    return (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), _jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] }));
}
function ShieldIcon() {
    return (_jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) }));
}
function ChevronRightIcon() {
    return (_jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "m9 18 6-6-6-6" }) }));
}
function SuccessCheckIcon() {
    return (_jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }));
}
/* -------------------------------------------------------------------------- */
/*  Inline SVG icons (avoid lucide-react import — reduces bundle for consumers */
/*  who tree-shake, and keeps this component dependency-free beyond React).    */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/*  SignInLayout                                                              */
/* -------------------------------------------------------------------------- */
/**
 * Reusable sign-in split-panel layout.
 *
 * Left panel: brand identity, benefits, preview card.
 * Right panel: back link, form heading, email/password form with show/hide,
 * error display, submit button, register prompt, security note.
 *
 * Consumer passes all strings, icons, and the auth handler — this component
 * owns zero product-specific copy or logic.
 */
export function SignInLayout({ productName, productTagline, brandEyebrow, brandTitle, brandTitleAccent, brandDescription, benefits, previewTitle, previewValue, previewStatus, previewOrderName, previewOrderId, previewOrderStatus, previewOrderAmount, formTitle, formSubtitle, formDescription, onSignIn, authMode = "credentials", clerkSignInUrl, accountsUrl, accountsFrom, registerHref, registerLabel, registerTitle, registerDescription, backHref, backLabel, securityNote, errorMessage, className, locale, labels, }) {
    const L = formLabelsFor(locale, labels);
    // Delegated sign-in redirect: Clerk takes priority when the product opts
    // into it, since a Clerk-authenticated product has no local password form
    // of its own to redirect away from — Accounts is the fallback delegation.
    const delegatedSignIn = authMode === "clerk" && clerkSignInUrl
        ? { href: clerkSignInUrl, label: L.clerkRedirect }
        : accountsUrl && accountsFrom
            ? { href: `${accountsUrl}/sign-in?from=${accountsFrom}`, label: L.accountsRedirect }
            : null;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, startTransition] = useTransition();
    const hasError = !!errorMessage && errorMessage.length > 0;
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const raw = data.get("email");
        const emailValue = typeof raw === "string" ? raw.trim() : "";
        const pw = data.get("password");
        const pwValue = typeof pw === "string" ? pw : "";
        // Server must validate; these are just early-client guards.
        if (!emailValue || !pwValue)
            return;
        startTransition(() => {
            void onSignIn(emailValue, pwValue);
        });
    }
    /* ---- Token shorthands (with fallbacks for consumers that don't load every token) ---- */
    const primary = "var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))";
    const primaryGlow = "var(--mk-palette-primary-glow, rgba(191,34,39,0.3))";
    const primarySubtle = "var(--mk-palette-accent-soft, rgba(191,34,39,0.12))";
    const errorColor = "var(--mk-status-error, #EF4444)";
    const errorSubtle = "var(--mk-palette-error-subtle, rgba(239,68,68,0.08))";
    return (_jsxs("div", { className: cn("min-h-svh p-[clamp(12px,2vw,28px)] max-sm:p-0", className), style: {
            background: `linear-gradient(135deg, color-mix(in srgb, ${primary} 5%, transparent), transparent 45%), var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))`,
        }, children: [_jsx("style", { children: SIGN_IN_GRID_CSS }), _jsxs("div", { "data-mk-signin-grid": "", className: "mx-auto grid w-full min-h-[calc(100svh-clamp(24px,4vw,56px))] max-w-[1440px] overflow-hidden rounded-[28px] border shadow-2xl max-sm:min-h-svh max-sm:rounded-none max-sm:border-0", style: {
                    borderColor: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))",
                    background: "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))",
                    boxShadow: "var(--mk-shadow-xl, 0 20px 60px rgba(0,0,0,0.4))",
                }, children: [_jsxs("div", { className: "relative flex min-h-[720px] flex-col overflow-hidden p-[clamp(36px,4.5vw,72px)] max-sm:min-h-auto max-sm:p-[26px_clamp(22px,7vw,54px)_32px]", style: { isolation: "isolate" }, children: [_jsx("div", { "aria-hidden": "true", className: "absolute inset-0 -z-10", style: {
                                    background: `
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                #101012
              `,
                                    backgroundSize: "46px 46px",
                                } }), _jsx("div", { "aria-hidden": "true", className: "absolute right-[-18%] bottom-[-24%] -z-10 aspect-square w-[72%] rounded-full border", style: {
                                    borderColor: "rgba(255,255,255,0.08)",
                                    boxShadow: "0 0 0 70px rgba(255,255,255,0.025), 0 0 0 140px rgba(255,255,255,0.018)",
                                } }), _jsx("div", { "aria-hidden": "true", className: "absolute top-[6%] left-[12%] -z-10 h-[360px] w-[360px] rounded-full blur-[110px]", style: {
                                    background: `color-mix(in srgb, ${primary} 28%, transparent)`,
                                } }), _jsxs("a", { href: backHref, className: "inline-flex w-fit items-center gap-3 text-white no-underline", children: [_jsx(BrandMark, {}), _jsxs("span", { children: [_jsx("strong", { className: "block font-[var(--font-heading)] text-[17px] tracking-[-0.025em]", children: productName }), _jsx("small", { className: "mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/50", children: productTagline })] })] }), _jsxs("div", { className: "mt-auto max-w-[620px] pt-20 max-sm:mt-[52px] max-sm:pt-0", children: [_jsx("p", { className: "text-[11px] font-extrabold uppercase tracking-[0.15em]", style: { color: primary }, children: brandEyebrow }), _jsxs("h2", { className: "mt-[18px] font-[var(--font-heading)] text-[clamp(38px,4.2vw,66px)] leading-[0.98] tracking-[-0.06em] text-white max-sm:text-[clamp(34px,7vw,48px)]", style: { fontSize: "clamp(38px,4.2vw,66px)" }, children: [brandTitle, " ", _jsx("span", { style: { color: primary }, children: brandTitleAccent })] }), _jsx("p", { className: "mt-6 max-w-[540px] text-base leading-[1.7] text-white/60 max-sm:hidden", children: brandDescription }), _jsx("ul", { className: "mt-[34px] flex flex-wrap gap-[10px] p-0 list-none max-sm:mt-6", children: benefits.map((b) => {
                                            const Icon = b.icon;
                                            return (_jsxs("li", { className: "inline-flex min-h-[38px] items-center gap-2 border px-[13px] text-[11px] font-bold text-white/80", style: {
                                                    borderColor: "rgba(255,255,255,0.1)",
                                                    background: "rgba(255,255,255,0.045)",
                                                }, children: [_jsx(Icon, { className: "h-[14px] w-[14px]", style: { color: primary } }), b.label] }, b.label));
                                        }) })] }), _jsxs("div", { className: "mt-[34px] rounded-[18px] border p-5 shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-[18px] max-sm:hidden", style: {
                                    borderColor: "rgba(255,255,255,0.1)",
                                    background: "rgba(12,12,14,0.72)",
                                }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "grid h-[38px] w-[38px] place-items-center text-[#e9878a]", style: { background: "rgba(220,38,38,0.13)" }, children: _jsx(SuccessCheckIcon, {}) }), _jsxs("span", { children: [_jsx("small", { className: "block text-[9px] text-white/40", children: previewTitle }), _jsx("strong", { className: "mt-[3px] block text-sm text-white", children: previewValue })] }), _jsx("i", { className: "ml-auto text-[9px] font-bold not-italic text-[#74c69d]", children: previewStatus })] }), _jsxs("div", { className: "mt-[18px] flex items-center gap-3 border-t pt-[18px]", style: { borderTopColor: "rgba(255,255,255,0.08)" }, children: [_jsx("span", { className: "grid h-[42px] w-[42px] place-items-center text-[10px] font-black text-white", style: { background: "linear-gradient(135deg, #7a272b, #1d1d20)" }, children: previewOrderName.slice(0, 2).toUpperCase() }), _jsxs("span", { children: [_jsx("small", { className: "block text-[9px] text-white/40", children: previewOrderId }), _jsx("strong", { className: "mb-1 block text-[11px] text-white", children: previewOrderName })] }), _jsx("b", { className: "ml-auto text-[11px] text-white", children: previewOrderAmount })] }), _jsxs("div", { className: "mt-[18px] grid grid-cols-4 gap-[5px]", children: [Array.from({ length: 3 }).map((_, i) => (_jsx("span", { className: "h-[3px]", style: { background: primary } }, i))), _jsx("span", { className: "h-[3px]", style: { background: "rgba(255,255,255,0.12)" } })] }), _jsx("p", { className: "mt-7 text-[10px] text-white/35 max-sm:hidden", children: previewOrderStatus })] }), _jsx("p", { className: "mt-7 text-[10px] text-white/35 max-sm:hidden", children: securityNote })] }), _jsx("div", { className: "grid min-w-0 place-items-center p-[clamp(72px,9vw,126px)_clamp(32px,7vw,108px)_54px] max-sm:p-[48px_clamp(22px,8vw,72px)_64px]", style: { background: "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))" }, children: _jsxs("div", { className: "w-full max-w-[500px]", children: [_jsxs("a", { href: backHref, className: "inline-flex items-center gap-2 text-xs font-bold no-underline", style: { color: "var(--mk-palette-text-secondary, #B0B3C1)" }, children: [_jsx(ArrowLeftIcon, {}), backLabel] }), _jsxs("div", { className: "mt-[clamp(52px,8vh,88px)] max-sm:mt-12", children: [_jsx("p", { className: "text-[11px] font-extrabold uppercase tracking-[0.15em]", style: { color: primary }, children: formSubtitle }), _jsx("h1", { className: "mt-3 font-[var(--font-heading)] text-[clamp(34px,4vw,50px)] leading-[1.05] tracking-[-0.05em] max-sm:text-[34px]", style: { color: "var(--mk-palette-text-primary, #F0F0F3)" }, children: formTitle }), _jsx("p", { className: "mt-[14px] max-w-[430px] text-sm leading-[1.65]", style: { color: "var(--mk-palette-text-secondary, #B0B3C1)" }, children: formDescription })] }), delegatedSignIn ? (_jsxs("div", { className: "mt-8", children: [_jsxs("a", { href: delegatedSignIn.href, className: "flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 font-semibold text-sm transition-colors duration-[160ms] ease-in-out", style: {
                                                borderColor: `color-mix(in srgb, ${primary} 55%, transparent)`,
                                                background: `color-mix(in srgb, ${primary} 12%, transparent)`,
                                                color: primary,
                                            }, onMouseEnter: (e) => {
                                                e.currentTarget.style.background = `color-mix(in srgb, ${primary} 24%, transparent)`;
                                            }, onMouseLeave: (e) => {
                                                e.currentTarget.style.background = `color-mix(in srgb, ${primary} 12%, transparent)`;
                                            }, children: [_jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: _jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" }) }), delegatedSignIn.label] }), _jsxs("div", { className: "flex items-center gap-3 my-5", children: [_jsx("div", { className: "flex-1 h-px", style: { background: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" } }), _jsx("span", { className: "text-xs", style: { color: "var(--mk-palette-text-tertiary, #7E8292)" }, children: L.orDivider }), _jsx("div", { className: "flex-1 h-px", style: { background: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" } })] })] })) : null, _jsxs("form", { onSubmit: handleSubmit, className: "mt-9 grid gap-[21px]", children: [hasError && (_jsxs("div", { className: "flex items-start gap-[10px] rounded-[10px] border p-[13px_14px] text-xs leading-[1.55]", role: "alert", style: {
                                                borderColor: `color-mix(in srgb, ${errorColor} 24%, transparent)`,
                                                background: errorSubtle,
                                                color: errorColor,
                                            }, children: [_jsx("span", { className: "grid h-[18px] w-[18px] flex-none place-items-center rounded-full text-[10px] font-black text-white", style: { background: errorColor }, children: "!" }), _jsx("p", { className: "m-0", children: errorMessage })] })), _jsxs("div", { className: "grid gap-[9px]", children: [_jsx("label", { className: "text-xs font-extrabold", htmlFor: "signin-email", style: { color: "var(--mk-palette-text-primary, #F0F0F3)" }, children: L.emailLabel }), _jsxs("div", { className: "relative flex items-center", children: [_jsx("span", { className: "pointer-events-none absolute left-4", style: { color: "var(--mk-palette-text-tertiary, #7E8292)" }, children: _jsx(MailIcon, {}) }), _jsx("input", { id: "signin-email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: L.emailPlaceholder, "aria-invalid": hasError ? "true" : undefined, className: "h-[54px] w-full rounded-xl border bg-transparent px-12 text-sm outline-none transition-colors duration-[160ms] ease-in-out", style: {
                                                                borderColor: "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                                                                background: "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))",
                                                                color: "var(--mk-palette-text-primary, #F0F0F3)",
                                                            }, onFocus: (e) => {
                                                                e.currentTarget.style.borderColor = primary;
                                                                e.currentTarget.style.boxShadow = `0 0 0 4px ${primarySubtle}`;
                                                                e.currentTarget.style.background = "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))";
                                                            }, onBlur: (e) => {
                                                                e.currentTarget.style.borderColor = "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                                                                e.currentTarget.style.boxShadow = "none";
                                                                e.currentTarget.style.background = "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))";
                                                            } })] })] }), _jsxs("div", { className: "grid gap-[9px]", children: [_jsx("label", { className: "text-xs font-extrabold", htmlFor: "signin-password", style: { color: "var(--mk-palette-text-primary, #F0F0F3)" }, children: L.passwordLabel }), _jsxs("div", { className: "relative flex items-center", children: [_jsx("span", { className: "pointer-events-none absolute left-4", style: { color: "var(--mk-palette-text-tertiary, #7E8292)" }, children: _jsx(LockIcon, {}) }), _jsx("input", { id: "signin-password", name: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: L.passwordPlaceholder, "aria-invalid": hasError ? "true" : undefined, className: "h-[54px] w-full rounded-xl border bg-transparent px-12 text-sm outline-none transition-colors duration-[160ms] ease-in-out", style: {
                                                                borderColor: hasError ? errorColor : "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                                                                background: "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))",
                                                                color: "var(--mk-palette-text-primary, #F0F0F3)",
                                                            }, onFocus: (e) => {
                                                                if (hasError)
                                                                    return;
                                                                e.currentTarget.style.borderColor = primary;
                                                                e.currentTarget.style.boxShadow = `0 0 0 4px ${primarySubtle}`;
                                                                e.currentTarget.style.background = "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))";
                                                            }, onBlur: (e) => {
                                                                e.currentTarget.style.borderColor = hasError ? errorColor : "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                                                                e.currentTarget.style.boxShadow = "none";
                                                                e.currentTarget.style.background = "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))";
                                                            } }), _jsx("button", { type: "button", onClick: () => setShowPassword((v) => !v), className: "absolute right-2 grid h-10 w-10 place-items-center rounded-lg border-0 bg-transparent cursor-pointer", style: { color: "var(--mk-palette-text-secondary, #B0B3C1)" }, "aria-label": showPassword ? L.hidePassword : L.showPassword, onMouseEnter: (e) => {
                                                                e.currentTarget.style.background = "var(--mk-palette-bg-muted, #2A2E3D)";
                                                                e.currentTarget.style.color = "var(--mk-palette-text-primary, #F0F0F3)";
                                                            }, onMouseLeave: (e) => {
                                                                e.currentTarget.style.background = "transparent";
                                                                e.currentTarget.style.color = "var(--mk-palette-text-secondary, #B0B3C1)";
                                                            }, children: showPassword ? (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" }), _jsx("path", { d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" }), _jsx("line", { x1: "2", x2: "22", y1: "2", y2: "22" })] })) : (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" }), _jsx("circle", { cx: "12", cy: "12", r: "3" })] })) })] })] }), _jsxs("button", { type: "submit", disabled: isPending, className: "mt-[3px] flex h-[54px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-colors duration-[160ms] ease-in-out disabled:opacity-50", style: {
                                                background: primary,
                                                boxShadow: `0 12px 28px ${primaryGlow}`,
                                            }, onMouseEnter: (e) => {
                                                if (!isPending) {
                                                    e.currentTarget.style.background = "var(--mk-palette-accent-hover, #A51E23)";
                                                }
                                            }, onMouseLeave: (e) => {
                                                if (!isPending) {
                                                    e.currentTarget.style.background = primary;
                                                }
                                            }, children: [isPending ? (_jsxs("svg", { className: "h-4 w-4 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })] })) : null, formTitle] })] }), _jsxs("div", { className: "mt-[42px] flex items-center justify-between gap-6 border-y py-[19px] max-sm:flex-col max-sm:items-start max-sm:gap-[14px]", style: { borderColor: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" }, children: [_jsxs("span", { children: [_jsx("strong", { className: "block text-xs", style: { color: "var(--mk-palette-text-primary, #F0F0F3)" }, children: registerTitle }), _jsx("span", { className: "mt-1 block text-[10px]", style: { color: "var(--mk-palette-text-secondary, #B0B3C1)" }, children: registerDescription })] }), _jsxs("a", { href: registerHref, className: "inline-flex min-h-10 flex-none items-center gap-[7px] rounded-[9px] border px-[14px] text-[11px] font-extrabold no-underline transition-colors", style: {
                                                borderColor: "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                                                color: "var(--mk-palette-text-primary, #F0F0F3)",
                                            }, onMouseEnter: (e) => {
                                                e.currentTarget.style.borderColor = primary;
                                                e.currentTarget.style.color = primary;
                                            }, onMouseLeave: (e) => {
                                                e.currentTarget.style.borderColor = "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                                                e.currentTarget.style.color = "var(--mk-palette-text-primary, #F0F0F3)";
                                            }, children: [registerLabel, _jsx(ChevronRightIcon, {})] })] }), _jsxs("div", { className: "mt-[22px] flex items-center justify-center gap-[7px] text-[10px]", style: { color: "var(--mk-palette-text-tertiary, #7E8292)" }, children: [_jsx(ShieldIcon, {}), securityNote] })] }) })] })] }));
}
/**
 * The two-column grid, as a stylesheet rather than an inline style.
 *
 * Inline `gridTemplateColumns` cannot be overridden by a media query, so the
 * old `minmax(420px,…) minmax(480px,…)` applied at every width — a hard 900px
 * floor that overflowed any viewport narrower than that, including phones.
 * The `max-sm:` classes beside it only reset padding and radius, never the
 * columns, so the layout had no way to collapse.
 *
 * The breakpoint is 960px, not Tailwind's `sm`: the columns need 900px plus
 * the page padding, so stacking has to start well above the phone range.
 *
 * Shipped as a component-owned <style> because consuming apps do not reliably
 * scan this package with Tailwind — when they don't, class-based layout here
 * silently evaporates.
 */
const SIGN_IN_GRID_CSS = `
[data-mk-signin-grid] {
  grid-template-columns: minmax(420px, 0.96fr) minmax(480px, 1.04fr);
}

@media (max-width: 959px) {
  [data-mk-signin-grid] {
    grid-template-columns: minmax(0, 1fr);
  }
}
`;
