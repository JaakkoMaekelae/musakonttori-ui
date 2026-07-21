import { type VariantProps } from "class-variance-authority";
declare const cardVariants: (props?: ({
    variant?: "default" | "elevated" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    size?: "sm" | "md" | "lg";
    padding?: string;
}
/**
 * Musakonttori Card - card component for grouping content.
 * Use with CardHeader, CardContent, CardFooter subcomponents.
 *
 * @example
 * <Card variant="elevated">
 *   <CardHeader>Otsikko</CardHeader>
 *   <CardContent>Sisältöä...</CardContent>
 *   <CardFooter>Toiminnot</CardFooter>
 * </Card>
 */
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLDivElement>>;
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * Card header area. Typically contains a CardTitle element.
 */
export declare const CardHeader: import("react").ForwardRefExoticComponent<CardHeaderProps & import("react").RefAttributes<HTMLDivElement>>;
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
}
/**
 * Card title. Renders as <h3> element.
 */
export declare const CardTitle: import("react").ForwardRefExoticComponent<CardTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}
/**
 * Card description text below title.
 */
export declare const CardDescription: import("react").ForwardRefExoticComponent<CardDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * Card main content area.
 */
export declare const CardContent: import("react").ForwardRefExoticComponent<CardContentProps & import("react").RefAttributes<HTMLDivElement>>;
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * Card footer, typically for action buttons.
 */
export declare const CardFooter: import("react").ForwardRefExoticComponent<CardFooterProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Card.d.ts.map