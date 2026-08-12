import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Musakonttori PageHeader - sivun otsikko.
 *
 * Näyttää otsikon, valinnaisen alaotsikon ja oikealle tasatut toiminnot.
 *
 * @example
 * <PageHeader title="Tapahtumat" subtitle="5 tapahtumaa" actions={<Button>Uusi</Button>} />
 */
export function PageHeader({ title, subtitle, actions, className = "", }) {
    return (_jsxs("div", { className: `flex items-center justify-between ${className}`, children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-[var(--mk-palette-text-primary,#111113)]", children: title }), subtitle && (_jsx("p", { className: "mt-1 text-sm text-[var(--mk-palette-text-secondary,#5F6068)]", children: subtitle }))] }), actions && _jsx("div", { className: "flex gap-2", children: actions })] }));
}
