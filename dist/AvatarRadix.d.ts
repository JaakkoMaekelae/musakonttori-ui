import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
/**
 * Musakonttori Avatar (Radix) - komposiittikuvake.
 *
 * Radix UI -pohjainen. Tukee Image, Fallback, Badge, Group, GroupCount.
 *
 * @example
 * <Avatar>
 *   <AvatarImage src="https://..." alt="Käyttäjä" />
 *   <AvatarFallback>KM</AvatarFallback>
 * </Avatar>
 */
declare const Avatar: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
declare function AvatarBadge({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
declare function AvatarGroup({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function AvatarGroupCount({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount, };
//# sourceMappingURL=AvatarRadix.d.ts.map