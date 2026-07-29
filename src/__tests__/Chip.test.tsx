import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "../Chip";

describe("Chip", () => {
  it("renders metadata as non-interactive text", () => {
    render(<Chip>Elektroninen</Chip>);

    expect(
      screen.getByText("Elektroninen").closest("span")
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Elektroninen" })
    ).not.toBeInTheDocument();
  });

  it("exposes selectable state and responds to keyboard activation", async () => {
    const user = userEvent.setup();
    const onPress = vi.fn();

    render(
      <Chip selected onPress={onPress}>
        Tänään
      </Chip>
    );

    const chip = screen.getByRole("button", { name: "Tänään" });
    expect(chip).toHaveAttribute("aria-pressed", "true");

    chip.focus();
    await user.keyboard("{Enter}");
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("uses a separately named remove control", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <Chip onRemove={onRemove} removeLabel="Poista Rock">
        Rock
      </Chip>
    );

    await user.click(screen.getByRole("button", { name: "Poista Rock" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("disables removable and selectable interactions", () => {
    const { rerender } = render(
      <Chip onPress={() => undefined} disabled>
        Ajastettu
      </Chip>
    );

    expect(screen.getByRole("button", { name: "Ajastettu" })).toBeDisabled();

    rerender(
      <Chip onRemove={() => undefined} removeLabel="Poista Ajastettu" disabled>
        Ajastettu
      </Chip>
    );

    expect(
      screen.getByRole("button", { name: "Poista Ajastettu" })
    ).toBeDisabled();
  });
});
