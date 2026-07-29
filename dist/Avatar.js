"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useState, } from "react";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
const avatarVariants = cva([
    "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden",
    "border border-[var(--mk-palette-border-subtle,#E4E4E7)]",
    "bg-[var(--mk-palette-bg-muted,#F4F4F5)]",
    "text-[var(--mk-palette-text-secondary,#52525B)]",
].join(" "), {
    variants: {
        size: {
            xs: "size-6 text-[0.625rem]",
            sm: "size-8 text-xs",
            md: "size-10 text-sm",
            lg: "size-12 text-base",
            xl: "size-16 text-lg",
        },
        shape: {
            circle: "rounded-full",
            rounded: "rounded-xl",
        },
        tone: {
            neutral: "",
            brand: "border-[var(--mk-palette-accent-primary,#DC2626)]/20 bg-[var(--mk-palette-accent-soft,rgba(220,38,38,0.10))] text-[var(--mk-palette-accent-primary,#DC2626)]",
        },
    },
    defaultVariants: {
        size: "md",
        shape: "circle",
        tone: "neutral",
    },
});
function getStatusClass(status) {
    switch (status) {
        case "online":
            return "bg-[var(--mk-status-success,#10B981)]";
        case "away":
            return "bg-[var(--mk-status-warning,#F59E0B)]";
        case "busy":
            return "bg-[var(--mk-status-error,#EF4444)]";
        case "offline":
            return "bg-[var(--mk-palette-text-tertiary,#A1A1AA)]";
    }
}
function getStatusSize(size) {
    switch (size) {
        case "xs":
            return "size-2 border";
        case "sm":
            return "size-2.5 border-2";
        case "md":
            return "size-3 border-2";
        case "lg":
            return "size-3.5 border-2";
        case "xl":
            return "size-4 border-2";
    }
}
function getInitials(name) {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0)
        return "?";
    if (words.length === 1) {
        return Array.from(words[0] ?? "?")
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }
    return `${Array.from(words[0] ?? "?")[0] ?? ""}${Array.from(words.at(-1) ?? "?")[0] ?? ""}`.toUpperCase();
}
/**
 * An accessible identity primitive with image-error fallback and optional
 * presence. The user's full name is always required; callers do not need to
 * duplicate initial generation across products.
 */
export const Avatar = forwardRef(({ name, src, alt = name, fallback, fallbackClassName, imageClassName, imageProps, status, statusLabel, size = "md", shape, tone, className, ...props }, ref) => {
    const [imageFailed, setImageFailed] = useState(false);
    useEffect(() => {
        setImageFailed(false);
    }, [src]);
    return (_jsxs("span", { ref: ref, "data-avatar": "", className: cn(avatarVariants({ size, shape, tone, className })), ...props, children: [_jsx("span", { role: src && !imageFailed ? undefined : "img", "aria-label": src && !imageFailed ? undefined : name, "aria-hidden": src && !imageFailed ? true : undefined, className: cn("flex size-full items-center justify-center font-semibold", fallbackClassName), children: fallback ?? getInitials(name) }), src && !imageFailed ? (_jsx("img", { ...imageProps, src: src, alt: alt, className: cn("absolute inset-0 size-full object-cover", imageClassName), onError: (event) => {
                    setImageFailed(true);
                    imageProps?.onError?.(event);
                } })) : null, status ? (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": "true", className: cn("absolute bottom-0 right-0 rounded-full", "border-[var(--mk-palette-bg-surface,#FFFFFF)]", getStatusClass(status), getStatusSize(size ?? "md")) }), _jsx("span", { className: "sr-only", children: statusLabel })] })) : null] }));
});
Avatar.displayName = "Avatar";
/**
 * Overlapping layout for multiple `Avatar` components.
 *
 * The group does not silently hide members. Product code owns any overflow
 * avatar so the visible count and localized label stay truthful.
 */
export function AvatarGroup({ label, className, children, ...props }) {
    return (_jsx("div", { role: "group", "aria-label": label, className: cn("flex items-center -space-x-2 [&_[data-avatar]]:ring-2", "[&_[data-avatar]]:ring-[var(--mk-palette-bg-surface,#FFFFFF)]", className), ...props, children: children }));
}
