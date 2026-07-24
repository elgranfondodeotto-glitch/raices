import Link from "next/link";
import { formatCOP } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

type Props = {
  slug: string;
  titulo: string;
  municipioNombre: string;
  tipo: string;
  precioDesde: number;
  rentabilidadEstimada: number;
  verificado: boolean;
};

export function PropertyCard(p: Props) {
  return (
    <Link
      href={`/marketplace/${p.slug}`}
      className="group overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-40 w-full" style={{ background: "linear-gradient(135deg, var(--color-forest) 0%, var(--color-navy) 100%)" }}>
        {p.verificado && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-[var(--color-forest)]">
            <ShieldCheck size={12} /> Verificado
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="font-semibold leading-snug">{p.titulo}</p>
        <p className="text-sm text-[var(--color-text-secondary)]">{p.municipioNombre} · {p.tipo}</p>
        <p className="mt-2 tabular-nums font-semibold">Desde {formatCOP(p.precioDesde)}</p>
        <p className="text-sm text-[var(--color-forest)]">● Rentabilidad est. {p.rentabilidadEstimada}%</p>
      </div>
    </Link>
  );
}
