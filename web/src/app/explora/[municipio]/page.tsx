import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Home as HomeIcon, Sparkles } from "lucide-react";

type Params = Promise<{ municipio: string }>;

async function getMunicipio(slug: string) {
  return prisma.municipality.findUnique({
    where: { slug },
    include: { properties: { include: { municipality: true }, take: 6 } },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { municipio } = await params;
  const m = await getMunicipio(municipio);
  if (!m) return {};
  return {
    title: `Invertir en ${m.nombre}, Santander — Raíces`,
    description: m.resumen,
  };
}

export default async function MunicipioPage({ params }: { params: Params }) {
  const { municipio } = await params;
  const m = await getMunicipio(municipio);
  if (!m) notFound();

  const stats = [
    { icon: TrendingUp, label: "Precio m² promedio", value: `$${m.precioM2Promedio.toLocaleString("es-CO")}` },
    { icon: Sparkles, label: "Valorización anual", value: `${m.valorizacionPct}%` },
    { icon: MapPin, label: "Nivel de valorización", value: m.nivelValorizacion },
    { icon: HomeIcon, label: "Tipo recomendado", value: m.tipoRecomendado },
  ];

  return (
    <div>
      <div className="relative h-64 w-full" style={{ background: "linear-gradient(135deg, var(--color-forest) 0%, var(--color-navy) 100%)" }}>
        <div className="absolute inset-0 flex items-end bg-black/20">
          <div className="mx-auto w-full max-w-7xl px-6 pb-8 text-white">
            <h1 className="font-display text-4xl">{m.nombre}</h1>
            <p className="mt-1 max-w-xl text-white/85">{m.resumen}</p>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-4 sm:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={16} className="shrink-0 text-[var(--color-forest)]" />
              <div>
                <p className="text-sm font-semibold leading-tight">{value}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <p className="max-w-3xl leading-relaxed text-[var(--color-text-secondary)]">{m.descripcion}</p>

        <div className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6">
          <p className="font-semibold">¿No sabes si {m.nombre} es para ti?</p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Simula tu plan de inversión con este municipio precargado.</p>
          <div className="mt-4">
            <Button href={`/plan-de-inversion?municipio=${m.slug}`}>Simula tu plan para {m.nombre}</Button>
          </div>
        </div>

        {m.properties.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl">Proyectos en {m.nombre}</h2>
              <Link href={`/marketplace?ciudad=${m.slug}`} className="text-sm font-medium text-[var(--color-forest)] hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {m.properties.map((p) => (
                <PropertyCard key={p.id} {...p} municipioNombre={p.municipality.nombre} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
