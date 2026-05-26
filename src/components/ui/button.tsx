import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Bouton Lunova — 3 niveaux selon le brand book.
 * - primary   : fond terracotta, texte blanc (CTA, un seul par section)
 * - secondary : transparent, bordure noire fine
 * - link      : texte terracotta-deep souligné
 *
 * Le texte du bouton primary est en semibold + size base
 * pour qualifier "large text" WCAG (3:1 suffit alors).
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans font-medium",
    "transition-all duration-[var(--duration-base)] ease-[var(--ease-out)]",
    "focus-visible:outline-none focus-visible:[box-shadow:var(--shadow-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-terracotta text-blanc font-semibold",
          "rounded-full shadow-sm",
          "hover:bg-terracotta-hover hover:shadow-md hover:-translate-y-[1px]",
          "active:bg-terracotta-active active:translate-y-0 active:shadow-sm",
        ],
        secondary: [
          "bg-transparent text-noir border border-noir/80",
          "rounded-full",
          "hover:bg-noir hover:text-blanc",
          "active:bg-stone-700",
        ],
        link: [
          "text-terracotta-deep underline underline-offset-4 decoration-1",
          "px-0 h-auto rounded-xs",
          "hover:decoration-2",
        ],
      },
      size: {
        sm: "h-9 px-4 text-small",
        md: "h-11 px-6 text-body",
        lg: "h-14 px-8 text-body",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto px-0" },
      { variant: "link", size: "md", class: "h-auto px-0" },
      { variant: "link", size: "lg", class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
