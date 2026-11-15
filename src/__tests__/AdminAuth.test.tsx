import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AdminAuthPage } from "../AdminAuth";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const labels = {
  signInHeading: "Sign in",
  signInDescription: "Use your admin account.",
  identifier: "Username or email",
  password: "Password",
  signIn: "Sign in",
  signingIn: "Signing in",
  mfaHeading: "Two-factor authentication",
  mfaDescription: "Enter the code.",
  code: "Code",
  verify: "Verify",
  verifying: "Verifying",
  enrollHeading: "Set up MFA",
  enrollDescription: "Scan the code.",
  secretLabel: "Secret",
  qrAlt: "QR code",
  openInAuthenticator: "Open in authenticator",
  backupHeading: "Backup codes",
  backupDescription: "Save these.",
  backupSaved: "Saved",
  passwordHeading: "Set a new password",
  passwordDescription: "At least 12 characters.",
  newPassword: "New password",
  confirmPassword: "Confirm password",
  savePassword: "Save password",
  saving: "Saving",
  doneHeading: "Done",
  doneDescription: "You are signed in.",
  genericError: "Something went wrong.",
  errors: { invalid_credentials: "Invalid credentials." },
};

const brand = {
  name: "Musakonttori HQ",
  title: "Admin access",
  accent: "for the whole family",
  description: "Manage the products.",
};

describe("AdminAuthPage", () => {
  it("renders the credentials step with accessible labels", () => {
    render(<AdminAuthPage brand={brand} labels={labels} />);
    expect(screen.getByLabelText("Username or email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
  });

  it("moves to the MFA step after a successful password check", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, enrollmentRequired: false }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<AdminAuthPage brand={brand} labels={labels} />);
    await user.type(screen.getByLabelText("Username or email"), "jaakko");
    await user.type(screen.getByLabelText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Two-factor authentication")).toBeDefined();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/admin-auth/login",
      expect.objectContaining({ method: "POST" })
    );
  });
});
