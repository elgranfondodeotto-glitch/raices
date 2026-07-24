import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Contacto — Raíces",
  description: "Escríbenos y un asesor de Raíces te contactará coordinando el horario de tu zona.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="font-display text-4xl">Contáctanos</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">Sin importar dónde vivas, coordinamos el horario que mejor te quede.</p>
      <div className="mt-8">
        <LeadForm origen="contacto" ctaLabel="Enviar mensaje" />
      </div>
    </div>
  );
}
