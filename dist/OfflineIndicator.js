"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { cn } from "./utils";
/**
 * Musakonttori OfflineIndicator - offline-tilan ilmaisin.
 *
 * Näyttää bannerin kun verkkoyhteys katkeaa.
 * Piilossa kun yhteys on kunnossa.
 *
 * @example
 * <OfflineIndicator />
 * <OfflineIndicator label="No network connection" />
 */
export function OfflineIndicator({ label = "Ei verkkoyhteyttä", className, }) {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        setIsOnline(navigator.onLine);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    if (isOnline)
        return null;
    return (_jsxs("div", { role: "alert", className: cn("fixed bottom-20 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-lg", "bg-[var(--mk-palette-bg-warning,#F59E0B)] text-[var(--mk-palette-text-on-warning,#000000)]", className), children: [_jsx(WifiOff, { className: "h-3 w-3" }), label] }));
}
