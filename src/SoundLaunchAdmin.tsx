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
import { HealthMeter } from "./HealthMeter";
import { ActivityFeed, type ActivityFeedItem } from "./ActivityFeed";
import { QuickTile } from "./QuickTile";
import {
  MiniTable,
  TR,
  TD,
  type BarContent,
  type MeterContent,
  type QuickContent,
  type TableContent,
} from "./adminShared";

export interface SoundLaunchAdminContent {
  header: { eyebrow: string; title: string; description: string };
  actions: { secondary: string; primary: string };
  kpis: StatTileProps[];
  volume: { title: string; description: string; badge: string; chart: BarContent };
  queue: { title: string; description: string; badges: { label: string; tone: "warning" | "error" }[]; table: TableContent };
  quality: { title: string; description: string; badge: string; tiles: QuickContent[] };
  dspHealth: { title: string; badge: string; meters: MeterContent[] };
  releaseState: { title: string; description: string; items: ActivityFeedItem[] };
  alert: { title: string; description: string };
}

export interface SoundLaunchAdminProps {
  navTitle: string;
  navGroups: AdminNavGroup[];
  rail: {
    initial: string;
    productName: string;
    activeModuleId: string;
    modules: AdminRailModule[];
  };
  content: SoundLaunchAdminContent;
  activeItemId?: string;
  onNavigate?: (id: string) => void;
}

/**
 * The SoundLaunch admin dashboard — layout only, all content via props.
 */
export function SoundLaunchAdmin({
  navTitle,
  navGroups,
  rail,
  content,
  activeItemId,
  onNavigate,
}: SoundLaunchAdminProps) {
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
              title={content.volume.title}
              description={content.volume.description}
              action={<Badge>{content.volume.badge}</Badge>}
            >
              <BarChart
                ariaLabel={content.volume.chart.ariaLabel}
                data={content.volume.chart.data}
                legend={content.volume.chart.legend}
              />
            </AdminSection>

            <AdminSection
              title={content.queue.title}
              description={content.queue.description}
              action={
                <>
                  {content.queue.badges.map((badge) => (
                    <Badge key={badge.label} tone={badge.tone}>
                      {badge.label}
                    </Badge>
                  ))}
                </>
              }
            >
              <div className="overflow-x-auto">
                <MiniTable columns={content.queue.table.columns}>
                  {content.queue.table.rows.map((cells, rowIndex) => (
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
              title={content.quality.title}
              description={content.quality.description}
              action={<Badge>{content.quality.badge}</Badge>}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.quality.tiles.map((tile) => (
                  <QuickTile key={tile.label} label={tile.label} value={tile.value} />
                ))}
              </div>
            </AdminSection>
          </div>

          <div className="grid content-start gap-4">
            <AdminSection
              title={content.dspHealth.title}
              action={<Badge tone="success">{content.dspHealth.badge}</Badge>}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {content.dspHealth.meters.map((meter) => (
                  <HealthMeter key={meter.title} {...meter} />
                ))}
              </div>
            </AdminSection>

            <AdminSection
              title={content.releaseState.title}
              description={content.releaseState.description}
            >
              <ActivityFeed items={content.releaseState.items} />
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
