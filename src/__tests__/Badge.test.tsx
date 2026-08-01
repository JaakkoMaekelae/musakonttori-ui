import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders all variants", () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toBeInTheDocument();

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText("Warning")).toBeInTheDocument();

    rerender(<Badge variant="error">Error</Badge>);
    expect(screen.getByText("Error")).toBeInTheDocument();

    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByText("Info")).toBeInTheDocument();

    rerender(<Badge variant="neutral">Neutral</Badge>);
    expect(screen.getByText("Neutral")).toBeInTheDocument();

    rerender(<Badge variant="brand">Brand</Badge>);
    expect(screen.getByText("Brand")).toBeInTheDocument();
  });

  it("renders dot indicator", () => {
    render(<Badge dot>With Dot</Badge>);
    const badge = screen.getByText("With Dot");
    expect(badge.querySelector("span")).toBeTruthy();
  });

  it("renders pulse animation when dot and pulse", () => {
    render(<Badge dot pulse>Pulsing</Badge>);
    const badge = screen.getByText("Pulsing");
    const pulseElement = badge.querySelector(".animate-ping");
    expect(pulseElement).toBeTruthy();
  });

  it("accepts className prop", () => {
    render(<Badge className="custom-badge">Styled</Badge>);
    const badge = screen.getByText("Styled");
    expect(badge.className).toContain("custom-badge");
  });

  it("neutral is default variant", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-[var(--mk-palette-bg-surface");
  });
});

describe("Badge surface", () => {
  it("keeps the dark treatment by default", () => {
    // Every existing consumer relies on this; the light surface is opt-in.
    render(<Badge tone="success">Aktiivinen</Badge>);
    expect(screen.getByText("Aktiivinen").className).toContain("text-emerald-400");
  });

  it("uses solid tints and dark ink on a light surface", () => {
    // The dark variants are translucent fills with 400-weight text, which wash
    // out on white — the reason light admin sections hand-rolled their own.
    render(
      <Badge tone="success" surface="light">
        Aktiivinen
      </Badge>,
    );
    const cls = screen.getByText("Aktiivinen").className;
    expect(cls).toContain("bg-emerald-100");
    expect(cls).toContain("text-emerald-700");
    expect(cls).not.toContain("text-emerald-400");
  });

  it("does not let the dark fill bleed through on a light surface", () => {
    render(
      <Badge tone="neutral" surface="light">
        Luonnos
      </Badge>,
    );
    const cls = screen.getByText("Luonnos").className;
    expect(cls).toContain("bg-zinc-100");
    expect(cls).not.toContain("--mk-palette-bg-surface");
  });
});
