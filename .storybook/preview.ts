import type { Preview } from "@storybook/react";
import "../src/tokens.css";
import "../src/globals.css";

/**
 * Both themes are first-class, so the toolbar switches them rather than the
 * package picking a default. The switch writes `data-theme` AND the `dark`
 * class because products are split between the two conventions (Stageflow and
 * Ticketing use the class, HQ and Sopimushallinta the attribute) and the
 * tokens layer answers to both.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals["theme"] === "light" ? "light" : "dark";
      const root = document.documentElement;
      root.setAttribute("data-theme", theme);
      root.classList.toggle("dark", theme === "dark");
      document.body.style.background = "var(--mk-palette-bg-canvas)";
      document.body.style.color = "var(--mk-palette-text-primary)";
      return Story();
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
