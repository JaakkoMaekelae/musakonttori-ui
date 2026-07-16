"use client";

import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./utils";

/**
 * Musakonttori Dialog - modal dialog built on Radix UI.
 *
 * Supports: focus trap, escape to close, title + description,
 * overlay with backdrop blur, animated enter/exit.
 *
 * @example
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <DialogTrigger>Avaa</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Vahvista</DialogTitle>
 *       <DialogDescription>Oletko varma?</DialogDescription>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;

export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {}

export const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-2xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-[var(--mk-palette-bg-surface,#1E2130)] shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "duration-200",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--mk-palette-bg-surface,#1E2130)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-bg-brand,#DC2626)] focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4 text-[var(--mk-palette-text-secondary,#B0B3C1)]" />
          <span className="sr-only">Sulje</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 px-6 pt-6 pb-2", className)}
      {...props}
    />
  ),
);

DialogHeader.displayName = "DialogHeader";

export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

export const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", className)}
      {...props}
    />
  ),
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

export const DialogDescription = forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-[var(--mk-palette-text-secondary,#B0B3C1)]", className)}
      {...props}
    />
  ),
);

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  showCloseButton?: boolean;
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, showCloseButton, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2 rounded-b-2xl border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] bg-[var(--mk-palette-bg,#0D0F17)]/50 px-6 py-4",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="rounded-sm opacity-70 ring-offset-[var(--mk-palette-bg-surface,#1E2130)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--mk-palette-bg-brand,#DC2626)] focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4 text-[var(--mk-palette-text-secondary,#B0B3C1)]" />
          <span className="sr-only">Sulje</span>
        </DialogPrimitive.Close>
      )}
    </div>
  ),
);

DialogFooter.displayName = "DialogFooter";
