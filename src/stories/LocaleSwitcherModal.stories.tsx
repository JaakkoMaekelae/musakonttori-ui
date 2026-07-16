import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LocaleSwitcherModal } from "../LocaleSwitcherModal";
import { Button } from "../Button";

const LocaleSwitcherDemo = () => {
  const [open, setOpen] = useState(false);
  const lastLocale = "fi";
  const lastCurrency = "EUR";
  const lastCountry = "auto";

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Locale Switcher</Button>
      <LocaleSwitcherModal
        open={open}
        onClose={() => setOpen(false)}
        onLocaleChange={(loc) => console.log("locale →", loc)}
        onCurrencyChange={(cur) => console.log("currency →", cur)}
        onCountryChange={(c) => console.log("country →", c)}
      />
    </>
  );
};

const meta: Meta<typeof LocaleSwitcherModal> = {
  title: "UI/LocaleSwitcherModal",
  component: LocaleSwitcherModal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LocaleSwitcherModal>;

export const Default: Story = {
  render: () => <LocaleSwitcherDemo />,
};

export const Preselected: Story = {
  render: () => {
    const Comp = () => {
      const [open, setOpen] = useState(true);
      return (
        <LocaleSwitcherModal
          open={open}
          onClose={() => setOpen(false)}
          currentLocale="en"
          currentCurrency="USD"
          currentCountry="US"
        />
      );
    };
    return <Comp />;
  },
};
