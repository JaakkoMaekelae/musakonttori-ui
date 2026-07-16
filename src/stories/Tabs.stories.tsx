import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const ControlledTabs = ({ withCount }: { withCount?: boolean }) => {
  const [value, setValue] = useState("all");
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="all" count={withCount ? 42 : undefined}>All</TabsTrigger>
        <TabsTrigger value="active" count={withCount ? 12 : undefined}>Active</TabsTrigger>
        <TabsTrigger value="draft" count={withCount ? 5 : undefined}>Draft</TabsTrigger>
        <TabsTrigger value="archived" disabled>Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all">All items content</TabsContent>
      <TabsContent value="active">Active items content</TabsContent>
      <TabsContent value="draft">Draft items content</TabsContent>
      <TabsContent value="archived">Archived items content</TabsContent>
    </Tabs>
  );
};

export const Default: Story = {
  render: () => <ControlledTabs />,
};

export const WithCounts: Story = {
  render: () => <ControlledTabs withCount />,
};

export const Static: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">General</TabsTrigger>
        <TabsTrigger value="tab2">Settings</TabsTrigger>
        <TabsTrigger value="tab3">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p style={{ padding: 16 }}>General settings content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p style={{ padding: 16 }}>Settings configuration content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p style={{ padding: 16 }}>Billing information content.</p>
      </TabsContent>
    </Tabs>
  ),
};
