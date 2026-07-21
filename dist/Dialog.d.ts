import * as DialogPrimitive from "@radix-ui/react-dialog";
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
export declare const Dialog: import("react").FC<DialogPrimitive.DialogProps>;
export declare const DialogTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DialogClose: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
export declare const DialogPortal: import("react").FC<DialogPrimitive.DialogPortalProps>;
export declare const DialogOverlay: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogOverlayProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
}
export declare const DialogContent: import("react").ForwardRefExoticComponent<DialogContentProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
export declare const DialogHeader: import("react").ForwardRefExoticComponent<DialogHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
}
export declare const DialogTitle: import("react").ForwardRefExoticComponent<DialogTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
export interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
}
export declare const DialogDescription: import("react").ForwardRefExoticComponent<DialogDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    showCloseButton?: boolean;
}
export declare const DialogFooter: import("react").ForwardRefExoticComponent<DialogFooterProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Dialog.d.ts.map