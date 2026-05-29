"use client";

import * as React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  /** sku + colorId, unique pour grouper les quantités */
  id: string;
  sku: string;
  name: string;
  colorId: string;
  colorLabel: string;
  /** Prix unitaire en centimes */
  price: number;
  quantity: number;
  image: string;
  alt: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;

  addItem: (item: Omit<CartItem, "id" | "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  toggle: () => void;
};

function makeId(sku: string, colorId: string) {
  return `${sku}-${colorId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (input, quantity = 1) => {
        const id = makeId(input.sku, input.colorId);
        const existing = get().items.find((it) => it.id === id);

        if (existing) {
          set({
            items: get().items.map((it) =>
              it.id === id ? { ...it, quantity: it.quantity + quantity } : it
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...get().items, { ...input, id, quantity }],
            isOpen: true,
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((it) => it.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((it) => it.id !== id) });
        } else {
          set({
            items: get().items.map((it) =>
              it.id === id ? { ...it, quantity } : it
            ),
          });
        }
      },

      clear: () => set({ items: [] }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "lunova-cart",
      storage: createJSONStorage(() => localStorage),
      // Ne persiste que les articles, pas l'état du drawer
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ----- Sélecteurs utilitaires -----

export function useCartCount() {
  return useCartStore((s) =>
    s.items.reduce((sum, it) => sum + it.quantity, 0)
  );
}

export function useCartTotal() {
  return useCartStore((s) =>
    s.items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  );
}

/**
 * Évite le flash SSR/CSR : tant que le store n'est pas hydraté
 * depuis localStorage, on retourne false.
 */
export function useCartHydrated() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(useCartStore.persist.hasHydrated());
    const unsub = useCartStore.persist.onFinishHydration(() => setHydrated(true));
    return () => unsub();
  }, []);
  return hydrated;
}
