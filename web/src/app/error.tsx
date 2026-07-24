"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl">Algo salió mal</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Ocurrió un error inesperado. Nuestro equipo ya fue notificado.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Intentar de nuevo</Button>
        <Button href="/" variant="secondary">Volver al inicio</Button>
      </div>
    </div>
  );
}
