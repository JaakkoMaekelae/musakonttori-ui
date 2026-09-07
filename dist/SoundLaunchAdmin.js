"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { AdminPage, AdminContent, AdminSection } from "./AdminPage";
import { AdminPageHeader } from "./AdminPageHeader";
import { AdminRail } from "./AdminRail";
import { AdminNav } from "./AdminNav";
import { StatTile, StatRow } from "./StatTile";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Alert } from "./Alert";
import { BarChart } from "./BarChart";
import { HealthMeter } from "./HealthMeter";
import { ActivityFeed } from "./ActivityFeed";
import { QuickTile } from "./QuickTile";
import { MiniTable, TR, TD, } from "./adminShared";
/**
 * The SoundLaunch admin dashboard — layout only, all content via props.
 */
export function SoundLaunchAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }) {
    const [internal, setInternal] = useState(activeItemId ?? "dashboard");
    const active = onNavigate ? (activeItemId ?? "dashboard") : internal;
    const handleSelect = (id) => {
        if (onNavigate)
            onNavigate(id);
        else
            setInternal(id);
    };
    return (_jsxs(AdminPage, { rail: _jsx(AdminRail, { initial: rail.initial, productName: rail.productName, activeModuleId: rail.activeModuleId, modules: rail.modules }), nav: _jsx(AdminNav, { title: navTitle, activeItemId: active, groups: navGroups.map((group) => ({
                ...group,
                items: group.items.map((item) => ({
                    ...item,
                    onSelect: () => handleSelect(item.id),
                })),
            })) }), label: content.header.title, children: [_jsx(AdminPageHeader, { eyebrow: content.header.eyebrow, title: content.header.title, description: content.header.description, actions: _jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "secondary", children: content.actions.secondary }), _jsx(Button, { size: "sm", children: content.actions.primary })] }) }), _jsxs(AdminContent, { children: [_jsx(StatRow, { children: content.kpis.map((kpi, i) => (_jsx(StatTile, { ...kpi }, i))) }), _jsxs("div", { className: "mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]", children: [_jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.volume.title, description: content.volume.description, action: _jsx(Badge, { children: content.volume.badge }), children: _jsx(BarChart, { ariaLabel: content.volume.chart.ariaLabel, data: content.volume.chart.data, legend: content.volume.chart.legend }) }), _jsx(AdminSection, { title: content.queue.title, description: content.queue.description, action: _jsx(_Fragment, { children: content.queue.badges.map((badge) => (_jsx(Badge, { tone: badge.tone, children: badge.label }, badge.label))) }), children: _jsx("div", { className: "overflow-x-auto", children: _jsx(MiniTable, { columns: content.queue.table.columns, children: content.queue.table.rows.map((cells, rowIndex) => (_jsx(TR, { children: cells.map((cell, cellIndex) => (_jsx(TD, { children: cell }, cellIndex))) }, rowIndex))) }) }) }), _jsx(AdminSection, { title: content.quality.title, description: content.quality.description, action: _jsx(Badge, { children: content.quality.badge }), children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: content.quality.tiles.map((tile) => (_jsx(QuickTile, { label: tile.label, value: tile.value }, tile.label))) }) })] }), _jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.dspHealth.title, action: _jsx(Badge, { tone: "success", children: content.dspHealth.badge }), children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: content.dspHealth.meters.map((meter) => (_jsx(HealthMeter, { ...meter }, meter.title))) }) }), _jsx(AdminSection, { title: content.releaseState.title, description: content.releaseState.description, children: _jsx(ActivityFeed, { items: content.releaseState.items }) }), _jsx(Alert, { variant: "warning", title: content.alert.title, children: content.alert.description })] })] })] })] }));
}
