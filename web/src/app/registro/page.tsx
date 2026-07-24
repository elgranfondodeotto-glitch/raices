"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";

export default function RegistroPage() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl">Crea tu cuenta</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Gratis, en menos de un minuto.</p>

          <form
            className="mt-8 space-y-4"
            action={(formData) => {
              setError(null);
              startTransition(async () => {
                const res = await registerUser(formData);
                if (res?.error) setError(res.error);
              });
            }}
          >
            <input name="nombre" required placeholder="Nombre completo" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm" />
            <input name="email" type="email" required placeholder="Correo" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm" />
            <input name="password" type="password" required minLength={8} placeholder="Contraseña (mínimo 8 caracteres)" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm" />
            <select name="paisResidencia" required defaultValue="" className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm">
              <option value="" disabled>País de residencia</option>
              {["Estados Unidos", "Canadá", "España", "Australia", "Otro país de Europa", "Otro"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            ¿Ya tienes cuenta? <Link href="/login" className="text-[var(--color-forest)] hover:underline">Ingresa aquí</Link>
          </p>
        </div>
      </div>

      <div className="hidden items-center justify-center p-12 text-center text-white lg:flex" style={{ background: "linear-gradient(160deg, var(--color-navy) 0%, var(--color-forest) 100%)" }}>
        <blockquote className="max-w-sm font-display text-2xl leading-snug">
          &ldquo;Únete a los colombianos que ya están construyendo su patrimonio en Santander desde el exterior.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
