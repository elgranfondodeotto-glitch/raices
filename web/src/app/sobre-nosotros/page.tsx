import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros — Raíces",
  description: "Raíces es el primer ecosistema digital para que colombianos en el exterior inviertan en finca raíz en Santander.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl">Sobre Raíces</h1>
      <p className="mt-6 leading-relaxed text-[var(--color-text-secondary)]">
        Raíces nace de una idea simple: miles de colombianos en el exterior quieren invertir en su tierra, pero no
        tienen un lugar confiable, transparente y en español que los acompañe desde la primera pregunta hasta la
        firma de su propiedad.
      </p>
      <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
        Empezamos por Santander — un departamento con datos de valorización sólidos, patrimonio, naturaleza y una
        comunidad creciente de colombianos en el exterior ya invirtiendo aquí. El plan es crecer al resto del país,
        pero primero queremos hacerlo bien en un solo lugar.
      </p>
      <h2 className="mt-10 font-display text-2xl">Nuestros valores</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {["Confianza", "Transparencia", "Educación", "Patrimonio", "Familia", "Inversión inteligente"].map((v) => (
          <div key={v} className="rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-4 text-center font-medium text-[var(--color-forest)]">
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
