import Link from "next/link";

type Props = {
  slug: string;
  nombre: string;
  resumen: string;
  precioM2Promedio: number;
  nivelValorizacion: string;
};

const NIVEL_COLOR: Record<string, string> = {
  Alta: "var(--color-success)",
  Media: "var(--color-warning)",
  Emergente: "var(--color-info)",
};

export function MunicipalityCard(m: Props) {
  return (
    <Link
      href={`/explora/${m.slug}`}
      className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-40 w-full" style={{ background: "linear-gradient(135deg, var(--color-forest-light) 0%, var(--color-navy) 100%)" }} />
      <div className="p-5">
        <p className="font-semibold text-lg">{m.nombre}</p>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">{m.resumen}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="tabular-nums text-sm font-medium">${m.precioM2Promedio.toLocaleString("es-CO")} / m²</span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
            style={{ background: NIVEL_COLOR[m.nivelValorizacion] ?? "var(--color-info)" }}
          >
            {m.nivelValorizacion}
          </span>
        </div>
      </div>
    </Link>
  );
}
