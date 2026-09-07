import { type AdminRailModule } from "./AdminRail";
import { type AdminNavGroup } from "./AdminNav";
import { type StatTileProps } from "./StatTile";
import { type ActivityFeedItem } from "./ActivityFeed";
import { type BarContent, type FunnelContent, type MeterContent, type TableContent } from "./adminShared";
export interface StageflowAdminContent {
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
    activity: {
        title: string;
        description: string;
        badge: string;
        chart: BarContent;
    };
    funnel: {
        title: string;
        description: string;
        badge: string;
        chart: FunnelContent;
    };
    artists: {
        title: string;
        description: string;
        badge: string;
        table: TableContent;
    };
    discovery: {
        title: string;
        badge: string;
        meters: MeterContent[];
    };
    liveActivity: {
        title: string;
        description: string;
        items: ActivityFeedItem[];
    };
    alert: {
        title: string;
        description: string;
    };
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
export declare function StageflowAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }: StageflowAdminProps): import("react").JSX.Element;
//# sourceMappingURL=StageflowAdmin.d.ts.map