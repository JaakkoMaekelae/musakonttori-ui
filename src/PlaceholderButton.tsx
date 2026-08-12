"use client";

import type { ComponentProps } from "react";
import { toast } from "sonner";
import { Button } from "./Button";

export interface PlaceholderButtonProps
  extends ComponentProps<typeof Button> {
  /** Toast message. Default: "Tulossa pian" */
  toastMessage?: string;
  /** Toast description. Default: undefined */
  toastDescription?: string;
}

/**
 * Musakonttori PlaceholderButton - "tulossa pian" -nappi.
 *
 * Näyttää toastin klikatessa. Hyödyllinen kesken oleville featureille.
 *
 * @example
 * <PlaceholderButton toastMessage="Coming soon">Uusi ominaisuus</PlaceholderButton>
 */
export function PlaceholderButton({
  children,
  toastMessage = "Tulossa pian",
  toastDescription,
  ...props
}: PlaceholderButtonProps) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        e.preventDefault();
        toast(toastMessage, { description: toastDescription });
      }}
    >
      {children}
    </Button>
  );
}
