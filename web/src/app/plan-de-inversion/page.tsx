import type { Metadata } from "next";
import { PlanWizard } from "@/components/plan-wizard";

export const metadata: Metadata = {
  title: "Plan de Inversión — Raíces",
  description: "Responde 8 preguntas y descubre tu capacidad de compra estimada en Santander.",
};

type SearchParams = Promise<{ municipio?: string }>;

export default async function PlanDeInversionPage({ searchParams }: { searchParams: SearchParams }) {
  const { municipio } = await searchParams;
  return <PlanWizard municipio={municipio} />;
}
