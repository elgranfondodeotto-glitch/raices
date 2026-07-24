import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MunicipalityCard } from "@/components/municipality-card";

export const metadata: Metadata = {
  title: "Explora Santander — Raíces",
  description: "Conoce los 10 municipios de Santander priorizados por Raíces: precio por m², valorización y tipo de inversión recomendada.",
};

export default async function ExploraPage() {
  const municipios = await prisma.municipality.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl">Explora Santander</h1>
        <p className="mt-3 text-[var(--color-text-secondary)]">
          Diez municipios, diez perfiles de inversión distintos. Elige el que mejor calce con tu meta patrimonial.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {municipios.map((m) => (
          <MunicipalityCard key={m.id} {...m} />
        ))}
      </div>
    </div>
  );
}
