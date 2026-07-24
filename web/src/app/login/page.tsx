"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Ingresa a tu cuenta</h1>

          <form
            className="mt-8 space-y-4"
            action={(formData) => {
              setError(null);
              startTransition(async () => {
                const res = await loginUser(formData);
                if (res?.error) setError(res.error);
              });
            }}
          >
            <input name="email" type="email" required placeholder="Correo" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm" />
            <input name="password" type="password" required placeholder="Contraseña" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm" />
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            ¿No tienes cuenta? <Link href="/registro" className="text-[var(--color-forest)] hover:underline">Crea una gratis</Link>
          </p>
        </div>
      </div>

      <div className="hidden items-center justify-center p-12 text-center text-white lg:flex" style={{ background: "linear-gradient(160deg, var(--color-navy) 0%, var(--color-forest) 100%)" }}>
        <blockquote className="max-w-sm font-display text-2xl leading-snug">
          &ldquo;Construye tu patrimonio en Santander desde cualquier lugar del mundo.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
