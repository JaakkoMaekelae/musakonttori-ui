import type { Meta, StoryObj } from "@storybook/react";
import { CookieConsentBanner } from "../CookieConsentBanner";

const meta: Meta<typeof CookieConsentBanner> = {
  title: "UI/CookieConsentBanner",
  component: CookieConsentBanner,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      if (typeof window !== "undefined") {
        document.cookie = "mk_cookie_consent=; path=/; max-age=0";
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CookieConsentBanner>;

export const Default: Story = {
  render: () => <CookieConsentBanner />,
};

export const WithPrivacyLink: Story = {
  render: () => <CookieConsentBanner privacyHref="/privacy" />,
};
