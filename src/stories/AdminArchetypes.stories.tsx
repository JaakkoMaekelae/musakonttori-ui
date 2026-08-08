import type { Meta, StoryObj } from "@storybook/react";
import { AdminPage, AdminContent, AdminSection } from "../AdminPage";
import { AdminPageHeader } from "../AdminPageHeader";
import { AdminRail } from "../AdminRail";
import { AdminNav } from "../AdminNav";
import { AdminSystemState } from "../AdminSystemState";
import { StatTile, StatRow } from "../StatTile";
import { Button } from "../Button";

const meta: Meta = {
  title: "Admin/Archetypes",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const rail = (
  <AdminRail
    initial="S"
    productName="Sopimushallinta"
    activeModuleId="home"
    modules={[
      { id: "home", label: "Yleiskuva", icon: <Icon d="M3 11l9-8 9 8M5 10v10h14V10" /> },
      { id: "contracts", label: "Sopimukset", icon: <Icon d="M9 12h6m-6 4h6M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
      { id: "royalties", label: "Rojaltit", icon: <Icon d="M3 10h18M6 19h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />, badge: 7 },
    ]}
  />
);

const dashboardNav = (
  <AdminNav
    title="Yleiskuva"
    activeItemId="today"
    groups={[
      {
        id: "views",
        items: [
          { id: "today", label: {t("auto.tänään")} },
          { id: "month", label: "Kuukausi" },
          { id: "quarter", label: {t("auto.neljännes")} },
        ],
      },
    ]}
  />
);

export const Dashboard: Story = {
  render: () => (
    <AdminPage rail={rail} nav={dashboardNav} label="Yleiskuva">
      <AdminPageHeader
        title="Yleiskuva"
        description={t("auto.päivitetty_5_min_sitten__142_sopimusta")}
        actions={<Button size="sm">Vie raportti</Button>}
      />
      <AdminContent>
        <StatRow>
          <StatTile
            label="Aktiiviset"
            value="98"
            delta={{ value: "+6", direction: "up", comparedTo: "vs. edellinen kuukausi" }}
          />
          <StatTile
            label={t("auto.odottaa_hyväksyntää")}
            value="7"
            delta={{
              value: "+3",
              direction: "up",
              comparedTo: "vs. viime viikko",
              upIsGood: false,
            }}
          />
          <StatTile
            label={t("auto.erääntyy_30_pv")}
            value="14"
            delta={{ value: "0", direction: "flat", comparedTo: "vs. viime viikko" }}
          />
          <StatTile
            label="Kokonaisarvo"
            value="1,24 M€"
            delta={{ value: "+4,1 %", direction: "up", comparedTo: "vs. Q2" }}
          />
        </StatRow>

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <AdminSection title={t("auto.hyväksyntäjono")} description="Vanhimmat ensin">
            <AdminSystemState
              kind="empty"
              size="inline"
              title={t("auto.jono_on_tyhjä")}
              description={t("auto.kaikki_hyväksynnät_on_käsitelty")}
            />
          </AdminSection>
          <AdminSection title={t("auto.viimeisimmät_tapahtumat")}>
            <AdminSystemState kind="loading" size="inline" title="Haetaan tapahtumia…" />
          </AdminSection>
        </div>
      </AdminContent>
    </AdminPage>
  ),
};

export const Settings: Story = {
  render: () => (
    <AdminPage
      rail={rail}
      label="Asetukset"
      nav={
        <AdminNav
          title="Asetukset"
          activeItemId="general"
          groups={[
            {
              id: "org",
              label: "Organisaatio",
              items: [
                { id: "general", label: "Yleiset" },
                { id: "branding", label: {t("auto.brändi")} },
                { id: "locales", label: "Kielet" },
              ],
            },
            {
              id: "access",
              label: {t("auto.käyttöoikeudet")},
              items: [
                { id: "users", label: {t("auto.käyttäjät")}, count: 24 },
                { id: "roles", label: "Roolit" },
                { id: "keys", label: "API-avaimet" },
              ],
            },
          ]}
        />
      }
    >
      <AdminPageHeader title="Yleiset" description="Organisaation perustiedot" />
      <AdminContent width="prose">
        <div className="grid gap-3">
          <AdminSection
            title="Organisaation nimi"
            description={t("auto.näkyy_sopimuksissa_ja_laskuilla")}
            action={<Button size="sm" variant="secondary">Muokkaa</Button>}
          >
            <p className="text-[0.8125rem] text-[var(--mk-palette-text-primary,#F0F0F3)]">
              Musakonttori Oy
            </p>
          </AdminSection>

          <AdminSection
            title="Oletusrojalti"
            description={t("auto.käytetään_uusien_sopimusten_pohjana")}
          >
            <p className="font-[var(--mk-font-mono)] text-[0.8125rem] tabular-nums text-[var(--mk-palette-text-primary,#F0F0F3)]">
              18 %
            </p>
          </AdminSection>

          <AdminSection title="Vaaralliset toiminnot">
            <AdminSystemState
              kind="forbidden"
              size="inline"
              title={t("auto.ei_käyttöoikeutta")}
              description={t("auto.vain_organisaation_omistaja_voi_muuttaa_")}
            />
          </AdminSection>
        </div>
      </AdminContent>
    </AdminPage>
  ),
};

export const ZoneStates: Story = {
  render: () => (
    <AdminPage rail={rail} nav={dashboardNav} label="Tilat">
      <AdminPageHeader title={t("auto.järjestelmätilat")} description={t("auto.yksi_per_vyöhyke_ei_per_sivu")} />
      <AdminContent>
        <div className="grid gap-3 lg:grid-cols-2">
          <AdminSection title="loading">
            <AdminSystemState kind="loading" size="inline" title="Haetaan…" />
          </AdminSection>
          <AdminSection title="empty">
            <AdminSystemState
              kind="empty"
              size="inline"
              title="Ei tuloksia"
              description="Suodattimet rajaavat kaiken pois."
              action={<Button size="sm" variant="secondary">{t({t("auto.autotyhjennä_suodattimet")})}</Button>}
            />
          </AdminSection>
          <AdminSection title="error">
            <AdminSystemState
              kind="error"
              size="inline"
              title={t("auto.lataus_epäonnistui")}
              description="Yhteys tietokantaan katkesi."
              action={<Button size="sm">{t({t("auto.autoyritä_uudelleen")})}</Button>}
            />
          </AdminSection>
          <AdminSection title="forbidden">
            <AdminSystemState
              kind="forbidden"
              size="inline"
              title={t("auto.ei_käyttöoikeutta")}
              description={t("auto.pyydä_oikeutta_ylläpitäjältä")}
            />
          </AdminSection>
        </div>
      </AdminContent>
    </AdminPage>
  ),
};
