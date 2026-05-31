"use client";

import { useConsentStore } from "@/lib/consent-store";

export function ResetConsentButton({ children }: { children: React.ReactNode }) {
  const reset = useConsentStore((s) => s.reset);
  return (
    <button
      type="button"
      onClick={reset}
      className="text-link underline underline-offset-2"
    >
      {children}
    </button>
  );
}
