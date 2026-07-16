import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", title: "Information", children: "This is an informational message." },
};

export const Success: Story = {
  args: { variant: "success", title: "Success", children: "Operation completed successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Warning", children: "Please review your changes before saving." },
};

export const Error: Story = {
  args: { variant: "error", title: "Error", children: "Something went wrong. Please try again." },
};

export const WithoutTitle: Story = {
  args: { variant: "info", children: "A simple message without a title." },
};

export const Dismissible: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="success" title="Saved" onDismiss={() => alert("Dismissed")}>
        Your changes have been saved.
      </Alert>
      <Alert variant="error" title="Failed" onDismiss={() => alert("Dismissed")}>
        Could not connect to the server.
      </Alert>
      <Alert variant="warning" onDismiss={() => {}}>
        Your session will expire in 5 minutes.
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="info" title="Info">This is an informational alert.</Alert>
      <Alert variant="success" title="Success">Your action was completed successfully.</Alert>
      <Alert variant="warning" title="Warning">Something needs your attention.</Alert>
      <Alert variant="error" title="Error">An error occurred while processing.</Alert>
    </div>
  ),
};
