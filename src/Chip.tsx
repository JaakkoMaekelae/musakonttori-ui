import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const chipVariants = cva(
  [
    "inline-flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap border font-medium",
    "transition-[background-color,border-color,color,box-shadow]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--mk-palette-accent-primary,#DC2626)]",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--mk-palette-bg-canvas,#FAFAFA)]",
    "disabled:pointer-events-none disabled:opacity-45",
  ].join(" "),
  {
    variants: {
      variant: {
        neutral:
          "border-[var(--mk-palette-border-default,#D4D4D8)] bg-[var(--mk-palette-bg-surface,#FFFFFF)] text-[var(--mk-palette-text-secondary,#52525B)] hover:border-[var(--mk-palette-border-hover,#A1A1AA)] hover:bg-[var(--mk-palette-bg-surface-hover,#F4F4F5)] hover:text-[var(--mk-palette-text-primary,#0F0F11)]",
        brand:
          "border-[var(--mk-palette-accent-primary,#DC2626)]/25 bg-[var(--mk-palette-accent-soft,rgba(220,38,38,0.10))] text-[var(--mk-palette-accent-primary,#DC2626)] hover:border-[var(--mk-palette-accent-primary,#DC2626)]/45",
        success:
          "border-[var(--mk-status-success,#10B981)]/30 bg-[var(--mk-status-success,#10B981)]/10 text-[var(--mk-status-success,#059669)]",
        warning:
          "border-[var(--mk-status-warning,#F59E0B)]/30 bg-[var(--mk-status-warning,#F59E0B)]/10 text-[var(--mk-status-warning,#B45309)]",
        error:
          "border-[var(--mk-status-error,#EF4444)]/30 bg-[var(--mk-status-error,#EF4444)]/10 text-[var(--mk-status-error,#DC2626)]",
        info: "border-[var(--mk-status-info,#3B82F6)]/30 bg-[var(--mk-status-info,#3B82F6)]/10 text-[var(--mk-status-info,#2563EB)]",
      },
      size: {
        sm: "min-h-7 rounded-lg px-2.5 py-1 text-xs",
        md: "min-h-9 rounded-xl px-3 py-1.5 text-sm",
      },
      selected: {
        true: "border-[var(--mk-palette-accent-primary,#DC2626)] bg-[var(--mk-palette-accent-primary,#DC2626)] text-white shadow-sm hover:border-[var(--mk-palette-bg-brand-hover,#BF2227)] hover:bg-[var(--mk-palette-bg-brand-hover,#BF2227)] hover:text-white",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
      selected: false,
    },
  }
);

interface ChipCommonProps extends VariantProps<typeof chipVariants> {
  children: ReactNode;
  className?: string;
  leadingIcon?: ReactNode;
}

export interface StaticChipProps
  extends
    ChipCommonProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "children" | "onClick"> {
  onPress?: never;
  onRemove?: never;
  selected?: never;
}

export interface SelectableChipProps
  extends
    ChipCommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  onPress: () => void;
  onRemove?: never;
  selected?: boolean;
}

export interface RemovableChipProps
  extends
    ChipCommonProps,
    Omit<HTMLAttributes<HTMLSpanElement>, "children" | "onClick"> {
  onPress?: never;
  onRemove: () => void;
  removeLabel: string;
  selected?: never;
  disabled?: boolean;
}

export type ChipProps =
  StaticChipProps | SelectableChipProps | RemovableChipProps;

function RemoveGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="m4.25 4.25 7.5 7.5m0-7.5-7.5 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ChipContents({
  children,
  leadingIcon,
}: Pick<ChipCommonProps, "children" | "leadingIcon">) {
  return (
    <>
      {leadingIcon ? (
        <span
          aria-hidden="true"
          className="flex shrink-0 items-center [&_svg]:size-3.5"
        >
          {leadingIcon}
        </span>
      ) : null}
      <span className="min-w-0 truncate">{children}</span>
    </>
  );
}

/**
 * A compact metadata or filter control.
 *
 * `Badge` communicates status. `Chip` represents a value the user can scan,
 * select or remove. Selection and removal are intentionally mutually
 * exclusive so the component never creates nested buttons.
 */
export function Chip(props: ChipProps) {
  if ("onPress" in props && typeof props.onPress === "function") {
    const {
      children,
      leadingIcon,
      variant,
      size,
      selected = false,
      className,
      onPress,
      type = "button",
      ...buttonProps
    } = props;

    return (
      <button
        type={type}
        aria-pressed={selected}
        className={cn(chipVariants({ variant, size, selected, className }))}
        onClick={onPress}
        {...buttonProps}
      >
        <ChipContents leadingIcon={leadingIcon}>{children}</ChipContents>
      </button>
    );
  }

  if ("onRemove" in props && typeof props.onRemove === "function") {
    const {
      children,
      leadingIcon,
      variant,
      size,
      className,
      onRemove,
      removeLabel,
      disabled = false,
      ...spanProps
    } = props;

    const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove();
    };

    return (
      <span
        className={cn(
          chipVariants({ variant, size, selected: false, className }),
          disabled && "opacity-45",
          "pr-1"
        )}
        aria-disabled={disabled || undefined}
        {...spanProps}
      >
        <ChipContents leadingIcon={leadingIcon}>{children}</ChipContents>
        <button
          type="button"
          aria-label={removeLabel}
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-md",
            "text-current opacity-70 transition hover:bg-black/10 hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
          disabled={disabled}
          onClick={handleRemove}
        >
          <RemoveGlyph />
        </button>
      </span>
    );
  }

  const { children, leadingIcon, variant, size, className, ...spanProps } =
    props;

  return (
    <span
      className={cn(
        chipVariants({ variant, size, selected: false, className })
      )}
      {...spanProps}
    >
      <ChipContents leadingIcon={leadingIcon}>{children}</ChipContents>
    </span>
  );
}

export { chipVariants };
