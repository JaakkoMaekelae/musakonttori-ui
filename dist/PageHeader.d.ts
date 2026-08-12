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
export declare function PageHeader({ title, subtitle, actions, className, }: PageHeaderProps): import("react").JSX.Element;
//# sourceMappingURL=PageHeader.d.ts.map