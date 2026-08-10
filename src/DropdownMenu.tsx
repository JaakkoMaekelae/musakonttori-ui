"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "./utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * Musakonttori DropdownMenuContent - dropdown-valikon sisältö.
 *
 * Radix UI -pohjainen. Tukee mm. Item, Separator, Label, Group, Sub.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Valikko</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>Tili</DropdownMenuLabel>
 *     <DropdownMenuItem>Profiili</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem>Kirjaudu ulos</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-[var(--mk-palette-border-default,rgba(128,128,128,0.2))] bg-[var(--mk-palette-bg-surface-elevated,#FFFFFF)] p-1 shadow-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--mk-palette-text-primary,#111113)] outline-none",
      "hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)] focus:bg-[var(--mk-palette-bg-surface,#F4F4F5)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-[var(--mk-palette-border-default,rgba(128,128,128,0.2))]", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-semibold text-[var(--mk-palette-text-secondary,#5F6068)]",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSub,
};
