"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "./utils";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
/**
 * Musakonttori DropdownMenuContent - dropdown-valikon sisältö.
 *
 * Radix UI -pohjainen. Tukee Item, CheckboxItem, RadioItem, Label, Separator,
 * Group, Sub, Shortcut.
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
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-[var(--mk-palette-border-default,rgba(128,128,128,0.2))] bg-[var(--mk-palette-bg-surface-elevated,#FFFFFF)] p-1 shadow-md", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) })));
DropdownMenuContent.displayName = "DropdownMenuContent";
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Item, { ref: ref, className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--mk-palette-text-primary,#111113)] outline-none", "hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)] focus:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), ...props })));
DropdownMenuItem.displayName = "DropdownMenuItem";
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, inset, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.CheckboxItem, { ref: ref, checked: checked, className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm text-[var(--mk-palette-text-primary,#111113)] outline-none", "hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)] focus:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute right-2 flex items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "h-4 w-4" }) }) }), children] })));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";
const DropdownMenuRadioItem = React.forwardRef(({ className, children, inset, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.RadioItem, { ref: ref, className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-8 text-sm text-[var(--mk-palette-text-primary,#111113)] outline-none", "hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)] focus:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute right-2 flex items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(CheckIcon, { className: "h-4 w-4" }) }) }), children] })));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Separator, { ref: ref, className: cn("my-1 h-px bg-[var(--mk-palette-border-default,rgba(128,128,128,0.2))]", className), ...props })));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Label, { ref: ref, className: cn("px-2 py-1.5 text-xs font-semibold text-[var(--mk-palette-text-secondary,#5F6068)]", inset && "pl-8", className), ...props })));
DropdownMenuLabel.displayName = "DropdownMenuLabel";
const DropdownMenuShortcut = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest text-[var(--mk-palette-text-tertiary,#6B7280)]", className), ...props }));
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.SubTrigger, { ref: ref, className: cn("flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--mk-palette-text-primary,#111113)] outline-none", "hover:bg-[var(--mk-palette-bg-surface,#F4F4F5)] focus:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", "data-[state=open]:bg-[var(--mk-palette-bg-surface,#F4F4F5)]", inset && "pl-8", className), ...props, children: [children, _jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })] })));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.SubContent, { ref: ref, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-[var(--mk-palette-border-default,rgba(128,128,128,0.2))] bg-[var(--mk-palette-bg-surface-elevated,#FFFFFF)] p-1 shadow-md", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) })));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
export { DropdownMenu, DropdownMenuPortal, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };
