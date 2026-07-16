import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";

const ModalDemo = ({ title, hasFooter }: { title: string; hasFooter?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        footer={hasFooter ? (
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        ) : undefined}
      >
        <p>Modal content goes here. This is a generic modal dialog.</p>
      </Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => <ModalDemo title="Confirm action" hasFooter />,
};

export const WithoutFooter: Story = {
  render: () => <ModalDemo title="Information" />,
};
