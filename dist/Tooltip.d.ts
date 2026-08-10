import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * Musakonttori TooltipContent - tooltipin sisältö.
 *
 * Radix UI -pohjainen. Ota `<TooltipProvider>` käyttöön sovelluksen juuressa.
 *
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Apua tästä</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
//# sourceMappingURL=Tooltip.d.ts.map