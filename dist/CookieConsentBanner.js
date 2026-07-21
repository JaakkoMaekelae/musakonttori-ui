"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
const COOKIE_NAME = "mk_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const CONSENT_VERSION = "2026-07";
function readConsent() {
    if (typeof document === "undefined")
        return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (!match)
        return null;
    try {
        return JSON.parse(decodeURIComponent(match[1]));
    }
    catch {
        return null;
    }
}
function storeConsent(analytics, marketing) {
    const consent = {
        necessary: true,
        analytics,
        marketing,
        version: CONSENT_VERSION,
        decidedAt: new Date().toISOString(),
    };
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent("mk-cookie-consent-changed", { detail: consent }));
}
export function CookieConsentBanner({ privacyHref }) {
    const [visible, setVisible] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    useEffect(() => {
        if (!readConsent()) {
            const timer = window.setTimeout(() => setVisible(true), 250);
            return () => window.clearTimeout(timer);
        }
    }, []);
    const choose = useCallback((analytics, marketing) => {
        storeConsent(analytics, marketing);
        setVisible(false);
    }, []);
    if (!visible)
        return null;
    return (_jsxs("aside", { role: "region", "aria-label": "Ev\u00E4steasetukset", className: "mk-cookie-shell", children: [_jsxs("div", { className: "mk-cookie-card", children: [_jsx("div", { className: "mk-cookie-mark", "aria-hidden": "true", children: "MK" }), _jsxs("div", { className: "mk-cookie-copy", children: [_jsx("h2", { children: "Ev\u00E4steet Musakonttorissa" }), _jsx("p", { children: "K\u00E4yt\u00E4mme v\u00E4ltt\u00E4m\u00E4tt\u00F6mi\u00E4 ev\u00E4steit\u00E4 kirjautumiseen, turvallisuuteen ja kieli- tai maa-asetuksiin. Analytiikkaa ja markkinointia k\u00E4ytet\u00E4\u00E4n vain suostumuksellasi." }), detailsOpen ? (_jsx("div", { id: "mk-cookie-details", className: "mk-cookie-details", children: "V\u00E4ltt\u00E4m\u00E4tt\u00F6m\u00E4t ev\u00E4steet ovat aina k\u00E4yt\u00F6ss\u00E4. Jos hyv\u00E4ksyt kaikki, tallennamme my\u00F6s analytiikka- ja markkinointisuostumuksen palvelun parantamista varten." })) : null, privacyHref ? (_jsx("a", { className: "mk-cookie-link", href: privacyHref, children: "Tietosuojaseloste" })) : null] }), _jsxs("div", { className: "mk-cookie-actions", children: [_jsx("button", { type: "button", className: "mk-cookie-button mk-cookie-ghost", "aria-expanded": detailsOpen, "aria-controls": "mk-cookie-details", onClick: () => setDetailsOpen((open) => !open), children: detailsOpen ? "Piilota tiedot" : "Lisätiedot" }), _jsx("button", { type: "button", className: "mk-cookie-button mk-cookie-secondary", onClick: () => choose(false, false), children: "Vain v\u00E4ltt\u00E4m\u00E4tt\u00F6m\u00E4t" }), _jsx("button", { type: "button", className: "mk-cookie-button mk-cookie-primary", onClick: () => choose(true, true), children: "Hyv\u00E4ksy kaikki" })] })] }), _jsx("style", { children: `
        .mk-cookie-shell {
          position: fixed;
          inset-inline: 0;
          bottom: 0;
          z-index: 2147483000;
          padding: 16px;
          padding-bottom: calc(16px + env(safe-area-inset-bottom));
          pointer-events: none;
        }
        .mk-cookie-card {
          pointer-events: auto;
          width: min(760px, 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          padding: 16px;
          color: #f0f0f3;
          background: rgba(26, 29, 39, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
          backdrop-filter: blur(18px);
        }
        .mk-cookie-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #f44242;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0;
        }
        .mk-cookie-copy h2 {
          margin: 0;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 800;
          text-wrap: balance;
        }
        .mk-cookie-copy p,
        .mk-cookie-details {
          margin: 6px 0 0;
          color: #b0b3c1;
          font-size: 12px;
          line-height: 1.55;
        }
        .mk-cookie-details {
          padding-top: 8px;
        }
        .mk-cookie-link {
          display: inline-flex;
          margin-top: 8px;
          color: #f0f0f3;
          font-size: 12px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .mk-cookie-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .mk-cookie-button {
          min-height: 36px;
          border-radius: 8px;
          padding: 0 13px;
          border: 1px solid transparent;
          font: inherit;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
        }
        .mk-cookie-button:hover {
          transform: translateY(-1px);
        }
        .mk-cookie-button:focus-visible,
        .mk-cookie-link:focus-visible {
          outline: 2px solid #f44242;
          outline-offset: 3px;
        }
        .mk-cookie-primary {
          background: #f44242;
          color: #ffffff;
        }
        .mk-cookie-primary:hover {
          background: #d92f35;
        }
        .mk-cookie-secondary,
        .mk-cookie-ghost {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          color: #f0f0f3;
        }
        .mk-cookie-secondary:hover,
        .mk-cookie-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        @media (min-width: 720px) {
          .mk-cookie-card {
            grid-template-columns: auto 1fr;
            align-items: start;
            padding: 18px;
          }
          .mk-cookie-actions {
            grid-column: 2;
            justify-content: flex-end;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mk-cookie-button {
            transition: none;
          }
          .mk-cookie-button:hover {
            transform: none;
          }
        }
      ` })] }));
}
