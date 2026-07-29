import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminLogStream, type LogEntry } from "../AdminLogStream";

const entries: LogEntry[] = [
  { id: "1", timestamp: "14:02:11", level: "info", message: "Sopimus luotu", meta: "j.makela" },
  {
    id: "2",
    timestamp: "14:02:44",
    level: "error",
    message: "PDF-generointi epäonnistui",
    detail: <pre>Error: timeout</pre>,
  },
  { id: "3", timestamp: "14:03:02", level: "warn", message: "Uudelleenyritys" },
];

describe("AdminLogStream", () => {
  it("names the level in text, not only in colour", () => {
    render(<AdminLogStream entries={entries} label="Audit-loki" />);
    expect(screen.getByText("info")).toBeInTheDocument();
    expect(screen.getByText("error")).toBeInTheDocument();
    expect(screen.getByText("warning")).toBeInTheDocument();
  });

  it("expands a row inline rather than in a panel", async () => {
    // You read a log to see what happened *around* an event, so the detail
    // has to open between the neighbouring lines.
    const user = userEvent.setup();
    render(<AdminLogStream entries={entries} label="Audit-loki" />);
    expect(screen.queryByText("Error: timeout")).not.toBeInTheDocument();

    const row = screen.getByRole("button", { name: /PDF-generointi epäonnistui/ });
    expect(row).toHaveAttribute("aria-expanded", "false");
    await user.click(row);

    expect(screen.getByText("Error: timeout")).toBeInTheDocument();
    expect(row).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses again on a second click", async () => {
    const user = userEvent.setup();
    render(<AdminLogStream entries={entries} label="Audit-loki" />);
    const row = screen.getByRole("button", { name: /PDF-generointi/ });
    await user.click(row);
    await user.click(row);
    expect(screen.queryByText("Error: timeout")).not.toBeInTheDocument();
  });

  it("does not make a row without detail expandable", () => {
    render(<AdminLogStream entries={entries} label="Audit-loki" />);
    expect(
      screen.queryByRole("button", { name: /Sopimus luotu/ }),
    ).not.toBeInTheDocument();
  });

  it("defers to the caller when expansion is controlled", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <AdminLogStream
        entries={entries}
        label="Audit-loki"
        expandedIds={[]}
        onToggle={onToggle}
      />,
    );
    await user.click(screen.getByRole("button", { name: /PDF-generointi/ }));
    expect(onToggle).toHaveBeenCalledWith("2");
    // Still closed — the caller owns the state.
    expect(screen.queryByText("Error: timeout")).not.toBeInTheDocument();
  });

  it("keeps every row in the DOM so browser search still works", () => {
    // Rows are skipped with content-visibility, not unmounted by JS
    // windowing — Ctrl+F has to reach the whole list.
    const many: LogEntry[] = Array.from({ length: 200 }, (_, i) => ({
      id: String(i),
      timestamp: "14:00:00",
      level: "info" as const,
      message: `rivi ${i}`,
    }));
    render(<AdminLogStream entries={many} label="Loki" />);
    expect(screen.getByText("rivi 0")).toBeInTheDocument();
    expect(screen.getByText("rivi 199")).toBeInTheDocument();
  });
});
