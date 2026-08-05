import { type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
export type AvatarStatus = "online" | "away" | "busy" | "offline";
declare const avatarVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xs" | "xl" | null | undefined;
    shape?: "circle" | "rounded" | null | undefined;
    tone?: "neutral" | "brand" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type PresenceProps = {
    status?: never;
    statusLabel?: never;
} | {
    status: AvatarStatus;
    /** Localized accessible label, for example "Paikalla". */
    statusLabel: string;
};
interface AvatarBaseProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children">, VariantProps<typeof avatarVariants> {
    /** Full name used for both the accessible name and generated initials. */
    name: string;
    src?: string | null;
    alt?: string;
    fallback?: ReactNode;
    fallbackClassName?: string;
    imageClassName?: string;
    imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;
}
export type AvatarProps = AvatarBaseProps & PresenceProps;
/**
 * An accessible identity primitive with image-error fallback and optional
 * presence. The user's full name is always required; callers do not need to
 * duplicate initial generation across products.
 */
export declare const Avatar: import("react").ForwardRefExoticComponent<AvatarProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface AvatarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "aria-label"> {
    /** Localized name for the group, for example "Projektin jäsenet". */
    label: string;
}
/**
 * Overlapping layout for multiple `Avatar` components.
 *
 * The group does not silently hide members. Product code owns any overflow
 * avatar so the visible count and localized label stay truthful.
 */
export declare function AvatarGroup({ label, className, children, ...props }: AvatarGroupProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Avatar.d.ts.map