"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const cardVariants = cva(
  "rounded-2xl transition-shadow",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--mk-palette-bg-surface,var(--mk-color-surface,#FFFFFF))] shadow-sm",
        elevated:
          "bg-[var(--mk-palette-bg-surface,var(--mk-color-surface,#FFFFFF))] shadow-lg hover:shadow-xl",
        bordered:
          "border border-[var(--mk-palette-border-subtle,var(--mk-color-border-subtle,rgba(128,128,128,0.15)))] bg-[var(--mk-palette-bg-surface,var(--mk-color-surface,#FFFFFF))] shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  size?: "sm" | "md" | "lg";
  padding?: string;
}

/**
 * Musakonttori Card - card component for grouping content.
 * Use with CardHeader, CardContent, CardFooter subcomponents.
 *
 * @example
 * <Card variant="elevated">
 *   <CardHeader>Otsikko</CardHeader>
 *   <CardContent>Sisältöä...</CardContent>
 *   <CardFooter>Toiminnot</CardFooter>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, padding, style, ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    };
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }), size && sizeClasses[size])}
        style={padding ? { ...style, padding } : style}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card header area. Typically contains a CardTitle element.
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 px-6 py-4 border-b border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.12))]",
        className,
      )}
      {...props}
    />
  ),
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Card title. Renders as <h3> element.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold text-[var(--mk-palette-text-primary,#111113)]",
        className,
      )}
      {...props}
    />
  ),
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card description text below title.
 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-[var(--mk-palette-text-secondary,#5F6068)]",
        className,
      )}
      {...props}
    />
  ),
);

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card main content area.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
  ),
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card footer, typically for action buttons.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-b-2xl border-t border-[var(--mk-palette-border-subtle,rgba(128,128,128,0.12))] bg-[var(--mk-palette-bg,#FAFAFA)]/50 px-6 py-4",
        className,
      )}
      {...props}
    />
  ),
);

CardFooter.displayName = "CardFooter";
