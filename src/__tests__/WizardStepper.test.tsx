import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WizardStepper, type WizardStep } from "../WizardStepper";

const steps: WizardStep[] = [
  { id: "details", label: "Perustiedot", state: "complete", href: "/w/details" },
  { id: "tracks", label: "Kappaleet", state: "current", href: "/w/tracks" },
  { id: "people", label: "Osallistujat", state: "hasErrors", href: "/w/people", hint: "tietoja puuttuu" },
  { id: "dist", label: "Jakelu", state: "notStarted" },
  { id: "review", label: "Tarkistus", state: "locked" },
];

describe("WizardStepper", () => {
  it("names every state in the accessible name, not just in colour", () => {
    // The wizard standard §6.2 is explicit: state is never conveyed by colour
    // alone. Each step carries its state as a word.
    render(<WizardStepper steps={steps} label="Julkaisun vaiheet" />);
    expect(screen.getByLabelText(/Perustiedot — valmis/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Kappaleet — nykyinen/)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Osallistujat — sisältää virheitä, tietoja puuttuu/),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Jakelu — ei aloitettu/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tarkistus — lukittu/)).toBeInTheDocument();
  });

  it("marks the current step with aria-current", () => {
    render(<WizardStepper steps={steps} label="Vaiheet" />);
    expect(screen.getByLabelText(/Kappaleet/)).toHaveAttribute("aria-current", "step");
  });

  it("does not make a locked step clickable", () => {
    // A step you cannot enter must not look or behave like something you can.
    render(<WizardStepper steps={steps} label="Vaiheet" />);
    const locked = screen.getByLabelText(/Tarkistus — lukittu/);
    expect(locked.tagName).not.toBe("A");
    expect(locked.tagName).not.toBe("BUTTON");
    expect(locked).toHaveAttribute("aria-disabled", "true");
  });

  it("gives each reachable step a stable URL", () => {
    // The standard forbids a wizard that is one client-side view: back button,
    // refresh and deep links all have to work.
    render(<WizardStepper steps={steps} label="Vaiheet" />);
    expect(screen.getByLabelText(/Perustiedot/)).toHaveAttribute("href", "/w/details");
  });

  it("falls back to a button when a step has no href", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <WizardStepper
        label="Julkaisun vaiheet"
        steps={[{ id: "a", label: "Jakelu", state: "notStarted", onSelect }]}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Jakelu — ei aloitettu/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("renders a skipped step as skipped rather than hiding it", () => {
    // Hiding it would make the wizard look shorter than it is.
    render(
      <WizardStepper
        label="Vaiheet"
        steps={[{ id: "s", label: "Lisätiedot", state: "skipped" }]}
      />,
    );
    expect(screen.getByLabelText(/Lisätiedot — ohitettu/)).toBeInTheDocument();
  });
});
