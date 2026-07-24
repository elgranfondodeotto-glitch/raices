"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

export function MarketplaceFilters({
  municipios,
  tipos,
}: {
  municipios: Option[];
  tipos: Option[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ciudad = searchParams.get("ciudad") ?? "";
  const tipo = searchParams.get("tipo") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/marketplace${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <select
        value={ciudad}
        onChange={(e) => update("ciudad", e.target.value)}
        className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
      >
        <option value="">Ciudad: todas</option>
        {municipios.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>

      <select
        value={tipo}
        onChange={(e) => update("tipo", e.target.value)}
        className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
      >
        <option value="">Tipo: todos</option>
        {tipos.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      {(ciudad || tipo) && (
        <button
          onClick={() => router.push("/marketplace")}
          className="text-sm font-medium text-[var(--color-forest)] hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
