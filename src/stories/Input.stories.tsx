import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../Input";
import { Search, Mail, Lock } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Type something..." },
};

export const WithLabel: Story = {
  args: { label: "Email", placeholder: "you@example.com", type: "email" },
};

export const Required: Story = {
  args: { label: "Name", placeholder: "Your name", required: true },
};

export const WithError: Story = {
  args: {
    label: "Email",
    value: "invalid",
    error: "Please enter a valid email address",
    type: "email",
  },
};

export const WithHint: Story = {
  args: {
    label: "Username",
    hint: "Must be at least 3 characters",
    placeholder: "johndoe",
  },
};

export const WithLeftIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: 360 }}>
      <Input label="Search" leftIcon={<Search size={16} />} placeholder="Search..." />
      <Input label="Email" leftIcon={<Mail size={16} />} type="email" placeholder="you@example.com" />
      <Input label="Password" leftIcon={<Lock size={16} />} type="password" placeholder="********" />
    </div>
  ),
};

export const WithCharCount: Story = {
  args: {
    label: "Bio",
    maxLength: 120,
    placeholder: "Tell us about yourself...",
    value: "Hello world",
  },
};

export const Disabled: Story = {
  args: { label: "Disabled", value: "Cannot edit", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 360 }}>
      <Input label="Default" placeholder="Type here..." />
      <Input label="With hint" hint="This is a helpful hint" placeholder="Type here..." />
      <Input label="With error" error="Something went wrong" placeholder="Type here..." />
      <Input label="Disabled" disabled placeholder="Cannot type..." />
      <Input label="Required" required placeholder="Must fill..." />
      <Input label="With max length" maxLength={50} placeholder="Limited to 50 chars" />
    </div>
  ),
};
