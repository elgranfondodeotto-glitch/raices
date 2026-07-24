import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import { LeadForm } from "@/components/lead-form";
import { ShieldCheck } from "lucide-react";

type Params = Promise<{ slug: string }>;

async function getAlly(slug: string) {
  return prisma.ally.findUnique({
    where: { slug },
    include: { properties: { include: { municipality: true } } },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAlly(slug);
  if (!a) return {};
  return { title: `${a.nombre} — Aliados Raíces`, description: a.descripcion };
}

export default async function AllyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const ally = await getAlly(slug);
  if (!ally) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-forest)] font-display text-2xl text-white">
          {ally.logoInitial}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-3xl">{ally.nombre}</h1>
            {ally.verificado && <ShieldCheck size={18} className="text-[var(--color-forest)]" />}
          </div>
          <p className="text-[var(--color-text-secondary)]">{ally.categoria} · Opera en {ally.municipios.split(",").join(", ")}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="leading-relaxed text-[var(--color-text-secondary)]">{ally.descripcion}</p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4">
              <p className="text-xs text-[var(--color-text-secondary)]">Años de experiencia</p>
              <p className="text-xl font-semibold">{ally.aniosExperiencia}</p>
            </div>
            {ally.proyectosEntregados > 0 && (
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-4">
                <p className="text-xs text-[var(--color-text-secondary)]">Proyectos entregados</p>
                <p className="text-xl font-semibold">{ally.proyectosEntregados}</p>
              </div>
            )}
          </div>

          {ally.properties.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-2xl">Proyectos activos</h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {ally.properties.map((p) => (
                  <PropertyCard key={p.id} {...p} municipioNombre={p.municipality.nombre} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-24 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="font-semibold">Habla con {ally.nombre}</p>
            <div className="mt-4">
              <LeadForm origen="aliado" allyId={ally.id} ctaLabel="Enviar mensaje" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
