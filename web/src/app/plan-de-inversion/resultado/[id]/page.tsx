import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property-card";
import { MunicipalityCard } from "@/components/municipality-card";

type Params = Promise<{ id: string }>;

export default async function ResultadoPage({ params }: { params: Params }) {
  const { id } = await params;
  const plan = await prisma.investmentPlan.findUnique({ where: { id } });
  if (!plan) notFound();

  const session = await auth();
  const fullAccess = !!session?.user?.id;

  const [municipiosRecomendados, propiedadesRecomendadas] = fullAccess
    ? await Promise.all([
        prisma.municipality.findMany({
          where: { precioM2Promedio: { lte: Math.round(plan.capacidadCompra / 60) } },
          take: 3,
          orderBy: { valorizacionPct: "desc" },
        }),
        prisma.property.findMany({
          where: { precioDesde: { lte: plan.capacidadCompra }, tipo: plan.tipoPropiedad },
          include: { municipality: true },
          take: 6,
        }),
      ])
    : [[], []];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl">Tu plan de inversión en Santander</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Basado en tus respuestas, esto es lo que podrías lograr en {plan.tiempoAnios} años.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ResultCard label="Cuota inicial estimada" value={formatCOP(plan.cuotaInicialEstimada)} />
        <ResultCard label="Ahorro mensual sugerido" value={formatCOP(plan.ahorroMensualSugerido)} />
        <ResultCard label="Tiempo estimado para tu cuota inicial" value={formatMeses(plan.mesesParaMeta)} />
        {fullAccess ? (
          <>
            <ResultCard label="Capacidad de compra estimada" value={formatCOP(plan.capacidadCompra)} />
            <ResultCard label="Tipo de propiedad" value={plan.tipoPropiedad} />
          </>
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-alt)] p-8 text-center">
            <p className="font-semibold">Desbloquea tu plan completo</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Crea una cuenta gratis para ver tu capacidad de compra, municipios y proyectos recomendados.
            </p>
            <Button href="/registro" className="mt-4">Crear cuenta gratis</Button>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
        Estimación referencial, no constituye una oferta de crédito ni asesoría financiera personalizada.
      </p>

      {fullAccess && (
        <>
          {municipiosRecomendados.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl">Municipios recomendados para ti</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {municipiosRecomendados.map((m) => <MunicipalityCard key={m.id} {...m} />)}
              </div>
            </div>
          )}

          {propiedadesRecomendadas.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl">Proyectos dentro de tu presupuesto</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {propiedadesRecomendadas.map((p) => (
                  <PropertyCard key={p.id} {...p} municipioNombre={p.municipality.nombre} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex gap-3">
            <Button href="/plan-de-inversion" variant="secondary">Ajustar mis respuestas</Button>
            <Button href="/cuenta">Ir a mi cuenta</Button>
          </div>
        </>
      )}
    </div>
  );
}

function formatMeses(meses: number) {
  if (meses <= 0) return "Ya la tienes cubierta";
  const anios = Math.floor(meses / 12);
  const restoMeses = meses % 12;
  if (anios === 0) return `${meses} ${meses === 1 ? "mes" : "meses"}`;
  const partes = [`${anios} ${anios === 1 ? "año" : "años"}`];
  if (restoMeses > 0) partes.push(`${restoMeses} ${restoMeses === 1 ? "mes" : "meses"}`);
  return partes.join(" y ");
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
