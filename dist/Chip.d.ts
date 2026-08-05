import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
declare const chipVariants: (props?: ({
    variant?: "success" | "warning" | "error" | "info" | "neutral" | "brand" | null | undefined;
    size?: "sm" | "md" | null | undefined;
    selected?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface ChipCommonProps extends VariantProps<typeof chipVariants> {
    children: ReactNode;
    className?: string;
    leadingIcon?: ReactNode;
}
export interface StaticChipProps extends ChipCommonProps, Omit<HTMLAttributes<HTMLSpanElement>, "children" | "onClick"> {
    onPress?: never;
    onRemove?: never;
    selected?: never;
}
export interface SelectableChipProps extends ChipCommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
    onPress: () => void;
    onRemove?: never;
    selected?: boolean;
}
export interface RemovableChipProps extends ChipCommonProps, Omit<HTMLAttributes<HTMLSpanElement>, "children" | "onClick"> {
    onPress?: never;
    onRemove: () => void;
    removeLabel: string;
    selected?: never;
    disabled?: boolean;
}
export type ChipProps = StaticChipProps | SelectableChipProps | RemovableChipProps;
/**
 * A compact metadata or filter control.
 *
 * `Badge` communicates status. `Chip` represents a value the user can scan,
 * select or remove. Selection and removal are intentionally mutually
 * exclusive so the component never creates nested buttons.
 */
export declare function Chip(props: ChipProps): import("react").JSX.Element;
export { chipVariants };
//# sourceMappingURL=Chip.d.ts.map