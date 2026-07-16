import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "../FormField";
import { Input } from "../Input";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Name",
    children: <Input placeholder="Your name" />,
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    error: "Please enter a valid email address",
    children: <Input type="email" value="invalid" />,
  },
};

export const WithHelpText: Story = {
  args: {
    label: "Password",
    helpText: "Must be at least 8 characters with one number and one special character.",
    children: <Input type="password" placeholder="********" />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 360 }}>
      <FormField label="Default" helpText="This is the default state.">
        <Input placeholder="Type here..." />
      </FormField>
      <FormField label="Required" required helpText="This field is required.">
        <Input placeholder="Must fill..." />
      </FormField>
      <FormField label="With error" error="Something went wrong.">
        <Input placeholder="Error state" />
      </FormField>
    </div>
  ),
};
