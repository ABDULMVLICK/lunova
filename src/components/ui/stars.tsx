import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Étoiles en terracotta — jamais jaune (brand book).
 */
export function Stars({
  rating = 5,
  total = 5,
  size = 16,
  className,
}: {
  rating?: number;
  total?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${rating} étoiles sur ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={
            i < rating ? "fill-terracotta text-terracotta" : "text-stone-300"
          }
        />
      ))}
    </div>
  );
}
