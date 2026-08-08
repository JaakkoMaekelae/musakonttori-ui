import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AdminPage } from "../AdminPage";
import { AdminPageHeader } from "../AdminPageHeader";
import { AdminRail } from "../AdminRail";
import { AdminNav } from "../AdminNav";
import { AdminFormLayout } from "../AdminFormLayout";
import { AdminReportLayout } from "../AdminReportLayout";
import { AdminLogStream, type LogEntry } from "../AdminLogStream";
import { WizardStepper, type WizardStep } from "../WizardStepper";
import { Button } from "../Button";
import { FormField } from "../FormField";
import { Input } from "../Input";

const meta: Meta = {
  title: "Admin/Archetypes 2",
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
    activeModuleId="releases"
    modules={[
      { id: "releases", label: "Julkaisut", icon: <Icon d="M9 12h6m-6 4h6M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
      { id: "reports", label: "Raportit", icon: <Icon d="M9 19V9m6 10V5M4 19h16" /> },
      { id: "logs", label: "Loki", icon: <Icon d="M4 6h16M4 12h16M4 18h10" /> },
    ]}
  />
);

const steps: WizardStep[] = [
  { id: "details", label: "Perustiedot", state: "complete", href: "#details" },
  { id: "tracks", label: "Kappaleet", state: "current", href: "#tracks" },
  { id: "people", label: "Osallistujat", state: "hasErrors", href: "#people", hint: "tietoja puuttuu" },
  { id: "dist", label: "Jakelu", state: "notStarted" },
  { id: "extra", label: "Lisätiedot", state: "skipped" },
  { id: "review", label: "Tarkistus", state: "locked" },
];

export const Wizard: Story = {
  render: function WizardStory() {
    const [status, setStatus] = useState<"unsaved" | "saving" | "saved" | "failed">("saved");
    return (
      <AdminPage
        rail={rail}
        label="Uusi julkaisu"
        nav={
          <AdminNav
            title="Julkaisut"
            activeItemId="new"
            groups={[{ id: "v", items: [{ id: "new", label: "Uusi julkaisu" }, { id: "drafts", label: "Luonnokset", count: 3 }] }]}
          />
        }
      >
        <AdminFormLayout
          title="Kappaleet"
          description="Lisää julkaisun kappaleet ja niiden järjestys."
          stepper={<WizardStepper steps={steps} label="Julkaisun vaiheet" />}
          saveStatus={status}
          savedAt="14.32"
          saveLabels={{
            unsaved: "Muutoksia ei ole vielä tallennettu",
            saving: "Tallennetaan…",
            failed: "Tallennus epäonnistui",
            savedAt: (t) => `Tallennettu klo ${t}`,
          }}
          errorSummary="Osallistujat-vaiheesta puuttuu tietoja. Voit jatkaa, mutta julkaisua ei voi lähettää ennen niiden täyttämistä."
          secondaryActions={
            <Button size="sm" variant="ghost" onClick={() => setStatus("saving")}>
              Peruuta luonnos
            </Button>
          }
          actions={
            <>
              <Button size="sm" variant="secondary">Takaisin</Button>
              <Button size="sm" variant="secondary" onClick={() => setStatus("unsaved")}>
                Tallenna ja jatka myöhemmin
              </Button>
              <Button size="sm" onClick={() => setStatus("saved")}>Jatka osallistujiin</Button>
            </>
          }
        >
          <div className="grid gap-4">
            <FormField label="Kappaleen nimi" htmlFor="t1">
              <Input id="t1" defaultValue="Tänään ryypätään" />
            </FormField>
            <FormField
              label="ISRC"
              htmlFor="t2"
              helpText="Jätä tyhjäksi jos haluat että generoimme sen."
            >
              <Input id="t2" placeholder="FI-XXX-26-00001" />
            </FormField>
            <FormField label="Kesto" htmlFor="t3">
              <Input id="t3" defaultValue="3:42" />
            </FormField>
          </div>
        </AdminFormLayout>
      </AdminPage>
    );
  },
};

export const Report: Story = {
  render: function ReportStory() {
    const [stale, setStale] = useState(false);
    return (
      <AdminPage
        rail={rail}
        label="Raportit"
        nav={
          <AdminNav
            title="Raportit"
            activeItemId="royalties"
            groups={[{ id: "r", items: [{ id: "royalties", label: "Rojaltit" }, { id: "sales", label: "Myynti" }, { id: "payouts", label: "Maksut" }] }]}
          />
        }
      >
        <AdminReportLayout
          stale={stale}
          summary="1.1.–31.3.2026 · 1 284 riviä · ryhmitelty artistin mukaan"
          parameters={
            <>
              <Button size="sm" variant="secondary">Q1 2026</Button>
              <Button size="sm" variant="secondary">Kaikki artistit</Button>
              <Button size="sm" variant="secondary">Ryhmittely: artisti</Button>
            </>
          }
          actions={
            <>
              <Button size="sm" variant="secondary" onClick={() => setStale((v) => !v)}>
                {stale ? "Peru ajo" : "Aja uudelleen"}
              </Button>
              <Button size="sm">Vie CSV</Button>
            </>
          }
        >
          <table className="w-full text-[0.8125rem]">
            <thead>
              <tr className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))] text-left text-[0.625rem] uppercase tracking-[0.06em] text-[var(--mk-palette-text-tertiary,#7E8292)]">
                <th className="py-2">Artisti</th>
                <th className="py-2">Julkaisuja</th>
                <th className="py-2 text-right">Rojaltit</th>
              </tr>
            </thead>
            <tbody className="text-[var(--mk-palette-text-secondary,#B0B3C1)]">
              {[
                ["Arvi Keräsarvi", "4", "12 480 €"],
                ["Nova Lume", "2", "8 120 €"],
                ["Hiekka", "6", "5 940 €"],
                ["Valo Kollektiivi", "1", "1 210 €"],
              ].map(([a, n, v]) => (
                <tr key={a} className="border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]">
                  <td className="py-2 text-[var(--mk-palette-text-primary,#F0F0F3)]">{a}</td>
                  <td className="py-2 font-[var(--mk-font-mono)] tabular-nums">{n}</td>
                  <td className="py-2 text-right font-[var(--mk-font-mono)] tabular-nums text-[var(--mk-palette-text-primary,#F0F0F3)]">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminReportLayout>
      </AdminPage>
    );
  },
};

const logEntries: LogEntry[] = [
  { id: "1", timestamp: "14:02:11", level: "info", message: "Sopimus c_4192 luotu", meta: "j.makela" },
  { id: "2", timestamp: "14:02:19", level: "debug", message: "PDF-jono: 1 tehtävä", meta: "worker-3" },
  {
    id: "3",
    timestamp: "14:02:44",
    level: "error",
    message: "PDF-generointi epäonnistui",
    meta: "worker-3",
    detail: (
      <pre className="whitespace-pre-wrap text-[0.625rem] leading-relaxed text-[var(--mk-palette-text-secondary,#B0B3C1)]">
{`Error: pdfmake timeout after 30000ms
    at generateContract (lib/pdf/contract.ts:118:11)
    at async POST (app/api/contracts/[id]/pdf/route.ts:42:20)
  contractId: c_4192
  attempt: 1/3`}
      </pre>
    ),
  },
  { id: "4", timestamp: "14:03:02", level: "warn", message: "Uudelleenyritys 2/3", meta: "worker-3" },
  { id: "5", timestamp: "14:03:31", level: "info", message: "PDF valmis", meta: "worker-3" },
];

export const LogStream: Story = {
  render: () => (
    <AdminPage
      rail={rail}
      label="Loki"
      nav={
        <AdminNav
          title="Loki"
          activeItemId="errors"
          groups={[
            { id: "l", items: [
              { id: "audit", label: "Audit" },
              { id: "errors", label: "Virheet", count: 2, urgent: true },
            ] },
          ]}
        />
      }
    >
      <AdminPageHeader title="Virheloki" description="Viimeiset 24 h · 5 tapahtumaa" />
      <AdminLogStream
        entries={logEntries}
        label="Virheloki"
        footer={<Button size="sm" variant="secondary">Lataa lisää</Button>}
      />
    </AdminPage>
  ),
};
