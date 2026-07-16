import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "../Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    homeHref: "/",
    items: [
      { label: "Admin", href: "/admin" },
      { label: "Users", href: "/admin/users" },
      { label: "Edit User" },
    ],
  },
};

export const SingleLevel: Story = {
  args: {
    homeHref: "/",
    items: [
      { label: "Dashboard" },
    ],
  },
};

export const NoLinks: Story = {
  args: {
    items: [
      { label: "Settings", href: "/settings" },
      { label: "Privacy" },
    ],
  },
};
