import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

function getButton(name: string | RegExp) {
  return screen.getByRole("button", { name });
}

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(getButton("Click me")).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(getButton("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on keyboard Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    const button = getButton("Submit");
    button.focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on keyboard Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    const button = getButton("Submit");
    button.focus();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled state prevents click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const button = getButton("Disabled");
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled state prevents keyboard activation", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    const button = getButton("Disabled");
    button.focus();
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading state shows spinner and disables button", () => {
    render(<Button loading>Save</Button>);
    const button = getButton("Save");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("loading state prevents click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(getButton("Save"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading spinner is aria-hidden", () => {
    render(<Button loading>Save</Button>);
    const spinner = getButton("Save").querySelector("svg");
    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });

  it("form submission: disabled button does not trigger form submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button disabled type="submit">
          Submit
        </Button>
      </form>,
    );
    await user.click(getButton("Submit"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("form submission: loading button does not trigger form submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button loading type="submit">
          Submit
        </Button>
      </form>,
    );
    await user.click(getButton("Submit"));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("form submission: enabled button submits form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Submit</Button>
      </form>,
    );
    await user.click(getButton("Submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("supports aria-label for accessible name", () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(getButton("Close dialog")).toBeInTheDocument();
  });

  it("asChild renders native button by default", () => {
    render(<Button>Default</Button>);
    expect(screen.getByRole("button", { name: "Default" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Default" }).tagName).toBe("BUTTON");
  });

  it("renders all variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText("Primary")).toBeInTheDocument();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText("Outline")).toBeInTheDocument();

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText("Ghost")).toBeInTheDocument();

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText("Destructive")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByText("Large");
    expect(button.className).toContain("h-12");
    expect(button.className).toContain("text-base");
  });

  it("accepts className prop", () => {
    render(<Button className="custom-class">Styled</Button>);
    const button = screen.getByText("Styled");
    expect(button.className).toContain("custom-class");
  });

  it("has focus-visible ring styles for accessibility", () => {
    render(<Button>Focusable</Button>);
    const button = screen.getByText("Focusable");
    expect(button.className).toContain("focus-visible:outline-none");
    expect(button.className).toContain("focus-visible:ring-2");
  });

  it("sets aria-disabled when loading", () => {
    render(<Button loading>Save</Button>);
    expect(getButton("Save")).toHaveAttribute("aria-disabled", "true");
  });

  it("sets aria-disabled when disabled", () => {
    render(<Button disabled>Save</Button>);
    expect(getButton("Save")).toHaveAttribute("aria-disabled", "true");
  });

  it("default variant is primary when not specified", () => {
    render(<Button>Default</Button>);
    const button = screen.getByText("Default");
    expect(button.className).toContain("bg-[var(--mk-palette-bg-brand");
  });
});
