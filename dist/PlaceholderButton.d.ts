import type { ComponentProps } from "react";
import { Button } from "./Button";
export interface PlaceholderButtonProps extends ComponentProps<typeof Button> {
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
export declare function PlaceholderButton({ children, toastMessage, toastDescription, ...props }: PlaceholderButtonProps): import("react").JSX.Element;
//# sourceMappingURL=PlaceholderButton.d.ts.map