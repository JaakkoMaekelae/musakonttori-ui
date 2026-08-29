'use client';

import { useState } from 'react';
import { cn } from './utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type CustomerSignInProvider =
  | 'credentials'
  | 'nodemailer'
  | 'google'
  | 'facebook';

export interface CustomerSignInLabels {
  subtitle: string;
  tabEmail: string;
  tabSocial: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  signInEmail: string;
  sendMagicLink: string;
  continueGoogle: string;
  continueFacebook: string;
  noAccount: string;
  createOne: string;
  or: string;
  errorEnterEmail: string;
  errorInvalid: string;
  errorSendFailed: string;
  errorCheckEmail: string;
}

export interface CustomerSignInProps {
  /** Product/brand name shown above the form (e.g. "SmartLink", "Market"). */
  productName: string;
  /** Where the "create account" prompt links to (the product's register route). */
  registerHref: string;
  /** Where the "forgot password" prompt links to (optional). */
  resetHref?: string;
  /** Current language: fi, en, sv. Unlisted locales fall back to fi. */
  locale?: string;
  /**
   * Auth action. The product wires this to the shared Accounts client, e.g.
   * `(provider, opts) => signIn(provider, opts)` from
   * `@musakonttori/auth/accounts-client`.
   */
  onSignIn: (
    provider: CustomerSignInProvider,
    options?: { email?: string; password?: string; callbackUrl?: string },
  ) => void | Promise<void>;
  /** Override any built-in string. */
  labels?: Partial<CustomerSignInLabels>;
  /** External error message (e.g. from a server-action login failure). */
  errorMessage?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Built-in strings (fi / en / sv)                                           */
/* -------------------------------------------------------------------------- */

const FORM_LABELS: Record<string, Required<CustomerSignInLabels>> = {
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

function labelsFor(
  locale: string | undefined,
  override?: CustomerSignInProps['labels'],
): Required<CustomerSignInLabels> {
  const base = FORM_LABELS[locale ?? 'fi'] ?? FORM_LABELS.fi!;
  return override ? { ...base, ...override } : base;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function CustomerSignIn({
  productName,
  registerHref,
  resetHref,
  locale,
  onSignIn,
  labels,
  errorMessage,
  className,
}: CustomerSignInProps) {
  const L = labelsFor(locale, labels);
  const [tab, setTab] = useState<'email' | 'social'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  return (
    <div
      className={cn('flex min-h-svh items-center justify-center px-4', className)}
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--mk-palette-accent-primary, #BF2227) 6%, transparent), transparent 55%), var(--mk-palette-bg-canvas, #0D0F17)',
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{
          borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
          background: 'var(--mk-palette-bg-elevated, #1A1D27)',
          boxShadow: 'var(--mk-shadow-xl, 0 20px 60px rgba(0,0,0,0.4))',
        }}
      >
        <h1
          className="mb-1 text-center text-2xl font-bold"
          style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
        >
          {productName}
        </h1>
        <p
          className="mb-6 text-center text-sm"
          style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
        >
          {L.subtitle}
        </p>

        <div
          className="mb-6 flex overflow-hidden rounded-xl border"
          style={{ borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' }}
        >
          <button
            type="button"
            onClick={() => setTab('email')}
            className="flex-1 py-2 text-sm font-semibold transition-colors"
            style={{
              background:
                tab === 'email'
                  ? 'var(--mk-palette-bg-surface, #242838)'
                  : 'transparent',
              color:
                tab === 'email'
                  ? 'var(--mk-palette-text-primary, #F0F0F3)'
                  : 'var(--mk-palette-text-secondary, #B0B3C1)',
            }}
          >
            {L.tabEmail}
          </button>
          <button
            type="button"
            onClick={() => setTab('social')}
            className="flex-1 py-2 text-sm font-semibold transition-colors"
            style={{
              background:
                tab === 'social'
                  ? 'var(--mk-palette-bg-surface, #242838)'
                  : 'transparent',
              color:
                tab === 'social'
                  ? 'var(--mk-palette-text-primary, #F0F0F3)'
                  : 'var(--mk-palette-text-secondary, #B0B3C1)',
            }}
          >
            {L.tabSocial}
          </button>
        </div>

        {tab === 'email' ? (
          <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder={L.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                background: 'var(--mk-palette-bg-surface, #242838)',
                color: 'var(--mk-palette-text-primary, #F0F0F3)',
              }}
            />
            <input
              type="password"
              placeholder={L.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                background: 'var(--mk-palette-bg-surface, #242838)',
                color: 'var(--mk-palette-text-primary, #F0F0F3)',
              }}
            />

            {resetHref && (
              <div className="flex justify-end">
                <a
                  href={resetHref}
                  className="text-sm"
                  style={{ color: 'var(--mk-palette-accent-primary, #BF2227)' }}
                >
                  {L.forgotPassword}
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${primary}, color-mix(in srgb, ${primary} 60%, #7C3AED))`,
                color: 'var(--mk-palette-on-accent, #FFFFFF)',
              }}
            >
              {L.signInEmail}
            </button>

            <div className="my-1 flex items-center gap-3">
              <div className="flex-1" style={{ height: 1, background: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' }} />
              <span className="text-xs" style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}>
                {L.or}
              </span>
              <div className="flex-1" style={{ height: 1, background: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))' }} />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleMagicLink}
              className="rounded-xl border px-4 py-2 text-sm transition-colors"
              style={{
                borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                color: 'var(--mk-palette-text-primary, #F0F0F3)',
              }}
            >
              {L.sendMagicLink}
            </button>

            {error || errorMessage ? (
              <p
                className="text-center text-sm"
                style={{
                  color:
                    error === L.errorCheckEmail
                      ? 'var(--mk-status-success, #22C55E)'
                      : 'var(--mk-status-error, #EF4444)',
                }}
              >
                {error || errorMessage}
              </p>
            ) : null}
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <SocialButton onClick={() => onSignIn('google')}>{L.continueGoogle}</SocialButton>
            <SocialButton onClick={() => onSignIn('facebook')}>{L.continueFacebook}</SocialButton>
          </div>
        )}

        <p
          className="mt-6 text-center text-sm"
          style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
        >
          {L.noAccount}{' '}
          <a
            href={registerHref}
            className="hover:underline"
            style={{ color: 'var(--mk-palette-accent-primary, #BF2227)' }}
          >
            {L.createOne}
          </a>
        </p>
      </div>
    </div>
  );
}

function SocialButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors"
      style={{
        borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
        color: 'var(--mk-palette-text-primary, #F0F0F3)',
      }}
    >
      {children}
    </button>
  );
}
