import { type AdminRailModule } from "./AdminRail";
import { type AdminNavGroup } from "./AdminNav";
import { type StatTileProps } from "./StatTile";
import { type ActivityFeedItem } from "./ActivityFeed";
import { type BarContent, type MeterContent, type QuickContent, type TableContent } from "./adminShared";
export interface SoundLaunchAdminContent {
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
    volume: {
        title: string;
        description: string;
        badge: string;
        chart: BarContent;
    };
    queue: {
        title: string;
        description: string;
        badges: {
            label: string;
            tone: "warning" | "error";
        }[];
        table: TableContent;
    };
    quality: {
        title: string;
        description: string;
        badge: string;
        tiles: QuickContent[];
    };
    dspHealth: {
        title: string;
        badge: string;
        meters: MeterContent[];
    };
    releaseState: {
        title: string;
        description: string;
        items: ActivityFeedItem[];
    };
    alert: {
        title: string;
        description: string;
    };
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
export declare function SoundLaunchAdmin({ navTitle, navGroups, rail, content, activeItemId, onNavigate, }: SoundLaunchAdminProps): import("react").JSX.Element;
//# sourceMappingURL=SoundLaunchAdmin.d.ts.map