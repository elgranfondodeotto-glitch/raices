"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/explora", label: "Explora" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/plan-de-inversion", label: "Plan de Inversión" },
  { href: "/blog", label: "Blog" },
  { href: "/aliados", label: "Aliados" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)]"
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 shadow-md">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)]"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
