"use client";

import { useState } from "react";
import { formatCOP } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CalculadoraPage() {
  const [precio, setPrecio] = useState(400000000);
  const [pctInicial, setPctInicial] = useState(30);
  const [plazoAnios, setPlazoAnios] = useState(15);
  const [tasaAnual, setTasaAnual] = useState(12);

  const cuotaInicial = Math.round(precio * (pctInicial / 100));
  const montoFinanciado = precio - cuotaInicial;
  const tasaMensual = tasaAnual / 100 / 12;
  const nMeses = plazoAnios * 12;
  const cuotaMensual =
    tasaMensual > 0
      ? Math.round((montoFinanciado * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -nMeses)))
      : Math.round(montoFinanciado / nMeses);
  const totalAPagar = cuotaInicial + cuotaMensual * nMeses;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl">Calculadora rápida</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">¿Cuánto necesitas para invertir en Santander?</p>

      <div className="mt-10 space-y-6">
        <Field label={`Precio de la propiedad — ${formatCOP(precio)}`}>
          <input type="range" min={100000000} max={2000000000} step={10000000} value={precio} onChange={(e) => setPrecio(Number(e.target.value))} className="w-full accent-[var(--color-forest)]" />
        </Field>
        <Field label={`Cuota inicial — ${pctInicial}%`}>
          <input type="range" min={10} max={50} step={5} value={pctInicial} onChange={(e) => setPctInicial(Number(e.target.value))} className="w-full accent-[var(--color-forest)]" />
        </Field>
        <Field label={`Plazo — ${plazoAnios} años`}>
          <input type="range" min={5} max={25} step={1} value={plazoAnios} onChange={(e) => setPlazoAnios(Number(e.target.value))} className="w-full accent-[var(--color-forest)]" />
        </Field>
        <Field label={`Tasa estimada — ${tasaAnual}% E.A.`}>
          <input type="range" min={8} max={18} step={0.5} value={tasaAnual} onChange={(e) => setTasaAnual(Number(e.target.value))} className="w-full accent-[var(--color-forest)]" />
        </Field>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Result label="Cuota inicial" value={formatCOP(cuotaInicial)} />
        <Result label="Cuota mensual estimada" value={formatCOP(cuotaMensual)} />
        <Result label="Total a pagar" value={formatCOP(totalAPagar)} />
      </div>

      <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
        Estimación referencial, no constituye una oferta de crédito.
      </p>

      <div className="mt-10 rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-6 text-center">
        <p className="font-semibold">¿Quieres un plan completo y personalizado?</p>
        <div className="mt-4">
          <Button href="/plan-de-inversion">Crea tu plan de inversión</Button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 text-center">
      <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
