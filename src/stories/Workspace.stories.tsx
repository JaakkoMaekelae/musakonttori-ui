import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Workspace } from "../Workspace";
import { AdminRail } from "../AdminRail";
import { AdminNav } from "../AdminNav";
import { AdminDetailPanel, AdminField } from "../AdminDetailPanel";
import { Badge } from "../Badge";

const meta: Meta<typeof Workspace> = {
  title: "Admin/Workspace",
  component: Workspace,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Workspace>;

const CONTRACTS = [
  { id: "c_4192", title: "Levytyssopimus 2026", artist: "Arvi Keräsarvi", value: "24 000 €", until: "31.12.2027", royalty: "18 %", state: "Aktiivinen" },
  { id: "c_4193", title: "Kustannussopimus", artist: "Nova Lume", value: "8 500 €", until: "—", royalty: "12 %", state: "Odottaa" },
  { id: "c_4194", title: "Managerisopimus", artist: "Hiekka", value: "12 000 €", until: "30.06.2026", royalty: "15 %", state: "Aktiivinen" },
  { id: "c_4195", title: "Sync-lisenssi #4192", artist: "Valo Kollektiivi", value: "3 200 €", until: "—", royalty: "50 %", state: "Luonnos" },
];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TABS = [
  { id: "overview", label: "Yleiskuva" },
  { id: "terms", label: "Ehdot" },
  { id: "files", label: "Liitteet" },
  { id: "audit", label: "Audit" },
];

function Demo() {
  const [selectedId, setSelectedId] = useState<string | null>("c_4192");
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("overview");

  const record = CONTRACTS.find((c) => c.id === selectedId);

  return (
    <Workspace
      ids={CONTRACTS.map((c) => c.id)}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onClear={() => {
        setSelectedId(null);
        setExpanded(false);
      }}
      expanded={expanded}
      listLabel="Sopimukset"
      detailLabel="Sopimuksen tiedot"
      rail={
        <AdminRail
          initial="S"
          productName="Sopimushallinta"
          activeModuleId="contracts"
          modules={[
            { id: "contracts", label: "Sopimukset", icon: <Icon d="M9 12h6m-6 4h6M7 21h10a2 2 0 002-2V9l-6-6H7a2 2 0 00-2 2v14a2 2 0 002 2z" /> },
            { id: "artists", label: "Artistit", icon: <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21v-2a6 6 0 0112 0v2" /> },
            { id: "royalties", label: "Rojaltit", icon: <Icon d="M3 10h18M7 15h1m4 0h1M6 19h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />, badge: 7 },
          ]}
        />
      }
      nav={
        <AdminNav
          title="Sopimukset"
          activeItemId="all"
          groups={[
            {
              id: "views",
              items: [
                { id: "all", label: "Kaikki", count: 142 },
                { id: "mine", label: "Minun", count: 18 },
                { id: "pending", label: "Odottaa", count: 7, urgent: true },
              ],
            },
            {
              id: "saved",
              label: "Tallennetut näkymät",
              items: [
                { id: "q3", label: "Erääntyy Q3" },
                { id: "sync", label: "Sync-lisenssit" },
              ],
            },
          ]}
        />
      }
      list={
        <ul>
          {CONTRACTS.map((c) => {
            const active = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-current={active ? "true" : undefined}
                  className={[
                    "block w-full border-b border-l-2 px-3 py-2.5 text-left transition-colors",
                    "border-b-[var(--mk-palette-border-subtle,rgba(255,255,255,0.08))]",
                    active
                      ? "border-l-[var(--mk-palette-accent-primary,#F44242)] bg-[var(--mk-palette-accent-soft,rgba(244,66,66,0.16))]"
                      : "border-l-transparent hover:bg-[var(--mk-palette-bg-surface-hover,#2A2E3D)]",
                  ].join(" ")}
                >
                  <span className="block text-[0.8125rem] font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]">
                    {c.title}
                  </span>
                  <span className="block text-[0.6875rem] text-[var(--mk-palette-text-secondary,#B0B3C1)]">
                    {c.artist} ·{" "}
                    <span className="font-[var(--mk-font-mono)] tabular-nums">{c.value}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      }
      detail={(cursorLabel) =>
        record && (
          <AdminDetailPanel
            title={record.title}
            subtitle={record.artist}
            status={
              <Badge tone={record.state === "Aktiivinen" ? "success" : record.state === "Odottaa" ? "warning" : "neutral"}>
                {record.state}
              </Badge>
            }
            state={expanded ? "full" : "panel"}
            cursorLabel={cursorLabel}
            tabs={TABS.map((t) => ({ ...t, onSelect: () => setTab(t.id) }))}
            activeTabId={tab}
            expandLabel="Laajenna"
            collapseLabel="Kutista"
            closeLabel="Sulje"
            onToggleExpand={() => setExpanded((v) => !v)}
            onClose={() => {
              setSelectedId(null);
              setExpanded(false);
            }}
          >
            <dl className="px-3.5 py-3">
              <AdminField label="Artisti">{record.artist}</AdminField>
              <AdminField label="Arvo" numeric>{record.value}</AdminField>
              <AdminField label="Voimassa" numeric>{record.until}</AdminField>
              <AdminField label="Rojalti" numeric>{record.royalty}</AdminField>
            </dl>
            <p className="px-3.5 pb-4 text-[0.6875rem] text-[var(--mk-palette-text-tertiary,#7E8292)]">
              ↑↓ liikkuu jonossa myös laajennettuna · Esc sulkee
            </p>
          </AdminDetailPanel>
        )
      }
    />
  );
}

export const Default: Story = { render: () => <Demo /> };
