import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Lockup } from "../Lockup";

describe("Lockup", () => {
  it("renders icon, product name and the MUSAKONTTORI eyebrow", () => {
    render(<Lockup product="SoundLaunch" />);
    expect(screen.getByText("SoundLaunch")).toBeInTheDocument();
    expect(screen.getByText("Musakonttori")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("holds the BRAND.md geometry against a product's scoped reset", () => {
    // Several products reset padding/border on descendants of their shell.
    // The spec's sizes are inline for that reason — a utility class loses.
    const { container } = render(<Lockup product="Ticketing" />);
    const mark = container.querySelector("span[aria-hidden]") as HTMLElement;
    expect(mark.style.width).toBe("36px");
    expect(mark.style.borderRadius).toBe("10px");
    expect(mark.style.fontWeight).toBe("800");
    expect(mark.style.fontStyle).toBe("italic");
  });

  it("lets a consumer-identity product carry its own accent", () => {
    const { container } = render(
      <Lockup product="Stageflow" accent={["#7C3AED", "#C026D3"]} />
    );
    const mark = container.querySelector("span[aria-hidden]") as HTMLElement;
    // jsdom normalises hex to rgb(); #7C3AED is rgb(124, 58, 237).
    expect(mark.style.background).toContain("rgb(124, 58, 237)");
    // and it must not have fallen back to the brand red
    expect(mark.style.background).not.toContain("rgb(191, 34, 39)");
  });

  it("drops the eyebrow when compact, and the text entirely when mark", () => {
    const { rerender } = render(<Lockup product="Market" variant="compact" />);
    expect(screen.getByText("Market")).toBeInTheDocument();
    expect(screen.queryByText("Musakonttori")).not.toBeInTheDocument();

    rerender(<Lockup product="Market" variant="mark" />);
    expect(screen.queryByText("Market")).not.toBeInTheDocument();
  });
});
