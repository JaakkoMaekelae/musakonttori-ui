import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  LocaleSwitcher,
  LocaleSwitcherTrigger,
  OPEN_LOCALE_MODAL_EVENT,
} from "../LocaleSwitcher";

/** The modal persists to localStorage; each test starts from a clean slate. */
beforeEach(() => {
  localStorage.clear();
});

/** The modal's headings follow the selected language, so match all of them. */

const openModal = () => {
  fireEvent.click(screen.getByRole("button", { name: /vaihda kieli|change language|byt språk/i }));
};

describe("LocaleSwitcher trigger", () => {
  it("shows the language flag alone by default", () => {
    render(<LocaleSwitcher locale="fi" />);
    const trigger = screen.getByRole("button", { name: /vaihda kieli|change language|byt språk/i });
    expect(trigger).toHaveTextContent("🇫🇮");
    // The name is available to screen readers but not painted next to the flag.
    expect(trigger).not.toHaveTextContent(/^Suomi/);
  });

  it("shows the language name when variant is full", () => {
    render(<LocaleSwitcher locale="en" variant="full" />);
    expect(screen.getByRole("button", { name: /vaihda kieli|change language|byt språk/i })).toHaveTextContent(
      "English"
    );
  });

  it("keeps the currency in the accessible name", () => {
    render(<LocaleSwitcher locale="fi" currency="SEK" />);
    expect(
      screen.getByRole("button", { name: /Suomi, SEK/ })
    ).toBeInTheDocument();
  });

  it("falls back to a globe for a language it has no label for", () => {
    render(<LocaleSwitcher locale="zz" />);
    expect(screen.getByRole("button", { name: /vaihda kieli|change language|byt språk/i })).toHaveTextContent(
      "🌍"
    );
  });

  it("opens on click and closes on Escape", () => {
    render(<LocaleSwitcher locale="fi" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    openModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
  });

  it("opens when any other control on the page dispatches the event", () => {
    render(<LocaleSwitcher locale="fi" />);
    fireEvent(document, new Event(OPEN_LOCALE_MODAL_EVENT));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("LocaleSwitcherTrigger", () => {
  it("renders no modal of its own", () => {
    render(<LocaleSwitcherTrigger locale="fi" />);
    openModal();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("carries its own box model, so a product's scoped reset cannot flatten it", () => {
    const { container } = render(<LocaleSwitcherTrigger locale="fi" />);
    const css = container.querySelector("style")?.textContent ?? "";
    // Doubled attribute selector: one copy ties with `.mk-landing-root button`
    // and loses on source order.
    expect(css).toContain('[data-mk-switcher="language"][data-mk-switcher]');
    expect(css).toMatch(/padding:\s*0\.375rem 0\.75rem/);
    expect(css).toMatch(/border:\s*1px solid/);
    // !important would leave consumers no way to override at all.
    expect(css).not.toContain("!important");
  });

  it("asks for the modal by dispatching the open event", () => {
    const heard = vi.fn();
    document.addEventListener(OPEN_LOCALE_MODAL_EVENT, heard);
    render(<LocaleSwitcherTrigger locale="fi" />);
    openModal();
    expect(heard).toHaveBeenCalled();
    document.removeEventListener(OPEN_LOCALE_MODAL_EVENT, heard);
  });

  it("reaches a modal rendered elsewhere in the tree", () => {
    render(
      <>
        <header>
          <LocaleSwitcherTrigger locale="fi" />
        </header>
        <LocaleSwitcher locale="fi" className="sr-only" />
      </>
    );
    // Click the header trigger, not the one the LocaleSwitcher renders.
    fireEvent.click(screen.getAllByRole("button", { name: /vaihda kieli|change language|byt språk/i })[0]!);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("LocaleSwitcher wording", () => {
  it("speaks the selected language, not always Finnish", () => {
    render(<LocaleSwitcher locale="en" />);
    openModal();
    expect(screen.getByText("Regional settings")).toBeInTheDocument();
    expect(screen.queryByText("Alueasetukset")).not.toBeInTheDocument();
  });

  it("falls back to English for a language it has no strings for", () => {
    render(<LocaleSwitcher locale="pt" />);
    openModal();
    // Not Finnish — a Portuguese speaker is likelier to read English.
    expect(screen.getByText("Regional settings")).toBeInTheDocument();
  });

  it("lets a product override the wording with its own translations", () => {
    render(<LocaleSwitcher locale="fi" labels={{ title: "Omat asetukset" }} />);
    openModal();
    expect(screen.getByText("Omat asetukset")).toBeInTheDocument();
    // Unlisted keys keep the built-in string.
    expect(screen.getByText("Kieli ja valuutta")).toBeInTheDocument();
  });
});

describe("LocaleSwitcher scroll lock", () => {
  it("locks body scroll while open and releases it on close", async () => {
    render(<LocaleSwitcher locale="fi" />);
    expect(document.body.style.overflow).toBe("");
    openModal();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.keyDown(document, { key: "Escape" });
    // Close animation delays onClose by 250ms before `open` flips.
    await waitFor(() => expect(document.body.style.overflow).toBe(""));
  });

  it("releases body scroll after a language is picked", () => {
    render(<LocaleSwitcher locale="fi" onLocaleChange={() => {}} />);
    openModal();
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByText("English"));
    expect(document.body.style.overflow).toBe("");
  });

  it("releases body scroll when unmounted while open", () => {
    const { unmount } = render(<LocaleSwitcher locale="fi" />);
    openModal();
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});

describe("LocaleSwitcher country handling", () => {
  // Country is detected from the visitor's IP (or the server's `country` prop),
  // never manually picked — so the modal offers no country select by default.
  // The detected country still narrows which languages and currencies are shown.

  it("does not render a country control by default", () => {
    render(<LocaleSwitcher locale="fi" country="FI" />);
    openModal();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByText("Maa")).not.toBeInTheDocument();
    // The heading promises language + currency only.
    expect(screen.getByText("Kieli ja valuutta")).toBeInTheDocument();
  });

  it("can still show a country control when a product opts in", () => {
    render(<LocaleSwitcher locale="fi" country="FI" showCountry />);
    openModal();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Maa")).toBeInTheDocument();
  });

  it("offers the languages of the country it is given", () => {
    render(<LocaleSwitcher locale="sv" country="SE" />);
    openModal();
    expect(screen.getByText("Svenska")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("offers only locales the product routes", () => {
    render(<LocaleSwitcher locale="fi" country="SE" supportedLocales={["fi", "en"]} />);
    openModal();
    // Sweden speaks sv and en; this product routes fi and en.
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.queryByText("Svenska")).not.toBeInTheDocument();
  });

  it("falls back to the product's own locales when a country shares none", () => {
    render(<LocaleSwitcher locale="fi" country="GR" supportedLocales={["fi"]} />);
    openModal();
    // Greece speaks el and en; this product routes only fi. An empty language
    // grid would be worse than an unlocalized one.
    expect(screen.getByText("Selaa suomeksi")).toBeInTheDocument();
    expect(screen.queryByText("Browse in English")).not.toBeInTheDocument();
  });

  it("offers the country's currency alongside EUR", () => {
    render(<LocaleSwitcher locale="sv" country="SE" />);
    openModal();
    expect(screen.getByText("SEK")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });
});
