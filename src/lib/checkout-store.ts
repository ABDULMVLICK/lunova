"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ShippingInfo = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
};

export type PaymentInfo = {
  cardName: string;
  cardLast4: string;        // 4 derniers chiffres masqués (demo)
  expiry: string;           // MM/YY
};

type CheckoutState = {
  shipping: ShippingInfo | null;
  payment: PaymentInfo | null;
  orderId: string | null;

  setShipping: (s: ShippingInfo) => void;
  setPayment: (p: PaymentInfo) => void;
  setOrderId: (id: string) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: null,
      payment: null,
      orderId: null,

      setShipping: (s) => set({ shipping: s }),
      setPayment: (p) => set({ payment: p }),
      setOrderId: (id) => set({ orderId: id }),
      reset: () => set({ shipping: null, payment: null, orderId: null }),
    }),
    {
      name: "lunova-checkout",
      // sessionStorage : se vide quand l'onglet est fermé — privacy par défaut
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export function generateOrderId() {
  // Format LNV-AAMMJJ-XXXX
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LNV-${yy}${mm}${dd}-${rand}`;
}
