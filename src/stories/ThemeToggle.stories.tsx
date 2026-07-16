import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "../ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};

export const WithCustomClass: Story = {
  render: () => <ThemeToggle className="border border-white/10" />,
};
