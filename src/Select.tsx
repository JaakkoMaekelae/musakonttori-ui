"use client";

import { forwardRef, useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "./utils";

/**
 * Musakonttori Select - selection component built on Radix UI.
 *
 * Supports: label, placeholder, error state.
 * WCAG 2.2 AA accessible (aria-invalid, aria-describedby).
 *
 * @example
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Valitse tapahtuma" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Tapahtuma A</SelectItem>
 *     <SelectItem value="2">Tapahtuma B</SelectItem>
 *   </SelectContent>
 * </Select>
 */

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ label, error, hint, className, children, ...props }, ref) => {
    const autoId = useId();
    const id = autoId;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)} ref={ref}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--mk-palette-text-primary,#F0F0F3)]"
          >
            {label}
          </label>
        )}
        <SelectPrimitive.Root {...props}>
          {children}
        </SelectPrimitive.Root>
        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
        {!error && hint && (
          <p className="text-xs text-[var(--mk-palette-text-tertiary,#6B7280)]">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

export const SelectTrigger = forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-[var(--mk-palette-bg,#0D0F17)] px-3 py-2 text-sm text-[var(--mk-palette-text-primary,#F0F0F3)]",
        "hover:border-[var(--mk-palette-border-hover,rgba(255,255,255,0.2))]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-bg-brand,#DC2626)] focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  ),
);

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export const SelectContent = forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-[var(--mk-palette-bg-surface,#1E2130)] shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);

SelectContent.displayName = SelectPrimitive.Content.displayName;

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export const SelectItem = forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-[var(--mk-palette-text-primary,#F0F0F3)] outline-none",
        "focus:bg-[var(--mk-palette-bg-brand,#DC2626)]/10 focus:text-[var(--mk-palette-text-primary,#F0F0F3)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            className="h-4 w-4 text-[var(--mk-palette-bg-brand,#DC2626)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  ),
);

SelectItem.displayName = SelectPrimitive.Item.displayName;
