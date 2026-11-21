"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { CustomerAuthForm } from "./CustomerAuthForm";
import type { CustomerAuthDialogProps } from "./CustomerAuth.types";

export function CustomerAuthDialog({
  form,
  productName,
  open,
  onOpenChange,
  closeLabel,
  trigger,
  controls,
}: CustomerAuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="mk-auth mk-auth-dialog" closeLabel={closeLabel}>
        <DialogTitle className="sr-only">{form.labels.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {form.labels.description}
        </DialogDescription>
        <header className="mk-auth-dialog-top">
          <strong>{productName}</strong>
          <div className="mk-auth-controls">{controls}</div>
        </header>
        <CustomerAuthForm {...form} />
      </DialogContent>
    </Dialog>
  );
}
