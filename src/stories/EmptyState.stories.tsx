import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../EmptyState";
import { Button } from "../Button";
import { PlusCircle, Inbox, FileSearch } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No events yet",
    description: "You haven't created any events. Create your first event to get started.",
  },
};

export const WithActionObject: Story = {
  args: {
    title: "No events yet",
    description: "You haven't created any events. Create your first event to get started.",
    action: { label: "Create event", onClick: () => alert("Create clicked") },
  },
};

export const WithActionNode: Story = {
  args: {
    title: "No search results",
    description: "Try adjusting your search terms or filters.",
    action: <Button variant="outline" onClick={() => alert("Clear clicked")}>Clear filters</Button>,
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: <Inbox size={32} />,
    title: "No messages",
    description: "Your inbox is empty. New messages will appear here.",
  },
};

export const Simple: Story = {
  args: {
    title: "Nothing here",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <EmptyState
        icon={<PlusCircle size={32} />}
        title="No events"
        description="Create your first event to get started."
        action={{ label: "Create event", onClick: () => {} }}
      />
      <EmptyState
        icon={<FileSearch size={32} />}
        title="No results found"
        description="Try adjusting your search or filter criteria."
        action={<Button variant="outline">Clear all filters</Button>}
      />
      <EmptyState
        title="All caught up"
        description="There's nothing new to show right now."
      />
    </div>
  ),
};
