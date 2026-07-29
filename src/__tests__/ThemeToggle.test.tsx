import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "../ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage = {
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      key: (index: number) => Array.from(values.keys())[index] ?? null,
      get length() {
        return values.size;
      },
      removeItem: (key: string) => values.delete(key),
      setItem: (key: string, value: string) => values.set(key, value),
    };
    vi.stubGlobal("localStorage", storage);

    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.colorScheme = "";
  });

  it("keeps the host theme on mount and synchronizes native controls", async () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Vaihda tummaan teemaan" }),
      ).toBeInTheDocument();
    });

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.documentElement).toHaveClass("light");
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  it("switches every supported theme selector together", async () => {
    document.documentElement.setAttribute("data-theme", "light");
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(
      await screen.findByRole("button", { name: "Vaihda tummaan teemaan" }),
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement).not.toHaveClass("light");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
});
