import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  CustomerAuthPage,
  CustomerAuthDialog,
  type CustomerAuthFormProps,
} from "../CustomerAuth";
import { Button } from "../Button";
import "../customer-auth.css";

const form: CustomerAuthFormProps = {
  labels: {
    kicker: "Welcome back",
    title: "Sign in.",
    description: "Continue to your Musakonttori service.",
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
  },
  links: { register: "#register", reset: "#reset", privacy: "#privacy" },
  providers: [
    { id: "google", label: "Continue with Google", href: "#google" },
    { id: "facebook", label: "Continue with Facebook", href: "#facebook" },
  ],
  onSubmit: async () => {
    throw new Error("Storybook has no authentication transport");
  },
};
const meta = {
  title: "Patterns/CustomerAuth",
  component: CustomerAuthPage,
  parameters: { layout: "fullscreen" },
  args: {
    form,
    brand: {
      name: "SoundLaunch",
      eyebrow: "Your music. Your next release.",
      title: "Release.",
      accent: "Be heard.",
      description: "Manage music distribution and releases in one place.",
      benefits: [
        { title: "Distribution", description: "Music services" },
        { title: "Mastering", description: "Release-ready sound" },
      ],
    },
    navigation: { href: "#home", label: "Back to service" },
  },
} satisfies Meta<typeof CustomerAuthPage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Page: Story = {};
export const Failure: Story = {
  args: { form: { ...form, errorMessage: "Email or password is incorrect." } },
};
export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <CustomerAuthDialog
        form={form}
        productName="SoundLaunch"
        open={open}
        onOpenChange={setOpen}
        closeLabel="Close sign-in"
        trigger={<Button>Open sign-in</Button>}
      />
    );
  },
};
