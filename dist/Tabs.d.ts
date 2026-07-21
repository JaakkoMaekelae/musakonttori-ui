import * as TabsPrimitive from "@radix-ui/react-tabs";
/**
 * Musakonttori Tabs - tab component built on Radix UI.
 *
 * Supports: horizontal and vertical tabs,
 * badge count, disabled state.
 *
 * @example
 * <Tabs value={tab} onValueChange={setTab}>
 *   <TabsList>
 *     <TabsTrigger value="all">Kaikki</TabsTrigger>
 *     <TabsTrigger value="active">Aktiiviset</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="all">Sisältö 1</TabsContent>
 *   <TabsContent value="active">Sisältö 2</TabsContent>
 * </Tabs>
 */
export declare const Tabs: import("react").ForwardRefExoticComponent<TabsPrimitive.TabsProps & import("react").RefAttributes<HTMLDivElement>>;
export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
}
export declare const TabsList: import("react").ForwardRefExoticComponent<TabsListProps & import("react").RefAttributes<HTMLDivElement>>;
export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
    /** Badge count after tab name */
    count?: number;
}
export declare const TabsTrigger: import("react").ForwardRefExoticComponent<TabsTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
}
export declare const TabsContent: import("react").ForwardRefExoticComponent<TabsContentProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Tabs.d.ts.map