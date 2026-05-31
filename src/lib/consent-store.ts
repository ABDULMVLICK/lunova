"use client";

import * as React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ConsentCategories = {
  essential: true;          // toujours requis pour le fonctionnement
  analytics: boolean;       // mesure d'audience anonymisée
  marketing: boolean;       // pixels Meta / TikTok pour pubs
};

type ConsentState = {
  decided: boolean;         // l'utilisatrice a-t-elle déjà répondu
  categories: ConsentCategories;
  setAll: (accept: boolean) => void;
  setCategories: (c: Partial<ConsentCategories>) => void;
  reset: () => void;
};

const DEFAULT: ConsentCategories = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      decided: false,
      categories: DEFAULT,
      setAll: (accept) =>
        set({
          decided: true,
          categories: { essential: true, analytics: accept, marketing: accept },
        }),
      setCategories: (c) =>
        set((s) => ({
          decided: true,
          categories: { ...s.categories, ...c, essential: true },
        })),
      reset: () => set({ decided: false, categories: DEFAULT }),
    }),
    {
      name: "lunova-consent",
      storage: createJSONStorage(() => localStorage),
      // Conservation 13 mois max (CNIL)
      version: 1,
    }
  )
);

/**
 * Évite le flash SSR/CSR.
 */
export function useConsentHydrated() {
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(useConsentStore.persist.hasHydrated());
    const unsub = useConsentStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );
    return () => unsub();
  }, []);
  return hydrated;
}
