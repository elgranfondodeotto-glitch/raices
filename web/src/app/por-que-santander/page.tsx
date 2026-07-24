import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "¿Por qué invertir en Santander? — Raíces",
  description: "Valorización, costo de vida, conectividad y calidad de vida: por qué Santander es el destino de inversión con mejor relación patrimonio/costo de Colombia.",
};

const DATOS = [
  { label: "Valorización promedio anual", value: "8-14%", fuente: "Promedio de los 10 municipios priorizados por Raíces, 2021-2026" },
  { label: "Costo de vida vs. Bogotá", value: "-30%", fuente: "Estimación basada en canasta familiar promedio" },
  { label: "Conectividad", value: "Aeropuerto internacional + Ruta del Sol", fuente: "Aerocivil, ANI" },
  { label: "Clima y calidad de vida", value: "18°C – 28°C según municipio", fuente: "IDEAM" },
  { label: "Seguridad", value: "Mejora sostenida en la última década", fuente: "Cifras oficiales de seguridad departamental" },
  { label: "Comunidad", value: "Miles de colombianos en el exterior ya invirtiendo en la región", fuente: "Estimación Raíces" },
];

const COMPARATIVA = [
  { destino: "Santander", precioM2: "$3.9M - $7.8M", valorizacion: "8-14%", liquidez: "Media-alta" },
  { destino: "Eje Cafetero", precioM2: "$4.5M - $8M", valorizacion: "6-10%", liquidez: "Media" },
  { destino: "Costa Caribe", precioM2: "$6M - $12M", valorizacion: "5-9%", liquidez: "Alta (turística)" },
];

export default function PorQueSantanderPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl">El departamento con mejor relación patrimonio/costo de Colombia</h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {DATOS.map((d) => (
          <div key={d.label} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <p className="text-xl font-semibold">{d.value}</p>
            <p className="text-sm">{d.label}</p>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Fuente: {d.fuente}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl">Santander vs. otros destinos de inversión</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-text-secondary)]">
              <th className="py-2">Destino</th>
              <th className="py-2">Precio m²</th>
              <th className="py-2">Valorización</th>
              <th className="py-2">Liquidez</th>
            </tr>
          </thead>
          <tbody>
            {COMPARATIVA.map((c) => (
              <tr key={c.destino} className="border-b border-[var(--color-border)]">
                <td className="py-3 font-medium">{c.destino}</td>
                <td className="py-3">{c.precioM2}</td>
                <td className="py-3">{c.valorizacion}</td>
                <td className="py-3">{c.liquidez}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 font-display text-2xl">¿Para quién es esto?</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          "Quiere un lugar al que volver cuando regrese a Colombia",
          "Busca ingresos por renta en dólares o COP",
          "Quiere una finca de descanso o producción",
          "Busca su primera propiedad en Colombia",
        ].map((t) => (
          <li key={t} className="rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-4 text-sm">{t}</li>
        ))}
      </ul>

      <div className="mt-14 text-center">
        <Button href="/explora">Descubre tu municipio ideal</Button>
      </div>
    </div>
  );
}
