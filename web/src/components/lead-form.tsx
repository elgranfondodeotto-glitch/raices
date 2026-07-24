"use client";

import { useState, useTransition } from "react";
import { submitLead } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export function LeadForm({
  origen,
  allyId,
  propertyId,
  ctaLabel = "Enviar",
}: {
  origen: string;
  allyId?: string;
  propertyId?: string;
  ctaLabel?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <p className="rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-4 text-sm text-[var(--color-forest)]">
        ¡Listo! Un asesor te contactará pronto, coordinando el horario de tu zona.
      </p>
    );
  }

  return (
    <form
      className="space-y-3"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          const res = await submitLead(formData);
          if (res?.error) setError(res.error);
          else setSent(true);
        });
      }}
    >
      <input type="hidden" name="origen" value={origen} />
      {allyId && <input type="hidden" name="allyId" value={allyId} />}
      {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}
      <input name="nombre" required placeholder="Nombre completo" className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm" />
      <input name="email" type="email" required placeholder="Correo" className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm" />
      <input name="telefono" required placeholder="Teléfono (con indicativo de país)" className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm" />
      <textarea name="mensaje" required placeholder="¿En qué te podemos ayudar?" rows={3} className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm" />
      {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Enviando..." : ctaLabel}
      </Button>
    </form>
  );
}
