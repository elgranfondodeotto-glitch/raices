import Link from "next/link";

const MUNICIPIOS = [
  "Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barichara",
  "San Gil", "Mesa de los Santos", "Curití", "Socorro", "Barrancabermeja",
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-lg text-[var(--color-forest)]">Raíces</h3>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Construye tu patrimonio en Santander desde cualquier lugar del mundo.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Producto</h4>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/marketplace">Marketplace</Link></li>
            <li><Link href="/plan-de-inversion">Plan de Inversión</Link></li>
            <li><Link href="/calculadora">Calculadora</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explora Santander</h4>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)]">
            {MUNICIPIOS.map((m) => (
              <li key={m}>
                <Link href={`/explora/${m.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[̀-ͯ]/g, "")}`}>
                  {m}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Compañía</h4>
          <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/aliados">Aliados</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] px-6 py-6 text-center text-xs text-[var(--color-text-secondary)]">
        © {new Date().getFullYear()} Raíces. Todos los derechos reservados.
      </div>
    </footer>
  );
}
