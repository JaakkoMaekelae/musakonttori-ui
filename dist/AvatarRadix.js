"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";
/**
 * Musakonttori Avatar (Radix) - komposiittikuvake.
 *
 * Radix UI -pohjainen. Tukee Image, Fallback, Badge, Group, GroupCount.
 *
 * @example
 * <Avatar>
 *   <AvatarImage src="https://..." alt="Käyttäjä" />
 *   <AvatarFallback>KM</AvatarFallback>
 * </Avatar>
 */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Root, { ref: ref, "data-slot": "avatar", className: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className), ...props })));
Avatar.displayName = "Avatar";
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Image, { ref: ref, "data-slot": "avatar-image", className: cn("aspect-square size-full rounded-full object-cover", className), ...props })));
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Fallback, { ref: ref, "data-slot": "avatar-fallback", className: cn("flex size-full items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#F4F4F5)] text-sm text-[var(--mk-palette-text-secondary,#5F6068)]", className), ...props })));
AvatarFallback.displayName = "AvatarFallback";
function AvatarBadge({ className, ...props }) {
    return (_jsx("span", { "data-slot": "avatar-badge", className: cn("absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-[var(--mk-palette-bg-brand,#DC2626)] text-white ring-2 ring-[var(--mk-palette-bg,#FFFFFF)] select-none size-2.5", className), ...props }));
}
function AvatarGroup({ className, ...props }) {
    return (_jsx("div", { "data-slot": "avatar-group", className: cn("flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[var(--mk-palette-bg,#FFFFFF)]", className), ...props }));
}
function AvatarGroupCount({ className, ...props }) {
    return (_jsx("div", { "data-slot": "avatar-group-count", className: cn("relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--mk-palette-bg-surface,#F4F4F5)] text-sm text-[var(--mk-palette-text-secondary,#5F6068)] ring-2 ring-[var(--mk-palette-bg,#FFFFFF)]", className), ...props }));
}
export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount, };
