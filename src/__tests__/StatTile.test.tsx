import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatTile } from "../StatTile";

describe("StatTile", () => {
  it("renders label and value", () => {
    render(<StatTile label="Aktiiviset sopimukset" value="98" />);
    expect(screen.getByText("Aktiiviset sopimukset")).toBeInTheDocument();
    expect(screen.getByText("98")).toBeInTheDocument();
  });

  it("does not use tabular figures on the value", () => {
    // Tabular gives every digit the width of a zero, which looks gappy at
    // display sizes. It belongs in columns that align vertically, not on a
    // standalone figure.
    const { container } = render(<StatTile label="Arvo" value="1 284" />);
    const value = screen.getByText("1 284");
    expect(value.className).not.toContain("tabular-nums");
    expect(container.querySelector(".tabular-nums")).toBeNull();
  });

  it("treats a rise as good by default", () => {
    render(
      <StatTile
        label="Liikevaihto"
        value="1,24 M€"
        delta={{ value: "+12,4 %", direction: "up", comparedTo: "vs. edellinen kuukausi" }}
      />,
    );
    const delta = screen.getByText(/12,4 %/);
    expect(delta.getAttribute("style")).toContain("--mk-status-success");
  });

  it("treats a rise as bad when up is not good", () => {
    // Churn, error rate, cost — a rise is the bad news, and the tile cannot
    // infer that from the number alone.
    render(
      <StatTile
        label="Peruutusaste"
        value="4,1 %"
        delta={{
          value: "+0,8 pp",
          direction: "up",
          comparedTo: "vs. edellinen kuukausi",
          upIsGood: false,
        }}
      />,
    );
    const delta = screen.getByText(/0,8 pp/);
    expect(delta.getAttribute("style")).toContain("--mk-status-error");
  });

  it("treats a fall as good when up is not good", () => {
    render(
      <StatTile
        label="Peruutusaste"
        value="4,1 %"
        delta={{
          value: "−0,8 pp",
          direction: "down",
          comparedTo: "vs. edellinen kuukausi",
          upIsGood: false,
        }}
      />,
    );
    expect(screen.getByText(/0,8 pp/).getAttribute("style")).toContain(
      "--mk-status-success",
    );
  });

  it("keeps a flat delta neutral", () => {
    render(
      <StatTile
        label="Tilaukset"
        value="512"
        delta={{ value: "0", direction: "flat", comparedTo: "vs. eilinen" }}
      />,
    );
    expect(screen.getByText(/^0$/).getAttribute("style")).toContain(
      "text-secondary",
    );
  });

  it("never conveys direction by colour alone", () => {
    // Has to survive colour-blindness, grayscale print and forced-colors.
    // The arrow and the signed value both carry the direction.
    render(
      <StatTile
        label="Liikevaihto"
        value="1,24 M€"
        delta={{ value: "+12,4 %", direction: "up", comparedTo: "vs. Q2" }}
      />,
    );
    expect(screen.getByText(/↑/)).toBeInTheDocument();
    expect(screen.getByText(/\+12,4 %/)).toBeInTheDocument();
    // And the comparison period is always named — a bare delta is unreadable.
    expect(screen.getByText("vs. Q2")).toBeInTheDocument();
  });

  it("renders a hero figure larger", () => {
    render(<StatTile label="Kokonaisarvo" value="1,24 M€" hero />);
    expect(screen.getByText("1,24 M€").className).toContain("text-5xl");
  });
});
