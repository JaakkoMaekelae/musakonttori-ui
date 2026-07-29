import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Avatar, AvatarGroup } from "../Avatar";

describe("Avatar", () => {
  it("generates initials from the full name", () => {
    render(<Avatar name="Aino Aurora Laine" />);

    expect(
      screen.getByRole("img", { name: "Aino Aurora Laine" })
    ).toHaveTextContent("AL");
  });

  it("uses up to two characters for a single name", () => {
    render(<Avatar name="Prince" />);

    expect(screen.getByRole("img", { name: "Prince" })).toHaveTextContent("PR");
  });

  it("shows an accessible image and falls back after an image error", () => {
    render(<Avatar name="Matti Meikäläinen" src="/matti.jpg" />);

    const image = screen.getByRole("img", { name: "Matti Meikäläinen" });
    expect(image).toHaveAttribute("src", "/matti.jpg");

    fireEvent.error(image);

    expect(
      screen.getByRole("img", { name: "Matti Meikäläinen" })
    ).toHaveTextContent("MM");
    expect(
      screen.queryByRole("img", { name: "Matti Meikäläinen" })
    ).not.toHaveAttribute("src");
  });

  it("announces a localized presence label", () => {
    render(
      <Avatar name="Mira Mallikas" status="online" statusLabel="Paikalla" />
    );

    expect(screen.getByText("Paikalla")).toHaveClass("sr-only");
  });
});

describe("AvatarGroup", () => {
  it("names the group and keeps every member visible", () => {
    render(
      <AvatarGroup label="Projektin jäsenet">
        <Avatar name="Aino Laine" />
        <Avatar name="Matti Meikäläinen" />
      </AvatarGroup>
    );

    expect(
      screen.getByRole("group", { name: "Projektin jäsenet" })
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Aino Laine" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Matti Meikäläinen" })
    ).toBeInTheDocument();
  });
});
