import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Workspace } from "../Workspace";

const base = {
  rail: <div>RAIL</div>,
  nav: <div>NAV</div>,
  list: <button type="button">Row</button>,
  ids: ["a", "b", "c"],
  onSelect: vi.fn(),
  onClear: vi.fn(),
};

describe("Workspace", () => {
  it("maps selection and expansion onto the shell's detail state", () => {
    const { container, rerender } = render(
      <Workspace {...base} detail={() => <div>DETAIL</div>} />,
    );
    const root = () => container.querySelector("[data-mk-shell]");
    expect(root()).toHaveAttribute("data-detail", "closed");

    rerender(
      <Workspace {...base} selectedId="b" detail={() => <div>DETAIL</div>} />,
    );
    expect(root()).toHaveAttribute("data-detail", "panel");

    rerender(
      <Workspace
        {...base}
        selectedId="b"
        expanded
        detail={() => <div>DETAIL</div>}
      />,
    );
    expect(root()).toHaveAttribute("data-detail", "full");
  });

  it("hands the queue position to the detail renderer", () => {
    render(
      <Workspace
        {...base}
        selectedId="b"
        detail={(cursorLabel) => <div>{cursorLabel}</div>}
      />,
    );
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("moves through the queue with the arrow keys", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Workspace
        {...base}
        onSelect={onSelect}
        selectedId="a"
        detail={() => <div>D</div>}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Row" }));
    await user.keyboard("{ArrowDown}");
    expect(onSelect).toHaveBeenCalledWith("b");
  });

  it("clears the selection on Escape", async () => {
    const onClear = vi.fn();
    const user = userEvent.setup();
    render(
      <Workspace
        {...base}
        onClear={onClear}
        selectedId="a"
        detail={() => <div>D</div>}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Row" }));
    await user.keyboard("{Escape}");
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("keeps the list mounted but out of reach while a record is expanded", () => {
    // Two things have to hold at once when expanded:
    //   1. the list stays mounted, so the queue's data and cursor survive;
    //   2. it leaves the accessibility tree, so a collapsed column is not
    //      reachable by Tab or announced by a screen reader.
    // `visibility: hidden` gives both. Swapping it for `opacity: 0` or a
    // width of zero alone would keep invisible rows focusable.
    const { container } = render(
      <Workspace
        {...base}
        selectedId="b"
        expanded
        detail={() => <div>DETAIL</div>}
      />,
    );
    const listZone = container.querySelector('[data-mk-zone="list"]');
    expect(listZone).toBeInTheDocument();
    expect(listZone?.textContent).toContain("Row");
    expect(screen.queryByRole("button", { name: "Row" })).not.toBeInTheDocument();
    expect(screen.getByText("DETAIL")).toBeInTheDocument();
  });
});
