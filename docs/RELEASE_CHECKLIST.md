# @musakonttori/ui — Release Checklist

Perustuu: ../../MUSAKONTTORI_JULKAISUN_HYVAKSYMISKRITEERIT.md

## Estävät kriteerit (release BLOCKED)

- [ ] P0/P1-testi epäonnistuu
- [ ] Migraatio- tai RLS-testi epäonnistuu
- [ ] Contract verification epäonnistuu
- [ ] Critical/high security finding avoinna
- [ ] Visuaalinen muutos hyvaksymatta
- [ ] Vakava saavutettavuusvirhe avoinna (WCAG 2.2 AA violation)
- [ ] Suorituskyky ylittaa kynnyksen (LCP > 2.5s, error rate > 1%)
- [ ] Rollback-suunnitelma puuttuu riskialttiilta muutokselta
- [ ] Observability puuttuu P0-prosessista

## Release Evidence

- [ ] Commit SHA: _____________
- [ ] Testiraportit (vitest): liitteena
- [ ] Coverage-raportti: liitteena
- [ ] E2E-reportti (Playwright HTML): liitteena
- [ ] Screenshotit + trace-tiedostot: liitteena
- [ ] Security-reportti: liitteena
- [ ] Migraatiotulos: liitteena
- [ ] Suorituskykyvertailu baselineen: liitteena
- [ ] Hyvaksyjat: ____________________ ja ____________________
- [ ] Deployment ID: _____________
- [ ] Rollback-suunnitelma: liitteena

## UI — Tarkistuslista

- [ ] P0: kaikki exports buildaavat (tsc)
- [ ] Visuaalinen: ei regressiota (Storybook + Chromatic/Percy)
- [ ] A11y: kaikki komponentit axe-core tested
- [ ] Test: vitest + @testing-library/react hyvaksytty
- [ ] Bundle size: ei regression (> 5% kasvu)
- [ ] Breaking changes: CHANGELOG.md paivitetty, semver tarkistettu
- [ ] Tuotepaallikon hyvaksynta
- [ ] Teknisen vastuuhenkilon hyvaksynta

## Julkaisuloki

| Paiva | Versio | Commit | Hyvaksyjat | Status |
|-------|--------|--------|------------|--------|
|       |        |        |            |        |
