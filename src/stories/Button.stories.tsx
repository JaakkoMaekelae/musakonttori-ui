import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "icon-sm", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Primary" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Outline: Story = { args: { variant: "outline", children: "Outline" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } };

export const Small: Story = { args: { variant: "primary", size: "sm", children: "Small" } };
export const Large: Story = { args: { variant: "primary", size: "lg", children: "Large" } };
export const ExtraSmall: Story = { args: { variant: "primary", size: "xs", children: "XS" } };

export const Loading: Story = { args: { variant: "primary", children: "Saving...", loading: true } };
export const Disabled: Story = { args: { variant: "primary", children: "Disabled", disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" loading>Loading</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
      <Button variant="primary" size="xs">XS</Button>
      <Button variant="primary" size="sm">SM</Button>
      <Button variant="primary" size="md">MD</Button>
      <Button variant="primary" size="lg">LG</Button>
      <Button variant="secondary" size="icon-sm">?</Button>
      <Button variant="outline" size="icon">@</Button>
    </div>
  ),
};
