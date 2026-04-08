import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-primary-100 text-primary-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  destructive: "bg-red-100 text-red-800",
  outline: "border border-border text-foreground bg-transparent",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
