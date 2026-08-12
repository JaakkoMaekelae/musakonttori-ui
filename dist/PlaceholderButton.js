"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { toast } from "sonner";
import { Button } from "./Button";
/**
 * Musakonttori PlaceholderButton - "tulossa pian" -nappi.
 *
 * Näyttää toastin klikatessa. Hyödyllinen kesken oleville featureille.
 *
 * @example
 * <PlaceholderButton toastMessage="Coming soon">Uusi ominaisuus</PlaceholderButton>
 */
export function PlaceholderButton({ children, toastMessage = "Tulossa pian", toastDescription, ...props }) {
    return (_jsx(Button, { ...props, onClick: (e) => {
            e.preventDefault();
            toast(toastMessage, { description: toastDescription });
        }, children: children }));
}
