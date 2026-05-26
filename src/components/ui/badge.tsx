import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "badge-lunova rounded-full px-3 py-1.5",
  {
    variants: {
      variant: {
        default: "bg-terracotta-soft text-terracotta-deep",
        outline: "border border-noir/80 text-noir",
        peche: "bg-peche text-noir",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
