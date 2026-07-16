import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton, TableSkeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders skeleton with role status", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has animate-pulse class", () => {
    render(<Skeleton />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("animate-pulse");
  });

  it("renders text variant (default)", () => {
    render(<Skeleton />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("rounded-md");
  });

  it("renders circular variant", () => {
    render(<Skeleton variant="circular" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("rounded-full");
  });

  it("renders rectangular variant", () => {
    render(<Skeleton variant="rectangular" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("rounded-lg");
  });

  it("accepts className prop", () => {
    render(<Skeleton className="h-12 w-32" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("h-12");
    expect(el.className).toContain("w-32");
  });
});

describe("TableSkeleton", () => {
  it("renders correct number of rows and columns", () => {
    const { container } = render(<TableSkeleton rows={3} cols={4} />);
    const rows = container.querySelectorAll(".space-y-3 > div");
    expect(rows).toHaveLength(3);
    const firstRowCells = rows[0]?.querySelectorAll("div > div");
    expect(firstRowCells).toHaveLength(4);
  });

  it("has status role for accessibility", () => {
    render(<TableSkeleton rows={2} cols={2} />);
    const statusElements = screen.getAllByRole("status");
    expect(statusElements.length).toBeGreaterThanOrEqual(1);
  });
});
