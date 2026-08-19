"use client";

import { useState, useTransition, type ElementType } from "react";
import { cn } from "./utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface SignInLayoutBenefit {
  icon: ElementType<{ className?: string }>;
  label: string;
}

export interface SignInLayoutProps {
  /* --- Brand panel --- */
  productName: string;
  productTagline: string;
  brandEyebrow: string;
  brandTitle: string;
  brandTitleAccent: string;
  brandDescription: string;
  benefits: SignInLayoutBenefit[];

  /* --- Preview card --- */
  previewTitle: string;
  previewValue: string;
  previewStatus: string;
  previewOrderName: string;
  previewOrderId: string;
  previewOrderStatus: string;
  previewOrderAmount: string;

  /* --- Form panel --- */
  formTitle: string;
  formSubtitle: string;
  formDescription: string;
  onSignIn: (email: string, password: string) => Promise<void>;

  /* --- Clerk satellite mode --- */
  authMode?: "credentials" | "clerk";
  clerkSignInUrl?: string;

  /* --- Centralized accounts redirect --- */
  accountsUrl?: string;
  accountsFrom?: string;

  /* --- Registration --- */
  registerHref: string;
  registerLabel: string;
  registerTitle: string;
  registerDescription: string;

  /* --- Navigation --- */
  backHref: string;
  backLabel: string;

  /* --- Misc --- */
  securityNote: string;
  errorMessage?: string;

  className?: string;

  /** Current language, e.g. "fi". Built-in: fi, en, sv — unlisted locales fall back to fi. */
  locale?: string;

  /** Override any of the form's own built-in strings. Built-in: fi, en, sv. */
  labels?: {
    emailLabel?: string;
    emailPlaceholder?: string;
    passwordLabel?: string;
    passwordPlaceholder?: string;
    showPassword?: string;
    hidePassword?: string;
    signInButton?: string;
    clerkRedirect?: string;
    orDivider?: string;
  };
}

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
const SIGN_IN_FORM_LABELS: Record<string, Required<NonNullable<SignInLayoutProps["labels"]>>> = {
  fi: {
    emailLabel: "Sähköposti",
    emailPlaceholder: "sinä@esimerkki.fi",
    passwordLabel: "Salasana",
    passwordPlaceholder: "••••••••",
    showPassword: "Näytä salasana",
    hidePassword: "Piilota salasana",
    signInButton: "Kirjaudu",
    clerkRedirect: "Kirjaudu Clerk-tunnuksella",
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
    orDivider: "eller",
  },
};

function formLabelsFor(
  locale: string | undefined,
  override?: SignInLayoutProps["labels"]
): Required<NonNullable<SignInLayoutProps["labels"]>> {
  const base = SIGN_IN_FORM_LABELS[locale ?? "fi"] ?? SIGN_IN_FORM_LABELS.fi!;
  return override ? { ...base, ...override } : base;
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function BrandMark() {
  return (
    <div
      className="relative grid h-[42px] w-[42px] place-items-center"
      style={{ background: "var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))" }}
      aria-hidden="true"
    >
      <span
        className="absolute h-[6px] w-[18px] border-2 border-white"
        style={{ transform: "rotate(30deg) skewX(-22deg)" }}
      />
      <span
        className="absolute h-[6px] w-[18px] border-2 border-white"
        style={{ transform: "translateY(7px) rotate(30deg) skewX(-22deg)" }}
      />
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SuccessCheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
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
export function SignInLayout({
  productName,
  productTagline,
  brandEyebrow,
  brandTitle,
  brandTitleAccent,
  brandDescription,
  benefits,
  previewTitle,
  previewValue,
  previewStatus,
  previewOrderName,
  previewOrderId,
  previewOrderStatus,
  previewOrderAmount,
  formTitle,
  formSubtitle,
  formDescription,
  onSignIn,
  authMode = "credentials",
  clerkSignInUrl,
  // accounts delegation removed per product decision; props kept for consumer compat
  accountsUrl: _accountsUrl,
  accountsFrom: _accountsFrom,
  registerHref,
  registerLabel,
  registerTitle,
  registerDescription,
  backHref,
  backLabel,
  securityNote,
  errorMessage,
  className,
  locale,
  labels,
}: SignInLayoutProps) {
  const L = formLabelsFor(locale, labels);
  // Delegated sign-in redirect: Clerk takes priority when the product opts
  // into it, since a Clerk-authenticated product has no local password form
  // of its own to redirect away from — Accounts is the fallback delegation.
  const delegatedSignIn =
    authMode === "clerk" && clerkSignInUrl
      ? { href: clerkSignInUrl, label: L.clerkRedirect }
      : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const hasError = !!errorMessage && errorMessage.length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const raw = data.get("email");
    const emailValue = typeof raw === "string" ? raw.trim() : "";
    const pw = data.get("password");
    const pwValue = typeof pw === "string" ? pw : "";

    // Server must validate; these are just early-client guards.
    if (!emailValue || !pwValue) return;

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

  return (
    <div
      className={cn("min-h-svh p-[clamp(12px,2vw,28px)] max-sm:p-0", className)}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${primary} 5%, transparent), transparent 45%), var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))`,
      }}
    >
      <style>{SIGN_IN_GRID_CSS}</style>
      <div
        data-mk-signin-grid=""
        className="mx-auto grid w-full min-h-[calc(100svh-clamp(24px,4vw,56px))] max-w-[1440px] overflow-hidden rounded-[28px] border shadow-2xl max-sm:min-h-svh max-sm:rounded-none max-sm:border-0"
        style={{
          borderColor: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))",
          background: "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))",
          boxShadow: "var(--mk-shadow-xl, 0 20px 60px rgba(0,0,0,0.4))",
        }}
      >
        {/* ===== LEFT: Brand panel ===== */}
        <div className="relative hidden min-h-[720px] flex-col overflow-hidden p-[clamp(36px,4.5vw,72px)] max-sm:hidden sm:flex" style={{ isolation: "isolate" }}>
          {/* Grid-dot background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background: `
                linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                #101012
              `,
              backgroundSize: "46px 46px",
            }}
          />

          {/* Concentric circle decoration */}
          <div
            aria-hidden="true"
            className="absolute right-[-18%] bottom-[-24%] -z-10 aspect-square w-[72%] rounded-full border"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              boxShadow: "0 0 0 70px rgba(255,255,255,0.025), 0 0 0 140px rgba(255,255,255,0.018)",
            }}
          />

          {/* Accent glow */}
          <div
            aria-hidden="true"
            className="absolute top-[6%] left-[12%] -z-10 h-[360px] w-[360px] rounded-full blur-[110px]"
            style={{
              background: `color-mix(in srgb, ${primary} 28%, transparent)`,
            }}
          />

          {/* Logo / brand */}
          <a href={backHref} className="inline-flex w-fit items-center gap-3 text-white no-underline">
            <BrandMark />
            <span>
              <strong className="block font-[var(--font-heading)] text-[17px] tracking-[-0.025em]">
                {productName}
              </strong>
              <small className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">
                {productTagline}
              </small>
            </span>
          </a>

          {/* Brand copy */}
          <div className="mt-auto max-w-[620px] pt-20 max-sm:mt-[52px] max-sm:pt-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: primary }}>
              {brandEyebrow}
            </p>
            <h2 className="mt-[18px] font-[var(--font-heading)] text-[clamp(38px,4.2vw,66px)] leading-[0.98] tracking-[-0.06em] text-white max-sm:text-[clamp(34px,7vw,48px)]" style={{ fontSize: "clamp(38px,4.2vw,66px)" }}>
              {brandTitle}{" "}
              <span style={{ color: primary }}>
                {brandTitleAccent}
              </span>
            </h2>
            <p className="mt-6 max-w-[540px] text-base leading-[1.7] text-white/60 max-sm:hidden">
              {brandDescription}
            </p>

            {/* Benefits */}
            <ul className="mt-[34px] flex flex-wrap gap-[10px] p-0 list-none max-sm:mt-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.label}
                    className="inline-flex min-h-[38px] items-center gap-2 border px-[13px] text-[11px] font-bold text-white/80"
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.045)",
                    }}
                  >
                    <Icon className="h-[14px] w-[14px]" style={{ color: primary }} />
                    {b.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preview card */}
          <div
            className="mt-[34px] rounded-[18px] border p-5 shadow-[0_26px_70px_rgba(0,0,0,0.28)] backdrop-blur-[18px] max-sm:hidden"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(12,12,14,0.72)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="grid h-[38px] w-[38px] place-items-center text-[#e9878a]"
                style={{ background: "rgba(220,38,38,0.13)" }}
              >
                <SuccessCheckIcon />
              </span>
              <span>
                <small className="block text-[9px] text-white/40">{previewTitle}</small>
                <strong className="mt-[3px] block text-sm text-white">{previewValue}</strong>
              </span>
              <i className="ml-auto text-[9px] font-bold not-italic text-[#74c69d]">{previewStatus}</i>
            </div>

            <div className="mt-[18px] flex items-center gap-3 border-t pt-[18px]" style={{ borderTopColor: "rgba(255,255,255,0.08)" }}>
              <span
                className="grid h-[42px] w-[42px] place-items-center text-[10px] font-black text-white"
                style={{ background: "linear-gradient(135deg, #7a272b, #1d1d20)" }}
              >
                {previewOrderName.slice(0, 2).toUpperCase()}
              </span>
              <span>
                <small className="block text-[9px] text-white/40">{previewOrderId}</small>
                <strong className="mb-1 block text-[11px] text-white">{previewOrderName}</strong>
              </span>
              <b className="ml-auto text-[11px] text-white">{previewOrderAmount}</b>
            </div>

            <div className="mt-[18px] grid grid-cols-4 gap-[5px]">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="h-[3px]" style={{ background: primary }} />
              ))}
              <span className="h-[3px]" style={{ background: "rgba(255,255,255,0.12)" }} />
            </div>

            <p className="mt-7 text-[10px] text-white/35 max-sm:hidden">{previewOrderStatus}</p>
          </div>

          <p className="mt-7 text-[10px] text-white/35 max-sm:hidden">{securityNote}</p>
        </div>

        {/* ===== RIGHT: Form panel ===== */}
        <div
          className="grid min-w-0 place-items-center p-[clamp(72px,9vw,126px)_clamp(32px,7vw,108px)_54px] max-sm:p-[48px_clamp(22px,8vw,72px)_64px]"
          style={{ background: "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))" }}
        >
          <div className="w-full max-w-[500px]">
            {/* Back link */}
            <a
              href={backHref}
              className="inline-flex items-center gap-2 text-xs font-bold no-underline"
              style={{ color: "var(--mk-palette-text-secondary, #B0B3C1)" }}
            >
              <ArrowLeftIcon />
              {backLabel}
            </a>

            {/* Form heading */}
            <div className="mt-[clamp(52px,8vh,88px)] max-sm:mt-12">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em]" style={{ color: primary }}>
                {formSubtitle}
              </p>
              <h1 className="mt-3 font-[var(--font-heading)] text-[clamp(34px,4vw,50px)] leading-[1.05] tracking-[-0.05em] max-sm:text-[34px]" style={{ color: "var(--mk-palette-text-primary, #F0F0F3)" }}>
                {formTitle}
              </h1>
              <p className="mt-[14px] max-w-[430px] text-sm leading-[1.65]" style={{ color: "var(--mk-palette-text-secondary, #B0B3C1)" }}>
                {formDescription}
              </p>
            </div>

            {/* Accounts or Clerk redirect — mutually exclusive delegated sign-in options */}
            {delegatedSignIn ? (
              <div className="mt-8">
                <a
                  href={delegatedSignIn.href}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 font-semibold text-sm transition-colors duration-[160ms] ease-in-out"
                  style={{
                    borderColor: `color-mix(in srgb, ${primary} 55%, transparent)`,
                    background: `color-mix(in srgb, ${primary} 12%, transparent)`,
                    color: primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `color-mix(in srgb, ${primary} 24%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `color-mix(in srgb, ${primary} 12%, transparent)`;
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
                  </svg>
                  {delegatedSignIn.label}
                </a>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ background: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" }} />
                  <span className="text-xs" style={{ color: "var(--mk-palette-text-tertiary, #7E8292)" }}>{L.orDivider}</span>
                  <div className="flex-1 h-px" style={{ background: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" }} />
                </div>
              </div>
            ) : null}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-9 grid gap-[21px]">
              {/* Error banner */}
              {hasError && (
                <div
                  className="flex items-start gap-[10px] rounded-[10px] border p-[13px_14px] text-xs leading-[1.55]"
                  role="alert"
                  style={{
                    borderColor: `color-mix(in srgb, ${errorColor} 24%, transparent)`,
                    background: errorSubtle,
                    color: errorColor,
                  }}
                >
                  <span
                    className="grid h-[18px] w-[18px] flex-none place-items-center rounded-full text-[10px] font-black text-white"
                    style={{ background: errorColor }}
                  >
                    !
                  </span>
                  <p className="m-0">{errorMessage}</p>
                </div>
              )}

              {/* Email */}
              <div className="grid gap-[9px]">
                <label
                  className="text-xs font-extrabold"
                  htmlFor="signin-email"
                  style={{ color: "var(--mk-palette-text-primary, #F0F0F3)" }}
                >
                  {L.emailLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-4" style={{ color: "var(--mk-palette-text-tertiary, #7E8292)" }}>
                    <MailIcon />
                  </span>
                  <input
                    id="signin-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={L.emailPlaceholder}
                    aria-invalid={hasError ? "true" : undefined}
                    className="h-[54px] w-full rounded-xl border bg-transparent px-12 text-sm outline-none transition-colors duration-[160ms] ease-in-out"
                    style={{
                      borderColor: "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                      background: "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))",
                      color: "var(--mk-palette-text-primary, #F0F0F3)",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = primary;
                      e.currentTarget.style.boxShadow = `0 0 0 4px ${primarySubtle}`;
                      e.currentTarget.style.background = "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-[9px]">
                <label
                  className="text-xs font-extrabold"
                  htmlFor="signin-password"
                  style={{ color: "var(--mk-palette-text-primary, #F0F0F3)" }}
                >
                  {L.passwordLabel}
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-4" style={{ color: "var(--mk-palette-text-tertiary, #7E8292)" }}>
                    <LockIcon />
                  </span>
                  <input
                    id="signin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={L.passwordPlaceholder}
                    aria-invalid={hasError ? "true" : undefined}
                    className="h-[54px] w-full rounded-xl border bg-transparent px-12 text-sm outline-none transition-colors duration-[160ms] ease-in-out"
                    style={{
                      borderColor: hasError ? errorColor : "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                      background: "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))",
                      color: "var(--mk-palette-text-primary, #F0F0F3)",
                    }}
                    onFocus={(e) => {
                      if (hasError) return;
                      e.currentTarget.style.borderColor = primary;
                      e.currentTarget.style.boxShadow = `0 0 0 4px ${primarySubtle}`;
                      e.currentTarget.style.background = "var(--mk-palette-bg-elevated, var(--mk-palette-bg-surface, #1A1D27))";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = hasError ? errorColor : "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "var(--mk-palette-bg-canvas, var(--mk-palette-bg, #0D0F17))";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 grid h-10 w-10 place-items-center rounded-lg border-0 bg-transparent cursor-pointer"
                    style={{ color: "var(--mk-palette-text-secondary, #B0B3C1)" }}
                    aria-label={showPassword ? L.hidePassword : L.showPassword}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--mk-palette-bg-muted, #2A2E3D)";
                      e.currentTarget.style.color = "var(--mk-palette-text-primary, #F0F0F3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--mk-palette-text-secondary, #B0B3C1)";
                    }}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" x2="22" y1="2" y2="22" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="mt-[3px] flex h-[54px] w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-colors duration-[160ms] ease-in-out disabled:opacity-50"
                style={{
                  background: primary,
                  boxShadow: `0 12px 28px ${primaryGlow}`,
                }}
                onMouseEnter={(e) => {
                  if (!isPending) {
                    e.currentTarget.style.background = "var(--mk-palette-accent-hover, #A51E23)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPending) {
                    e.currentTarget.style.background = primary;
                  }
                }}
              >
                {isPending ? (
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : null}
                {formTitle}
              </button>
            </form>

            {/* Register prompt */}
            <div
              className="mt-[42px] flex items-center justify-between gap-6 border-y py-[19px] max-sm:flex-col max-sm:items-start max-sm:gap-[14px]"
              style={{ borderColor: "var(--mk-palette-border-subtle, rgba(255,255,255,0.08))" }}
            >
              <span>
                <strong className="block text-xs" style={{ color: "var(--mk-palette-text-primary, #F0F0F3)" }}>
                  {registerTitle}
                </strong>
                <span className="mt-1 block text-[10px]" style={{ color: "var(--mk-palette-text-secondary, #B0B3C1)" }}>
                  {registerDescription}
                </span>
              </span>
              <a
                href={registerHref}
                className="inline-flex min-h-10 flex-none items-center gap-[7px] rounded-[9px] border px-[14px] text-[11px] font-extrabold no-underline transition-colors"
                style={{
                  borderColor: "var(--mk-palette-border-default, rgba(255,255,255,0.14))",
                  color: "var(--mk-palette-text-primary, #F0F0F3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = primary;
                  e.currentTarget.style.color = primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--mk-palette-border-default, rgba(255,255,255,0.14))";
                  e.currentTarget.style.color = "var(--mk-palette-text-primary, #F0F0F3)";
                }}
              >
                {registerLabel}
                <ChevronRightIcon />
              </a>
            </div>

            {/* Security note */}
            <div className="mt-[22px] flex items-center justify-center gap-[7px] text-[10px]" style={{ color: "var(--mk-palette-text-tertiary, #7E8292)" }}>
              <ShieldIcon />
              {securityNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
