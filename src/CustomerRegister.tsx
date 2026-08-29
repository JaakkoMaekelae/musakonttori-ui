'use client';

import { useState } from 'react';
import { cn } from './utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface CustomerAccountType {
  value: string;
  label: string;
  /** Business accounts create an Organization; consumers skip straight to a personal workspace. */
  requiresOrganization: boolean;
}

export interface CustomerRegisterLabels {
  stepAccount: string;
  stepOrganization: string;
  stepWorkspace: string;
  createAccount: string;
  name: string;
  email: string;
  password: string;
  minChars: string;
  accountType: string;
  continueGoogle: string;
  continueFacebook: string;
  alreadyHave: string;
  createOrganization: string;
  orgName: string;
  orgNamePlaceholder: string;
  orgSlug: string;
  slugAuto: string;
  continue: string;
  createWorkspace: string;
  workspaceName: string;
  workspacePlaceholder: string;
  workspaceType: string;
  goDashboard: string;
  back: string;
  errorGeneric: string;
}

export interface CustomerRegisterProps {
  /** Brand name shown on the account step. */
  productName: string;
  /** Account step heading, e.g. "Create Account". */
  registerTitle: string;
  /** Consumer/business options. The consumer option has requiresOrganization=false. */
  accountTypes: CustomerAccountType[];
  /** Workspace type options (industry), e.g. ["Artist", "Venue", ...]. */
  workspaceTypes: string[];
  /** "Already have an account? Sign in" target. */
  signInHref?: string;
  locale?: string;
  /** Account step: the product delegates account creation to the shared Accounts service. */
  onRegister: (data: {
    name: string;
    email: string;
    password: string;
    accountType: string;
  }) => void;
  /** Organization step (business only). Resolves to the created org id. */
  onCreateOrganization?: (data: {
    name: string;
    slug: string;
  }) => Promise<{ id: string; error?: string }>;
  /** Workspace step (final). Resolves with an optional error. */
  onCreateWorkspace: (data: {
    name: string;
    slug: string;
    type: string;
    organizationId?: string;
  }) => Promise<{ error?: string } | void>;
  /** Called after the workspace is created (the product redirects to its app). */
  onFinish: () => void;
  labels?: Partial<CustomerRegisterLabels>;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Built-in strings (fi / en / sv)                                           */
/* -------------------------------------------------------------------------- */

const FORM_LABELS: Record<string, Required<CustomerRegisterLabels>> = {
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

function labelsFor(
  locale: string | undefined,
  override?: CustomerRegisterProps['labels'],
): Required<CustomerRegisterLabels> {
  const base = FORM_LABELS[locale ?? 'fi'] ?? FORM_LABELS.fi!;
  return override ? { ...base, ...override } : base;
}

function slugify(value: string): string {
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

export function CustomerRegister({
  productName,
  registerTitle,
  accountTypes,
  workspaceTypes,
  signInHref,
  locale,
  onRegister,
  onCreateOrganization,
  onCreateWorkspace,
  onFinish,
  labels,
  className,
}: CustomerRegisterProps) {
  const L = labelsFor(locale, labels);
  const consumer = accountTypes.find((t) => !t.requiresOrganization);

  const [step, setStep] = useState<'account' | 'organization' | 'workspace'>(
    'account',
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(accountTypes[0]?.value ?? '');

  const [orgName, setOrgName] = useState('');
  const [orgSlug, setOrgSlug] = useState('');
  const [organizationId, setOrganizationId] = useState<string | undefined>();

  const [wsName, setWsName] = useState('');
  const [wsSlug, setWsSlug] = useState('');
  const [wsType, setWsType] = useState(workspaceTypes[0] ?? '');

  const requiresOrg = Boolean(
    accountTypes.find((t) => t.value === accountType)?.requiresOrganization,
  );

  const stepLabels = consumer
    ? [L.stepAccount, L.stepWorkspace]
    : [L.stepAccount, L.stepOrganization, L.stepWorkspace];

  const stepIndex =
    step === 'account' ? 0 : step === 'organization' ? 1 : consumer ? 1 : 2;

  const primary =
    'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    onRegister({ name, email, password, accountType });
  }

  async function handleCreateOrg(e: React.FormEvent) {
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

  async function handleCreateWorkspace(e: React.FormEvent) {
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
        {/* Stepper */}
        <div className="mb-8 flex items-center">
          {stepLabels.map((label, index) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-semibold"
                  style={{
                    borderColor:
                      index < stepIndex
                        ? primary
                        : index === stepIndex
                          ? primary
                          : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                    background:
                      index < stepIndex ? primary : 'transparent',
                    color:
                      index <= stepIndex
                        ? 'var(--mk-palette-text-primary, #F0F0F3)'
                        : 'var(--mk-palette-text-secondary, #B0B3C1)',
                  }}
                >
                  {index < stepIndex ? '✓' : index + 1}
                </div>
                <span
                  className="mt-1 text-xs"
                  style={{
                    color:
                      index === stepIndex
                        ? primary
                        : 'var(--mk-palette-text-secondary, #B0B3C1)',
                  }}
                >
                  {label}
                </span>
              </div>
              {index < stepLabels.length - 1 && (
                <div
                  className="mx-2 mb-4 flex-1"
                  style={{
                    height: 1,
                    background:
                      index < stepIndex
                        ? primary
                        : 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {step === 'account' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <h2
              className="text-center text-xl font-bold"
              style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
            >
              {registerTitle}
            </h2>
            <p
              className="text-center text-xs"
              style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
            >
              {productName}
            </p>

            <Field label={L.name}>
              <InputBase
                type="text"
                value={name}
                onChange={setName}
                disabled={loading}
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

            {error && (
              <p
                className="text-center text-sm"
                style={{ color: 'var(--mk-status-error, #EF4444)' }}
              >
                {error}
              </p>
            )}

            <SubmitButton disabled={loading || password.length < 8}>
              {L.createAccount}
            </SubmitButton>

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

        {step === 'organization' && (
          <form onSubmit={handleCreateOrg} className="flex flex-col gap-4">
            <h2
              className="text-center text-xl font-bold"
              style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
            >
              {L.createOrganization}
            </h2>
            <Field label={L.orgName}>
              <InputBase
                type="text"
                value={orgName}
                onChange={setOrgName}
                disabled={loading}
                placeholder={L.orgNamePlaceholder}
                required
              />
            </Field>
            <Field label={L.orgSlug}>
              <InputBase
                type="text"
                value={orgSlug}
                onChange={setOrgSlug}
                disabled={loading}
              />
              <span
                className="text-xs"
                style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
              >
                {L.slugAuto}
              </span>
            </Field>
            {error && (
              <p
                className="text-center text-sm"
                style={{ color: 'var(--mk-status-error, #EF4444)' }}
              >
                {error}
              </p>
            )}
            <SubmitButton disabled={loading || !orgName}>
              {L.continue}
            </SubmitButton>
            <BackButton onClick={() => setStep('account')}>{L.back}</BackButton>
          </form>
        )}

        {step === 'workspace' && (
          <form onSubmit={handleCreateWorkspace} className="flex flex-col gap-4">
            <h2
              className="text-center text-xl font-bold"
              style={{ color: 'var(--mk-palette-text-primary, #F0F0F3)' }}
            >
              {L.createWorkspace}
            </h2>
            <Field label={L.workspaceName}>
              <InputBase
                type="text"
                value={wsName}
                onChange={setWsName}
                disabled={loading}
                placeholder={L.workspacePlaceholder}
              />
            </Field>
            <Field label={L.orgSlug}>
              <InputBase
                type="text"
                value={wsSlug}
                onChange={setWsSlug}
                disabled={loading}
              />
              <span
                className="text-xs"
                style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
              >
                {L.slugAuto}
              </span>
            </Field>
            <Field label={L.workspaceType}>
              <select
                value={wsType}
                onChange={(e) => setWsType(e.target.value)}
                className="w-full rounded-xl border px-3 py-2 text-sm"
                style={{
                  borderColor:
                    'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
                  background: 'var(--mk-palette-bg-surface, #242838)',
                  color: 'var(--mk-palette-text-primary, #F0F0F3)',
                }}
              >
                {workspaceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            {error && (
              <p
                className="text-center text-sm"
                style={{ color: 'var(--mk-status-error, #EF4444)' }}
              >
                {error}
              </p>
            )}
            <SubmitButton disabled={loading}>{L.goDashboard}</SubmitButton>
            <BackButton
              onClick={() =>
                setStep(requiresOrg ? 'organization' : 'account')
              }
            >
              {L.back}
            </BackButton>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Local primitives (dependency-free)                                        */
/* -------------------------------------------------------------------------- */

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
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
      style={{
        borderColor: 'var(--mk-palette-border-subtle, rgba(255,255,255,0.08))',
        background: 'var(--mk-palette-bg-surface, #242838)',
        color: 'var(--mk-palette-text-primary, #F0F0F3)',
      }}
    />
  );
}

function SubmitButton({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const primary =
    'var(--mk-palette-accent-primary, var(--mk-brand-red, #BF2227))';
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        background: `linear-gradient(135deg, ${primary}, color-mix(in srgb, ${primary} 60%, #7C3AED))`,
        color: 'var(--mk-palette-on-accent, #FFFFFF)',
      }}
    >
      {children}
    </button>
  );
}

function BackButton({
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
      className="rounded-xl px-4 py-2 text-sm transition-colors"
      style={{ color: 'var(--mk-palette-text-secondary, #B0B3C1)' }}
    >
      {children}
    </button>
  );
}
