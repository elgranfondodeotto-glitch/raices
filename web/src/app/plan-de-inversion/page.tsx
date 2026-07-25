import type { Metadata } from "next";
import { PlanWizard } from "@/components/plan-wizard";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Plan de Inversión — Raíces",
  description: "Responde 8 preguntas y descubre tu capacidad de compra estimada en Santander.",
};

type SearchParams = Promise<{ municipio?: string }>;

export default async function PlanDeInversionPage({ searchParams }: { searchParams: SearchParams }) {
  const { municipio } = await searchParams;

  const municipioNombre = municipio
    ? (await prisma.municipality.findUnique({ where: { slug: municipio }, select: { nombre: true } }))?.nombre
    : undefined;

  return <PlanWizard municipio={municipioNombre} />;
}
