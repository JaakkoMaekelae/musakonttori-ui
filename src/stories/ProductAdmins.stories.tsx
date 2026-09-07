import type { Meta, StoryObj } from "@storybook/react";
import { MarketAdmin } from "../MarketAdmin";
import { SoundLaunchAdmin } from "../SoundLaunchAdmin";
import { StageflowAdmin } from "../StageflowAdmin";
import { TicketingAdmin } from "../TicketingAdmin";
import { Badge } from "../Badge";
import { Icon, ICONS } from "../adminShared";

const meta: Meta = {
  title: "Admin/Product Admins",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

/* Market — demo data only; products supply their own localised content. */

export const Market: Story = {
  render: () => (
    <MarketAdmin
      navTitle="Market"
      rail={{
        initial: "M",
        productName: "Market",
        activeModuleId: "overview",
        modules: [
          { id: "overview", label: "Overview", icon: <Icon d={ICONS.home} /> },
          { id: "orders", label: "Orders", icon: <Icon d={ICONS.cart} /> },
          { id: "products", label: "Products", icon: <Icon d={ICONS.box} /> },
          { id: "sellers", label: "Sellers", icon: <Icon d={ICONS.users} /> },
        ],
      }}
      navGroups={[
        {
          id: "overview",
          label: "Overview",
          items: [
            { id: "dashboard", label: "Dashboard" },
            { id: "live-orders", label: "Live Orders" },
            { id: "analytics", label: "Analytics" },
          ],
        },
        {
          id: "commerce",
          label: "Commerce",
          items: [
            { id: "orders", label: "Orders" },
            { id: "carts", label: "Carts" },
            { id: "checkouts", label: "Checkouts" },
            { id: "refunds", label: "Refunds", count: 18 },
            { id: "returns", label: "Returns", count: 7 },
            { id: "disputes", label: "Disputes" },
          ],
        },
        {
          id: "products",
          label: "Products",
          items: [
            { id: "products", label: "Products" },
            { id: "variants", label: "Variants" },
            { id: "categories", label: "Categories" },
            { id: "collections", label: "Collections" },
            { id: "low-stock", label: "Low Stock", count: 24 },
            { id: "digital-products", label: "Digital Products" },
          ],
        },
        {
          id: "sellers",
          label: "Sellers",
          items: [
            { id: "artists", label: "Artists" },
            { id: "stores", label: "Stores" },
            { id: "organizations", label: "Organizations" },
            { id: "seller-approvals", label: "Seller Approvals", count: 6 },
            { id: "seller-health", label: "Seller Health" },
          ],
        },
        {
          id: "payments",
          label: "Payments",
          items: [
            { id: "transactions", label: "Transactions" },
            { id: "payouts", label: "Payouts" },
            { id: "fees", label: "Fees" },
            { id: "payment-refunds", label: "Refunds" },
            { id: "failed-payments", label: "Failed Payments" },
          ],
        },
        {
          id: "shipping",
          label: "Shipping",
          items: [
            { id: "shipments", label: "Shipments" },
            { id: "fulfilment", label: "Fulfilment" },
            { id: "carriers", label: "Carriers" },
            { id: "shipping-rules", label: "Shipping Rules" },
          ],
        },
        {
          id: "promotions",
          label: "Promotions",
          items: [
            { id: "discounts", label: "Discounts" },
            { id: "campaigns", label: "Campaigns" },
            { id: "bundles", label: "Bundles" },
            { id: "featured-products", label: "Featured Products" },
          ],
        },
        {
          id: "platform",
          label: "Platform",
          items: [
            { id: "taxes", label: "Taxes" },
            { id: "countries", label: "Countries" },
            { id: "currencies", label: "Currencies" },
            { id: "integrations", label: "Integrations" },
            { id: "audit-log", label: "Audit Log" },
            { id: "settings", label: "Settings" },
          ],
        },
      ]}
      content={{
        header: {
          eyebrow: "Market / Overview",
          title: "Market Admin",
          description: "Artist commerce, orders and marketplace operations",
        },
        actions: { secondary: "Export sales", primary: "+ Add product" },
        kpis: [
          {
            label: "GMV / month",
            value: "€428k",
            delta: { value: "+17.1%", direction: "up", comparedTo: "vs. last month" },
          },
          {
            label: "Orders / 24h",
            value: "1,204",
            delta: { value: "+8.8%", direction: "up", comparedTo: "vs. yesterday" },
          },
          {
            label: "Average order",
            value: "€42.80",
            delta: { value: "+2.6%", direction: "up", comparedTo: "vs. last month" },
          },
          {
            label: "Refund rate",
            value: "1.3%",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-success,#10B981)]">within target</span>,
          },
        ],
        revenue: {
          title: "Revenue",
          description: "GMV · last 14 days",
          badge: "GMV ▾",
          chart: {
            ariaLabel: "GMV over the last 14 days",
            data: [43, 47, 52, 48, 58, 63, 61, 69, 74, 71, 80, 84, 89, 96],
            legend: ["Merchandise", "Physical music", "Digital products"],
          },
        },
        orders: {
          title: "Latest orders",
          description: "Real-time commerce operations",
          badge: "View all",
          table: {
            columns: [
              { header: "Order" },
              { header: "Seller" },
              { header: "Total" },
              { header: "Payment" },
              { header: "Fulfilment" },
              { header: "Risk" },
            ],
            rows: [
              ["MK-284882", "Blind Channel", "€129.80", <Badge tone="success">Paid</Badge>, <Badge tone="warning">Pending</Badge>, "Low"],
              ["MK-284881", "Neon River", "€48.20", <Badge tone="success">Paid</Badge>, <Badge tone="success">Shipped</Badge>, "Low"],
              ["MK-284880", "Polar Lights", "€212.00", <Badge tone="warning">Review</Badge>, <Badge>On hold</Badge>, <Badge tone="error">High</Badge>],
              ["MK-284879", "Glass Echo", "€31.50", <Badge tone="success">Paid</Badge>, <Badge tone="success">Delivered</Badge>, "Low"],
            ],
          },
        },
        operations: {
          title: "Commerce operations",
          description: "Queues requiring admin attention",
          tiles: [
            { label: "Refunds", value: "18 waiting" },
            { label: "Seller approvals", value: "6 waiting" },
            { label: "Low stock", value: "24 products" },
            { label: "Payment reviews", value: "5 flagged" },
          ],
        },
        sellerHealth: {
          title: "Seller health",
          badge: "Top sellers",
          meters: [
            { title: "Blind Channel", value: "98.7%", caption: "on-time shipment", progress: 98, badge: { label: "Excellent", tone: "success" } },
            { title: "Neon River", value: "96.2%", caption: "on-time shipment", progress: 96, badge: { label: "Healthy", tone: "success" } },
            { title: "Polar Lights", value: "89.4%", caption: "on-time shipment", progress: 89, badge: { label: "Watch", tone: "warning" } },
            { title: "Glass Echo", value: "97.1%", caption: "on-time shipment", progress: 97, badge: { label: "Healthy", tone: "success" } },
          ],
        },
        categories: {
          title: "Sales by category",
          description: "Last 30 days",
          items: [
            { id: "clothing", icon: "T", title: "Clothing", description: "38% of GMV", meta: <Badge>€162k</Badge> },
            { id: "vinyl", icon: "V", title: "Vinyl", description: "22% of GMV", meta: <Badge>€94k</Badge> },
            { id: "cd", icon: "CD", title: "CD", description: "14% of GMV", meta: <Badge>€60k</Badge> },
            { id: "accessories", icon: "+", title: "Accessories", description: "12% of GMV", meta: <Badge>€51k</Badge> },
          ],
        },
        alert: {
          title: "5 payments require manual review",
          description: "Potential duplicate or high-risk transactions are waiting before fulfilment.",
        },
      }}
    />
  ),
};

/* SoundLaunch — demo data only. */

export const SoundLaunch: Story = {
  render: () => (
    <SoundLaunchAdmin
      navTitle="SoundLaunch"
      rail={{
        initial: "SL",
        productName: "SoundLaunch",
        activeModuleId: "overview",
        modules: [
          { id: "overview", label: "Overview", icon: <Icon d={ICONS.home} /> },
          { id: "releases", label: "Releases", icon: <Icon d={ICONS.music} />, badge: 184 },
          { id: "delivery", label: "Delivery", icon: <Icon d={ICONS.truck} /> },
          { id: "finance", label: "Finance", icon: <Icon d={ICONS.card} /> },
        ],
      }}
      navGroups={[
        {
          id: "overview",
          label: "Overview",
          items: [
            { id: "dashboard", label: "Dashboard" },
            { id: "live-deliveries", label: "Live Deliveries" },
            { id: "analytics", label: "Analytics" },
          ],
        },
        {
          id: "releases",
          label: "Releases",
          items: [
            { id: "all-releases", label: "All Releases" },
            { id: "drafts", label: "Drafts", count: 124 },
            { id: "submitted", label: "Submitted", count: 82 },
            { id: "processing", label: "Processing", count: 184 },
            { id: "scheduled", label: "Scheduled" },
            { id: "delivered", label: "Delivered" },
            { id: "failed", label: "Failed", count: 7 },
            { id: "takedowns", label: "Takedowns" },
          ],
        },
        {
          id: "catalogue",
          label: "Catalogue",
          items: [
            { id: "artists", label: "Artists" },
            { id: "tracks", label: "Tracks" },
            { id: "albums", label: "Albums" },
            { id: "singles", label: "Singles" },
            { id: "eps", label: "EPs" },
            { id: "labels", label: "Labels" },
            { id: "isrc", label: "ISRC" },
            { id: "upc", label: "UPC" },
          ],
        },
        {
          id: "delivery",
          label: "Delivery",
          items: [
            { id: "delivery-queue", label: "Delivery Queue" },
            { id: "dsp-status", label: "DSP Status" },
            { id: "failed-deliveries", label: "Failed Deliveries", count: 7 },
            { id: "retry-queue", label: "Retry Queue" },
            { id: "delivery-takedowns", label: "Takedowns" },
            { id: "updates", label: "Updates" },
          ],
        },
        {
          id: "quality-control",
          label: "Quality Control",
          items: [
            { id: "metadata-review", label: "Metadata Review" },
            { id: "artwork-review", label: "Artwork Review" },
            { id: "audio-validation", label: "Audio Validation" },
            { id: "rights-review", label: "Rights Review" },
            { id: "duplicate-detection", label: "Duplicate Detection" },
          ],
        },
        {
          id: "finance",
          label: "Finance",
          items: [
            { id: "royalties", label: "Royalties" },
            { id: "statements", label: "Statements" },
            { id: "payouts", label: "Payouts" },
            { id: "revenue", label: "Revenue" },
            { id: "adjustments", label: "Adjustments" },
          ],
        },
        {
          id: "platform",
          label: "Platform",
          items: [
            { id: "dsp-integrations", label: "DSP Integrations" },
            { id: "support", label: "Support" },
            { id: "audit-log", label: "Audit Log" },
            { id: "settings", label: "Settings" },
          ],
        },
      ]}
      content={{
        header: {
          eyebrow: "SoundLaunch / Overview",
          title: "SoundLaunch Admin",
          description: "Release delivery, catalogue and DSP operations",
        },
        actions: { secondary: "Delivery report", primary: "+ New release" },
        kpis: [
          {
            label: "Active Releases",
            value: "1,284",
            delta: { value: "+6.8%", direction: "up", comparedTo: "vs. last month" },
          },
          {
            label: "Processing",
            value: "184",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-success,#10B981)]">within baseline</span>,
          },
          {
            label: "Delivered Today",
            value: "342",
            delta: { value: "+11.4%", direction: "up", comparedTo: "vs. yesterday" },
          },
          {
            label: "Delivery Failures",
            value: "7",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-error,#EF4444)]">needs attention</span>,
          },
        ],
        volume: {
          title: "Release delivery volume",
          description: "DSP deliveries · last 14 days",
          badge: "All DSPs ▾",
          chart: {
            ariaLabel: "DSP deliveries over the last 14 days",
            data: [38, 44, 51, 47, 62, 58, 66, 71, 69, 78, 74, 82, 88, 91],
            legend: ["Delivered", "Processing", "Retries"],
          },
        },
        queue: {
          title: "Delivery queue",
          description: "Current release operations",
          badges: [
            { label: "11 retrying", tone: "warning" },
            { label: "7 failed", tone: "error" },
          ],
          table: {
            columns: [
              { header: "Release" },
              { header: "Artist" },
              { header: "UPC" },
              { header: "DSP" },
              { header: "Status" },
              { header: "Latency" },
            ],
            rows: [
              ["Midnight Run", "Neon River", "641234567890", "Spotify", <Badge tone="success">Delivered</Badge>, "2h 14m"],
              ["Static Hearts", "Northbound", "641234567891", "Apple Music", <Badge>Processing</Badge>, "3h 41m"],
              ["Cold Lines", "Polar Lights", "641234567892", "Tidal", <Badge tone="warning">Retrying</Badge>, "4h 18m"],
              ["Last Exit", "Glass Echo", "641234567893", "Amazon Music", <Badge tone="error">Failed</Badge>, "—"],
            ],
          },
        },
        quality: {
          title: "Quality control queue",
          description: "Metadata, artwork, audio and rights",
          badge: "288 total",
          tiles: [
            { label: "Metadata review", value: "82 waiting" },
            { label: "Artwork review", value: "41 waiting" },
            { label: "Audio validation", value: "124 waiting" },
            { label: "Rights review", value: "41 waiting" },
          ],
        },
        dspHealth: {
          title: "DSP health",
          badge: "Live",
          meters: [
            { title: "Spotify", value: "2h 14m", caption: "median delivery", progress: 87, badge: { label: "Healthy", tone: "success" } },
            { title: "Apple Music", value: "3h 41m", caption: "median delivery", progress: 74, badge: { label: "Healthy", tone: "success" } },
            { title: "Tidal", value: "4h 18m", caption: "median delivery", progress: 59, badge: { label: "Degraded", tone: "warning" } },
            { title: "Amazon", value: "4h 12m", caption: "median delivery", progress: 68, badge: { label: "Healthy", tone: "success" } },
          ],
        },
        releaseState: {
          title: "Release state",
          description: "Current catalogue",
          items: [
            { id: "draft", icon: "D", title: "Draft", description: "124 releases", meta: <Badge>9%</Badge> },
            { id: "review", icon: "R", title: "Review", description: "82 releases", meta: <Badge>6%</Badge> },
            { id: "processing", icon: "P", title: "Processing", description: "184 releases", meta: <Badge tone="warning">14%</Badge> },
            { id: "delivered", icon: "✓", title: "Delivered", description: "8,824 releases", meta: <Badge tone="success">69%</Badge> },
          ],
        },
        alert: {
          title: "DSP delivery latency above baseline",
          description: "Tidal delivery is 18% slower than the 7-day median. Retry queue is active.",
        },
      }}
    />
  ),
};

/* Stageflow — demo data only. */

export const Stageflow: Story = {
  render: () => (
    <StageflowAdmin
      navTitle="Stageflow"
      rail={{
        initial: "S",
        productName: "Stageflow",
        activeModuleId: "overview",
        modules: [
          { id: "overview", label: "Overview", icon: <Icon d={ICONS.home} /> },
          { id: "content", label: "Content", icon: <Icon d={ICONS.music} /> },
          { id: "community", label: "Community", icon: <Icon d={ICONS.users} /> },
          { id: "discovery", label: "Discovery", icon: <Icon d={ICONS.chart} />, badge: 8 },
        ],
      }}
      navGroups={[
        {
          id: "overview",
          label: "Overview",
          items: [
            { id: "dashboard", label: "Dashboard" },
            { id: "live-activity", label: "Live Activity" },
            { id: "intelligence", label: "Intelligence" },
            { id: "analytics", label: "Analytics" },
          ],
        },
        {
          id: "content",
          label: "Content",
          items: [
            { id: "artists", label: "Artists" },
            { id: "events", label: "Events" },
            { id: "festivals", label: "Festivals" },
            { id: "venues", label: "Venues" },
            { id: "producers", label: "Producers" },
            { id: "media", label: "Media" },
            { id: "genres", label: "Genres" },
            { id: "cities", label: "Cities" },
            { id: "seasons", label: "Seasons" },
          ],
        },
        {
          id: "community",
          label: "Users & Community",
          items: [
            { id: "fans", label: "Fans" },
            { id: "followers", label: "Followers" },
            { id: "backstage", label: "Backstage" },
            { id: "fan-badges", label: "Fan badges" },
            { id: "reports", label: "Reports", count: 12 },
          ],
        },
        {
          id: "operations",
          label: "Operations",
          items: [
            { id: "artist-claims", label: "Artist Claims", count: 8 },
            { id: "event-claims", label: "Event Claims", count: 3 },
            { id: "approvals", label: "Approvals" },
            { id: "moderation", label: "Moderation" },
            { id: "duplicate-content", label: "Duplicate Content" },
            { id: "data-issues", label: "Data Issues" },
          ],
        },
        {
          id: "discovery",
          label: "Discovery",
          items: [
            { id: "homepage", label: "Homepage" },
            { id: "featured-artists", label: "Featured Artists" },
            { id: "featured-events", label: "Featured Events" },
            { id: "trending", label: "Trending" },
            { id: "recommendations", label: "Recommendations" },
            { id: "editorial-collections", label: "Editorial Collections" },
          ],
        },
        {
          id: "commercial",
          label: "Commercial",
          items: [
            { id: "campaigns", label: "Campaigns" },
            { id: "advertisements", label: "Advertisements" },
            { id: "sponsors", label: "Sponsors" },
            { id: "official-etkot", label: "Official Etkot" },
            { id: "official-jatkot", label: "Official Jatkot" },
          ],
        },
        {
          id: "platform",
          label: "Platform",
          items: [
            { id: "notifications", label: "Notifications" },
            { id: "search", label: "Search" },
            { id: "integrations", label: "Integrations" },
            { id: "audit-log", label: "Audit Log" },
            { id: "settings", label: "Settings" },
          ],
        },
      ]}
      content={{
        header: {
          eyebrow: "Stageflow / Overview",
          title: "Stageflow Admin",
          description: "Artists, events, festivals and fans — one live operational view",
        },
        actions: { secondary: "Export report", primary: "+ Create event" },
        kpis: [
          {
            label: "Weekly Engaged Fans",
            value: "18,420",
            delta: { value: "+12.8%", direction: "up", comparedTo: "vs. last week" },
          },
          {
            label: "Weekly Active Artists",
            value: "2,846",
            delta: { value: "+8.4%", direction: "up", comparedTo: "vs. last week" },
          },
          {
            label: "Published Events",
            value: "12,482",
            delta: { value: "+4.1%", direction: "up", comparedTo: "vs. last week" },
          },
          {
            label: "Open Moderation Items",
            value: "23",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-warning,#F59E0B)]">8 high priority</span>,
          },
        ],
        activity: {
          title: "Stageflow Activity",
          description: "Meaningful fan & artist actions · last 14 days",
          badge: "Global ▾",
          chart: {
            ariaLabel: "Stageflow activity over the last 14 days",
            data: [42, 48, 51, 58, 54, 63, 68, 66, 74, 79, 75, 84, 89, 94],
            legend: ["Artist follows", "Event saves", "Ticket CTA clicks", "Backstage actions"],
          },
        },
        funnel: {
          title: "Event conversion funnel",
          description: "Stageflow → Ticketing · last 7 days",
          badge: "Healthy",
          chart: {
            ariaLabel: "Event conversion from impression to purchase",
            steps: [
              { label: "Impressions", value: "100k", height: 145, width: 92 },
              { label: "Views", value: "27k", height: 113, width: 78 },
              { label: "Saved", value: "6.2k", height: 82, width: 67 },
              { label: "Checkout", value: "4.8k", height: 61, width: 57 },
              { label: "Purchased", value: "2.5k", height: 43, width: 50 },
            ],
          },
        },
        artists: {
          title: "Artists requiring attention",
          description: "Claims, completeness and verification",
          badge: "View all",
          table: {
            columns: [
              { header: "Artist" },
              { header: "Country" },
              { header: "Followers" },
              { header: "Events" },
              { header: "Completeness" },
              { header: "Status" },
            ],
            rows: [
              ["Blind Channel", "FI", "14.2k", "12", "96%", <Badge tone="success">Verified</Badge>],
              ["Neon River", "SE", "8.1k", "6", "74%", <Badge tone="warning">Needs review</Badge>],
              ["Northbound", "GB", "4.8k", "3", "61%", <Badge>Unclaimed</Badge>],
              ["Polar Lights", "FI", "21.4k", "18", "88%", <Badge tone="error">Duplicate detected</Badge>],
            ],
          },
        },
        discovery: {
          title: "Discovery intelligence",
          badge: "Live",
          meters: [
            { title: "Trending artists", value: "42", caption: "gaining traction now", progress: 84, badge: { label: "+184%", tone: "success" } },
            { title: "No-result searches", value: "3.7%", caption: "of all searches", progress: 37, badge: { label: "842", tone: "warning" } },
            { title: "Featured CTR", value: "18.4%", caption: "homepage discovery", progress: 74, badge: { label: "Healthy", tone: "success" } },
            { title: "Profile completeness", value: "82%", caption: "active artists", progress: 82, badge: { label: "Median" } },
          ],
        },
        liveActivity: {
          title: "Live activity",
          description: "Auto-updating",
          items: [
            { id: "a1", icon: "♫", title: "New artist profile published", description: "Helsinki · profile completeness 94%", meta: "1m" },
            { id: "a2", icon: "★", title: "Festival lineup updated", description: "Flow Festival · 8 new artists", meta: "4m" },
            { id: "a3", icon: "↗", title: "Event ticket intent spike", description: "Tampere · +38% vs baseline", meta: "9m" },
          ],
        },
        alert: {
          title: "8 artist claims need review",
          description: "Oldest high-priority claim has been waiting 3h 14m.",
        },
      }}
    />
  ),
};

/* Ticketing — demo data only. */

export const Ticketing: Story = {
  render: () => (
    <TicketingAdmin
      navTitle="Ticketing"
      rail={{
        initial: "T",
        productName: "Ticketing",
        activeModuleId: "overview",
        modules: [
          { id: "overview", label: "Overview", icon: <Icon d={ICONS.home} /> },
          { id: "events", label: "Events", icon: <Icon d={ICONS.calendar} /> },
          { id: "tickets", label: "Tickets", icon: <Icon d={ICONS.ticket} /> },
          { id: "entry", label: "Entry", icon: <Icon d={ICONS.scan} />, badge: 24 },
        ],
      }}
      navGroups={[
        {
          id: "overview",
          label: "Overview",
          items: [
            { id: "dashboard", label: "Dashboard" },
            { id: "live-sales", label: "Live Sales" },
            { id: "analytics", label: "Analytics" },
          ],
        },
        {
          id: "events",
          label: "Events",
          items: [
            { id: "events", label: "Events" },
            { id: "on-sale", label: "On Sale" },
            { id: "live-now", label: "Live Now", count: 42 },
            { id: "upcoming", label: "Upcoming" },
            { id: "past", label: "Past" },
          ],
        },
        {
          id: "tickets",
          label: "Tickets",
          items: [
            { id: "tickets", label: "Tickets" },
            { id: "ticket-types", label: "Ticket Types" },
            { id: "inventory", label: "Inventory" },
            { id: "reservations", label: "Reservations" },
            { id: "complimentary", label: "Complimentary" },
          ],
        },
        {
          id: "orders",
          label: "Orders",
          items: [
            { id: "orders", label: "Orders" },
            { id: "checkouts", label: "Checkouts" },
            { id: "failed-orders", label: "Failed Orders", count: 12 },
            { id: "refunds", label: "Refunds" },
            { id: "transfers", label: "Transfers" },
          ],
        },
        {
          id: "entry",
          label: "Entry",
          items: [
            { id: "scanner", label: "Scanner" },
            { id: "scan-activity", label: "Scan Activity" },
            { id: "devices", label: "Devices" },
            { id: "gates", label: "Gates" },
            { id: "failed-scans", label: "Failed Scans", count: 24 },
            { id: "fraud-alerts", label: "Fraud Alerts" },
          ],
        },
        {
          id: "resale",
          label: "Resale",
          items: [
            { id: "listings", label: "Listings" },
            { id: "resale-sales", label: "Sales" },
            { id: "resale-transfers", label: "Transfers" },
            { id: "disputes", label: "Disputes" },
          ],
        },
        {
          id: "payments",
          label: "Payments",
          items: [
            { id: "transactions", label: "Transactions" },
            { id: "failed-payments", label: "Failed Payments" },
            { id: "payment-refunds", label: "Refunds" },
            { id: "organizer-payouts", label: "Organizer Payouts" },
          ],
        },
        {
          id: "operations",
          label: "Operations",
          items: [
            { id: "event-command-center", label: "Event Command Center" },
            { id: "capacity", label: "Capacity" },
            { id: "queue-monitoring", label: "Queue Monitoring" },
            { id: "incident-management", label: "Incident Management" },
          ],
        },
        {
          id: "platform",
          label: "Platform",
          items: [
            { id: "ticket-templates", label: "Ticket Templates" },
            { id: "pricing-rules", label: "Pricing Rules" },
            { id: "integrations", label: "Integrations" },
            { id: "audit-log", label: "Audit Log" },
            { id: "settings", label: "Settings" },
          ],
        },
      ]}
      content={{
        header: {
          eyebrow: "Ticketing / Overview",
          title: "Ticketing Admin",
          description: "Sales, inventory, payments and live event operations",
        },
        actions: { secondary: "Event command center", primary: "+ Create onsale" },
        kpis: [
          {
            label: "Ticket Sales / 24h",
            value: "€92,482",
            delta: { value: "+14.8%", direction: "up", comparedTo: "vs. yesterday" },
          },
          {
            label: "Tickets Sold",
            value: "4,820",
            delta: { value: "+9.1%", direction: "up", comparedTo: "vs. yesterday" },
          },
          {
            label: "Checkout Success",
            value: "98.7%",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-success,#10B981)]">healthy</span>,
          },
          {
            label: "Open Payment Issues",
            value: "12",
            trend: <span className="text-xs font-semibold text-[var(--mk-status-warning,#F59E0B)]">needs review</span>,
          },
        ],
        sales: {
          title: "Live ticket sales",
          description: "Sales velocity · last 14 hours",
          badge: "42 live events",
          chart: {
            ariaLabel: "Ticket sales velocity over the last 14 hours",
            data: [34, 38, 44, 49, 55, 63, 61, 69, 72, 78, 84, 81, 89, 95],
            legend: ["Tickets sold", "Checkout started", "Payment succeeded"],
          },
        },
        onsales: {
          title: "Current onsales",
          description: "Inventory & demand",
          badge: "View all",
          table: {
            columns: [
              { header: "Event" },
              { header: "Sold" },
              { header: "Capacity" },
              { header: "Fill" },
              { header: "Sales / h" },
              { header: "Status" },
            ],
            rows: [
              ["Flow Festival", "14,820", "20,000", "74%", "284", <Badge tone="success">On sale</Badge>],
              ["Blind Channel — Helsinki", "4,100", "4,500", "91%", "112", <Badge tone="warning">Low inventory</Badge>],
              ["Neon River — Tampere", "1,882", "3,000", "63%", "76", <Badge tone="success">On sale</Badge>],
              ["Polar Lights — Turku", "2,000", "2,000", "100%", "0", <Badge>Sold out</Badge>],
            ],
          },
        },
        checkout: {
          title: "Checkout funnel",
          description: "All ticketing · last 24h",
          badge: "98.7% payment success",
          chart: {
            ariaLabel: "Checkout funnel over the last 24 hours",
            steps: [
              { label: "Viewed", value: "100k", height: 145, width: 92 },
              { label: "Selected", value: "31.2k", height: 113, width: 78 },
              { label: "Checkout", value: "21.2k", height: 84, width: 68 },
              { label: "Payment", value: "17.4k", height: 62, width: 58 },
              { label: "Purchased", value: "16.3k", height: 48, width: 51 },
            ],
          },
        },
        command: {
          title: "Live event command",
          badge: "Operational",
          meters: [
            { title: "Attendance", value: "18,420", caption: "of 22,000", progress: 84, badge: { label: "Live" } },
            { title: "Checked in", value: "17,920", caption: "currently inside", progress: 83, badge: { label: "83.7%", tone: "success" } },
            { title: "Scan success", value: "99.4%", caption: "all gates", progress: 99, badge: { label: "Healthy", tone: "success" } },
            { title: "Active scanners", value: "48 / 49", caption: "devices online", progress: 98, badge: { label: "1 warning", tone: "warning" } },
          ],
        },
        gates: {
          title: "Gate activity",
          description: "Scans / hour",
          items: [
            { id: "gate-a", icon: "A", title: "Gate A", description: "1,842 scans/h", meta: <Badge tone="success">Normal</Badge> },
            { id: "gate-b", icon: "B", title: "Gate B", description: "1,241 scans/h", meta: <Badge tone="success">Normal</Badge> },
            { id: "gate-c", icon: "C", title: "Gate C", description: "822 scans/h", meta: <Badge tone="warning">Slow</Badge> },
            { id: "gate-vip", icon: "VIP", title: "VIP", description: "241 scans/h", meta: <Badge tone="success">Normal</Badge> },
          ],
        },
        alert: {
          title: "Scanner 18 rejection rate elevated",
          description: "Gate C has 24 failed scans in the last 15 minutes. Device diagnostics recommended.",
        },
      }}
    />
  ),
};
