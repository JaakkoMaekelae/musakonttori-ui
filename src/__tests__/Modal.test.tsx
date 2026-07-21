import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";

function TestModal({
  defaultOpen = false,
  title,
}: {
  defaultOpen?: boolean;
  title?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        Avaa modaali
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title}>
        <p>Modaalin sisältö</p>
      </Modal>
    </div>
  );
}

describe("Modal", () => {
  it("does not render when isOpen is false", () => {
    render(<Modal isOpen={false} onClose={() => {}}>Content</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders when isOpen is true", () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has role dialog and aria-modal attributes", () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("renders title with aria-labelledby when title provided", () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Vahvista">
        Content
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(screen.getByText("Vahvista")).toBeInTheDocument();
  });

  it("uses aria-label when no title provided", () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-label", "Dialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
  });

  it("renders children content", () => {
    render(<Modal isOpen={true} onClose={() => {}}><p>Tärkeä sisältö</p></Modal>);
    expect(screen.getByText("Tärkeä sisältö")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        footer={<button type="button">Tallenna</button>}
      >
        Content
      </Modal>,
    );
    expect(screen.getByRole("button", { name: "Tallenna" })).toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on backdrop click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>);
    const overlay = screen.getByRole("dialog");
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close when clicking modal content", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    await user.click(screen.getByText("Content"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes when close button (X) clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal isOpen={true} onClose={onClose} title="Vahvista">Content</Modal>);
    const closeBtn = screen.getByRole("button", { name: "Sulje" });
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("opens and closes via external trigger", async () => {
    const user = userEvent.setup();
    render(<TestModal />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Avaa modaali" }));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("renders close button with accessible label", () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Title">Content</Modal>);
    expect(screen.getByRole("button", { name: "Sulje" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sulje" })).toHaveAttribute("aria-label", "Sulje");
  });

  it("applies custom className to modal panel", () => {
    render(<Modal isOpen={true} onClose={() => {}} className="my-modal">Content</Modal>);
    const dialog = screen.getByRole("dialog");
    const panel = dialog.firstElementChild;
    expect(panel?.className).toContain("my-modal");
  });

  it("focus trap: close button is focusable", () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Title">Content</Modal>);
    const closeBtn = screen.getByRole("button", { name: "Sulje" });
    expect(closeBtn).not.toHaveAttribute("tabindex", "-1");
  });

  it("has focus-visible ring on close button", () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Title">Content</Modal>);
    const closeBtn = screen.getByRole("button", { name: "Sulje" });
    expect(closeBtn.className).toContain("focus-visible:ring-2");
  });
});
