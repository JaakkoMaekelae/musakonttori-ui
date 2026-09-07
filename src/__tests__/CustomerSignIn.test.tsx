import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerSignIn } from "../CustomerSignIn";

describe("CustomerSignIn loading indicator", () => {
  it("shows a spinner and pending label while signing in", async () => {
    let resolveSignIn: (() => void) | undefined;
    const pending = new Promise<void>((resolve) => {
      resolveSignIn = resolve;
    });

    render(
      <CustomerSignIn
        productName="Stageflow"
        registerHref="/sign-up"
        onSignIn={async () => {
          await pending;
        }}
        showSocial={false}
        showMagicLink={false}
      />,
    );

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Sähköposti"), "fan@example.com");
    await user.type(screen.getByPlaceholderText("Salasana"), "salasana1");
    await user.click(screen.getByRole("button", { name: "Kirjaudu sähköpostilla" }));

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.getByText("Kirjaudutaan…")).toBeInTheDocument();
    });

    expect(screen.getByRole("button", { name: /Kirjaudutaan/ })).toBeDisabled();
    resolveSignIn?.();
  });

  it("restores the sign-in label after the request settles", async () => {
    render(
      <CustomerSignIn
        productName="Stageflow"
        registerHref="/sign-up"
        onSignIn={async () => {}}
        showSocial={false}
        showMagicLink={false}
      />,
    );

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText("Sähköposti"), "fan@example.com");
    await user.type(screen.getByPlaceholderText("Salasana"), "salasana1");
    await user.click(screen.getByRole("button", { name: "Kirjaudu sähköpostilla" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Kirjaudu sähköpostilla" })).toBeEnabled(),
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
