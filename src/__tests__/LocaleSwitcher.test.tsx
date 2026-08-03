import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  LocaleSwitcher,
  LocaleSwitcherTrigger,
  OPEN_LOCALE_MODAL_EVENT,
} from "../LocaleSwitcher";

/** The modal persists to localStorage; each test starts from a clean slate. */
beforeEach(() => {
  localStorage.clear();
});

const openModal = () => {
  fireEvent.click(screen.getByRole("button", { name: /vaihda maa/i }));
};

describe("LocaleSwitcher trigger", () => {
  it("shows the language flag alone by default", () => {
    render(<LocaleSwitcher locale="fi" />);
    const trigger = screen.getByRole("button", { name: /vaihda maa/i });
    expect(trigger).toHaveTextContent("🇫🇮");
    // The name is available to screen readers but not painted next to the flag.
    expect(trigger).not.toHaveTextContent(/^Suomi/);
  });

  it("shows the language name when variant is full", () => {
    render(<LocaleSwitcher locale="en" variant="full" />);
    expect(screen.getByRole("button", { name: /vaihda maa/i })).toHaveTextContent(
      "English"
    );
  });

  it("keeps country and currency in the accessible name", () => {
    render(<LocaleSwitcher locale="fi" currency="SEK" />);
    expect(
      screen.getByRole("button", { name: /Suomi, SEK/ })
    ).toBeInTheDocument();
  });

  it("falls back to a globe for a language it has no label for", () => {
    render(<LocaleSwitcher locale="zz" />);
    expect(screen.getByRole("button", { name: /vaihda maa/i })).toHaveTextContent(
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
    fireEvent.click(screen.getAllByRole("button", { name: /vaihda maa/i })[0]!);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

describe("LocaleSwitcher country selection", () => {
  it("offers the countries the modal has languages for", () => {
    render(<LocaleSwitcher locale="fi" country="FI" />);
    openModal();
    const select = screen.getByRole("combobox", { name: "Maa" });
    expect(select).toHaveValue("FI");
    expect(screen.getByRole("option", { name: "Sverige" })).toBeInTheDocument();
  });

  it("moves the language when the new country does not offer it, but keeps EUR", () => {
    const onLocaleChange = vi.fn();
    const onCurrencyChange = vi.fn();
    render(
      <LocaleSwitcher
        locale="fi"
        currency="EUR"
        country="FI"
        onLocaleChange={onLocaleChange}
        onCurrencyChange={onCurrencyChange}
      />
    );
    openModal();

    // Sweden offers sv/en and SEK — Finnish is not on the list, and EUR is not
    // Sweden's currency, so both have to move.
    fireEvent.change(screen.getByRole("combobox", { name: "Maa" }), {
      target: { value: "SE" },
    });

    expect(onLocaleChange).toHaveBeenCalledWith("sv");
    // EUR is always offered alongside the local currency, so it is kept.
    expect(onCurrencyChange).not.toHaveBeenCalled();
  });

  it("moves the currency when the old one is not offered in the new country", () => {
    const onCurrencyChange = vi.fn();
    render(
      <LocaleSwitcher
        locale="en"
        currency="SEK"
        country="SE"
        onCurrencyChange={onCurrencyChange}
      />
    );
    openModal();
    // Norway offers EUR and NOK. SEK is neither, so it cannot survive.
    fireEvent.change(screen.getByRole("combobox", { name: "Maa" }), {
      target: { value: "NO" },
    });
    expect(onCurrencyChange).toHaveBeenCalledWith("NOK");
  });

  it("keeps the language when the new country also offers it", () => {
    const onLocaleChange = vi.fn();
    render(
      <LocaleSwitcher
        locale="en"
        country="FI"
        onLocaleChange={onLocaleChange}
      />
    );
    openModal();
    fireEvent.change(screen.getByRole("combobox", { name: "Maa" }), {
      target: { value: "DE" },
    });
    // German is Germany's first language, but English is offered there too.
    expect(onLocaleChange).not.toHaveBeenCalled();
  });

  it("persists the country so the next mount does not re-detect", () => {
    const { unmount } = render(<LocaleSwitcher locale="fi" />);
    openModal();
    fireEvent.change(screen.getByRole("combobox", { name: "Maa" }), {
      target: { value: "PT" },
    });
    unmount();

    render(<LocaleSwitcher locale="pt" />);
    openModal();
    expect(screen.getByRole("combobox", { name: "Maa" })).toHaveValue("PT");
  });

  it("reports the country upward", () => {
    const onCountryChange = vi.fn();
    render(<LocaleSwitcher locale="fi" onCountryChange={onCountryChange} />);
    openModal();
    fireEvent.change(screen.getByRole("combobox", { name: "Maa" }), {
      target: { value: "NO" },
    });
    expect(onCountryChange).toHaveBeenCalledWith("NO");
  });
});
