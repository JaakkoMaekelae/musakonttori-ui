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
import { FunnelChart } from "./FunnelChart";
import { HealthMeter } from "./HealthMeter";
import { ActivityFeed } from "./ActivityFeed";
import { MiniTable, TR, TD, } from "./adminShared";
/**
 * The Stageflow admin dashboard — layout only, all content via props.
 */
export function StageflowAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }) {
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
            })) }), label: content.header.title, children: [_jsx(AdminPageHeader, { eyebrow: content.header.eyebrow, title: content.header.title, description: content.header.description, actions: _jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "secondary", children: content.actions.secondary }), _jsx(Button, { size: "sm", children: content.actions.primary })] }) }), _jsxs(AdminContent, { children: [_jsx(StatRow, { children: content.kpis.map((kpi, i) => (_jsx(StatTile, { ...kpi }, i))) }), _jsxs("div", { className: "mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]", children: [_jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.activity.title, description: content.activity.description, action: _jsx(Badge, { children: content.activity.badge }), children: _jsx(BarChart, { ariaLabel: content.activity.chart.ariaLabel, data: content.activity.chart.data, legend: content.activity.chart.legend }) }), _jsx(AdminSection, { title: content.funnel.title, description: content.funnel.description, action: _jsx(Badge, { tone: "success", children: content.funnel.badge }), children: _jsx(FunnelChart, { ariaLabel: content.funnel.chart.ariaLabel, steps: content.funnel.chart.steps }) }), _jsx(AdminSection, { title: content.artists.title, description: content.artists.description, action: _jsx(Badge, { children: content.artists.badge }), children: _jsx("div", { className: "overflow-x-auto", children: _jsx(MiniTable, { columns: content.artists.table.columns, children: content.artists.table.rows.map((cells, rowIndex) => (_jsx(TR, { children: cells.map((cell, cellIndex) => (_jsx(TD, { children: cell }, cellIndex))) }, rowIndex))) }) }) })] }), _jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.discovery.title, action: _jsx(Badge, { tone: "success", children: content.discovery.badge }), children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: content.discovery.meters.map((meter) => (_jsx(HealthMeter, { ...meter }, meter.title))) }) }), _jsx(AdminSection, { title: content.liveActivity.title, description: content.liveActivity.description, children: _jsx(ActivityFeed, { items: content.liveActivity.items }) }), _jsx(Alert, { variant: "warning", title: content.alert.title, children: content.alert.description })] })] })] })] }));
}
