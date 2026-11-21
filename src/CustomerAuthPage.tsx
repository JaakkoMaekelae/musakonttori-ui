"use client";

import { ArrowLeft } from "lucide-react";
import { useId } from "react";
import { CustomerAuthForm } from "./CustomerAuthForm";
import { cn } from "./utils";
import type { CustomerAuthPageProps } from "./CustomerAuth.types";

export function CustomerAuthPage({
  form,
  brand,
  navigation,
  controls,
  className,
}: CustomerAuthPageProps) {
  const titleId = useId();
  return (
    <div className={cn("mk-auth mk-auth-page", className)}>
      <aside className="mk-auth-brand" aria-labelledby={titleId}>
        <div className="mk-auth-brand-name">
          {brand.logo ?? (
            <span className="mk-auth-equalizer" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          )}
          <span>{brand.name}</span>
        </div>
        <div className="mk-auth-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="mk-auth-brand-copy">
          <p className="mk-auth-kicker">{brand.eyebrow}</p>
          <h1 id={titleId}>
            {brand.title}
            <span>{brand.accent}</span>
          </h1>
          <p>{brand.description}</p>
        </div>
        <ul className="mk-auth-benefits">
          {brand.benefits.map((benefit) => (
            <li key={benefit.title}>
              <strong>{benefit.title}</strong>
              <span>{benefit.description}</span>
            </li>
          ))}
        </ul>
      </aside>
      <div className="mk-auth-panel">
        <header className="mk-auth-top">
          <a href={navigation.href}>
            <ArrowLeft size={16} aria-hidden="true" />
            {navigation.label}
          </a>
          <div className="mk-auth-controls">{controls}</div>
        </header>
        <CustomerAuthForm {...form} />
      </div>
    </div>
  );
}
