"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

type NavItem = { href: string; label: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Ferme le menu quand on change de route
  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-stone-100 md:hidden"
        >
          <Menu size={20} strokeWidth={1.75} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-noir/40 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-background shadow-xl outline-none"
              >
                <header className="flex items-center justify-between border-b border-border px-6 py-5">
                  <Logo size="sm" />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Fermer"
                      className="rounded-full p-1 transition-colors hover:bg-stone-100"
                    >
                      <X size={20} strokeWidth={1.75} />
                    </button>
                  </Dialog.Close>
                </header>

                <nav className="flex flex-col gap-1 px-4 py-6" aria-label="Principal">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-3 font-display text-2xl text-foreground transition-colors hover:bg-stone-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto flex flex-col gap-3 border-t border-border p-6">
                  <Button size="lg" asChild>
                    <Link href="/produit">Je veux Lunova</Link>
                  </Button>

                  <div className="flex flex-col gap-2 pt-2 text-small text-foreground-muted">
                    <a
                      href="mailto:hello@lunova.fr"
                      className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                      <Mail size={14} strokeWidth={1.5} className="text-terracotta" />
                      hello@lunova.fr
                    </a>
                    <a
                      href="tel:+33123456789"
                      className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                    >
                      <Phone size={14} strokeWidth={1.5} className="text-terracotta" />
                      Lun.–Ven. · 9 h → 18 h
                    </a>
                  </div>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
