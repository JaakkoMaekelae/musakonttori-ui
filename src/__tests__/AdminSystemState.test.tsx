import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminSystemState } from "../AdminSystemState";

describe("AdminSystemState", () => {
  it("marks a loading zone as busy and announces politely", () => {
    render(<AdminSystemState kind="loading" title="Haetaan sopimuksia…" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-busy", "true");
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("announces errors assertively", () => {
    // An error is the one state worth interrupting for — the others can wait
    // for the user to reach them.
    render(<AdminSystemState kind="error" title="Lataus epäonnistui" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "assertive");
    expect(screen.getByRole("status")).not.toHaveAttribute("aria-busy");
  });

  it("carries its kind as data so a zone can be styled around it", () => {
    const { container } = render(
      <AdminSystemState kind="forbidden" title="Ei käyttöoikeutta" />,
    );
    expect(container.querySelector('[data-mk-state="forbidden"]')).toBeInTheDocument();
  });

  it("renders description and action", () => {
    render(
      <AdminSystemState
        kind="empty"
        title="Ei tuloksia"
        description="Suodattimet rajaavat kaiken pois."
        action={<button type="button">Tyhjennä suodattimet</button>}
      />,
    );
    expect(screen.getByText("Suodattimet rajaavat kaiken pois.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tyhjennä suodattimet" }),
    ).toBeInTheDocument();
  });

  it("fills its zone by default and shrinks when inline", () => {
    const { container: zone } = render(
      <AdminSystemState kind="empty" title="Tyhjä" />,
    );
    expect(zone.firstElementChild?.className).toContain("h-full");

    const { container: inline } = render(
      <AdminSystemState kind="empty" title="Tyhjä" size="inline" />,
    );
    expect(inline.firstElementChild?.className).not.toContain("h-full");
  });
});
