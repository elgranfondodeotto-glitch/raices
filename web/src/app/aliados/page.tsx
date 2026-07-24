import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AllyCard } from "@/components/ally-card";

export const metadata: Metadata = {
  title: "Aliados verificados — Raíces",
  description: "Constructoras, inmobiliarias, abogados, bancos, arquitectos y topógrafos verificados en Santander.",
};

export default async function AliadosPage() {
  const aliados = await prisma.ally.findMany({ orderBy: { categoria: "asc" } });
  const categorias = [...new Set(aliados.map((a) => a.categoria))];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-display text-4xl">Aliados verificados de Raíces</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-text-secondary)]">
        Cada aliado pasa por un proceso de verificación antes de aparecer en la plataforma.
      </p>

      {categorias.map((cat) => (
        <div key={cat} className="mt-12">
          <h2 className="font-display text-2xl">{cat}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aliados.filter((a) => a.categoria === cat).map((a) => (
              <AllyCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
