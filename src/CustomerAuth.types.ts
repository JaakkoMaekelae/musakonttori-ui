import type { ReactNode } from "react";

export interface CustomerAuthLabels {
  kicker: string;
  title: string;
  description: string;
  email: string;
  password: string;
  showPassword: string;
  hidePassword: string;
  submit: string;
  pending: string;
  requestFailed: string;
  divider: string;
  registerPrompt: string;
  register: string;
  reset: string;
  securityNote: string;
  privacy: string;
  terms: string;
}

export interface CustomerAuthFormProps {
  /** Sign-in stays the default; registration enables new-password autofill. */
  intent?: "sign-in" | "sign-up";
  /** Extra fields share credential validation and the pending disabled state. */
  beforeCredentials?: ReactNode;
  afterCredentials?: ReactNode;
  labels: CustomerAuthLabels;
  links: { register: string; reset?: string; privacy: string; terms?: string };
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  providers?: ReadonlyArray<{
    id: "google" | "facebook";
    label: string;
    href: string;
  }>;
  errorMessage?: string;
}

export interface CustomerAuthBrand {
  name: string;
  logo?: ReactNode;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  benefits: ReadonlyArray<{ title: string; description: string }>;
}

export interface CustomerAuthPageProps {
  form: CustomerAuthFormProps;
  brand: CustomerAuthBrand;
  navigation: { href: string; label: string };
  controls?: ReactNode;
  className?: string;
}

export interface CustomerAuthDialogProps {
  form: CustomerAuthFormProps;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeLabel: string;
  trigger?: ReactNode;
  controls?: ReactNode;
}
