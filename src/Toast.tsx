"use client";

export { Toaster as ToastProvider } from "sonner";
export { toast } from "sonner";

/**
 * Musakonttori Toast - notification component built on Sonner library.
 *
 * Usage:
 * 1. Add `<ToastProvider />` to application root.
 * 2. Call `toast.success()`, `toast.error()`, `toast.info()` anywhere.
 *
 * @example
 * // Set provider at application root
 * <ToastProvider richColors closeButton />
 *
 * // Show toast
 * toast.success("Tallennettu onnistuneesti!");
 * toast.error("Jotain meni pieleen");
 * toast.info("Uusi päivitys saatavilla");
 */
