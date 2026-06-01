import Image from "next/image";
import { HeatRipple } from "@/components/motion/heat-ripple";
import { Video } from "@/components/ui/video";
import { cn } from "@/lib/utils";

/**
 * Visuel produit Lunova — carré, fond ivoire, ondes de chaleur autour.
 *
 * Trois modes (par ordre de priorité) :
 * 1. video : si `video` fourni, lit la vidéo en boucle silencieuse.
 * 2. image : si `image` fourni, affiche une photo optimisée (next/image).
 * 3. fallback : la lettre L stylisée Playfair.
 *
 * Le HeatRipple est superposé dans tous les cas — métaphore visuelle
 * de la chaleur ciblée du produit.
 */
type ProductVisualProps = {
  image?: { src: string; alt: string };
  video?: { src: string; poster?: string; alt?: string };
  ripple?: boolean;
  aspect?: "square" | "landscape" | "portrait";
  className?: string;
  priority?: boolean;
};

const ASPECT_CLASS = {
  square: "aspect-square",
  landscape: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
} as const;

export function ProductVisual({
  image,
  video,
  ripple = true,
  aspect = "square",
  className,
  priority = false,
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-surface shadow-lg ring-1 ring-border/60",
        ASPECT_CLASS[aspect],
        className
      )}
    >
      {video ? (
        <Video src={video.src} poster={video.poster} alt={video.alt} />
      ) : image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-8xl text-stone-200">L</span>
        </div>
      )}

      {ripple && <HeatRipple />}
    </div>
  );
}
