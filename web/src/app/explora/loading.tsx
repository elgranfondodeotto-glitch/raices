import { SkeletonGrid } from "@/components/skeleton-card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 h-9 w-64 animate-pulse rounded bg-[var(--color-bg-alt)]" />
      <SkeletonGrid count={9} />
    </div>
  );
}
