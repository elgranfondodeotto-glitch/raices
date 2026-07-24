import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Bell } from "lucide-react";

export default async function RecordatoriosPage() {
  const session = await auth();
  const recordatorios = await prisma.reminder.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  const defaults = [
    "Actualiza tus ingresos para un plan más preciso.",
    "Agenda una llamada con un asesor de Raíces.",
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Recordatorios</h1>
      <ul className="mt-6 space-y-3">
        {(recordatorios.length ? recordatorios.map((r) => r.mensaje) : defaults).map((mensaje, i) => (
          <li key={i} className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4">
            <Bell size={16} className="mt-0.5 shrink-0 text-[var(--color-forest)]" />
            <p className="text-sm">{mensaje}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
