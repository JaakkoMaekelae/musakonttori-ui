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

export interface MarketAdminContent {
  header: { eyebrow: string; title: string; description: string };
  actions: { secondary: string; primary: string };
  kpis: StatTileProps[];
  revenue: { title: string; description: string; badge: string; chart: BarContent };
  orders: { title: string; description: string; badge: string; table: TableContent };
  operations: { title: string; description: string; tiles: QuickContent[] };
  sellerHealth: { title: string; badge: string; meters: MeterContent[] };
  categories: { title: string; description: string; items: ActivityFeedItem[] };
  alert: { title: string; description: string };
}

export interface MarketAdminProps {
  navTitle: string;
  navGroups: AdminNavGroup[];
  rail: {
    initial: string;
    productName: string;
    activeModuleId: string;
    modules: AdminRailModule[];
  };
  content: MarketAdminContent;
  activeItemId?: string;
  onNavigate?: (id: string) => void;
}

/**
 * The Market admin dashboard — layout only.
 *
 * All text and data arrive through `content` and `navGroups` so the product
 * can localise and hydrate from its own data source. Nothing here is
 * hardcoded.
 */
export function MarketAdmin({
  navTitle,
  navGroups,
  rail,
  content,
  activeItemId,
  onNavigate,
}: MarketAdminProps) {
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
              title={content.revenue.title}
              description={content.revenue.description}
              action={<Badge>{content.revenue.badge}</Badge>}
            >
              <BarChart
                ariaLabel={content.revenue.chart.ariaLabel}
                data={content.revenue.chart.data}
                legend={content.revenue.chart.legend}
              />
            </AdminSection>

            <AdminSection
              title={content.orders.title}
              description={content.orders.description}
              action={<Badge>{content.orders.badge}</Badge>}
            >
              <div className="overflow-x-auto">
                <MiniTable columns={content.orders.table.columns}>
                  {content.orders.table.rows.map((cells, rowIndex) => (
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
              title={content.operations.title}
              description={content.operations.description}
            >
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {content.operations.tiles.map((tile) => (
                  <QuickTile key={tile.label} label={tile.label} value={tile.value} />
                ))}
              </div>
            </AdminSection>
          </div>

          <div className="grid content-start gap-4">
            <AdminSection
              title={content.sellerHealth.title}
              action={<Badge>{content.sellerHealth.badge}</Badge>}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {content.sellerHealth.meters.map((meter) => (
                  <HealthMeter key={meter.title} {...meter} />
                ))}
              </div>
            </AdminSection>

            <AdminSection
              title={content.categories.title}
              description={content.categories.description}
            >
              <ActivityFeed items={content.categories.items} />
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
