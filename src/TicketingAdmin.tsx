"use client";

import { useState } from "react";
import { AdminPage, AdminContent, AdminSection } from "./AdminPage";
import { AdminPageHeader } from "./AdminPageHeader";
import { AdminRail, type AdminRailModule } from "./AdminRail";
import { AdminNav, type AdminNavGroup } from "./AdminNav";
import { StatTile, StatRow, type StatTileProps } from "./StatTile";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { BarChart } from "./BarChart";
import { FunnelChart } from "./FunnelChart";
import { HealthMeter } from "./HealthMeter";
import { ActivityFeed, type ActivityFeedItem } from "./ActivityFeed";
import {
  MiniTable,
  TR,
  TD,
  type BarContent,
  type FunnelContent,
  type MeterContent,
  type TableContent,
} from "./adminShared";

export interface TicketingAdminContent {
  header: { eyebrow: string; title: string; description: string };
  actions: { secondary: string; primary: string };
  kpis: StatTileProps[];
  sales: { title: string; description: string; badge: string; chart: BarContent };
  onsales: { title: string; description: string; badge: string; table: TableContent };
  checkout: { title: string; description: string; badge: string; chart: FunnelContent };
  command: { title: string; badge: string; meters: MeterContent[] };
  gates: { title: string; description: string; items: ActivityFeedItem[] };
  alert: { title: string; description: string };
}

export interface TicketingAdminProps {
  navTitle: string;
  navGroups: AdminNavGroup[];
  rail: {
    initial: string;
    productName: string;
    activeModuleId: string;
    modules: AdminRailModule[];
  };
  content: TicketingAdminContent;
  activeItemId?: string;
  onNavigate?: (id: string) => void;
}

/**
 * The Ticketing admin dashboard — layout only, all content via props.
 */
export function TicketingAdmin({
  navTitle,
  navGroups,
  rail,
  content,
  activeItemId,
  onNavigate,
}: TicketingAdminProps) {
  const [internal, setInternal] = useState(activeItemId ?? "dashboard");
  const active = onNavigate ? (activeItemId ?? "dashboard") : internal;

  const handleSelect = (id: string) => {
    if (onNavigate) onNavigate(id);
    else setInternal(id);
  };

  return (
    <AdminPage
      rail={
        <AdminRail
          initial={rail.initial}
          productName={rail.productName}
          activeModuleId={rail.activeModuleId}
          modules={rail.modules}
        />
      }
      nav={
        <AdminNav
          title={navTitle}
          activeItemId={active}
          groups={navGroups.map((group) => ({
            ...group,
            items: group.items.map((item) => ({
              ...item,
              onSelect: () => handleSelect(item.id),
            })),
          }))}
        />
      }
      label={content.header.title}
    >
      <AdminPageHeader
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        description={content.header.description}
        actions={
          <>
            <Button size="sm" variant="secondary">
              {content.actions.secondary}
            </Button>
            <Button size="sm">{content.actions.primary}</Button>
          </>
        }
      />
      <AdminContent>
        <StatRow>
          {content.kpis.map((kpi, i) => (
            <StatTile key={i} {...kpi} />
          ))}
        </StatRow>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
          <div className="grid content-start gap-4">
            <AdminSection
              title={content.sales.title}
              description={content.sales.description}
              action={<Badge tone="success">{content.sales.badge}</Badge>}
            >
              <BarChart
                ariaLabel={content.sales.chart.ariaLabel}
                data={content.sales.chart.data}
                legend={content.sales.chart.legend}
              />
            </AdminSection>

            <AdminSection
              title={content.onsales.title}
              description={content.onsales.description}
              action={<Badge>{content.onsales.badge}</Badge>}
            >
              <div className="overflow-x-auto">
                <MiniTable columns={content.onsales.table.columns}>
                  {content.onsales.table.rows.map((cells, rowIndex) => (
                    <TR key={rowIndex}>
                      {cells.map((cell, cellIndex) => (
                        <TD key={cellIndex}>{cell}</TD>
                      ))}
                    </TR>
                  ))}
                </MiniTable>
              </div>
            </AdminSection>

            <AdminSection
              title={content.checkout.title}
              description={content.checkout.description}
              action={<Badge tone="success">{content.checkout.badge}</Badge>}
            >
              <FunnelChart
                ariaLabel={content.checkout.chart.ariaLabel}
                steps={content.checkout.chart.steps}
              />
            </AdminSection>
          </div>

          <div className="grid content-start gap-4">
            <AdminSection
              title={content.command.title}
              action={<Badge tone="success">{content.command.badge}</Badge>}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {content.command.meters.map((meter) => (
                  <HealthMeter key={meter.title} {...meter} />
                ))}
              </div>
            </AdminSection>

            <AdminSection
              title={content.gates.title}
              description={content.gates.description}
            >
              <ActivityFeed items={content.gates.items} />
            </AdminSection>

            <Alert variant="warning" title={content.alert.title}>
              {content.alert.description}
            </Alert>
          </div>
        </div>
      </AdminContent>
    </AdminPage>
  );
}
