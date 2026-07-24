import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest-light)]",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-forest)] text-white hover:brightness-110",
        secondary:
          "bg-transparent text-[var(--color-forest)] border-[1.5px] border-[var(--color-forest)] hover:bg-[var(--color-bg-alt)]",
        ghost: "bg-transparent text-[var(--color-text)] hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { href?: string };

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return <Link href={href} className={classes}>{props.children}</Link>;
  }
  return <button className={classes} {...props} />;
}
