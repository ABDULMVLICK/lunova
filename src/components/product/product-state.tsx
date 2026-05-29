"use client";

import * as React from "react";

type ProductImage = { src: string; alt: string };

type ProductState = {
  images: ProductImage[];
  colorToImageIdx: Record<string, number>;
  imageIdx: number;
  setImageIdx: (i: number) => void;
  colorId: string;
  setColorId: (id: string) => void;
};

const Ctx = React.createContext<ProductState | null>(null);

/**
 * Contexte partagé entre la galerie produit et le sélecteur de coloris.
 * Permet à un clic sur un coloris de swap l'image principale, et inversement.
 */
export function ProductStateProvider({
  images,
  colorToImageIdx,
  defaultColorId,
  children,
}: {
  images: ProductImage[];
  /** Map colorId → index dans le tableau images */
  colorToImageIdx: Record<string, number>;
  defaultColorId: string;
  children: React.ReactNode;
}) {
  const [imageIdx, setImageIdx] = React.useState(0);
  const [colorId, setColorIdState] = React.useState(defaultColorId);

  const setColorId = React.useCallback(
    (id: string) => {
      setColorIdState(id);
      const idx = colorToImageIdx[id];
      if (typeof idx === "number") setImageIdx(idx);
    },
    [colorToImageIdx]
  );

  const value = React.useMemo(
    () => ({ images, colorToImageIdx, imageIdx, setImageIdx, colorId, setColorId }),
    [images, colorToImageIdx, imageIdx, colorId, setColorId]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProductState() {
  const ctx = React.useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useProductState doit être utilisé à l'intérieur de <ProductStateProvider>"
    );
  }
  return ctx;
}
