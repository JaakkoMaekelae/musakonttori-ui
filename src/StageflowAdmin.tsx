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

export interface StageflowAdminContent {
  header: { eyebrow: string; title: string; description: string };
  actions: { secondary: string; primary: string };
  kpis: StatTileProps[];
  activity: { title: string; description: string; badge: string; chart: BarContent };
  funnel: { title: string; description: string; badge: string; chart: FunnelContent };
  artists: { title: string; description: string; badge: string; table: TableContent };
  discovery: { title: string; badge: string; meters: MeterContent[] };
  liveActivity: { title: string; description: string; items: ActivityFeedItem[] };
  alert: { title: string; description: string };
}

export interface StageflowAdminProps {
  navTitle: string;
  navGroups: AdminNavGroup[];
  rail: {
    initial: string;
    productName: string;
    activeModuleId: string;
    modules: AdminRailModule[];
  };
  content: StageflowAdminContent;
  activeItemId?: string;
  onNavigate?: (id: string) => void;
}

/**
 * The Stageflow admin dashboard — layout only, all content via props.
 */
export function StageflowAdmin({
  navTitle,
  navGroups,
  rail,
  content,
  activeItemId,
  onNavigate,
}: StageflowAdminProps) {
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
              title={content.activity.title}
              description={content.activity.description}
              action={<Badge>{content.activity.badge}</Badge>}
            >
              <BarChart
                ariaLabel={content.activity.chart.ariaLabel}
                data={content.activity.chart.data}
                legend={content.activity.chart.legend}
              />
            </AdminSection>

            <AdminSection
              title={content.funnel.title}
              description={content.funnel.description}
              action={<Badge tone="success">{content.funnel.badge}</Badge>}
            >
              <FunnelChart
                ariaLabel={content.funnel.chart.ariaLabel}
                steps={content.funnel.chart.steps}
              />
            </AdminSection>

            <AdminSection
              title={content.artists.title}
              description={content.artists.description}
              action={<Badge>{content.artists.badge}</Badge>}
            >
              <div className="overflow-x-auto">
                <MiniTable columns={content.artists.table.columns}>
                  {content.artists.table.rows.map((cells, rowIndex) => (
                    <TR key={rowIndex}>
                      {cells.map((cell, cellIndex) => (
                        <TD key={cellIndex}>{cell}</TD>
                      ))}
                    </TR>
                  ))}
                </MiniTable>
              </div>
            </AdminSection>
          </div>

          <div className="grid content-start gap-4">
            <AdminSection
              title={content.discovery.title}
              action={<Badge tone="success">{content.discovery.badge}</Badge>}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {content.discovery.meters.map((meter) => (
                  <HealthMeter key={meter.title} {...meter} />
                ))}
              </div>
            </AdminSection>

            <AdminSection
              title={content.liveActivity.title}
              description={content.liveActivity.description}
            >
              <ActivityFeed items={content.liveActivity.items} />
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
