import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundPage } from "../NotFoundPage";

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
      />
    );
    expect(screen.getByText("Ticketing")).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Tätä sivua ei löytynyt" })
    ).toBeInTheDocument();
  });

  it("renders plain anchors, so a server not-found.tsx can use it", () => {
    // The component must not require a function prop: it is re-exported
    // through a 'use client' barrel, and not-found.tsx is a server component.
    // Passing a render prop across that boundary fails the production build
    // on every prerendered page.
    render(
      <NotFoundPage
        product="Links"
        initial="L"
        accent={["#4F46E5", "#A855F7"]}
        title="Hukassa"
        description="."
        links={[{ label: "Oma paneeli", href: "/dashboard" }]}
      />
    );
    const link = screen.getByRole("link", { name: /Oma paneeli/ });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/dashboard");
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
