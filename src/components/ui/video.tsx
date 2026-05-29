"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Vidéo Lunova — autoplay silencieuse en boucle, sans contrôles.
 * Respecte prefers-reduced-motion (affiche le poster seulement).
 * Usage typique : hero, démo produit.
 */
type VideoProps = {
  /** URL de la vidéo (mp4 de préférence, ou webm). Placer dans /public/. */
  src: string;
  /** URL d’une image affichée avant le premier frame et si reduced-motion. */
  poster?: string;
  /** Description courte pour l’accessibilité. */
  alt?: string;
  /** Coupe les coins. */
  className?: string;
  /** Autoplay (par défaut true). */
  autoPlay?: boolean;
  /** Boucle (par défaut true). */
  loop?: boolean;
};

export function Video({
  src,
  poster,
  alt,
  className,
  autoPlay = true,
  loop = true,
}: VideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) v.pause();
    else if (autoPlay) void v.play().catch(() => {});
  }, [reduced, autoPlay]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={poster}
      autoPlay={autoPlay && !reduced}
      loop={loop}
      muted
      playsInline
      preload="metadata"
      aria-label={alt}
    >
      <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}
