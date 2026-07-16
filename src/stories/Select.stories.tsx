import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../Select";

const SelectDemo = ({
  label,
  error,
  hint,
  placeholder = "Select an option",
}: {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
}) => {
  const [value, setValue] = useState("");
  return (
    <Select label={label} error={error} hint={hint} value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
        <SelectItem value="option4" disabled>Option 4 (disabled)</SelectItem>
      </SelectContent>
    </Select>
  );
};

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => <SelectDemo />,
};

export const WithLabel: Story = {
  render: () => <SelectDemo label="Category" />,
};

export const WithError: Story = {
  render: () => <SelectDemo label="Category" error="Please select a category" />,
};

export const WithHint: Story = {
  render: () => <SelectDemo label="Category" hint="Choose the event category" />,
};
