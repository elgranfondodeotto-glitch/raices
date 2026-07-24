import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PropertyCard } from "@/components/property-card";
import Link from "next/link";

export default async function FavoritosPage() {
  const session = await auth();
  const favoritos = await prisma.favorite.findMany({
    where: { userId: session!.user.id },
    include: { property: { include: { municipality: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl">Tus propiedades favoritas</h1>
      {favoritos.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Aún no has guardado favoritos. <Link href="/marketplace" className="text-[var(--color-forest)] hover:underline">Explora el marketplace</Link>.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoritos.map((f) => <PropertyCard key={f.id} {...f.property} municipioNombre={f.property.municipality.nombre} />)}
        </div>
      )}
    </div>
  );
}
