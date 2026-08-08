import type { Meta, StoryObj } from "@storybook/react";
import { UserRound } from "lucide-react";
import { Avatar, AvatarGroup } from "../Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "rounded"],
    },
    tone: {
      control: "select",
      options: ["neutral", "brand"],
    },
    status: {
      control: "select",
      options: ["online", "away", "busy", "offline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = {
  args: {
    name: "Aino Aurora Laine",
  },
};

export const Image: Story = {
  args: {
    name: {t("auto.matti_meikäläinen")},
    src: "https://example.com/avatar.jpg",
    size: "xl",
  },
};

export const CustomFallback: Story = {
  args: {
    name: {t("auto.tuntematon_käyttäjä")},
    fallback: <UserRound aria-hidden="true" />,
    tone: "brand",
  },
};

export const Presence: Story = {
  args: {
    name: "Mira Mallikas",
    status: "online",
    statusLabel: "Paikalla",
    size: "lg",
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup label={t("auto.projektin_jäsenet")}>
      <Avatar name="Aino Laine" tone="brand" />
      <Avatar name={t("auto.matti_meikäläinen")} />
      <Avatar name="Mira Mallikas" />
      <Avatar name={t("auto.kolme_muuta_jäsentä")} fallback="+3" />
    </AvatarGroup>
  ),
};
