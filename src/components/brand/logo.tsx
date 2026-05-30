import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Wordmark Lunova — "Lunova" en Playfair + croissant lunaire terracotta.
 * `luna` = lune en latin. L'accent visuel ancre le brand.
 */
export function Logo({
  className,
  size = "md",
  withMark = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  withMark?: boolean;
}) {
  const sizeClass = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl md:text-4xl",
  }[size];

  const markSize = {
    sm: 14,
    md: 18,
    lg: 24,
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-1.5 leading-none", className)}>
      <span className={cn("font-display tracking-[-0.02em] text-foreground", sizeClass)}>
        Lunova
      </span>
      {withMark && (
        <svg
          width={markSize}
          height={markSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="-mt-0.5 shrink-0"
        >
          <path
            d="M12 2a10 10 0 1 0 0 20 8 8 0 0 1 0-20z"
            fill="currentColor"
            className="text-terracotta"
          />
        </svg>
      )}
    </span>
  );
}
