import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<EmptyState title="No items" description="Try creating one." />);
    expect(screen.getByText("Try creating one.")).toBeInTheDocument();
  });

  it("renders default icon when no icon provided", () => {
    const { container } = render(<EmptyState title="Empty" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    render(<EmptyState title="Empty" icon={<span data-testid="custom-icon">ICON</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders action button", () => {
    render(
      <EmptyState
        title="No items"
        action={{ label: "Create", onClick: () => {} }}
      />,
    );
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("fires action onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <EmptyState
        title="No items"
        action={{ label: "Create", onClick }}
      />,
    );
    await user.click(screen.getByText("Create"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("accepts className prop", () => {
    const { container } = render(<EmptyState title="Test" className="custom-state" />);
    expect(container.firstChild).toHaveClass("custom-state");
  });
});
