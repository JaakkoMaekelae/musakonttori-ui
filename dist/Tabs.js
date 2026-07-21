"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";
/**
 * Musakonttori Tabs - tab component built on Radix UI.
 *
 * Supports: horizontal and vertical tabs,
 * badge count, disabled state.
 *
 * @example
 * <Tabs value={tab} onValueChange={setTab}>
 *   <TabsList>
 *     <TabsTrigger value="all">Kaikki</TabsTrigger>
 *     <TabsTrigger value="active">Aktiiviset</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="all">Sisältö 1</TabsContent>
 *   <TabsContent value="active">Sisältö 2</TabsContent>
 * </Tabs>
 */
export const Tabs = TabsPrimitive.Root;
export const TabsList = forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.List, { ref: ref, className: cn("inline-flex h-10 items-center gap-0 border-b border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))]", className), ...props })));
TabsList.displayName = TabsPrimitive.List.displayName;
export const TabsTrigger = forwardRef(({ className, count, children, ...props }, ref) => (_jsxs(TabsPrimitive.Trigger, { ref: ref, className: cn("inline-flex items-center justify-center gap-1.5 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors", "border-b-2 border-transparent", "text-[var(--mk-palette-text-secondary,#B0B3C1)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-bg-brand,#DC2626)] focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", "data-[state=active]:border-[var(--mk-palette-bg-brand,#DC2626)] data-[state=active]:text-[var(--mk-palette-bg-brand,#DC2626)]", className), ...props, children: [children, count !== undefined && (_jsx("span", { className: cn("ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-semibold", "bg-[var(--mk-palette-bg-surface,#1E2130)] text-[var(--mk-palette-text-secondary,#B0B3C1)]", "group-data-[state=active]:bg-[var(--mk-palette-bg-brand,#DC2626)]/10 group-data-[state=active]:text-[var(--mk-palette-bg-brand,#DC2626)]"), children: count }))] })));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
export const TabsContent = forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.Content, { ref: ref, className: cn("mt-2 ring-offset-[var(--mk-palette-bg,#0D0F17)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-bg-brand,#DC2626)] focus-visible:ring-offset-2", className), ...props })));
TabsContent.displayName = TabsPrimitive.Content.displayName;
