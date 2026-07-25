"use client";

import { useState } from "react";
import { submitPlan } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAISES = ["Estados Unidos", "Canadá", "España", "Australia", "Otro país de Europa", "Otro"];
const METAS = [
  { value: "Vivienda futura", label: "Vivienda futura", d: "Un lugar para volver o vivir cuando regreses" },
  { value: "Renta", label: "Renta", d: "Ingresos pasivos por arriendo" },
  { value: "Finca", label: "Finca", d: "Un espacio de descanso o producción" },
  { value: "Patrimonio familiar", label: "Patrimonio familiar", d: "Dejar un activo para tu familia" },
];
const TIPOS = ["Apartamento", "Casa", "Lote", "Finca", "Local"];
const TIEMPOS = [
  { value: 1, label: "Menos de 1 año" },
  { value: 2, label: "1-2 años" },
  { value: 4, label: "3-5 años" },
  { value: 7, label: "5+ años" },
];

type FormState = {
  pais: string;
  edad: string;
  ingresosMensuales: string;
  ahorros: string;
  capitalDisponible: string;
  meta: string;
  tiempoAnios: string;
  tipoPropiedad: string;
};

const STEPS = ["pais", "edad", "ingresosMensuales", "ahorros", "capitalDisponible", "meta", "tiempoAnios", "tipoPropiedad"] as const;

function isStepValid(key: (typeof STEPS)[number], value: string): boolean {
  if (value === "") return false;
  if (key === "edad") {
    const n = Number(value);
    return Number.isInteger(n) && n >= 18 && n <= 90;
  }
  if (key === "ingresosMensuales" || key === "ahorros" || key === "capitalDisponible") {
    const n = Number(value);
    return Number.isFinite(n) && n >= 0;
  }
  return true;
}

export function PlanWizard({ municipio }: { municipio?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>({
    pais: "", edad: "", ingresosMensuales: "", ahorros: "", capitalDisponible: "", meta: "", tiempoAnios: "", tipoPropiedad: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const key = STEPS[step];
  const canAdvance = isStepValid(key, data[key]);
  const isLast = step === STEPS.length - 1;

  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <div className="mb-8 h-1 w-full rounded-full bg-[var(--color-border)]">
        <div
          className="h-1 rounded-full bg-[var(--color-forest-light)] transition-all"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <p className="mb-6 text-sm text-[var(--color-text-secondary)]">Paso {step + 1} de {STEPS.length}</p>

      {municipio && step === 0 && (
        <p className="mb-4 rounded-[var(--radius-sm)] bg-[var(--color-bg-alt)] px-3 py-2 text-sm text-[var(--color-forest)]">
          Simulando tu plan para {municipio}
        </p>
      )}

      <form
        action={async (formData) => {
          setError(null);
          setPending(true);
          const res = await submitPlan(formData);
          if (res?.error) {
            setError(res.error);
            setPending(false);
          }
        }}
      >
        {Object.entries(data).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}

        {step === 0 && (
          <Step title="¿Desde qué país vives actualmente?">
            <div className="grid grid-cols-2 gap-3">
              {PAISES.map((p) => (
                <SelectableCard key={p} label={p} selected={data.pais === p} onClick={() => setData({ ...data, pais: p })} />
              ))}
            </div>
          </Step>
        )}

        {step === 1 && (
          <Step title="¿Cuál es tu edad?">
            <input
              type="number" min={18} max={90} value={data.edad}
              onChange={(e) => setData({ ...data, edad: e.target.value })}
              className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-lg"
              placeholder="Ej. 35"
            />
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">Debe estar entre 18 y 90 años.</p>
          </Step>
        )}

        {step === 2 && (
          <Step title="¿Cuáles son tus ingresos mensuales aproximados (en pesos colombianos)?">
            <input
              type="number" min={0} step={100000} value={data.ingresosMensuales}
              onChange={(e) => setData({ ...data, ingresosMensuales: e.target.value })}
              className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-lg"
              placeholder="Ej. 12000000"
            />
          </Step>
        )}

        {step === 3 && (
          <Step title="¿Cuánto tienes ahorrado actualmente?">
            <input
              type="number" min={0} step={1000000} value={data.ahorros}
              onChange={(e) => setData({ ...data, ahorros: e.target.value })}
              className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-lg"
              placeholder="Ej. 40000000"
            />
          </Step>
        )}

        {step === 4 && (
          <Step title="¿Cuánto capital tienes disponible para invertir hoy?">
            <input
              type="number" min={0} step={1000000} value={data.capitalDisponible}
              onChange={(e) => setData({ ...data, capitalDisponible: e.target.value })}
              className="h-14 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-lg"
              placeholder="Ej. 20000000"
            />
          </Step>
        )}

        {step === 5 && (
          <Step title="¿Qué quieres lograr?">
            <div className="grid grid-cols-2 gap-3">
              {METAS.map((m) => (
                <SelectableCard key={m.value} label={m.label} description={m.d} selected={data.meta === m.value} onClick={() => setData({ ...data, meta: m.value })} />
              ))}
            </div>
          </Step>
        )}

        {step === 6 && (
          <Step title="¿En cuánto tiempo esperas comprar?">
            <div className="grid grid-cols-2 gap-3">
              {TIEMPOS.map((t) => (
                <SelectableCard key={t.value} label={t.label} selected={data.tiempoAnios === String(t.value)} onClick={() => setData({ ...data, tiempoAnios: String(t.value) })} />
              ))}
            </div>
          </Step>
        )}

        {step === 7 && (
          <Step title="¿Qué tipo de propiedad te interesa?">
            <div className="grid grid-cols-2 gap-3">
              {TIPOS.map((t) => (
                <SelectableCard key={t} label={t} selected={data.tipoPropiedad === t} onClick={() => setData({ ...data, tipoPropiedad: t })} />
              ))}
            </div>
          </Step>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={cn("text-sm text-[var(--color-text-secondary)]", step === 0 && "invisible")}
          >
            Atrás
          </button>

          {isLast ? (
            <div className="flex flex-col items-end gap-2">
              {error && <p className="text-sm text-[var(--color-error)]">{error}</p>}
              <Button type="submit" disabled={!canAdvance || pending}>
                {pending ? "Calculando..." : "Ver mi plan"}
              </Button>
            </div>
          ) : (
            <Button type="button" disabled={!canAdvance} onClick={() => setStep((s) => s + 1)}>
              Siguiente
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-2xl">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SelectableCard({
  label, description, selected, onClick,
}: { label: string; description?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-md)] border-2 p-4 text-left transition",
        selected ? "border-[var(--color-forest)] bg-[var(--color-sand)]" : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-forest-light)]"
      )}
    >
      <p className="font-medium">{label}</p>
      {description && <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{description}</p>}
    </button>
  );
}
