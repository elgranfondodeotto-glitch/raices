export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 h-9 w-72 animate-pulse rounded bg-[var(--color-bg-alt)]" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-5">
            <div className="h-14 w-14 shrink-0 rounded-full bg-[var(--color-bg-alt)]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-[var(--color-bg-alt)]" />
              <div className="h-3 w-1/2 rounded bg-[var(--color-bg-alt)]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
