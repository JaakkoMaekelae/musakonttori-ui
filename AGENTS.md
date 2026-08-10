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

## TypeScript — 0 virhettä (PAKOLLINEN)

> Koko ohje: `../MUSAKONTTORI_AI_STANDARDS.md` § 9.

**Tyyppivirheellinen koodi ei ole keskeneräistä, se on rikki.** Tämä ohjaa koodin
kirjoittamista, ei vain pushia.

- Tehtävä ei ole valmis ennen kuin `pnpm typecheck` (`tsc --noEmit`) antaa **0 errors**
  koko projektissa — ei vain muutetuissa tiedostoissa
- Prisma-projekteissa aja `pnpm db:generate` ennen typecheckiä, muuten virheet ovat valheellisia
- Korjaa koodi tai tyyppi. Älä vaienna virhettä
- **Kielletty**: `@ts-ignore`, `@ts-nocheck`, `as any` / `as unknown as X` virheen kiertämiseen,
  `!` non-null-assertio vaientamiseen, `typescript.ignoreBuildErrors`, `strict`-asetusten löysentäminen,
  `eslint-disable @typescript-eslint/no-explicit-any` tyyppidriftin peittämiseen
- **Ainoa sallittu poikkeus**: `@ts-expect-error` + perustelu kommentissa, vain kun kolmannen
  osapuolen tyypit ovat väärin. Se hajoaa itsestään kun upstream korjaantuu — `@ts-ignore` ei
- Jos muutoksesi paljastavat vanhoja tyyppivirheitä: korjaa tai raportoi ne. Älä piilota
- Älä raportoi työtä valmiiksi ajamatta typecheckiä JA buildia

### Build kuuluu samaan tarkistukseen

- `pnpm build` pitää mennä läpi ennen kuin tehtävä on valmis — typecheck yksin ei riitä
- Buildi löytää sen mitä `tsc --noEmit` ei näe: Next.js route- ja PageProps-tyypit,
  `generateMetadata` / `generateStaticParams` -signatuurit, server/client-rajan rikkomukset,
  puuttuvat `"use client"` -direktiivit, dynaamiset importit ja build-aikaiset env-tarkistukset
- Järjestys: `pnpm db:generate` → `pnpm typecheck` → `pnpm test` → `pnpm build`
- Buildin kaatuessa **älä** lisää `typescript.ignoreBuildErrors`- tai `eslint.ignoreDuringBuilds`
  -lippua äläkä poista tiedostoa buildista — korjaa syy
- Jos buildi vaatii env-muuttujia joita ei ole: `SKIP_ENV_VALIDATION=1 pnpm build` ja mainitse se
  raportissa. Buildin ohittaminen kokonaan ei ole vaihtoehto

### Pushia ei saa tehdä `--no-verify`-lipulla — koskaan

`git push --no-verify` (ja `git commit --no-verify`) on kielletty poikkeuksetta.
Ei "vain tämän kerran", ei "hookki on rikki", ei "kiire". Jos pre-push-hookki
epäonnistuu:

1. Lue virhe. Se on todellinen — hookki ei valehtele
2. Korjaa syy: aja `pnpm db:generate` → `pnpm typecheck` → `pnpm test` → `pnpm build`
   käsin ja korjaa jokainen virhe
3. Jos hookki itse on rikki (väärä komento, puuttuva riippuvuus) — korjaa hookki,
   älä ohita sitä
4. Vasta kun kaikki neljä menevät läpi puhtaasti, pushaa ilman lippuja

`--no-verify` ei koskaan ole oikea vastaus epäonnistuneeseen tarkistukseen — se ei
korjaa virhettä, se vain piilottaa sen seuraavalle, joka pullaa reposta.

### NEVER use --no-verify or force push

`git commit --no-verify`, `git push --no-verify`, and `git push --force*` are FORBIDDEN. No exceptions. If hooks fail, fix the root cause — never bypass them.
