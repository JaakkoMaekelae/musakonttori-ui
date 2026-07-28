import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminShell } from "../AdminShell";

const zones = {
  rail: <div>RAIL</div>,
  nav: <div>NAV</div>,
  list: <div>LIST</div>,
};

describe("AdminShell", () => {
  it("renders rail, nav and list, and omits detail when closed", () => {
    render(<AdminShell {...zones} detail={<div>DETAIL</div>} />);
    expect(screen.getByText("RAIL")).toBeInTheDocument();
    expect(screen.getByText("NAV")).toBeInTheDocument();
    expect(screen.getByText("LIST")).toBeInTheDocument();
    expect(screen.queryByText("DETAIL")).not.toBeInTheDocument();
  });

  it("keeps the list mounted when the detail is expanded to full", () => {
    // This is the whole point of the layout. Collapsing the list with CSS
    // rather than unmounting it is what lets ArrowUp/ArrowDown keep walking
    // the queue while a record is open — the list's data, scroll position and
    // cursor all survive, so moving to the next record costs no refetch.
    render(
      <AdminShell {...zones} detail={<div>DETAIL</div>} detailState="full" />,
    );
    expect(screen.getByText("LIST")).toBeInTheDocument();
    expect(screen.getByText("DETAIL")).toBeInTheDocument();
  });

  it("exposes the detail state so CSS can drive the grid", () => {
    const { container, rerender } = render(
      <AdminShell {...zones} detail={<div>D</div>} detailState="panel" />,
    );
    const root = container.querySelector("[data-mk-shell]");
    expect(root).toHaveAttribute("data-detail", "panel");

    rerender(<AdminShell {...zones} detail={<div>D</div>} detailState="full" />);
    expect(root).toHaveAttribute("data-detail", "full");
  });

  it("closes the detail on Escape", async () => {
    const onCloseDetail = vi.fn();
    const user = userEvent.setup();
    render(
      <AdminShell
        {...zones}
        detail={<button type="button">Close me</button>}
        detailState="panel"
        onCloseDetail={onCloseDetail}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Close me" }));
    await user.keyboard("{Escape}");
    expect(onCloseDetail).toHaveBeenCalledTimes(1);
  });

  it("does not fire close on Escape when nothing is open", async () => {
    const onCloseDetail = vi.fn();
    const user = userEvent.setup();
    render(
      <AdminShell
        {...zones}
        list={<button type="button">Row</button>}
        onCloseDetail={onCloseDetail}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Row" }));
    await user.keyboard("{Escape}");
    expect(onCloseDetail).not.toHaveBeenCalled();
  });

  it("moves the selection with the arrow keys", async () => {
    const onSelectNext = vi.fn();
    const onSelectPrevious = vi.fn();
    const user = userEvent.setup();
    render(
      <AdminShell
        {...zones}
        list={<button type="button">Row</button>}
        onSelectNext={onSelectNext}
        onSelectPrevious={onSelectPrevious}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Row" }));
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowUp}");
    expect(onSelectNext).toHaveBeenCalledTimes(2);
    expect(onSelectPrevious).toHaveBeenCalledTimes(1);
  });

  it("leaves the arrow keys alone while the user is typing", async () => {
    // Otherwise the shell steals caret movement inside every filter box.
    const onSelectNext = vi.fn();
    const user = userEvent.setup();
    render(
      <AdminShell
        {...zones}
        list={<input aria-label="Search" />}
        onSelectNext={onSelectNext}
      />,
    );
    await user.click(screen.getByLabelText("Search"));
    await user.keyboard("{ArrowDown}");
    expect(onSelectNext).not.toHaveBeenCalled();
  });

  it("labels the list and detail regions", () => {
    render(
      <AdminShell
        {...zones}
        detail={<div>D</div>}
        detailState="panel"
        listLabel="Contracts"
        detailLabel="Contract details"
      />,
    );
    expect(screen.getByRole("main", { name: "Contracts" })).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: "Contract details" }),
    ).toBeInTheDocument();
  });

  it("hides the nav when collapsed but keeps the rail", () => {
    const { container } = render(<AdminShell {...zones} navCollapsed />);
    const root = container.querySelector("[data-mk-shell]");
    expect(root).toHaveAttribute("data-nav-collapsed");
    expect(screen.getByText("RAIL")).toBeVisible();
    expect(screen.queryByText("NAV")).not.toBeVisible();
  });
});
