import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import { MarketplaceFilters } from "@/components/marketplace-filters";

export const metadata: Metadata = {
  title: "Marketplace — Raíces",
  description: "Proyectos inmobiliarios verificados en Santander, con filtros por ciudad, precio, tipo y rentabilidad.",
};

type SearchParams = Promise<{ ciudad?: string; tipo?: string }>;

export default async function MarketplacePage({ searchParams }: { searchParams: SearchParams }) {
  const { ciudad, tipo } = await searchParams;

  const [properties, municipios, tiposRaw] = await Promise.all([
    prisma.property.findMany({
      where: {
        ...(ciudad ? { municipality: { slug: ciudad } } : {}),
        ...(tipo ? { tipo } : {}),
      },
      include: { municipality: true },
      orderBy: { destacado: "desc" },
    }),
    prisma.municipality.findMany({ orderBy: { nombre: "asc" }, select: { slug: true, nombre: true } }),
    prisma.property.findMany({ distinct: ["tipo"], select: { tipo: true } }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-4xl">Marketplace</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">Solo proyectos verificados por Raíces.</p>

      <MarketplaceFilters
        municipios={municipios.map((m) => ({ value: m.slug, label: m.nombre }))}
        tipos={tiposRaw.map((t) => ({ value: t.tipo, label: t.tipo }))}
      />

      <p className="mt-6 text-sm text-[var(--color-text-secondary)]">{properties.length} proyectos verificados</p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.id} {...p} municipioNombre={p.municipality.nombre} />
        ))}
      </div>
    </div>
  );
}
