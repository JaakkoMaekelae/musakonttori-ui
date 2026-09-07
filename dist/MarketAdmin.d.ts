import { type AdminRailModule } from "./AdminRail";
import { type AdminNavGroup } from "./AdminNav";
import { type StatTileProps } from "./StatTile";
import { type ActivityFeedItem } from "./ActivityFeed";
import { type BarContent, type MeterContent, type QuickContent, type TableContent } from "./adminShared";
export interface MarketAdminContent {
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
    revenue: {
        title: string;
        description: string;
        badge: string;
        chart: BarContent;
    };
    orders: {
        title: string;
        description: string;
        badge: string;
        table: TableContent;
    };
    operations: {
        title: string;
        description: string;
        tiles: QuickContent[];
    };
    sellerHealth: {
        title: string;
        badge: string;
        meters: MeterContent[];
    };
    categories: {
        title: string;
        description: string;
        items: ActivityFeedItem[];
    };
    alert: {
        title: string;
        description: string;
    };
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
export declare function MarketAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }: MarketAdminProps): import("react").JSX.Element;
//# sourceMappingURL=MarketAdmin.d.ts.map