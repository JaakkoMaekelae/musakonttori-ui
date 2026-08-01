# AGENTS.md — Musakonttori UI (Jaettu komponenttikirjasto)

## What this is

`@musakonttori/ui` — jaettu komponenttikirjasto kaikille Musakonttori-projekteille.
Button, Badge, Input, Card, Dialog, Table, Select, Skeleton, Toast, EmptyState,
FormField, Spinner, Alert, Tabs, Modal, Breadcrumb, CookieConsentBanner,
LocaleSwitcherModal, ThemeToggle, utils.

React 19 + TypeScript + Tailwind CSS + Radix UI primitives.

## Global standards (MANDATORY)

Lue ennen koodausta:
- `../../MUSAKONTTORI_TESTAUS_JA_LAADUNVARMISTUSSTANDARDI.md`
- `../../MUSAKONTTORI_WCAG_2_1_2_2_ACCESSIBILITY_AUDIT_STANDARD.md`
- `../../VERIFICATION.md`

## Commands

```bash
pnpm build         # tsc -p tsconfig.build.json
pnpm dev           # tsc --watch
pnpm typecheck     # tsc --noEmit
pnpm lint          # eslint
pnpm test          # vitest run
pnpm storybook     # storybook dev -p 6006
```

## Key conventions

- **Export**: named subpath exports (`@musakonttori/ui/button`, etc.)
- **Styling**: Tailwind CSS v4 + class-variance-authority + tailwind-merge + clsx
- **Primitives**: Radix UI (Dialog, Select, Slot, Tabs)
- **Icons**: lucide-react
- **Toast**: sonner
- **Testing**: vitest + @testing-library/react + jsdom
- **Brand**: #BF2227

## Verification checklist

- [ ] All exports have stories — MISSING
- [ ] Accessibility tests — MISSING
- [ ] Visual regression tests — MISSING

## AI Development Standards (MANDATORY)

Lue koko ohje: `../MUSAKONTTORI_AI_STANDARDS.md`

### Minimivaatimukset
- `engines: { "node": ">=24" }`, `.nvmrc` → `24`
- `packageManager: "pnpm@11.18.0"`
- `postcss.config.mjs` Tailwind v4:lle
- Next.js 16.2.10+, React 19.2.8, Prisma 7.9.1

### Tietokanta
- **VAIN** `DATABASE_URL` + `DIRECT_URL` — ei NEON_DATABASE_URL tms.
- Prisma 7: aina `PrismaPg` adapter, ei `statement_timeout`
- Build: `prisma generate && next build`

### UI-komponentit
- Käytä `@musakonttori/ui` — älä kopioi komponentteja projektiin
- Lataustilat: `<Skeleton />` / `<Spinner />` — ei "Ladataan..."-tekstiä

### CSP (Content Security Policy)
- Tuotannossa pakollinen: `script-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev https://js.stripe.com`

### Ennen pushia — KAIKKI pakollisia
- [ ] `tsc --noEmit` → 0 errors
- [ ] `pnpm test` → kaikki läpi
- [ ] `pnpm build` → menee läpi
- [ ] **Ei** `--no-verify` — koskaan

### Hookit
- `.husky/pre-commit`: `pnpm lint-staged`
- `.husky/pre-push`: `pnpm prisma generate && pnpm typecheck`
