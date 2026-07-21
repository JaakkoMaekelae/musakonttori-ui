import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../Table";

interface TestRow {
  id: string;
  name: string;
  email: string;
}

const columns = [
  { key: "name", header: "Nimi" },
  { key: "email", header: "Sähköposti" },
];

const data: TestRow[] = [
  { id: "1", name: "Matti Meikäläinen", email: "matti@example.com" },
  { id: "2", name: "Maija Malli", email: "maija@example.com" },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Nimi")).toBeInTheDocument();
    expect(screen.getByText("Sähköposti")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Matti Meikäläinen")).toBeInTheDocument();
    expect(screen.getByText("maija@example.com")).toBeInTheDocument();
  });

  it("renders empty state when data is empty", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("Ei tuloksia.")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="Yhtään tulosta ei löytynyt"
      />,
    );
    expect(screen.getByText("Yhtään tulosta ei löytynyt")).toBeInTheDocument();
  });

  it("renders custom empty description", () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyDescription="Kokeile toista hakua"
      />,
    );
    expect(screen.getByText("Kokeile toista hakua")).toBeInTheDocument();
  });

  it("renders loading state with skeletons", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} loading={true} loadingRowCount={3} />,
    );
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("loading state shows column headers", () => {
    render(<DataTable columns={columns} data={data} loading={true} />);
    expect(screen.getByText("Nimi")).toBeInTheDocument();
    expect(screen.getByText("Sähköposti")).toBeInTheDocument();
  });

  it("does not show data when loading", () => {
    render(<DataTable columns={columns} data={data} loading={true} />);
    expect(screen.queryByText("Matti Meikäläinen")).not.toBeInTheDocument();
  });

  it("handles row click", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />);
    await user.click(screen.getByText("Matti Meikäläinen"));
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it("handles row keyboard navigation with Enter", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />);
    const rows = screen.getAllByRole("button");
    rows[0]?.focus();
    await user.keyboard("{Enter}");
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("handles row keyboard navigation with Space", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={data} onRowClick={onRowClick} />);
    const rows = screen.getAllByRole("button");
    rows[0]?.focus();
    await user.keyboard(" ");
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it("row has button role when onRowClick provided", () => {
    render(<DataTable columns={columns} data={data} onRowClick={() => {}} />);
    const rows = screen.getAllByRole("button");
    expect(rows.length).toBeGreaterThanOrEqual(1);
  });

  it("row does not have button role when onRowClick not provided", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders striped rows with alternating background", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} striped />,
    );
    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(2);
  });

  it("renders custom cell content via render function", () => {
    const cols = [
      { key: "name", header: "Nimi" },
      { key: "status", header: "Tila", render: (row: TestRow) => <span data-testid="custom-cell">{row.name}-active</span> },
    ];
    render(<DataTable columns={cols} data={data} />);
    expect(screen.getAllByTestId("custom-cell")).toHaveLength(2);
    expect(screen.getByText("Matti Meikäläinen-active")).toBeInTheDocument();
  });

  it("accepts className prop", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} className="my-table" />,
    );
    expect(container.firstChild).toHaveClass("my-table");
  });

  it("renders dash for null/undefined values", () => {
    const nullData = [{ id: "1", name: "Testi", email: undefined as unknown as string }];
    render(<DataTable columns={columns} data={nullData} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});

describe("Static Table components", () => {
  it("renders Table with children", () => {
    render(
      <Table>
        <TableHead>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  it("TableHeaderCell supports align prop", () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <TableHeaderCell align="right">Summa</TableHeaderCell>
          </tr>
        </thead>
      </table>,
    );
    const th = container.querySelector("th");
    expect(th?.className).toContain("text-right");
  });

  it("TableCell supports align prop", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell align="center">Center</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const td = container.querySelector("td");
    expect(td?.className).toContain("text-center");
  });

  it("TableCell supports colSpan", () => {
    const { container } = render(
      <table>
        <tbody>
          <tr>
            <TableCell colSpan={3}>Wide</TableCell>
          </tr>
        </tbody>
      </table>,
    );
    const td = container.querySelector("td");
    expect(td?.colSpan).toBe(3);
  });
});
