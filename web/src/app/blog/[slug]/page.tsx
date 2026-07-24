import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, POSTS } from "@/lib/blog";
import { Button } from "@/components/ui/button";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.titulo} — Raíces`, description: post.resumen };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relacionados = POSTS.filter((p) => p.categoria === post.categoria && p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <span className="rounded-full bg-[var(--color-sand)] px-2.5 py-0.5 text-xs text-[var(--color-forest)]">{post.categoria}</span>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl">{post.titulo}</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Equipo Raíces · {new Date(post.fecha).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" })} · {post.tiempoLectura} de lectura
      </p>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-[var(--color-text)]">
        {post.contenido.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="mt-12 rounded-[var(--radius-md)] bg-[var(--color-bg-alt)] p-6 text-center">
        <p className="font-semibold">¿Listo para dar el siguiente paso?</p>
        <div className="mt-4">
          <Button href="/plan-de-inversion">Crea tu plan de inversión</Button>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-xl">Artículos relacionados</h2>
          <ul className="mt-4 space-y-3">
            {relacionados.map((r) => (
              <li key={r.slug}>
                <a href={`/blog/${r.slug}`} className="text-[var(--color-forest)] hover:underline">{r.titulo}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
