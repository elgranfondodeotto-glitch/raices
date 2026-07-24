import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkles, TrendingUp, Users } from "lucide-react";

const MUNICIPIOS = [
  { nombre: "Bucaramanga", precio: "6.200.000", nivel: "Alta" },
  { nombre: "Floridablanca", precio: "5.400.000", nivel: "Alta" },
  { nombre: "Girón", precio: "4.100.000", nivel: "Media" },
  { nombre: "Barichara", precio: "7.800.000", nivel: "Alta" },
  { nombre: "San Gil", precio: "3.900.000", nivel: "Emergente" },
];

const PASOS = [
  { n: "1", t: "Explora", d: "Conoce los 10 municipios de Santander y su potencial de inversión." },
  { n: "2", t: "Simula tu plan", d: "Responde 8 preguntas y obtén tu capacidad de compra estimada." },
  { n: "3", t: "Conecta con un aliado", d: "Constructoras, inmobiliarias y abogados verificados." },
  { n: "4", t: "Compra acompañado", d: "Todo el proceso guiado, sin importar dónde vivas." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(160deg, var(--color-navy) 0%, var(--color-forest) 55%, var(--color-forest-light) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center text-white sm:py-36">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-xs">
            <Sparkles size={14} /> Primer ecosistema de inversión inmobiliaria en Santander
          </span>
          <h1 className="font-display text-4xl font-medium leading-tight sm:text-6xl">
            Construye tu patrimonio en Santander desde cualquier lugar del mundo
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            Acompañamos a colombianos en el exterior desde la decisión de invertir hasta la firma de su propiedad, con datos reales de Santander y aliados verificados.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/plan-de-inversion" size="lg" className="bg-white text-[var(--color-forest)] hover:brightness-95">
              Crea tu plan de inversión <ArrowRight size={18} />
            </Button>
            <Button href="/marketplace" size="lg" variant="secondary" className="border-white text-white hover:bg-white/10">
              Explora oportunidades
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TrendingUp, label: "Valorización promedio", value: "8-14% anual" },
            { icon: MapPin, label: "Municipios verificados", value: "10 en Santander" },
            { icon: Users, label: "Aliados verificados", value: "Constructoras y bancos" },
            { icon: Sparkles, label: "Costo de vida", value: "Hasta 40% menor que EE. UU." },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <Icon size={20} className="text-[var(--color-forest)]" />
              <p className="mt-4 text-lg font-semibold">{value}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/por-que-santander" className="text-sm font-medium text-[var(--color-forest)] hover:underline">
            ¿Por qué invertir en Santander? →
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-3xl">Explora Santander</h2>
            <Link href="/explora" className="text-sm font-medium text-[var(--color-forest)] hover:underline">Ver los 10 municipios →</Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4">
            {MUNICIPIOS.map((m) => (
              <Link
                href={`/explora/${m.nombre.toLowerCase()}`}
                key={m.nombre}
                className="group min-w-[240px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm transition hover:shadow-md"
              >
                <div
                  className="h-36 w-full"
                  style={{ background: `linear-gradient(135deg, var(--color-forest) 0%, var(--color-navy) 100%)` }}
                />
                <div className="p-4">
                  <p className="font-semibold">{m.nombre}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">${m.precio} / m²</p>
                  <span className="mt-2 inline-block rounded-full bg-[var(--color-sand)] px-2.5 py-0.5 text-xs text-[var(--color-forest)]">
                    Valorización {m.nivel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl text-center">Cómo funciona</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p) => (
            <div key={p.n}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-semibold text-white">
                {p.n}
              </div>
              <h3 className="mt-4 font-semibold">{p.t}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20" style={{ background: "var(--color-navy)" }}>
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl">¿Listo para construir tu patrimonio?</h2>
          <p className="mt-4 text-white/80">
            En menos de 5 minutos tendrás un plan de inversión personalizado para Santander.
          </p>
          <div className="mt-8">
            <Button href="/plan-de-inversion" size="lg" className="bg-white text-[var(--color-navy)] hover:brightness-95">
              Crea tu plan de inversión gratis
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
