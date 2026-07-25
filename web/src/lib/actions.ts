"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth, signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { calcularPlan, type PlanInput } from "@/lib/plan";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", { email, password, redirectTo: "/cuenta" });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Correo o contraseña incorrectos." };
    }
    throw err;
  }
}

const registerSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  paisResidencia: z.string().min(2),
});

export async function registerUser(formData: FormData) {
  const parsed = registerSchema.safeParse({
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    password: formData.get("password"),
    paisResidencia: formData.get("paisResidencia"),
  });
  if (!parsed.success) {
    return { error: "Revisa los datos del formulario." };
  }
  const { nombre, email, password, paisResidencia } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { nombre, email, passwordHash, paisResidencia },
  });

  await signIn("credentials", { email, password, redirectTo: "/cuenta" });
}

const planSchema = z.object({
  pais: z.string().min(2),
  edad: z.coerce.number().int().min(18).max(90),
  ingresosMensuales: z.coerce.number().int().min(0),
  ahorros: z.coerce.number().int().min(0),
  capitalDisponible: z.coerce.number().int().min(0),
  meta: z.string().min(2),
  tiempoAnios: z.coerce.number().int().min(1).max(20),
  tipoPropiedad: z.string().min(2),
});

export async function submitPlan(formData: FormData) {
  const parsed = planSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Revisa las respuestas del cuestionario." };
  }

  const input: PlanInput = parsed.data;
  const resultado = calcularPlan(input);

  const session = await auth();

  const plan = await prisma.investmentPlan.create({
    data: {
      ...input,
      userId: session?.user?.id,
      cuotaInicialEstimada: resultado.cuotaInicialEstimada,
      capacidadCompra: resultado.capacidadCompra,
      ahorroMensualSugerido: resultado.ahorroMensualSugerido,
      mesesParaMeta: resultado.mesesParaMeta,
    },
  });

  redirect(`/plan-de-inversion/resultado/${plan.id}`);
}

export async function toggleFavorite(propertyId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "no-auth" as const };
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_propertyId: { userId: session.user.id, propertyId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return { favorited: false };
  }

  await prisma.favorite.create({ data: { userId: session.user.id, propertyId } });
  return { favorited: true };
}

const leadSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(5),
  mensaje: z.string().min(3),
  origen: z.string(),
  allyId: z.string().optional(),
  propertyId: z.string().optional(),
});

export async function submitLead(formData: FormData) {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Revisa los datos del formulario de contacto." };
  }
  const session = await auth();

  await prisma.lead.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id,
    },
  });

  return { success: true };
}
