import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * The package ships Tailwind-based components, so the Storybook build needs
 * the Tailwind v4 Vite plugin — `src/globals.css` starts with
 * `@import "tailwindcss"`, which is a no-op without it and leaves every story
 * unstyled.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  // Storybook 10 ships controls, actions, docs, viewport and backgrounds in
  // core — the 8.x addon-essentials/addon-interactions packages have no 9/10
  // release and would fail to load here.
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: { disableTelemetry: true },
  viteFinal: async (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
