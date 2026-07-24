import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCOP } from "@/lib/utils";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";

export default async function CuentaResumenPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [ultimoPlan, favoritos] = await Promise.all([
    prisma.investmentPlan.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
    prisma.favorite.findMany({ where: { userId }, include: { property: { include: { municipality: true } } }, take: 3 }),
  ]);

  return (
    <div className="space-y-8">
      {ultimoPlan ? (
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
          <p className="text-sm text-[var(--color-text-secondary)]">Tu plan actual</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{formatCOP(ultimoPlan.capacidadCompra)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">Capacidad de compra estimada · Meta: {ultimoPlan.meta}</p>
          <div className="mt-4 flex gap-3">
            <Button href={`/plan-de-inversion/resultado/${ultimoPlan.id}`} size="sm">Ver detalle</Button>
            <Button href="/plan-de-inversion" size="sm" variant="secondary">Actualizar mis datos</Button>
          </div>
        </div>
      ) : (
        <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6 text-center">
          <p className="font-semibold">Aún no tienes un plan de inversión</p>
          <div className="mt-3">
            <Button href="/plan-de-inversion" size="sm">Crear mi plan</Button>
          </div>
        </div>
      )}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Propiedades favoritas</h2>
          <Link href="/cuenta/favoritos" className="text-sm text-[var(--color-forest)] hover:underline">Ver todas →</Link>
        </div>
        {favoritos.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)]">Aún no has guardado favoritos. <Link href="/marketplace" className="text-[var(--color-forest)] hover:underline">Explora el marketplace</Link>.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {favoritos.map((f) => <PropertyCard key={f.id} {...f.property} municipioNombre={f.property.municipality.nombre} />)}
          </div>
        )}
      </div>
    </div>
  );
}
