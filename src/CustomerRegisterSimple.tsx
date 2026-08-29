'use client';

import { useState } from 'react';
import { cn } from './utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface CustomerAccountType {
  value: string;
  label: string;
  requiresOrganization: boolean;
}

export interface CustomerRegisterSimpleLabels {
  name: string;
  email: string;
  password: string;
  minChars: string;
  accountType: string;
  createAccount: string;
  alreadyHave: string;
  errorGeneric: string;
}

export interface CustomerRegisterSimpleProps {
  productName: string;
  registerTitle: string;
  locale?: string;
  signInHref?: string;
  /** Optional consumer/business selection. Omit for a single account type. */
  accountTypes?: CustomerAccountType[];
  onRegister: (data: {
    name: string;
    email: string;
    password: string;
    accountType?: string;
  }) => void | Promise<void>;
  /** External error (e.g. server-action validation failure). */
  errorMessage?: string;
  /** When set, the form is replaced with this success message. */
  successMessage?: string;
  labels?: Partial<CustomerRegisterSimpleLabels>;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Built-in strings (fi / en / sv)                                           */
/* -------------------------------------------------------------------------- */

const FORM_LABELS: Record<string, Required<CustomerRegisterSimpleLabels>> = {
  fi: {
    name: 'Nimi',
    email: 'Sähköposti',
    password: 'Salasana',
    minChars: 'Vähintään 8 merkkiä',
    accountType: 'Tilityyppi',
    createAccount: 'Luo tili',
    alreadyHave: 'Onko sinulla jo tili? Kirjaudu sisään',
    errorGeneric: 'Jotain meni pieleen',
  },
  en: {
    name: 'Name',
    email: 'Email',
    password: 'Password',
    minChars: 'At least 8 characters',
    accountType: 'Account type',
    createAccount: 'Create Account',
    alreadyHave: 'Already have an account? Sign in',
    errorGeneric: 'Something went wrong',
  },
  sv: {
    name: 'Namn',
    email: 'E-post',
    password: 'Lösenord',
    minChars: 'Minst 8 tecken',
    accountType: 'Kontotyp',
    createAccount: 'Skapa konto',
    alreadyHave: 'Har du redan ett konto? Logga in',
    errorGeneric: 'Något gick fel',
  },
};

function labelsFor(
  locale: string | undefined,
  override?: CustomerRegisterSimpleProps['labels'],
): Required<CustomerRegisterSimpleLabels> {
  const base = FORM_LABELS[locale ?? 'fi'] ?? FORM_LABELS.fi!;
  return override ? { ...base, ...override } : base;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function CustomerRegisterSimple({
  productName,
  registerTitle,
  locale,
  signInHref,
  accountTypes,
  onRegister,
  errorMessage,
  successMessage,
  labels,
  className,
}: CustomerRegisterSimpleProps) {
  const L = labelsFor(locale, labels);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(accountTypes?.[0]?.value ?? '');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const error = submitError || errorMessage;
  const primary =
    'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');
    try {
      await onRegister({ name, email, password, accountType });
    } catch {
      setSubmitError(L.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

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
        {successMessage ? (
          <div className="text-center">
            <div
              className="mx-auto grid h-12 w-12 place-items-center rounded-full text-xl"
              style={{ background: 'var(--mk-status-success-soft, rgba(34,197,94,0.12))', color: 'var(--mk-status-success, #22C55E)' }}
            >
              ✓
            </div>
            <h1
              className="mt-4 text-xl font-bold"
              style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
            >
              {successMessage}
            </h1>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h1
              className="text-center text-xl font-bold"
              style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
            >
              {registerTitle}
            </h1>
            <p
              className="text-center text-xs"
              style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
            >
              {productName}
            </p>

            <Field label={L.name}>
              <InputBase
                value={name}
                onChange={setName}
                disabled={loading}
                required
              />
            </Field>
            <Field label={L.email}>
              <InputBase
                type="email"
                value={email}
                onChange={setEmail}
                disabled={loading}
                required
              />
            </Field>
            <Field label={L.password}>
              <InputBase
                type="password"
                value={password}
                onChange={setPassword}
                disabled={loading}
                required
                minLength={8}
              />
              <span
                className="text-xs"
                style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
              >
                {L.minChars}
              </span>
            </Field>

            {accountTypes && accountTypes.length > 0 && (
              <Field label={L.accountType}>
                <div className="flex flex-col gap-2">
                  {accountTypes.map((t) => (
                    <label
                      key={t.value}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm"
                      style={{
                        borderColor:
                          accountType === t.value
                            ? primary
                            : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                        color: 'var(--mk-palette-text-primary, #F0F0F3)',
                      }}
                    >
                      <input
                        type="radio"
                        name="accountType"
                        checked={accountType === t.value}
                        onChange={() => setAccountType(t.value)}
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </Field>
            )}

            {error && (
              <p
                className="text-center text-sm"
                style={{ color: 'var(--mk-status-error, #EF4444)' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || password.length < 8}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                background: `linear-gradient(135deg, ${primary}, color-mix(in srgb, ${primary} 60%, #7C3AED))`,
                color: 'var(--mk-palette-on-accent, #FFFFFF)',
              }}
            >
              {L.createAccount}
            </button>

            {signInHref && (
              <p
                className="text-center text-sm"
                style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
              >
                <a
                  href={signInHref}
                  className="hover:underline"
                  style={{ color: primary }}
                >
                  {L.alreadyHave}
                </a>
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm"
        style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function InputBase({
  type = 'text',
  value,
  onChange,
  disabled,
  required,
  minLength,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required={required}
      minLength={minLength}
      className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
      style={{
        borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
        background: 'var(--mk-palette-bg-surface, #242838)',
        color: 'var(--mk-palette-text-primary, #F0F0F3)',
      }}
    />
  );
}
