import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "success", "warning", "error", "info", "brand", "red", "purple", "blue", "green", "orange", "amber", "pink", "gray"],
    },
    tone: {
      control: "select",
      options: ["success", "warning", "error", "info", "neutral", "red", "purple", "blue", "green", "orange", "amber", "pink", "gray"],
    },
    dot: { control: "boolean" },
    pulse: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: "neutral", children: "Neutral" } };
export const Success: Story = { args: { variant: "success", children: "Success" } };
export const Warning: Story = { args: { variant: "warning", children: "Warning" } };
export const Error: Story = { args: { variant: "error", children: "Error" } };
export const Info: Story = { args: { variant: "info", children: "Info" } };
export const Brand: Story = { args: { variant: "brand", children: "Brand" } };

export const WithDot: Story = { args: { variant: "success", children: "Online", dot: true } };
export const WithPulse: Story = { args: { variant: "warning", children: "Pending", dot: true, pulse: true } };

export const ToneVariant: Story = { args: { tone: "error", children: "Tone Error" } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="brand">Brand</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="amber">Amber</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="gray">Gray</Badge>
    </div>
  ),
};

export const DotsAndPulse: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot pulse>Pending</Badge>
      <Badge variant="error" dot pulse>Down</Badge>
      <Badge variant="neutral" dot>Idle</Badge>
      <Badge variant="info" dot pulse>Streaming</Badge>
    </div>
  ),
};
