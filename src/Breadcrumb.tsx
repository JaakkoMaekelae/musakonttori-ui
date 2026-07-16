"use client";

import type { ComponentType, AnchorHTMLAttributes } from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "./utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
  homeLabel?: string;
  linkComponent?: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
}

export function Breadcrumb({
  items,
  className,
  homeHref,
  homeLabel = "Etusivu",
  linkComponent: LinkComponent,
}: BreadcrumbProps) {
  const Link = LinkComponent ?? ("a" as unknown as ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>);

  return (
    <nav aria-label="Murupolku" className={cn("flex items-center gap-1 text-sm text-text-muted", className)}>
      {homeHref ? (
        <Link href={homeHref} className="hover:text-text-primary transition-colors" aria-label={homeLabel}>
          <Home className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-label={homeLabel}>
          <Home className="h-4 w-4" />
        </span>
      )}
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="hover:text-text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-primary font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
