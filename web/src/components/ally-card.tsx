import Link from "next/link";
import { ShieldCheck } from "lucide-react";

type Props = {
  slug: string;
  nombre: string;
  categoria: string;
  municipios: string;
  logoInitial: string;
  verificado: boolean;
};

export function AllyCard(a: Props) {
  return (
    <Link
      href={`/aliados/${a.slug}`}
      className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] font-display text-xl text-white">
        {a.logoInitial}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold truncate">{a.nombre}</p>
          {a.verificado && <ShieldCheck size={14} className="shrink-0 text-[var(--color-forest)]" />}
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">{a.categoria}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {a.municipios.split(",").slice(0, 3).map((m) => (
            <span key={m} className="rounded-full bg-[var(--color-bg-alt)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
              {m}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
