"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "./utils";
/**
 * Musakonttori Separator - visuaalinen jakaja.
 *
 * Tukee horisontaali- ja vertikaalisuuntia.
 * Oletuksena pelkkä visuaalinen (decorative), ei semanttinen.
 *
 * @example
 * <Separator />
 * <Separator orientation="vertical" className="h-full" />
 */
const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (_jsx(SeparatorPrimitive.Root, { ref: ref, decorative: decorative, orientation: orientation, className: cn("shrink-0 bg-[var(--mk-palette-border-default,rgba(128,128,128,0.2))]", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className), ...props })));
Separator.displayName = "Separator";
export { Separator };
