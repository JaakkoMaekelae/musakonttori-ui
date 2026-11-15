"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowRight, KeyRound, Lock, ShieldCheck } from "lucide-react";

import { cn } from "./utils";

export type AdminAuthStep =
  "credentials" | "mfa" | "enroll" | "backup" | "password" | "done";

export interface AdminAuthBrand {
  name: string;
  title: string;
  accent?: string;
  description?: string;
  benefits?: Array<{ title: string; description: string }>;
  logo?: ReactNode;
}

export interface AdminAuthLabels {
  signInHeading: string;
  signInDescription: string;
  identifier: string;
  password: string;
  signIn: string;
  signingIn: string;
  mfaHeading: string;
  mfaDescription: string;
  code: string;
  verify: string;
  verifying: string;
  enrollHeading: string;
  enrollDescription: string;
  secretLabel: string;
  qrAlt: string;
  openInAuthenticator: string;
  backupHeading: string;
  backupDescription: string;
  backupSaved: string;
  passwordHeading: string;
  passwordDescription: string;
  newPassword: string;
  confirmPassword: string;
  savePassword: string;
  saving: string;
  doneHeading: string;
  doneDescription: string;
  genericError: string;
  errors: Record<string, string>;
}

export interface AdminAuthEndpoints {
  login: string;
  mfaVerify: string;
  mfaEnroll: string;
  password: string;
}

export interface AdminAuthPageProps {
  brand: AdminAuthBrand;
  labels: AdminAuthLabels;
  endpoints?: Partial<AdminAuthEndpoints>;
  /** Product slug for the HQ handoff after a successful login. */
  product?: string;
  /** Where HQ should send the user back after the handoff. */
  returnTo?: string;
  /** Fallback target when no product handoff is requested. */
  successHref?: string;
  onSuccess?: () => void;
  className?: string;
}

const DEFAULT_ENDPOINTS: AdminAuthEndpoints = {
  login: "/api/admin-auth/login",
  mfaVerify: "/api/admin-auth/mfa/verify",
  mfaEnroll: "/api/admin-auth/mfa/enroll",
  password: "/api/admin-auth/password",
};

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };
  if (!response.ok) throw new Error(data.error ?? "request_failed");
  return data;
}

export function AdminAuthPage({
  brand,
  labels,
  endpoints,
  product,
  returnTo,
  successHref = "/admin",
  onSuccess,
  className,
}: AdminAuthPageProps) {
  const titleId = useId();
  const urls = { ...DEFAULT_ENDPOINTS, ...endpoints };

  const [step, setStep] = useState<AdminAuthStep>("credentials");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [otpauth, setOtpauth] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const errorText = error
    ? (labels.errors[error] ??
      labels.errors[error.replace(":", "_")] ??
      labels.genericError)
    : null;

  function finish(result: { mustChangePassword?: boolean }) {
    if (result.mustChangePassword) {
      setMustChangePassword(true);
      setStep("password");
      return;
    }
    setStep("done");
    onSuccess?.();
    if (product) {
      const params = new URLSearchParams({ product });
      if (returnTo) params.set("returnTo", returnTo);
      window.location.assign(`/api/admin-auth/handoff?${params.toString()}`);
      return;
    }
    window.location.assign(successHref);
  }

  async function submitCredentials(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await postJson<{
        enrollmentRequired?: boolean;
        enrollmentOptional?: boolean;
        mustChangePassword?: boolean;
      }>(urls.login, { identifier, password });
      setMustChangePassword(Boolean(result.mustChangePassword));
      if (result.enrollmentOptional) {
        finish(result);
        return;
      }
      if (result.enrollmentRequired) {
        const start = await postJson<{
          secret: string;
          otpauthUri: string;
          qrDataUrl?: string;
        }>(urls.mfaEnroll, { step: "start" });
        setSecret(start.secret);
        setOtpauth(start.otpauthUri);
        setQrDataUrl(start.qrDataUrl ?? "");
        setStep("enroll");
      } else {
        setStep("mfa");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "request_failed");
    } finally {
      setBusy(false);
    }
  }

  async function submitMfa(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await postJson<{ mustChangePassword?: boolean }>(
        urls.mfaVerify,
        {
          code,
        }
      );
      finish(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "request_failed");
    } finally {
      setBusy(false);
    }
  }

  async function confirmEnrollment(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await postJson<{
        backupCodes?: string[];
        mustChangePassword?: boolean;
      }>(urls.mfaEnroll, { step: "confirm", code });
      setBackupCodes(result.backupCodes ?? []);
      setMustChangePassword(Boolean(result.mustChangePassword));
      setStep("backup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "request_failed");
    } finally {
      setBusy(false);
    }
  }

  async function submitPassword(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await postJson(urls.password, {
        password: newPassword,
        confirm: confirmPassword,
      });
      finish({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "request_failed");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] px-3 py-3 text-[var(--mk-auth-text)]";
  const buttonClass =
    "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--mk-auth-accent)] px-4 text-sm font-bold text-white transition-colors hover:bg-[var(--mk-auth-accent-hover)] disabled:opacity-50";

  return (
    <div className={cn("mk-auth mk-auth-page", className)}>
      <aside className="mk-auth-brand" aria-labelledby={titleId}>
        <div className="mk-auth-brand-name">
          {brand.logo ?? (
            <span className="mk-auth-equalizer" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          )}
          <span>{brand.name}</span>
        </div>
        <div className="mk-auth-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mk-auth-brand-copy">
          <p className="mk-auth-kicker">{brand.name}</p>
          <h1 id={titleId}>
            {brand.title}
            {brand.accent ? <span>{brand.accent}</span> : null}
          </h1>
          {brand.description ? <p>{brand.description}</p> : null}
        </div>
        {brand.benefits?.length ? (
          <ul className="mk-auth-benefits">
            {brand.benefits.map((benefit) => (
              <li key={benefit.title}>
                <strong>{benefit.title}</strong>
                <span>{benefit.description}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </aside>

      <div className="mk-auth-panel">
        <header className="mk-auth-top">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--mk-auth-muted)]">
            <ShieldCheck size={16} aria-hidden="true" /> HQ Admin
          </span>
        </header>

        <div className="mk-auth-form">
          {errorText ? (
            <p
              role="alert"
              className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {errorText}
            </p>
          ) : null}

          {step === "credentials" ? (
            <form onSubmit={submitCredentials} className="mk-auth-fields">
              <h2>{labels.signInHeading}</h2>
              <p className="mk-auth-description">{labels.signInDescription}</p>
              <div>
                <label htmlFor="admin-identifier">{labels.identifier}</label>
                <input
                  id="admin-identifier"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="admin-password">{labels.password}</label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClass}
                />
              </div>
              <button type="submit" disabled={busy} className={buttonClass}>
                <Lock size={16} aria-hidden="true" />
                {busy ? labels.signingIn : labels.signIn}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          ) : null}

          {step === "mfa" || step === "enroll" ? (
            <form
              onSubmit={step === "mfa" ? submitMfa : confirmEnrollment}
              className="mk-auth-fields"
            >
              <h2>
                {step === "mfa" ? labels.mfaHeading : labels.enrollHeading}
              </h2>
              <p className="mk-auth-description">
                {step === "mfa"
                  ? labels.mfaDescription
                  : labels.enrollDescription}
              </p>
              {step === "enroll" ? (
                <div className="rounded-lg border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] p-4 text-sm">
                  {qrDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={qrDataUrl}
                      alt={labels.qrAlt}
                      width={220}
                      height={220}
                      className="mx-auto rounded bg-white p-2"
                    />
                  ) : null}
                  <p className="mt-3 text-xs text-[var(--mk-auth-muted)]">
                    {labels.secretLabel}
                  </p>
                  <p className="mt-1 font-mono text-base tracking-widest break-all">
                    {secret}
                  </p>
                  <a
                    className="mt-2 inline-block text-xs underline"
                    href={otpauth}
                  >
                    {labels.openInAuthenticator}
                  </a>
                </div>
              ) : null}
              <div>
                <label htmlFor="admin-code">{labels.code}</label>
                <input
                  id="admin-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={inputClass}
                />
              </div>
              <button type="submit" disabled={busy} className={buttonClass}>
                <KeyRound size={16} aria-hidden="true" />
                {busy ? labels.verifying : labels.verify}
              </button>
            </form>
          ) : null}

          {step === "backup" ? (
            <div className="mk-auth-fields">
              <h2>{labels.backupHeading}</h2>
              <p className="mk-auth-description">{labels.backupDescription}</p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {backupCodes.map((backupCode) => (
                  <li
                    key={backupCode}
                    className="rounded border border-[var(--mk-auth-border)] bg-[var(--mk-auth-input)] px-2 py-2 text-center"
                  >
                    {backupCode}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => finish({ mustChangePassword })}
                className={buttonClass}
              >
                {labels.backupSaved}
              </button>
            </div>
          ) : null}

          {step === "password" ? (
            <form onSubmit={submitPassword} className="mk-auth-fields">
              <h2>{labels.passwordHeading}</h2>
              <p className="mk-auth-description">
                {labels.passwordDescription}
              </p>
              <div>
                <label htmlFor="admin-new-password">{labels.newPassword}</label>
                <input
                  id="admin-new-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="admin-confirm-password">
                  {labels.confirmPassword}
                </label>
                <input
                  id="admin-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={inputClass}
                />
              </div>
              <button type="submit" disabled={busy} className={buttonClass}>
                {busy ? labels.saving : labels.savePassword}
              </button>
            </form>
          ) : null}

          {step === "done" ? (
            <div className="mk-auth-fields" role="status" aria-live="polite">
              <h2>{labels.doneHeading}</h2>
              <p className="mk-auth-description">{labels.doneDescription}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
