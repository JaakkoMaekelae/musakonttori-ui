import { type AdminRailModule } from "./AdminRail";
import { type AdminNavGroup } from "./AdminNav";
import { type StatTileProps } from "./StatTile";
import { type ActivityFeedItem } from "./ActivityFeed";
import { type BarContent, type FunnelContent, type MeterContent, type TableContent } from "./adminShared";
export interface TicketingAdminContent {
    header: {
        eyebrow: string;
        title: string;
        description: string;
    };
    actions: {
        secondary: string;
        primary: string;
    };
    kpis: StatTileProps[];
    sales: {
        title: string;
        description: string;
        badge: string;
        chart: BarContent;
    };
    onsales: {
        title: string;
        description: string;
        badge: string;
        table: TableContent;
    };
    checkout: {
        title: string;
        description: string;
        badge: string;
        chart: FunnelContent;
    };
    command: {
        title: string;
        badge: string;
        meters: MeterContent[];
    };
    gates: {
        title: string;
        description: string;
        items: ActivityFeedItem[];
    };
    alert: {
        title: string;
        description: string;
    };
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
export declare function TicketingAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }: TicketingAdminProps): import("react").JSX.Element;
//# sourceMappingURL=TicketingAdmin.d.ts.map