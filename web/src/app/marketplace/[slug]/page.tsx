import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formatCOP } from "@/lib/utils";
import { FavoriteButton } from "@/components/favorite-button";
import { LeadForm } from "@/components/lead-form";
import { PropertyCard } from "@/components/property-card";
import { ShieldCheck } from "lucide-react";

type Params = Promise<{ slug: string }>;

async function getProperty(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: { municipality: true, ally: true },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return {};
  return { title: `${p.titulo} — ${p.municipality.nombre} | Raíces`, description: p.descripcion };
}

export default async function PropertyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const [session, similares] = await Promise.all([
    auth(),
    prisma.property.findMany({
      where: { municipioId: property.municipioId, id: { not: property.id } },
      include: { municipality: true },
      take: 3,
    }),
  ]);

  let isFavorited = false;
  if (session?.user?.id) {
    const fav = await prisma.favorite.findUnique({
      where: { userId_propertyId: { userId: session.user.id, propertyId: property.id } },
    });
    isFavorited = !!fav;
  }

  const amenidades = property.amenidades.split(",");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.titulo,
    description: property.descripcion,
    url: `https://raices.com/marketplace/${property.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.municipality.nombre,
      addressRegion: "Santander",
      addressCountry: "CO",
    },
    offers: {
      "@type": "Offer",
      price: property.precioDesde,
      priceCurrency: "COP",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="h-72 w-full rounded-[var(--radius-lg)]" style={{ background: "linear-gradient(135deg, var(--color-forest) 0%, var(--color-navy) 100%)" }} />

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {property.verificado && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-bg-alt)] px-2.5 py-1 text-xs font-medium text-[var(--color-forest)]">
                <ShieldCheck size={12} /> Verificado
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-3xl">{property.titulo}</h1>
          <Link href={`/explora/${property.municipality.slug}`} className="text-[var(--color-text-secondary)] hover:underline">
            {property.municipality.nombre}
          </Link>
        </div>
        <FavoriteButton propertyId={property.id} initialFavorited={isFavorited} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-6 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ["Precio desde", formatCOP(property.precioDesde)],
          ["Área", `${property.areaM2} m²`],
          ["Tipo", property.tipo],
          ["Estado", property.estadoProyecto],
          ["Rentabilidad est.", `${property.rentabilidadEstimada}%`],
          ["Entrega", property.entrega],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
            <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl">Descripción</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">{property.descripcion}</p>

          <h2 className="mt-10 font-display text-2xl">Características</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {amenidades.map((a) => (
              <span key={a} className="rounded-full bg-[var(--color-bg-alt)] px-3 py-1 text-sm">{a}</span>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl">Aliado responsable</h2>
          <Link href={`/aliados/${property.ally.slug}`} className="mt-3 flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 hover:shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-forest)] font-display text-lg text-white">
              {property.ally.logoInitial}
            </div>
            <div>
              <p className="font-semibold">{property.ally.nombre}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{property.ally.categoria}</p>
            </div>
          </Link>
        </div>

        <div>
          <div className="sticky top-24 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
            <p className="font-semibold">Habla con el aliado</p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Te contactamos coordinando el horario de tu zona.</p>
            <div className="mt-4">
              <LeadForm origen="ficha" allyId={property.allyId} propertyId={property.id} ctaLabel="Hablar con el aliado" />
            </div>
          </div>
        </div>
      </div>

      {similares.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl">Proyectos similares</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {similares.map((p) => (
              <PropertyCard key={p.id} {...p} municipioNombre={p.municipality.nombre} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
