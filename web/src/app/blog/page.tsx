import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, CATEGORIAS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Raíces",
  description: "Guías para invertir en Santander desde el exterior: créditos, impuestos, constructoras y más.",
};

type SearchParams = Promise<{ categoria?: string }>;

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { categoria } = await searchParams;
  const posts = categoria ? POSTS.filter((p) => p.categoria === categoria) : POSTS;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display text-4xl">Guías para invertir en Santander desde el exterior</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/blog" className={`rounded-full px-3 py-1.5 text-sm ${!categoria ? "bg-[var(--color-forest)] text-white" : "bg-[var(--color-bg-alt)]"}`}>
          Todos
        </Link>
        {CATEGORIAS.map((c) => (
          <Link key={c} href={`/blog?categoria=${encodeURIComponent(c)}`} className={`rounded-full px-3 py-1.5 text-sm ${categoria === c ? "bg-[var(--color-forest)] text-white" : "bg-[var(--color-bg-alt)]"}`}>
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-sm transition hover:shadow-md">
            <span className="rounded-full bg-[var(--color-sand)] px-2.5 py-0.5 text-xs text-[var(--color-forest)]">{p.categoria}</span>
            <h2 className="mt-3 font-semibold leading-snug">{p.titulo}</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] line-clamp-2">{p.resumen}</p>
            <p className="mt-3 text-xs text-[var(--color-text-secondary)]">{p.tiempoLectura} de lectura</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
