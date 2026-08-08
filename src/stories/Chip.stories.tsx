import type { Meta, StoryObj } from "@storybook/react";
import { CalendarDays, Music2 } from "lucide-react";
import { Chip } from "../Chip";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Metadata: Story = {
  args: {
    children: "Elektroninen",
    leadingIcon: <Music2 />,
  },
};

export const SelectedFilter: Story = {
  args: {
    children: "Tällä viikolla",
    leadingIcon: <CalendarDays />,
    selected: true,
    onPress: () => undefined,
  },
};

export const Removable: Story = {
  args: {
    children: "Helsinki",
    removeLabel: "Poista Helsinki",
    onRemove: () => undefined,
  },
};

export const SemanticVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip>Neutraali</Chip>
      <Chip variant="brand">Brändi</Chip>
      <Chip variant="success">Valmis</Chip>
      <Chip variant="warning">Odottaa</Chip>
      <Chip variant="error">Virhe</Chip>
      <Chip variant="info">Tiedoksi</Chip>
    </div>
  ),
};
