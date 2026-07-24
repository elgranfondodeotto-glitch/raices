import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileText } from "lucide-react";

export default async function DocumentosPage() {
  const session = await auth();
  const documentos = await prisma.document.findMany({ where: { userId: session!.user.id } });

  return (
    <div>
      <h1 className="font-display text-2xl">Tus documentos</h1>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Guarda aquí los documentos relacionados a tu proceso de compra.</p>

      {documentos.length === 0 ? (
        <div className="mt-6 flex flex-col items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-12 text-center">
          <FileText size={28} className="text-[var(--color-text-secondary)]" />
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">Aún no tienes documentos guardados.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {documentos.map((d) => (
            <li key={d.id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
              <FileText size={16} className="text-[var(--color-forest)]" /> {d.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
