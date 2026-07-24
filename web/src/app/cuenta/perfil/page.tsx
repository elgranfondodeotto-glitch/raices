import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PerfilPage() {
  const session = await auth();
  const user = await prisma.user.findUnique({ where: { id: session!.user.id } });

  return (
    <div>
      <h1 className="font-display text-2xl">Tu perfil</h1>
      <div className="mt-6 max-w-md space-y-4">
        <Field label="Nombre" value={user?.nombre ?? ""} />
        <Field label="Correo" value={user?.email ?? ""} />
        <Field label="País de residencia" value={user?.paisResidencia ?? ""} />
        <Field label="Miembro desde" value={user ? new Date(user.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" }) : ""} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
