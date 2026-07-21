import * as SelectPrimitive from "@radix-ui/react-select";
/**
 * Musakonttori Select - selection component built on Radix UI.
 *
 * Supports: label, placeholder, error state.
 * WCAG 2.2 AA accessible (aria-invalid, aria-describedby).
 *
 * @example
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Valitse tapahtuma" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Tapahtuma A</SelectItem>
 *     <SelectItem value="2">Tapahtuma B</SelectItem>
 *   </SelectContent>
 * </Select>
 */
export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
    label?: string;
    error?: string;
    hint?: string;
    className?: string;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const SelectGroup: import("react").ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const SelectValue: import("react").ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
}
export declare const SelectTrigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
}
export declare const SelectContent: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
}
export declare const SelectItem: import("react").ForwardRefExoticComponent<SelectItemProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Select.d.ts.map