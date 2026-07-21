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
- **Brand**: #C9252D

## Verification checklist

- [ ] All exports have stories — MISSING
- [ ] Accessibility tests — MISSING
- [ ] Visual regression tests — MISSING
