import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useViewCursor } from "../useViewCursor";

const ids = ["a", "b", "c", "d"];

describe("useViewCursor", () => {
  it("walks forward and backward through the view", () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useViewCursor({ ids, selectedId: "b", onSelect }),
    );
    act(() => result.current.selectNext());
    expect(onSelect).toHaveBeenLastCalledWith("c");
    act(() => result.current.selectPrevious());
    expect(onSelect).toHaveBeenLastCalledWith("a");
  });

  it("stops at both ends instead of wrapping", () => {
    // Wrapping in a work queue is disorienting — you lose your place.
    const onSelect = vi.fn();
    const first = renderHook(() =>
      useViewCursor({ ids, selectedId: "a", onSelect }),
    );
    act(() => first.result.current.selectPrevious());
    expect(onSelect).not.toHaveBeenCalled();

    const last = renderHook(() =>
      useViewCursor({ ids, selectedId: "d", onSelect }),
    );
    act(() => last.result.current.selectNext());
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("enters the list from either end when nothing is selected", () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useViewCursor({ ids, selectedId: null, onSelect }),
    );
    act(() => result.current.selectNext());
    expect(onSelect).toHaveBeenLastCalledWith("a");
    act(() => result.current.selectPrevious());
    expect(onSelect).toHaveBeenLastCalledWith("d");
  });

  it("reports its position for the detail header", () => {
    const { result } = renderHook(() =>
      useViewCursor({ ids, selectedId: "c", onSelect: vi.fn() }),
    );
    expect(result.current.label).toBe("3 / 4");
    expect(result.current.index).toBe(2);
    expect(result.current.total).toBe(4);
  });

  it("asks for the next page before the cursor reaches the end", () => {
    // Otherwise ArrowDown dies silently on the last loaded row — the queue
    // looks finished when it is only paged.
    const onNeedMore = vi.fn();
    renderHook(() =>
      useViewCursor({
        ids,
        selectedId: "c",
        onSelect: vi.fn(),
        onNeedMore,
        hasMore: true,
        prefetchWithin: 3,
      }),
    );
    expect(onNeedMore).toHaveBeenCalledTimes(1);
  });

  it("does not ask for more when the cursor is far from the end", () => {
    const onNeedMore = vi.fn();
    renderHook(() =>
      useViewCursor({
        ids,
        selectedId: "a",
        onSelect: vi.fn(),
        onNeedMore,
        hasMore: true,
        prefetchWithin: 2,
      }),
    );
    expect(onNeedMore).not.toHaveBeenCalled();
  });

  it("does not re-request the same page on every keypress", () => {
    const onNeedMore = vi.fn();
    const { rerender } = renderHook(
      (props: { selectedId: string }) =>
        useViewCursor({
          ids,
          selectedId: props.selectedId,
          onSelect: vi.fn(),
          onNeedMore,
          hasMore: true,
          prefetchWithin: 4,
        }),
      { initialProps: { selectedId: "b" } },
    );
    rerender({ selectedId: "c" });
    rerender({ selectedId: "d" });
    // One request per page length, not one per move.
    expect(onNeedMore).toHaveBeenCalledTimes(1);
  });

  it("requests again once the view has actually grown", () => {
    const onNeedMore = vi.fn();
    const { rerender } = renderHook(
      (props: { ids: string[] }) =>
        useViewCursor({
          ids: props.ids,
          selectedId: "d",
          onSelect: vi.fn(),
          onNeedMore,
          hasMore: true,
          prefetchWithin: 4,
        }),
      { initialProps: { ids } },
    );
    expect(onNeedMore).toHaveBeenCalledTimes(1);
    rerender({ ids: [...ids, "e"] });
    expect(onNeedMore).toHaveBeenCalledTimes(2);
  });

  it("does nothing on an empty view", () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() =>
      useViewCursor({ ids: [], selectedId: null, onSelect }),
    );
    act(() => result.current.selectNext());
    act(() => result.current.selectPrevious());
    expect(onSelect).not.toHaveBeenCalled();
    expect(result.current.label).toBe("");
  });
});
