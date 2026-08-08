import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AdminShell, type DetailState } from "../AdminShell";

const meta: Meta<typeof AdminShell> = {
  title: "Admin/AdminShell",
  component: AdminShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AdminShell>;

const ROWS = [
  { id: "c_4192", title: "Levytyssopimus 2026", artist: "Arvi Keräsarvi", value: "24 000 €" },
  { id: "c_4193", title: "Kustannussopimus", artist: "Nova Lume", value: "8 500 €" },
  { id: "c_4194", title: "Managerisopimus", artist: "Hiekka", value: "12 000 €" },
  { id: "c_4195", title: "Sync-lisenssi #4192", artist: "Valo Kollektiivi", value: "3 200 €" },
];

const Rail = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9, padding: "10px 0" }}>
    <div
      aria-hidden
      style={{
        width: 26,
        height: 26,
        borderRadius: 8,
        background: "var(--mk-brand-gradient)",
        color: "#fff",
        fontWeight: 800,
        fontStyle: "italic",
        fontSize: 13,
        letterSpacing: "-0.04em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      S
    </div>
    {["on", "", "", ""].map((state, i) => (
      <div
        key={i}
        style={{
          width: 24,
          height: 24,
          borderRadius: 7,
          background: state ? "var(--mk-palette-accent-soft)" : "rgba(255,255,255,0.07)",
          border: state ? "1px solid var(--mk-palette-accent-primary)" : "none",
        }}
      />
    ))}
  </div>
);

const Nav = () => (
  <div style={{ padding: "12px 8px", fontSize: 12 }}>
    <div style={{ padding: "0 6px 10px", fontWeight: 700, fontSize: 12.5 }}>Sopimukset</div>
    {[
      ["Kaikki", "142", true],
      ["Minun", "18", false],
      ["Odottaa", "7", false],
    ].map(([label, count, active]) => (
      <div
        key={label as string}
        style={{
          display: "flex",
          padding: "6px 10px",
          borderRadius: 8,
          color: active ? "var(--mk-palette-accent-primary)" : "var(--mk-palette-text-secondary)",
          background: active ? "var(--mk-palette-accent-soft)" : "transparent",
          fontWeight: active ? 600 : 400,
        }}
      >
        {label}
        <span style={{ marginLeft: "auto", fontFamily: "var(--mk-font-mono)" }}>{count}</span>
      </div>
    ))}
  </div>
);

function Demo({ initial }: { initial: DetailState }) {
  const [state, setState] = useState<DetailState>(initial);
  const [index, setIndex] = useState(0);
  const row = ROWS[index]!;

  return (
    <AdminShell
      listLabel="Sopimukset"
      detailLabel="Sopimuksen tiedot"
      detailState={state}
      onCloseDetail={() => setState("closed")}
      onSelectPrevious={() => setIndex((i) => Math.max(0, i - 1))}
      onSelectNext={() => setIndex((i) => Math.min(ROWS.length - 1, i + 1))}
      rail={<Rail />}
      nav={<Nav />}
      list={
        <div>
          {ROWS.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setIndex(i);
                setState("panel");
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                border: 0,
                borderBottom: "1px solid var(--mk-palette-border-subtle)",
                borderLeft: i === index ? "2px solid var(--mk-palette-accent-primary)" : "2px solid transparent",
                background: i === index ? "var(--mk-palette-accent-soft)" : "transparent",
                color: "inherit",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 600 }}>{r.title}</div>
              <div style={{ color: "var(--mk-palette-text-secondary)", fontSize: 11.5 }}>
                {r.artist} · <span style={{ fontFamily: "var(--mk-font-mono)" }}>{r.value}</span>
              </div>
            </button>
          ))}
        </div>
      }
      detail={
        <div style={{ padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <strong style={{ fontSize: 15 }}>{row.title}</strong>
            <button
              type="button"
              onClick={() => setState(state === "full" ? "panel" : "full")}
              style={{
                marginLeft: "auto",
                font: "inherit",
                fontSize: 11,
                padding: "5px 11px",
                borderRadius: 8,
                border: "1px solid var(--mk-palette-border-default)",
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              {state === "full" ? "Kutista" : "Laajenna"}
            </button>
          </div>
          <div style={{ color: "var(--mk-palette-text-secondary)", fontSize: 12, marginTop: 4 }}>
            {row.artist}
          </div>
          <p style={{ color: "var(--mk-palette-text-tertiary)", fontSize: 11.5, marginTop: 16 }}>
            ↑↓ liikkuu jonossa myös laajennetussa tilassa — lista pysyy mountattuna.
            Esc sulkee.
          </p>
        </div>
      }
    />
  );
}

export const Closed: Story = { render: () => <Demo initial="closed" /> };
export const Panel: Story = { render: () => <Demo initial="panel" /> };
export const Full: Story = { render: () => <Demo initial="full" /> };
