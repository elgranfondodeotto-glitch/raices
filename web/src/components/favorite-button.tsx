"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function FavoriteButton({ propertyId, initialFavorited }: { propertyId: string; initialFavorited: boolean }) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      aria-label="Agregar a favoritos"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const res = await toggleFavorite(propertyId);
          if (res.error === "no-auth") {
            router.push("/login");
            return;
          }
          if ("favorited" in res) setFavorited(res.favorited);
        });
      }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border transition",
        favorited
          ? "border-[var(--color-error)] bg-[var(--color-error)]/10 text-[var(--color-error)]"
          : "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-error)]"
      )}
    >
      <Heart size={16} fill={favorited ? "currentColor" : "none"} />
    </button>
  );
}
