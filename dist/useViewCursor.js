"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
/**
 * Keyboard cursor over a view's ordered ids.
 *
 * This is the piece that makes ArrowUp/ArrowDown work while a record is
 * expanded. It deliberately operates on an id list rather than on rendered
 * rows, because in the expanded state the list is visually collapsed — there
 * are no rows to walk, only the order the server returned.
 */
export function useViewCursor({ ids, selectedId, onSelect, onNeedMore, hasMore = false, prefetchWithin = 5, }) {
    const index = useMemo(() => (selectedId ? ids.indexOf(selectedId) : -1), [ids, selectedId]);
    // Guard against firing a fetch on every keypress while one is in flight.
    const requestedAt = useRef(-1);
    useEffect(() => {
        if (!hasMore || !onNeedMore)
            return;
        if (index < 0)
            return;
        if (ids.length - index > prefetchWithin)
            return;
        if (requestedAt.current === ids.length)
            return;
        requestedAt.current = ids.length;
        onNeedMore();
    }, [hasMore, onNeedMore, index, ids.length, prefetchWithin]);
    const selectPrevious = useCallback(() => {
        if (ids.length === 0)
            return;
        // Nothing selected yet: ArrowUp enters the list at the end.
        const next = index < 0 ? ids.length - 1 : index - 1;
        if (next < 0)
            return;
        const id = ids[next];
        if (id)
            onSelect(id);
    }, [ids, index, onSelect]);
    const selectNext = useCallback(() => {
        if (ids.length === 0)
            return;
        const next = index < 0 ? 0 : index + 1;
        if (next > ids.length - 1)
            return;
        const id = ids[next];
        if (id)
            onSelect(id);
    }, [ids, index, onSelect]);
    return {
        index,
        total: ids.length,
        label: index >= 0 ? `${index + 1} / ${ids.length}` : "",
        selectPrevious,
        selectNext,
        hasPrevious: index > 0 || (index < 0 && ids.length > 0),
        hasNext: index >= 0 && index < ids.length - 1,
    };
}
