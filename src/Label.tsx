"use client";

import { cn } from "./utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Show required indicator (*) */
  required?: boolean;
}

/**
 * Musakonttori Label - lomakekentän otsikko.
 *
 * Tukee required-indikaattoria (punainen tähti).
 *
 * @example
 * <Label htmlFor="email">Sähköposti</Label>
 * <Label required>Nimi</Label>
 */
function Label({ className, children, required: isRequired, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none text-[var(--mk-palette-text-primary,#111113)] peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {isRequired && (
        <span className="ml-1 text-red-500" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export { Label };
