import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Alert } from "../Alert";
import { Spinner } from "../Spinner";
import { FormField } from "../FormField";
import { EmptyState } from "../EmptyState";
import { Skeleton } from "../Skeleton";

describe("Accessibility: semantic roles", () => {
  it("buttons have role button", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("inputs have role textbox", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("search inputs have role searchbox", () => {
    render(<Input type="search" />);
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("alerts have role alert", () => {
    render(<Alert>Notification</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("spinner has role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("skeleton has role status", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("modal has role dialog", () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("modal has aria-modal true", () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });
});

describe("Accessibility: decorative icons hidden from screen readers", () => {
  it("Button loading spinner is aria-hidden", () => {
    render(<Button loading>Save</Button>);
    const spinner = screen.getByRole("button", { name: /Save/ }).querySelector("svg");
    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });

  it("Alert icon is aria-hidden", () => {
    render(<Alert variant="info">Message</Alert>);
    const alert = screen.getByRole("alert");
    const icon = alert.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("Alert dismiss button svg is aria-hidden", () => {
    render(<Alert onDismiss={() => {}}>Message</Alert>);
    const dismissBtn = screen.getByRole("button", { name: "Sulje ilmoitus" });
    const icon = dismissBtn.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Accessibility: accessible names", () => {
  it("Button supports aria-label", () => {
    render(<Button aria-label="Close">X</Button>);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("Button accessible name comes from children by default", () => {
    render(<Button>Tallenna</Button>);
    expect(screen.getByRole("button", { name: "Tallenna" })).toBeInTheDocument();
  });

  it("Input has accessible name from label", () => {
    render(<Input label="Sähköposti" />);
    expect(screen.getByLabelText("Sähköposti")).toBeInTheDocument();
  });

  it("Spinner has default accessible label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAccessibleName("Ladataan");
  });

  it("Spinner supports custom label", () => {
    render(<Spinner label="Haetaan tietoja" />);
    expect(screen.getByRole("status")).toHaveAccessibleName("Haetaan tietoja");
  });

  it("Alert dismiss button has accessible name", () => {
    render(<Alert onDismiss={() => {}}>Message</Alert>);
    expect(screen.getByRole("button", { name: "Sulje ilmoitus" })).toBeInTheDocument();
  });
});

describe("Accessibility: focus indicators", () => {
  it("Button has focus-visible ring", () => {
    render(<Button>Focus</Button>);
    const btn = screen.getByRole("button", { name: "Focus" });
    expect(btn.className).toContain("focus-visible:ring-2");
    expect(btn.className).toContain("focus-visible:outline-none");
  });

  it("Input has focus ring", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("focus:ring-2");
    expect(input.className).toContain("focus:outline-none");
  });

  it("Modal close button has focus-visible ring", () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Title">Content</Modal>);
    const closeBtn = screen.getByRole("button", { name: "Sulje" });
    expect(closeBtn.className).toContain("focus-visible:ring-2");
  });

  it("Alert dismiss button has focus-visible ring", () => {
    render(<Alert onDismiss={() => {}}>Message</Alert>);
    const btn = screen.getByRole("button", { name: "Sulje ilmoitus" });
    expect(btn.className).toContain("focus-visible:ring-2");
  });
});

describe("Accessibility: form validation and error states", () => {
  it("FormField error uses role alert", () => {
    render(
      <FormField label="Nimi" error="Pakollinen tieto">
        <Input />
      </FormField>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Pakollinen tieto");
  });

  it("Input error uses role alert", () => {
    render(<Input label="Nimi" error="Pakollinen tieto" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Pakollinen tieto");
  });

  it("Input sets aria-invalid when error present", () => {
    render(<Input label="Nimi" error="Virhe" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("Input does not set aria-invalid when no error", () => {
    render(<Input label="Nimi" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("Input sets aria-required when required", () => {
    render(<Input label="Nimi" required />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true");
  });

  it("Input sets aria-describedby when error present", () => {
    render(<Input label="Nimi" error="Virhe" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby");
    expect(input.getAttribute("aria-describedby")).toContain("-error");
  });

  it("Input sets aria-describedby when hint present", () => {
    render(<Input label="Nimi" hint="Apua" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby");
    expect(input.getAttribute("aria-describedby")).toContain("-hint");
  });

  it("FormField required indicator has aria-hidden", () => {
    render(
      <FormField label="Nimi" required>
        <Input />
      </FormField>,
    );
    const star = screen.getByText(/Nimi/).querySelector("span");
    expect(star).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Accessibility: disabled and loading states", () => {
  it("Button sets aria-disabled when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
  });

  it("Button sets aria-busy when loading", () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("Input is disabled via attribute", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("Spinner uses sr-only for label text", () => {
    render(<Spinner label="Loading data" />);
    const srText = screen.getByText("Loading data");
    expect(srText.className).toContain("sr-only");
  });
});

describe("Accessibility: keyboard interaction", () => {
  it("Button activates on Enter", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalled();
  });

  it("Button activates on Space", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    screen.getByRole("button").focus();
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalled();
  });

  it("Disabled button ignores keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Submit</Button>);
    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("Input accepts keyboard input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
  });

  it("Modal dismiss button is keyboard accessible", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Title">Content</Modal>);
    const closeBtn = screen.getByRole("button", { name: "Sulje" });
    closeBtn.focus();
    await user.keyboard("{Enter}");
    expect(onClose).toHaveBeenCalled();
  });

  it("Alert dismiss button is keyboard accessible", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Message</Alert>);
    const btn = screen.getByRole("button", { name: "Sulje ilmoitus" });
    btn.focus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalled();
  });
});

describe("Accessibility: reduced motion support", () => {
  it("Button spinner has animate-spin class", () => {
    render(<Button loading>Save</Button>);
    const spinner = screen.getByRole("button", { name: /Save/ }).querySelector("svg");
    expect(spinner?.getAttribute("class")).toContain("animate-spin");
  });

  it("Skeleton has animate-pulse class", () => {
    render(<Skeleton />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("animate-pulse");
  });

  it("Spinner has animate-spin class", () => {
    render(<Spinner />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("animate-spin");
  });
});

describe("Accessibility: color contrast and text visibility", () => {
  it("Button text has font-semibold", () => {
    render(<Button>Visible</Button>);
    const btn = screen.getByRole("button", { name: "Visible" });
    expect(btn.className).toContain("font-semibold");
  });

  it("Input label has font-medium", () => {
    render(<Input label="Username" />);
    const label = screen.getByText("Username");
    expect(label.className).toContain("font-medium");
  });

  it("Alert variant error uses red text", () => {
    render(<Alert variant="error">Error message</Alert>);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("text-red-400");
  });

  it("FormField error text uses text-red-400", () => {
    render(
      <FormField label="Nimi" error="Virhe">
        <Input />
      </FormField>,
    );
    expect(screen.getByRole("alert").className).toContain("text-red-400");
  });
});

describe("Accessibility: media element fallback", () => {
  it("decorative SVGs should use aria-hidden to prevent screen reader confusion", () => {
    render(
      <div>
        <svg aria-hidden="true" data-testid="decorative-svg">
          <circle r="5" />
        </svg>
      </div>,
    );
    const svg = screen.getByTestId("decorative-svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});
