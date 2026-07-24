import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function SimulacionesPage() {
  const session = await auth();
  const planes = await prisma.investmentPlan.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Tus simulaciones</h1>
        <Button href="/plan-de-inversion" size="sm">Nueva simulación</Button>
      </div>

      {planes.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Todavía no tienes simulaciones guardadas.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {planes.map((p) => (
            <Link key={p.id} href={`/plan-de-inversion/resultado/${p.id}`} className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 hover:shadow-sm">
              <div>
                <p className="font-medium">{p.meta} · {p.tipoPropiedad}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {new Date(p.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <p className="tabular-nums font-semibold">{formatCOP(p.capacidadCompra)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
