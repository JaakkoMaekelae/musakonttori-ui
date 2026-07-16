import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = { args: {} };

export const Small: Story = { args: { size: "sm" } };

export const Large: Story = { args: { size: "lg" } };

export const White: Story = {
  args: { variant: "white" },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Spinner variant="default" />
        <p style={{ marginTop: 8, fontSize: 12, color: "var(--mk-palette-text-tertiary)" }}>Default</p>
      </div>
      <div style={{ textAlign: "center", background: "#0f1117", padding: 16, borderRadius: 8 }}>
        <Spinner variant="white" />
        <p style={{ marginTop: 8, fontSize: 12, color: "#fff" }}>White</p>
      </div>
    </div>
  ),
};
