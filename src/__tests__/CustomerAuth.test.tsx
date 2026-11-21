import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CustomerAuthForm,
  CustomerAuthPage,
  CustomerAuthDialog,
} from "../CustomerAuth";

afterEach(cleanup);

const labels = {
  kicker: "Welcome back",
  title: "Sign in",
  description: "Continue to your music.",
  email: "Email",
  password: "Password",
  showPassword: "Show password",
  hidePassword: "Hide password",
  submit: "Sign in",
  pending: "Signing in",
  requestFailed: "Sign-in unavailable. Try again.",
  divider: "or use email",
  registerPrompt: "New here?",
  register: "Create account",
  reset: "Forgot password?",
  securityNote: "One Musakonttori account.",
  privacy: "Privacy",
  terms: "Terms",
};
const links = {
  register: "/register",
  reset: "/reset",
  privacy: "/privacy",
  terms: "/terms",
};
const brand = {
  name: "SoundLaunch",
  eyebrow: "Your music",
  title: "Release.",
  accent: "Be heard.",
  description: "Manage your releases.",
  benefits: [{ title: "Distribution", description: "Music services" }],
};
const props = { labels, links, onSubmit: vi.fn(async () => {}) };

async function fillCredentials() {
  const user = userEvent.setup();
  await user.type(
    screen.getByRole("textbox", { name: "Email" }),
    "artist@example.test"
  );
  await user.type(screen.getByLabelText(/^Password/), "test-password");
  return user;
}

describe("CustomerAuth", () => {
  it("keeps registration slots inside the form and disables them during submission", async () => {
    let finish: (() => void) | undefined;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        })
    );
    render(
      <CustomerAuthForm
        {...props}
        intent="sign-up"
        beforeCredentials={
          <label>
            Name
            <input name="name" required />
          </label>
        }
        afterCredentials={
          <label>
            Invite code
            <input name="inviteCode" />
          </label>
        }
        onSubmit={onSubmit}
      />
    );
    const name = screen.getByRole("textbox", { name: "Name" });
    const invite = screen.getByRole("textbox", { name: "Invite code" });
    expect(name.closest("form")).toBe(
      screen.getByLabelText(/^Password/).closest("form")
    );
    expect(invite.closest("form")).toBe(name.closest("form"));
    const user = await fillCredentials();
    await user.type(name, "Artist");
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(name).toBeDisabled();
    expect(invite).toBeDisabled();
    finish?.();
    await waitFor(() => expect(name).toBeEnabled());
  });

  it("uses new-password autofill and backend-compatible length only for registration", () => {
    const { rerender } = render(
      <CustomerAuthForm {...props} intent="sign-up" />
    );
    expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
      "autocomplete",
      "new-password"
    );
    expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
      "minlength",
      "8"
    );
    expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
      "maxlength",
      "200"
    );
    rerender(<CustomerAuthForm {...props} />);
    expect(screen.getByLabelText(/^Password/)).toHaveAttribute(
      "autocomplete",
      "current-password"
    );
    expect(screen.getByLabelText(/^Password/)).not.toHaveAttribute("minlength");
  });

  it("keeps registration password count accurate while toggling visibility", async () => {
    render(<CustomerAuthForm {...props} intent="sign-up" />);
    const user = await fillCredentials();
    expect(screen.getByText("13/200")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getByLabelText(/^Password/)).toHaveValue("test-password");
    expect(screen.getByText("13/200")).toBeInTheDocument();
  });

  it("labels required autofill fields and toggles password without submitting", async () => {
    const onSubmit = vi.fn(async () => {});
    render(<CustomerAuthForm {...props} onSubmit={onSubmit} />);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
      "autocomplete",
      "username"
    );
    const password = screen.getByLabelText(/^Password/);
    expect(password).toHaveAttribute("required");
    expect(password).toHaveAttribute("autocomplete", "current-password");
    const user = await fillCredentials();
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(password).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(password).toHaveAttribute("type", "password");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("awaits credentials, prevents duplicate submit, then restores the form", async () => {
    let finish: (() => void) | undefined;
    const pending = new Promise<void>((resolve) => {
      finish = resolve;
    });
    const onSubmit = vi.fn(() => pending);
    render(<CustomerAuthForm {...props} onSubmit={onSubmit} />);
    const user = await fillCredentials();
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: "artist@example.test",
      password: "test-password",
    });
    expect(screen.getByRole("status")).toHaveAccessibleName("Signing in");
    expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Signing in/ })).toBeDisabled();
    finish?.();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled()
    );
  });

  it("handles rejected requests without leaking errors or clearing user input", async () => {
    render(
      <CustomerAuthForm
        {...props}
        onSubmit={async () => {
          throw new Error("private transport details");
        }}
      />
    );
    const user = await fillCredentials();
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      labels.requestFailed
    );
    expect(
      screen.queryByText("private transport details")
    ).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveValue(
      "artist@example.test"
    );
    expect(screen.getByRole("button", { name: "Sign in" })).toBeEnabled();
  });

  it("renders only supplied providers as navigation links", () => {
    const { rerender } = render(<CustomerAuthForm {...props} />);
    expect(screen.queryByText(labels.divider)).not.toBeInTheDocument();
    rerender(
      <CustomerAuthForm
        {...props}
        providers={[
          {
            id: "google",
            label: "Continue with Google",
            href: "/oauth/google",
          },
        ]}
      />
    );
    expect(
      screen.getByRole("link", { name: "Continue with Google" })
    ).toHaveAttribute("href", "/oauth/google");
    expect(
      screen.queryByRole("link", { name: /Facebook/ })
    ).not.toBeInTheDocument();
  });

  it("uses caller branding and navigation without legacy fixed product content", () => {
    render(
      <CustomerAuthPage
        form={props}
        brand={brand}
        navigation={{ href: "/", label: "Back home" }}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Release.Be heard."
    );
    expect(screen.getByRole("link", { name: "Back home" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("opens same form in a dialog, traps focus, closes on Escape and returns focus", async () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <CustomerAuthDialog
          form={props}
          productName="SoundLaunch"
          open={open}
          onOpenChange={setOpen}
          closeLabel="Close sign-in"
          trigger={<button>Open sign-in</button>}
        />
      );
    }
    render(<Example />);
    const user = userEvent.setup();
    const trigger = screen.getByRole("button", { name: "Open sign-in" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Sign in" });
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  });
});
