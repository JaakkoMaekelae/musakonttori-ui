import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare function Sheet({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): React.JSX.Element;
declare function SheetTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.JSX.Element;
declare function SheetClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): React.JSX.Element;
declare function SheetPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): React.JSX.Element;
declare function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element;
export interface SheetContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
    /** Which edge the sheet slides from */
    side?: "top" | "right" | "bottom" | "left";
    /** Show the X close button */
    showCloseButton?: boolean;
    /** Accessible label for the close button */
    closeLabel?: string;
}
/**
 * Musakonttori SheetContent - sivusta liukuva paneeli.
 *
 * Radix UI Dialog -pohjainen. Tukee neljää suuntaa (top, right, bottom, left).
 *
 * @example
 * <Sheet>
 *   <SheetTrigger>Avaa</SheetTrigger>
 *   <SheetContent side="right" closeLabel="Sulje">
 *     <SheetHeader>
 *       <SheetTitle>Ostoskori</SheetTitle>
 *       <SheetDescription>2 tuotetta</SheetDescription>
 *     </SheetHeader>
 *     ...
 *   </SheetContent>
 * </Sheet>
 */
declare function SheetContent({ className, children, side, showCloseButton, closeLabel, ...props }: SheetContentProps): React.JSX.Element;
declare function SheetHeader({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function SheetFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element;
declare function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): React.JSX.Element;
export { Sheet, SheetTrigger, SheetClose, SheetPortal, SheetOverlay, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
//# sourceMappingURL=Sheet.d.ts.map