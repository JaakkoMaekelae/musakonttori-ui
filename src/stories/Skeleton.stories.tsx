import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, TableSkeleton } from "../Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { variant: "text", className: "h-4 w-64" } };

export const Circular: Story = { args: { variant: "circular", className: "h-12 w-12" } };

export const Rectangular: Story = { args: { variant: "rectangular", className: "h-32 w-64" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <Skeleton variant="text" className="h-4 w-48" />
      <Skeleton variant="circular" className="h-10 w-10" />
      <Skeleton variant="rectangular" className="h-24 w-40" />
    </div>
  ),
};

export const ContentLoading: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: 360 }}>
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <Skeleton variant="text" className="h-4 w-2/3" />
    </div>
  ),
};

export const ProfileLoading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Skeleton variant="circular" className="h-12 w-12" />
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        <Skeleton variant="text" className="h-4 w-32" />
        <Skeleton variant="text" className="h-3 w-48" />
      </div>
    </div>
  ),
};

export const TableLoading: Story = {
  render: () => <TableSkeleton rows={5} cols={4} />,
};
