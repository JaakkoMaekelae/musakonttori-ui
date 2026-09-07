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
 * The Ticketing admin dashboard — layout only, all content via props.
 */
export function TicketingAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }) {
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
            })) }), label: content.header.title, children: [_jsx(AdminPageHeader, { eyebrow: content.header.eyebrow, title: content.header.title, description: content.header.description, actions: _jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "secondary", children: content.actions.secondary }), _jsx(Button, { size: "sm", children: content.actions.primary })] }) }), _jsxs(AdminContent, { children: [_jsx(StatRow, { children: content.kpis.map((kpi, i) => (_jsx(StatTile, { ...kpi }, i))) }), _jsxs("div", { className: "mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]", children: [_jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.sales.title, description: content.sales.description, action: _jsx(Badge, { tone: "success", children: content.sales.badge }), children: _jsx(BarChart, { ariaLabel: content.sales.chart.ariaLabel, data: content.sales.chart.data, legend: content.sales.chart.legend }) }), _jsx(AdminSection, { title: content.onsales.title, description: content.onsales.description, action: _jsx(Badge, { children: content.onsales.badge }), children: _jsx("div", { className: "overflow-x-auto", children: _jsx(MiniTable, { columns: content.onsales.table.columns, children: content.onsales.table.rows.map((cells, rowIndex) => (_jsx(TR, { children: cells.map((cell, cellIndex) => (_jsx(TD, { children: cell }, cellIndex))) }, rowIndex))) }) }) }), _jsx(AdminSection, { title: content.checkout.title, description: content.checkout.description, action: _jsx(Badge, { tone: "success", children: content.checkout.badge }), children: _jsx(FunnelChart, { ariaLabel: content.checkout.chart.ariaLabel, steps: content.checkout.chart.steps }) })] }), _jsxs("div", { className: "grid content-start gap-4", children: [_jsx(AdminSection, { title: content.command.title, action: _jsx(Badge, { tone: "success", children: content.command.badge }), children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: content.command.meters.map((meter) => (_jsx(HealthMeter, { ...meter }, meter.title))) }) }), _jsx(AdminSection, { title: content.gates.title, description: content.gates.description, children: _jsx(ActivityFeed, { items: content.gates.items }) }), _jsx(Alert, { variant: "warning", title: content.alert.title, children: content.alert.description })] })] })] })] }));
}
