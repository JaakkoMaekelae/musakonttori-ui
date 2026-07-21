"use client";

import { useCallback, useEffect, useState } from "react";

const COOKIE_NAME = "mk_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const CONSENT_VERSION = "2026-07";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  decidedAt: string;
};

function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1]!)) as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(analytics: boolean, marketing: boolean) {
  const consent: ConsentState = {
    necessary: true,
    analytics,
    marketing,
    version: CONSENT_VERSION,
    decidedAt: new Date().toISOString(),
  };

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent("mk-cookie-consent-changed", { detail: consent })
  );
}

export interface CookieConsentBannerProps {
  privacyHref?: string;
}

export function CookieConsentBanner({ privacyHref }: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      const timer = window.setTimeout(() => setVisible(true), 250);
      return () => window.clearTimeout(timer);
    }
    return;
  }, []);

  const choose = useCallback((analytics: boolean, marketing: boolean) => {
    storeConsent(analytics, marketing);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Evästeasetukset"
      className="mk-cookie-shell"
    >
      <div className="mk-cookie-card">
        <div className="mk-cookie-mark" aria-hidden="true">
          MK
        </div>
        <div className="mk-cookie-copy">
          <h2>Evästeet Musakonttorissa</h2>
          <p>
            Käytämme välttämättömiä evästeitä kirjautumiseen, turvallisuuteen ja
            kieli- tai maa-asetuksiin. Analytiikkaa ja markkinointia käytetään
            vain suostumuksellasi.
          </p>
          {detailsOpen ? (
            <div id="mk-cookie-details" className="mk-cookie-details">
              Välttämättömät evästeet ovat aina käytössä. Jos hyväksyt kaikki,
              tallennamme myös analytiikka- ja markkinointisuostumuksen palvelun
              parantamista varten.
            </div>
          ) : null}
          {privacyHref ? (
            <a className="mk-cookie-link" href={privacyHref}>
              Tietosuojaseloste
            </a>
          ) : null}
        </div>
        <div className="mk-cookie-actions">
          <button
            type="button"
            className="mk-cookie-button mk-cookie-ghost"
            aria-expanded={detailsOpen}
            aria-controls="mk-cookie-details"
            onClick={() => setDetailsOpen((open) => !open)}
          >
            {detailsOpen ? "Piilota tiedot" : "Lisätiedot"}
          </button>
          <button
            type="button"
            className="mk-cookie-button mk-cookie-secondary"
            onClick={() => choose(false, false)}
          >
            Vain välttämättömät
          </button>
          <button
            type="button"
            className="mk-cookie-button mk-cookie-primary"
            onClick={() => choose(true, true)}
          >
            Hyväksy kaikki
          </button>
        </div>
      </div>
      <style>{`
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
      `}</style>
    </aside>
  );
}
