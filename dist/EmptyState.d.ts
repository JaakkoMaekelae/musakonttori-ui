import type { ReactNode } from "react";
export interface EmptyStateAction {
    label: string;
    onClick: () => void;
}
export interface EmptyStateProps {
    /** Custom icon (lucide-react component) */
    icon?: ReactNode;
    /** Title */
    title: string;
    /** Description text */
    description?: string;
    /** Action button (either label+onClick object or direct ReactNode) */
    action?: EmptyStateAction | ReactNode;
    className?: string;
}
/**
 * Musakonttori EmptyState - empty state display.
 *
 * Used when list/table is empty, no search results found, etc.
 * Contains icon, title, description and optional action button.
 *
 * @example
 * <EmptyState
 *   title="Ei tapahtumia"
 *   description="Et ole vielä luonut yhtään tapahtumaa."
 *   action={{ label: "Luo tapahtuma", onClick: () => {} }}
 * />
 */
export declare function EmptyState({ icon, title, description, action, className, }: EmptyStateProps): import("react").JSX.Element;
//# sourceMappingURL=EmptyState.d.ts.map