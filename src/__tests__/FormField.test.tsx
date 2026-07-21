import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField } from "../FormField";
import { Input } from "../Input";

describe("FormField", () => {
  it("renders label text", () => {
    render(
      <FormField label="Nimi">
        <Input />
      </FormField>,
    );
    expect(screen.getByText("Nimi")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    const { container } = render(
      <FormField label="Sähköposti" htmlFor="email-input">
        <Input id="email-input" />
      </FormField>,
    );
    const label = container.querySelector("label");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("auto-generates htmlFor id when not provided", () => {
    const { container } = render(
      <FormField label="Nimi">
        <Input />
      </FormField>,
    );
    const label = container.querySelector("label");
    const id = label?.getAttribute("for");
    expect(id).toBeTruthy();
    const input = container.querySelector("input");
    expect(input).toBeInTheDocument();
    expect(input?.id).toBeTruthy();
  });

  it("renders required indicator (*) when required", () => {
    render(
      <FormField label="Nimi" required>
        <Input />
      </FormField>,
    );
    const label = screen.getByText(/Nimi/);
    const star = label.querySelector("span");
    expect(star).toBeTruthy();
    expect(star).toHaveAttribute("aria-hidden", "true");
    expect(star?.textContent).toBe("*");
  });

  it("does not show required indicator when not required", () => {
    render(
      <FormField label="Nimi">
        <Input />
      </FormField>,
    );
    const label = screen.getByText(/Nimi/);
    expect(label.querySelector("span")).toBeFalsy();
  });

  it("renders error message with role alert", () => {
    render(
      <FormField label="Nimi" error="Pakollinen tieto">
        <Input />
      </FormField>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Pakollinen tieto");
  });

  it("does not render help text when error is shown", () => {
    render(
      <FormField label="Nimi" error="Pakollinen tieto" helpText="Syötä koko nimesi">
        <Input />
      </FormField>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Pakollinen tieto");
    expect(screen.queryByText("Syötä koko nimesi")).not.toBeInTheDocument();
  });

  it("renders help text when there is no error", () => {
    render(
      <FormField label="Nimi" helpText="Syötä koko nimesi">
        <Input />
      </FormField>,
    );
    expect(screen.getByText("Syötä koko nimesi")).toBeInTheDocument();
  });

  it("renders children (input element)", () => {
    render(
      <FormField label="Nimi">
        <Input placeholder="Kirjoita nimesi" />
      </FormField>,
    );
    expect(screen.getByPlaceholderText("Kirjoita nimesi")).toBeInTheDocument();
  });

  it("renders children with disabled state", () => {
    render(
      <FormField label="Nimi">
        <Input disabled />
      </FormField>,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("error text uses red color for visibility", () => {
    render(
      <FormField label="Nimi" error="Virhe">
        <Input />
      </FormField>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("text-red-400");
  });

  it("error renders as a paragraph element", () => {
    render(
      <FormField label="Nimi" error="Virhe">
        <Input />
      </FormField>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.tagName).toBe("P");
  });

  it("accepts className prop", () => {
    const { container } = render(
      <FormField label="Nimi" className="my-field">
        <Input />
      </FormField>,
    );
    expect(container.firstChild).toHaveClass("my-field");
  });

  it("renders label with correct text color", () => {
    render(
      <FormField label="Nimi">
        <Input />
      </FormField>,
    );
    const label = screen.getByText(/Nimi/);
    expect(label.className).toContain("text-[var(--mk-palette-text-primary");
  });
});
