export function PageSkeleton({
  titleWidth = "w-48",
  cardCount = 4,
  showChart = true,
}: {
  titleWidth?: string;
  cardCount?: number;
  showChart?: boolean;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 animate-pulse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className={`h-8 ${titleWidth} bg-zinc-200 dark:bg-zinc-800 rounded-lg`} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: cardCount }, (_, i) => (
            <div
              key={i}
              className="h-24 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          ))}
        </div>
        {showChart && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="h-64 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700" />
            <div className="h-64 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700" />
          </div>
        )}
      </div>
    </div>
  );
}
