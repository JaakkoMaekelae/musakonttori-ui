'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from './utils';
/* -------------------------------------------------------------------------- */
/*  Built-in strings (fi / en / sv)                                           */
/* -------------------------------------------------------------------------- */
const FORM_LABELS = {
    fi: {
        subtitle: 'Kirjaudu sisään hallitaksesi linkkejäsi',
        tabEmail: 'Sähköposti',
        tabSocial: 'Sosiaalinen',
        emailPlaceholder: 'Sähköposti',
        passwordPlaceholder: 'Salasana',
        forgotPassword: 'Unohditko salasanan?',
        signInEmail: 'Kirjaudu sähköpostilla',
        sendMagicLink: 'Lähetä taikalinkki',
        continueGoogle: 'Jatka Googlella',
        continueFacebook: 'Jatka Facebookilla',
        noAccount: 'Ei tiliä?',
        createOne: 'Luo sellainen',
        or: 'tai',
        errorEnterEmail: 'Anna sähköposti ensin',
        errorInvalid: 'Virheellinen sähköposti tai salasana',
        errorSendFailed: 'Taikalinkin lähetys epäonnistui',
        errorCheckEmail: 'Tarkista sähköpostisi — lähetimme taikalinkin',
    },
    en: {
        subtitle: 'Sign in to manage your links',
        tabEmail: 'Email',
        tabSocial: 'Social',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
        forgotPassword: 'Forgot password?',
        signInEmail: 'Sign in with Email',
        sendMagicLink: 'Send Magic Link',
        continueGoogle: 'Continue with Google',
        continueFacebook: 'Continue with Facebook',
        noAccount: "Don't have an account?",
        createOne: 'Create one',
        or: 'or',
        errorEnterEmail: 'Enter your email first',
        errorInvalid: 'Invalid email or password',
        errorSendFailed: 'Failed to send magic link',
        errorCheckEmail: 'Check your email for a magic link',
    },
    sv: {
        subtitle: 'Logga in för att hantera dina länkar',
        tabEmail: 'E-post',
        tabSocial: 'Socialt',
        emailPlaceholder: 'E-post',
        passwordPlaceholder: 'Lösenord',
        forgotPassword: 'Glömt lösenordet?',
        signInEmail: 'Logga in med e-post',
        sendMagicLink: 'Skicka magisk länk',
        continueGoogle: 'Fortsätt med Google',
        continueFacebook: 'Fortsätt med Facebook',
        noAccount: 'Har du inget konto?',
        createOne: 'Skapa ett',
        or: 'eller',
        errorEnterEmail: 'Ange din e-post först',
        errorInvalid: 'Ogiltig e-post eller lösenord',
        errorSendFailed: 'Kunde inte skicka magisk länk',
        errorCheckEmail: 'Kolla din e-post — vi skickade en magisk länk',
    },
};
function labelsFor(locale, override) {
    const base = FORM_LABELS[locale ?? 'fi'] ?? FORM_LABELS.fi;
    return override ? { ...base, ...override } : base;
}
/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
export function CustomerSignIn({ productName, registerHref, resetHref, locale, onSignIn, labels, errorMessage, className, }) {
    const L = labelsFor(locale, labels);
    const [tab, setTab] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleCredentialsSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        await onSignIn('credentials', { email, password });
        setLoading(false);
    }
    async function handleMagicLink() {
        if (!email) {
            setError(L.errorEnterEmail);
            return;
        }
        setLoading(true);
        setError(L.errorCheckEmail);
        await onSignIn('nodemailer', { email });
        setLoading(false);
    }
    const primary = 'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';
    return (_jsx("div", { className: cn('flex min-h-svh items-center justify-center px-4', className), style: {
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--mk-palette-accent-primary, #BF2227) 6%, transparent), transparent 55%), var(--mk-palette-bg-canvas, #0D0F17)',
        }, children: _jsxs("div", { className: "w-full max-w-sm rounded-2xl border p-8", style: {
                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                background: 'var(--mk-palette-bg-elevated, #1A1D27)',
                boxShadow: 'var(--mk-shadow-xl, 0 20px 60px rgba(0,0,0,0.4))',
            }, children: [_jsx("h1", { className: "mb-1 text-center text-2xl font-bold", style: { color: 'var(--mk-palette-text-primary, #F0F0F3)' }, children: productName }), _jsx("p", { className: "mb-6 text-center text-sm", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: L.subtitle }), _jsxs("div", { className: "mb-6 flex overflow-hidden rounded-xl border", style: { borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' }, children: [_jsx("button", { type: "button", onClick: () => setTab('email'), className: "flex-1 py-2 text-sm font-semibold transition-colors", style: {
                                background: tab === 'email'
                                    ? 'var(--mk-palette-bg-surface, #242838)'
                                    : 'transparent',
                                color: tab === 'email'
                                    ? 'var(--mk-palette-text-primary, #F0F0F3)'
                                    : 'var(--mk-palette-text-secondary, #B0B3C1)',
                            }, children: L.tabEmail }), _jsx("button", { type: "button", onClick: () => setTab('social'), className: "flex-1 py-2 text-sm font-semibold transition-colors", style: {
                                background: tab === 'social'
                                    ? 'var(--mk-palette-bg-surface, #242838)'
                                    : 'transparent',
                                color: tab === 'social'
                                    ? 'var(--mk-palette-text-primary, #F0F0F3)'
                                    : 'var(--mk-palette-text-secondary, #B0B3C1)',
                            }, children: L.tabSocial })] }), tab === 'email' ? (_jsxs("form", { onSubmit: handleCredentialsSubmit, className: "flex flex-col gap-3", children: [_jsx("input", { type: "email", placeholder: L.emailPlaceholder, value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: loading, className: "w-full rounded-xl border px-3 py-2 text-sm outline-none", style: {
                                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                background: 'var(--mk-palette-bg-surface, #242838)',
                                color: 'var(--mk-palette-text-primary, #F0F0F3)',
                            } }), _jsx("input", { type: "password", placeholder: L.passwordPlaceholder, value: password, onChange: (e) => setPassword(e.target.value), disabled: loading, className: "w-full rounded-xl border px-3 py-2 text-sm outline-none", style: {
                                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                background: 'var(--mk-palette-bg-surface, #242838)',
                                color: 'var(--mk-palette-text-primary, #F0F0F3)',
                            } }), resetHref && (_jsx("div", { className: "flex justify-end", children: _jsx("a", { href: resetHref, className: "text-sm", style: { color: 'var(--mk-palette-accent-primary, #BF2227)' }, children: L.forgotPassword }) })), _jsx("button", { type: "submit", disabled: loading, className: "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold", style: {
                                background: `linear-gradient(135deg, ${primary}, color-mix(in srgb, ${primary} 60%, #7C3AED))`,
                                color: 'var(--mk-palette-on-accent, #FFFFFF)',
                            }, children: L.signInEmail }), _jsxs("div", { className: "my-1 flex items-center gap-3", children: [_jsx("div", { className: "flex-1", style: { height: 1, background: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' } }), _jsx("span", { className: "text-xs", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: L.or }), _jsx("div", { className: "flex-1", style: { height: 1, background: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' } })] }), _jsx("button", { type: "button", disabled: loading, onClick: handleMagicLink, className: "rounded-xl border px-4 py-2 text-sm transition-colors", style: {
                                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                color: 'var(--mk-palette-text-primary, #F0F0F3)',
                            }, children: L.sendMagicLink }), error || errorMessage ? (_jsx("p", { className: "text-center text-sm", style: {
                                color: error === L.errorCheckEmail
                                    ? 'var(--mk-status-success, #22C55E)'
                                    : 'var(--mk-status-error, #EF4444)',
                            }, children: error || errorMessage })) : null] })) : (_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(SocialButton, { onClick: () => onSignIn('google'), children: L.continueGoogle }), _jsx(SocialButton, { onClick: () => onSignIn('facebook'), children: L.continueFacebook })] })), _jsxs("p", { className: "mt-6 text-center text-sm", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: [L.noAccount, ' ', _jsx("a", { href: registerHref, className: "hover:underline", style: { color: 'var(--mk-palette-accent-primary, #BF2227)' }, children: L.createOne })] })] }) }));
}
function SocialButton({ children, onClick, }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: "flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors", style: {
            borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
            color: 'var(--mk-palette-text-primary, #F0F0F3)',
        }, children: children }));
}
