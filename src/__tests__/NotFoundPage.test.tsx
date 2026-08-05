import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundPage } from "../NotFoundPage";

const renderLink = (href: string, children: React.ReactNode) => (
  <a key={href} href={href}>
    {children}
  </a>
);

describe("NotFoundPage", () => {
  it("names the product that lost you, not just 404", () => {
    render(
      <NotFoundPage
        product="Ticketing"
        initial="T"
        accent={["#2563EB", "#3B82F6"]}
        title="Tätä sivua ei löytynyt"
        description="Linkki voi olla vanhentunut."
        links={[{ label: "Selaa tapahtumia", href: "/events" }]}
        renderLink={renderLink}
      />
    );
    expect(screen.getByText("Ticketing")).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tätä sivua ei löytynyt" })
    ).toBeInTheDocument();
  });

  it("offers the product's own destinations", () => {
    render(
      <NotFoundPage
        product="Stageflow"
        initial="S"
        accent={["#7C3AED", "#8B5CF6"]}
        title="Hukassa"
        description="."
        links={[
          { label: "Keikat", href: "/keikat", hint: "Tulevat keikat" },
          { label: "Festarit", href: "/festarit" },
        ]}
        renderLink={renderLink}
      />
    );
    // The point of the component: a 404 that is worth landing on offers real
    // routes onward, not a single dead-end back to the root.
    expect(screen.getByRole("link", { name: /Keikat/ })).toHaveAttribute(
      "href",
      "/keikat"
    );
    expect(screen.getByRole("link", { name: /Festarit/ })).toHaveAttribute(
      "href",
      "/festarit"
    );
    expect(screen.getByText("Tulevat keikat")).toBeInTheDocument();
  });
});
