export interface UseViewCursorOptions {
    /** The view's ordered ids. Order must match what the list renders. */
    ids: readonly string[];
    selectedId?: string | null;
    onSelect: (id: string) => void;
    /**
     * Called when the cursor comes within `prefetchWithin` of the end and more
     * pages exist. Without this the queue silently stops at the page boundary —
     * the user presses ArrowDown on the last loaded row and nothing happens.
     */
    onNeedMore?: () => void;
    hasMore?: boolean;
    prefetchWithin?: number;
}
export interface ViewCursor {
    index: number;
    total: number;
    /** "3 / 142" — ready for the detail header. */
    label: string;
    selectPrevious: () => void;
    selectNext: () => void;
    hasPrevious: boolean;
    hasNext: boolean;
}
/**
 * Keyboard cursor over a view's ordered ids.
 *
 * This is the piece that makes ArrowUp/ArrowDown work while a record is
 * expanded. It deliberately operates on an id list rather than on rendered
 * rows, because in the expanded state the list is visually collapsed — there
 * are no rows to walk, only the order the server returned.
 */
export declare function useViewCursor({ ids, selectedId, onSelect, onNeedMore, hasMore, prefetchWithin, }: UseViewCursorOptions): ViewCursor;
//# sourceMappingURL=useViewCursor.d.ts.map