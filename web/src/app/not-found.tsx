import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl text-[var(--color-forest)]">404</p>
      <h1 className="mt-4 font-display text-2xl">No encontramos esta página</h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Puede que el enlace esté roto o que la página se haya movido.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Volver al inicio</Button>
        <Button href="/marketplace" variant="secondary">Ver marketplace</Button>
      </div>
    </div>
  );
}
