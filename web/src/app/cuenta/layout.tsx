import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { LayoutDashboard, Heart, Calculator, FileText, Bell, User, LogOut } from "lucide-react";

const NAV = [
  { href: "/cuenta", label: "Resumen", icon: LayoutDashboard },
  { href: "/cuenta/favoritos", label: "Favoritos", icon: Heart },
  { href: "/cuenta/simulaciones", label: "Simulaciones", icon: Calculator },
  { href: "/cuenta/documentos", label: "Documentos", icon: FileText },
  { href: "/cuenta/recordatorios", label: "Recordatorios", icon: Bell },
  { href: "/cuenta/perfil", label: "Perfil", icon: User },
];

export default async function CuentaLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="mx-auto flex max-w-7xl">
      <aside className="hidden w-56 shrink-0 p-6 md:block" style={{ background: "var(--color-navy)" }}>
        <nav className="sticky top-24 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
              <Icon size={16} /> {label}
            </Link>
          ))}
          <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
            <button type="submit" className="mt-4 flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white">
              <LogOut size={16} /> Cerrar sesión
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 px-6 py-10">
        <p className="text-sm text-[var(--color-text-secondary)]">Hola, {session.user.name}</p>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
