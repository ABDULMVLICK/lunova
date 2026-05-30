"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Truck, Clock, RotateCcw } from "lucide-react";

const MESSAGES = [
  { Icon: Truck, text: "Livraison offerte en 2 à 4 jours" },
  { Icon: Clock, text: "Expédiée sous 24 h ouvrées" },
  { Icon: RotateCcw, text: "Premier cycle ou remboursée — sans question" },
];

/**
 * Bandeau noir au-dessus du header, rotation de 3 messages toutes les 5 s.
 * Pas de fake urgency — uniquement des promesses concrètes.
 */
export function AnnouncementBar() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const { Icon, text } = MESSAGES[idx];

  return (
    <div className="relative overflow-hidden bg-noir text-blanc">
      <div className="container-lunova flex h-9 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.04em]"
          >
            <Icon size={13} strokeWidth={1.75} className="text-terracotta" />
            {text}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
