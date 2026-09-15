# Shared UI Component Library — Testauksen riskiluokitus

Versio: 1.0
Perustuu: MUSAKONTTORI_TESTAUS_JA_LAADUNVARMISTUSSTANDARDI v1.0
Projekti: musakonttori-ui

---

## P0 — liiketoiminta- tai turvallisuuskriittinen

Vika voi aiheuttaa: käyttäjän tahattoman moninkertaisen lähetyksen, saavutettavuuskäyttäjän jumittumisen modaaliin, virhetilojen piiloutumisen ruudunlukijalta, buildin rikkoutumisen type erroriin.

| ID | Ominaisuus | Testattu | E2E | Oikeudet | Huomio |
|----|-----------|----------|-----|----------|--------|
| REQ-UI-001 | Painikkeen tuplalähetyksen esto | Ei | Ei | Ei | Double-click guard, disable while pending |
| REQ-UI-002 | Dialogin fokus-loukku | Ei | Ei | Ei | Focus trap, escape, restore focus on close |
| REQ-UI-003 | Lomakkeen validointivirheiden näyttö | Ei | Ei | Ei | aria-describedby, error announce live region |
| REQ-UI-004 | Saavutettavat virhetilat | Ei | Ei | Ei | Color alone, icon, text, screen reader |
| REQ-UI-005 | Kriittisten komponenttien TypeScript-tyypitykset | Ei | Ei | Ei | Breaking type changes, generics contract |
| REQ-UI-006 | ARIA-attribuutit interaktiivisissa elementeissä | Ei | Ei | Ei | Role, label, state (expanded, selected) |

## P1 — käyttäjän päätehtävä

| ID | Ominaisuus | Testattu | E2E | Huomio |
|----|-----------|----------|-----|--------|
| REQ-UI-007 | Komponenttien renderöinti | Ei | Ei | Kaikki exported komponentit mounttaa |
| REQ-UI-008 | Prop-variantit | Ei | Ei | Size, variant, color, intent -matriisi |
| REQ-UI-009 | Lataustilat | Ei | Ei | Spinner, skeleton, progress |
| REQ-UI-010 | Tyhjät tilat | Ei | Ei | Empty state -kuvake, ohjeteksti, CTA |
| REQ-UI-011 | Responsiivinen käyttäytyminen | Ei | Ei | Breakpointit, overflow, wrapping |
| REQ-UI-012 | Näppäimistönavigaatio | Ei | Ei | Tab, enter, space, arrow keys |
| REQ-UI-013 | Tumma/vaalea teema | Ei | Ei | CSS variables, system preference |
| REQ-UI-014 | Reduced motion -tuki | Ei | Ei | prefers-reduced-motion, disable animaatiot |

## P2 — tukeva toiminto

| ID | Ominaisuus | Testattu | Huomio |
|----|-----------|----------|--------|
| REQ-UI-015 | Valinnaiset propit | Ei | Oletusarvot, undefined-käsittely |
| REQ-UI-016 | Reunatapausten tyylitys | Ei | Pitkä teksti, overflow, zero data |
| REQ-UI-017 | Storybook-tarinat | Ei | Kaikki variantit dokumentoitu |
| REQ-UI-018 | Dokumentaatioesimerkit | Ei | Kopioitavat koodiesimerkit |

---

Vaatimustunnisteet: REQ-UI-001 – REQ-UI-018
