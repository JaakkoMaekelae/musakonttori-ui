# Architecture — @musakonttori/ui

**Product:** Shared UI component library and design tokens for the Musakonttori product family
**Consumers:** every Next.js product (HQ, Market, Links, Ticketing, Stageflow, LiveGuide, LiveOps,
SoundLaunch, Promo)

> Ecosystem context: [MUSAKONTTORI_ARCHITECTURE.md](../../MUSAKONTTORI_ARCHITECTURE.md) ·
> Recovery: [docs/disaster-recovery.md](./disaster-recovery.md) ·
> Brand: `musakonttori-hq/docs/BRAND.md`

---

## 1. Measured Stack

| Item | Value |
|------|-------|
| Peer framework | React 19.2.8, Next 16.2.12 |
| Styling | Tailwind 4.3.3, CSS variables for tokens |
| Build | `pnpm build` → `dist/`; `pnpm build:tokens` generates design tokens |
| Docs | Storybook 8.6 (`storybook`, `build-storybook`) |
| Tests | Vitest + Testing Library, coverage configured |
| Distribution | consumed as a workspace or source package by the products |

---

## 2. Component Set

| Component | Purpose |
|-----------|---------|
| `Button` | primary, secondary, ghost, destructive; auto-spinner on async `onClick` |
| `Badge` | read-only status with semantic tones and optional status dot |
| `Chip` | metadata, selectable filters, removable values — selection and removal are separate modes to keep markup accessible |
| `Avatar` | user/organization image with generated initials, error fallback, sizes, shapes, tones, localized presence labels |
| `AvatarGroup` | accessible overlapping layout |

The `Chip` / `Badge` distinction is a documented semantic rule, not styling preference: `Badge` for
state ("Julkaistu", "Virhe"), `Chip` for content or controls (a category, a selected city, a filter).
Encoding that rule in the library is what keeps nine products consistent without nine separate reviews.

---

## 3. Two Kinds of Change

| Change | Blast radius |
|--------|-------------|
| Component API or markup | consumers that use that component |
| **Design token** (colour, spacing, radius) | every surface in every product at once |

Token changes deserve the same review as an API change. A contrast token can silently break WCAG 2.2 AA
compliance platform-wide — see `MUSAKONTTORI_WCAG_2_1_2_2_ACCESSIBILITY_AUDIT_STANDARD.md`.

---

## 4. Adoption Reality

Three products do not fully consume this library:

- **Ticketing** keeps a local `packages/ui` inside its monorepo, contradicting its own `AGENTS.md`.
- **Market** documents a local `packages/ui` workspace that does not exist in the repo.
- **Soundstage, Promo and SoundLaunch** use MUI alongside or instead of it.

The admin design-system work (`MUSAKONTTORI_PRODUCT_UI_GUIDE.md`, the shared AdminShell effort) is the
path to convergence; until it lands, "shared UI" is partly aspirational.

---

## 5. Release Discipline

```bash
pnpm test
pnpm build:tokens
pnpm build-storybook   # visual review — a type check passes happily on an invisible button
```

Visual review is not optional in a component library. Automated checks cannot see a broken layout.

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-07 | Engineering | Initial measured architecture |
