import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

/**
 * Musakonttori PageHeader - sivun otsikko.
 *
 * Näyttää otsikon, valinnaisen alaotsikon ja oikealle tasatut toiminnot.
 *
 * @example
 * <PageHeader title="Tapahtumat" subtitle="5 tapahtumaa" actions={<Button>Uusi</Button>} />
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-[var(--mk-palette-text-primary,#111113)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--mk-palette-text-secondary,#5F6068)]">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
