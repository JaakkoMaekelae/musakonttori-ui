import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, toast } from "../Toast";
import { Button } from "../Button";

const ToastDemo = () => (
  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
    <Button variant="default" onClick={() => toast.success("Saved successfully!")}>
      Success Toast
    </Button>
    <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>
      Error Toast
    </Button>
    <Button variant="secondary" onClick={() => toast.info("New update available")}>
      Info Toast
    </Button>
    <Button
      variant="outline"
      onClick={() =>
        toast("Default toast", {
          description: "With a longer description message",
          action: { label: "Undo", onClick: () => toast.info("Undone!") },
        })
      }
    >
      Toast with action
    </Button>
  </div>
);

const meta: Meta = {
  title: "UI/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <ToastProvider richColors closeButton />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  render: () => (
    <ToastProvider richColors closeButton>
      <Button variant="default" onClick={() => toast.success("Data saved successfully!")}>
        Trigger Success
      </Button>
    </ToastProvider>
  ),
};

export const Error: Story = {
  render: () => (
    <ToastProvider richColors closeButton>
      <Button variant="destructive" onClick={() => toast.error("Could not save changes. Please try again.")}>
        Trigger Error
      </Button>
    </ToastProvider>
  ),
};

export const Info: Story = {
  render: () => (
    <ToastProvider richColors closeButton>
      <Button variant="secondary" onClick={() => toast.info("A new version is available.")}>
        Trigger Info
      </Button>
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider richColors closeButton>
      <Button
        variant="outline"
        onClick={() =>
          toast("Item deleted", {
            description: "The item has been permanently removed.",
            action: { label: "Undo", onClick: () => toast.success("Restored!") },
          })
        }
      >
        Trigger with action
      </Button>
    </ToastProvider>
  ),
};

export const AllTypes: Story = {
  render: () => <ToastDemo />,
};
