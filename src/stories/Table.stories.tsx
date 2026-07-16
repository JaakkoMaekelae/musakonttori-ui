import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../Table";
import { EmptyState } from "../EmptyState";

const meta: Meta<typeof DataTable> = {
  title: "UI/Table",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<Record<string, unknown>>>;

const columns = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const data = [
  { id: "1", name: "John Doe", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", role: "Editor", status: "Active" },
  { id: "3", name: "Bob Johnson", role: "Viewer", status: "Inactive" },
];

export const Default: Story = {
  args: { columns, data },
};

export const Striped: Story = {
  args: { columns, data, striped: true },
};

export const Loading: Story = {
  args: { columns, data: [], loading: true, loadingRowCount: 5 },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No users found",
    emptyDescription: "Add users to see them listed here.",
  },
};

export const WithRowClick: Story = {
  args: {
    columns,
    data,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const ManualComposition: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Role</TableHeaderCell>
        <TableHeaderCell align="right">Amount</TableHeaderCell>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell align="right">$1,200</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Editor</TableCell>
          <TableCell align="right">$850</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>Viewer</TableCell>
          <TableCell align="right">$0</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
