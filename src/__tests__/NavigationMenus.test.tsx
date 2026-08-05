import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AppHeader } from "../AppHeader";

describe("shared navigation menus", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      key: (index: number) => Array.from(values.keys())[index] ?? null,
      get length() {
        return values.size;
      },
      removeItem: (key: string) => values.delete(key),
      setItem: (key: string, value: string) => values.set(key, value),
    });
  });

  it("closes the user menu with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(
      <AppHeader
        productName="Market"
        user={{ name: "Test User", email: "test@example.com" }}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Avaa käyttäjävalikko",
    });
    await user.click(trigger);
    expect(
      screen.getByRole("menu", { name: "Käyttäjävalikko" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
