export function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="h-40 w-full bg-[var(--color-bg-alt)]" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-[var(--color-bg-alt)]" />
        <div className="h-3 w-1/2 rounded bg-[var(--color-bg-alt)]" />
        <div className="h-3 w-1/3 rounded bg-[var(--color-bg-alt)]" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
