'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from './utils';
/* -------------------------------------------------------------------------- */
/*  Built-in strings (fi / en / sv)                                           */
/* -------------------------------------------------------------------------- */
const FORM_LABELS = {
    fi: {
        stepAccount: 'Tili',
        stepOrganization: 'Organisaatio',
        stepWorkspace: 'Työtila',
        createAccount: 'Luo tili',
        name: 'Nimi',
        email: 'Sähköposti',
        password: 'Salasana',
        minChars: 'Vähintään 8 merkkiä',
        accountType: 'Tilityyppi',
        continueGoogle: 'Jatka Googlella',
        continueFacebook: 'Jatka Facebookilla',
        alreadyHave: 'Onko sinulla jo tili? Kirjaudu sisään',
        createOrganization: 'Luo organisaatio',
        orgName: 'Organisaation nimi',
        orgNamePlaceholder: 'Yritys Oy',
        orgSlug: 'URL-tunnus',
        slugAuto: 'Luodaan nimestä automaattisesti, jos jätät tyhjäksi',
        continue: 'Jatka',
        createWorkspace: 'Luo työtila',
        workspaceName: 'Työtilan nimi',
        workspacePlaceholder: 'Esimerkiksi "Päätuotanto"',
        workspaceType: 'Tyyppi',
        goDashboard: 'Siirry hallintapaneeliin',
        back: 'Takaisin',
        errorGeneric: 'Jotain meni pieleen',
    },
    en: {
        stepAccount: 'Account',
        stepOrganization: 'Organization',
        stepWorkspace: 'Workspace',
        createAccount: 'Create Account',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        minChars: 'At least 8 characters',
        accountType: 'Account type',
        continueGoogle: 'Continue with Google',
        continueFacebook: 'Continue with Facebook',
        alreadyHave: 'Already have an account? Sign in',
        createOrganization: 'Create Organization',
        orgName: 'Organization name',
        orgNamePlaceholder: 'Acme Inc.',
        orgSlug: 'URL slug',
        slugAuto: 'Auto-generated from the name if left empty',
        continue: 'Continue',
        createWorkspace: 'Create Workspace',
        workspaceName: 'Workspace name',
        workspacePlaceholder: 'e.g. "Main production"',
        workspaceType: 'Type',
        goDashboard: 'Go to dashboard',
        back: 'Back',
        errorGeneric: 'Something went wrong',
    },
    sv: {
        stepAccount: 'Konto',
        stepOrganization: 'Organisation',
        stepWorkspace: 'Arbetsyta',
        createAccount: 'Skapa konto',
        name: 'Namn',
        email: 'E-post',
        password: 'Lösenord',
        minChars: 'Minst 8 tecken',
        accountType: 'Kontotyp',
        continueGoogle: 'Fortsätt med Google',
        continueFacebook: 'Fortsätt med Facebook',
        alreadyHave: 'Har du redan ett konto? Logga in',
        createOrganization: 'Skapa organisation',
        orgName: 'Organisationens namn',
        orgNamePlaceholder: 'Acme AB',
        orgSlug: 'URL-slug',
        slugAuto: 'Skapas från namnet om tomt',
        continue: 'Fortsätt',
        createWorkspace: 'Skapa arbetsyta',
        workspaceName: 'Arbetsytans namn',
        workspacePlaceholder: 't.ex. "Huvudproduktion"',
        workspaceType: 'Typ',
        goDashboard: 'Gå till instrumentpanelen',
        back: 'Tillbaka',
        errorGeneric: 'Något gick fel',
    },
};
function labelsFor(locale, override) {
    const base = FORM_LABELS[locale ?? 'fi'] ?? FORM_LABELS.fi;
    return override ? { ...base, ...override } : base;
}
function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 40);
}
/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
export function CustomerRegister({ productName, registerTitle, accountTypes, workspaceTypes, signInHref, locale, onRegister, onCreateOrganization, onCreateWorkspace, onFinish, labels, className, }) {
    const L = labelsFor(locale, labels);
    const consumer = accountTypes.find((t) => !t.requiresOrganization);
    const [step, setStep] = useState('account');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState(accountTypes[0]?.value ?? '');
    const [orgName, setOrgName] = useState('');
    const [orgSlug, setOrgSlug] = useState('');
    const [organizationId, setOrganizationId] = useState();
    const [wsName, setWsName] = useState('');
    const [wsSlug, setWsSlug] = useState('');
    const [wsType, setWsType] = useState(workspaceTypes[0] ?? '');
    const requiresOrg = Boolean(accountTypes.find((t) => t.value === accountType)?.requiresOrganization);
    const stepLabels = consumer
        ? [L.stepAccount, L.stepWorkspace]
        : [L.stepAccount, L.stepOrganization, L.stepWorkspace];
    const stepIndex = step === 'account' ? 0 : step === 'organization' ? 1 : consumer ? 1 : 2;
    const primary = 'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';
    function handleRegister(e) {
        e.preventDefault();
        setError('');
        onRegister({ name, email, password, accountType });
    }
    async function handleCreateOrg(e) {
        e.preventDefault();
        if (!onCreateOrganization) {
            // No org handler → treat as personal workspace directly.
            setStep('workspace');
            return;
        }
        setLoading(true);
        setError('');
        const slug = orgSlug || slugify(orgName);
        const result = await onCreateOrganization({ name: orgName, slug });
        setLoading(false);
        if ('error' in result && result.error) {
            setError(result.error);
            return;
        }
        setOrganizationId(result.id);
        setOrgSlug(slug);
        setStep('workspace');
    }
    async function handleCreateWorkspace(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const slug = wsSlug || slugify(wsName);
        const result = await onCreateWorkspace({
            name: wsName || `${wsType} Workspace`,
            slug,
            type: wsType,
            organizationId,
        });
        setLoading(false);
        if (result && 'error' in result && result.error) {
            setError(result.error);
            return;
        }
        onFinish();
    }
    return (_jsx("div", { className: cn('flex min-h-svh items-center justify-center px-4', className), style: {
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--mk-palette-accent-primary, #BF2227) 6%, transparent), transparent 55%), var(--mk-palette-bg-canvas, #0D0F17)',
        }, children: _jsxs("div", { className: "w-full max-w-sm rounded-2xl border p-8", style: {
                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                background: 'var(--mk-palette-bg-elevated, #1A1D27)',
                boxShadow: 'var(--mk-shadow-xl, 0 20px 60px rgba(0,0,0,0.4))',
            }, children: [_jsx("div", { className: "mb-8 flex items-center", children: stepLabels.map((label, index) => (_jsxs("div", { className: "flex flex-1 items-center", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-semibold", style: {
                                            borderColor: index < stepIndex
                                                ? primary
                                                : index === stepIndex
                                                    ? primary
                                                    : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                            background: index < stepIndex ? primary : 'transparent',
                                            color: index <= stepIndex
                                                ? 'var(--mk-palette-text-primary, #F0F0F3)'
                                                : 'var(--mk-palette-text-secondary, #B0B3C1)',
                                        }, children: index < stepIndex ? '✓' : index + 1 }), _jsx("span", { className: "mt-1 text-xs", style: {
                                            color: index === stepIndex
                                                ? primary
                                                : 'var(--mk-palette-text-secondary, #B0B3C1)',
                                        }, children: label })] }), index < stepLabels.length - 1 && (_jsx("div", { className: "mx-2 mb-4 flex-1", style: {
                                    height: 1,
                                    background: index < stepIndex
                                        ? primary
                                        : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                } }))] }, label))) }), step === 'account' && (_jsxs("form", { onSubmit: handleRegister, className: "flex flex-col gap-4", children: [_jsx("h2", { className: "text-center text-xl font-bold", style: { color: 'var(--mk-palette-text-primary, #F0F0F3)' }, children: registerTitle }), _jsx("p", { className: "text-center text-xs", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: productName }), _jsx(Field, { label: L.name, children: _jsx(InputBase, { type: "text", value: name, onChange: setName, disabled: loading }) }), _jsx(Field, { label: L.email, children: _jsx(InputBase, { type: "email", value: email, onChange: setEmail, disabled: loading, required: true }) }), _jsxs(Field, { label: L.password, children: [_jsx(InputBase, { type: "password", value: password, onChange: setPassword, disabled: loading, required: true, minLength: 8 }), _jsx("span", { className: "text-xs", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: L.minChars })] }), _jsx(Field, { label: L.accountType, children: _jsx("div", { className: "flex flex-col gap-2", children: accountTypes.map((t) => (_jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm", style: {
                                        borderColor: accountType === t.value
                                            ? primary
                                            : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                        color: 'var(--mk-palette-text-primary, #F0F0F3)',
                                    }, children: [_jsx("input", { type: "radio", name: "accountType", checked: accountType === t.value, onChange: () => setAccountType(t.value) }), t.label] }, t.value))) }) }), error && (_jsx("p", { className: "text-center text-sm", style: { color: 'var(--mk-status-error, #EF4444)' }, children: error })), _jsx(SubmitButton, { disabled: loading || password.length < 8, children: L.createAccount }), signInHref && (_jsx("p", { className: "text-center text-sm", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: _jsx("a", { href: signInHref, className: "hover:underline", style: { color: primary }, children: L.alreadyHave }) }))] })), step === 'organization' && (_jsxs("form", { onSubmit: handleCreateOrg, className: "flex flex-col gap-4", children: [_jsx("h2", { className: "text-center text-xl font-bold", style: { color: 'var(--mk-palette-text-primary, #F0F0F3)' }, children: L.createOrganization }), _jsx(Field, { label: L.orgName, children: _jsx(InputBase, { type: "text", value: orgName, onChange: setOrgName, disabled: loading, placeholder: L.orgNamePlaceholder, required: true }) }), _jsxs(Field, { label: L.orgSlug, children: [_jsx(InputBase, { type: "text", value: orgSlug, onChange: setOrgSlug, disabled: loading }), _jsx("span", { className: "text-xs", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: L.slugAuto })] }), error && (_jsx("p", { className: "text-center text-sm", style: { color: 'var(--mk-status-error, #EF4444)' }, children: error })), _jsx(SubmitButton, { disabled: loading || !orgName, children: L.continue }), _jsx(BackButton, { onClick: () => setStep('account'), children: L.back })] })), step === 'workspace' && (_jsxs("form", { onSubmit: handleCreateWorkspace, className: "flex flex-col gap-4", children: [_jsx("h2", { className: "text-center text-xl font-bold", style: { color: 'var(--mk-palette-text-primary, #F0F0F3)' }, children: L.createWorkspace }), _jsx(Field, { label: L.workspaceName, children: _jsx(InputBase, { type: "text", value: wsName, onChange: setWsName, disabled: loading, placeholder: L.workspacePlaceholder }) }), _jsxs(Field, { label: L.orgSlug, children: [_jsx(InputBase, { type: "text", value: wsSlug, onChange: setWsSlug, disabled: loading }), _jsx("span", { className: "text-xs", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: L.slugAuto })] }), _jsx(Field, { label: L.workspaceType, children: _jsx("select", { value: wsType, onChange: (e) => setWsType(e.target.value), className: "w-full rounded-xl border px-3 py-2 text-sm", style: {
                                    borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                                    background: 'var(--mk-palette-bg-surface, #242838)',
                                    color: 'var(--mk-palette-text-primary, #F0F0F3)',
                                }, children: workspaceTypes.map((type) => (_jsx("option", { value: type, children: type }, type))) }) }), error && (_jsx("p", { className: "text-center text-sm", style: { color: 'var(--mk-status-error, #EF4444)' }, children: error })), _jsx(SubmitButton, { disabled: loading, children: L.goDashboard }), _jsx(BackButton, { onClick: () => setStep(requiresOrg ? 'organization' : 'account'), children: L.back })] }))] }) }));
}
/* -------------------------------------------------------------------------- */
/*  Local primitives (dependency-free)                                        */
/* -------------------------------------------------------------------------- */
function Field({ label, children, }) {
    return (_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-sm", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: label }), children] }));
}
function InputBase({ type = 'text', value, onChange, disabled, required, minLength, placeholder, }) {
    return (_jsx("input", { type: type, value: value, onChange: (e) => onChange(e.target.value), disabled: disabled, required: required, minLength: minLength, placeholder: placeholder, className: "w-full rounded-xl border px-3 py-2 text-sm outline-none", style: {
            borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
            background: 'var(--mk-palette-bg-surface, #242838)',
            color: 'var(--mk-palette-text-primary, #F0F0F3)',
        } }));
}
function SubmitButton({ children, disabled, }) {
    const primary = 'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';
    return (_jsx("button", { type: "submit", disabled: disabled, className: "flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50", style: {
            background: `linear-gradient(135deg, ${primary}, color-mix(in srgb, ${primary} 60%, #7C3AED))`,
            color: 'var(--mk-palette-on-accent, #FFFFFF)',
        }, children: children }));
}
function BackButton({ children, onClick, }) {
    return (_jsx("button", { type: "button", onClick: onClick, className: "rounded-xl px-4 py-2 text-sm transition-colors", style: { color: 'var(--mk-palette-text-secondary, #B0B3C1)' }, children: children }));
}
