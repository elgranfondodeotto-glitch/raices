import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { POSTS } from "@/lib/blog";

const BASE_URL = "https://raices.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [municipios, properties, aliados] = await Promise.all([
    prisma.municipality.findMany({ select: { slug: true } }),
    prisma.property.findMany({ select: { slug: true } }),
    prisma.ally.findMany({ select: { slug: true } }),
  ]);

  const staticRoutes = [
    "", "/por-que-santander", "/explora", "/marketplace", "/plan-de-inversion",
    "/calculadora", "/blog", "/aliados", "/sobre-nosotros", "/contacto",
  ].map((path) => ({ url: `${BASE_URL}${path}`, lastModified: new Date() }));

  const municipioRoutes = municipios.map((m) => ({ url: `${BASE_URL}/explora/${m.slug}`, lastModified: new Date() }));
  const propertyRoutes = properties.map((p) => ({ url: `${BASE_URL}/marketplace/${p.slug}`, lastModified: new Date() }));
  const allyRoutes = aliados.map((a) => ({ url: `${BASE_URL}/aliados/${a.slug}`, lastModified: new Date() }));
  const blogRoutes = POSTS.map((p) => ({ url: `${BASE_URL}/blog/${p.slug}`, lastModified: new Date(p.fecha) }));

  return [...staticRoutes, ...municipioRoutes, ...propertyRoutes, ...allyRoutes, ...blogRoutes];
}
