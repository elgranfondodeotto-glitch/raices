import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/explora", label: "Explora" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/plan-de-inversion", label: "Plan de Inversión", highlight: true },
  { href: "/blog", label: "Blog" },
  { href: "/aliados", label: "Aliados" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-xl font-medium text-[var(--color-forest)]">
          Raíces
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.highlight
                  ? "rounded-[var(--radius-sm)] bg-[var(--color-forest)] px-4 py-2 text-sm font-medium text-white hover:brightness-110"
                  : "text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login" className="hidden text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] sm:block">
            Ingresar
          </Link>
          <Button href="/registro" size="sm">Crear cuenta</Button>
        </div>
      </div>
    </header>
  );
}
