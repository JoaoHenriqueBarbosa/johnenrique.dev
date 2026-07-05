"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking/client";

// Marcos de leitura de um artigo: 25/50/75/100% do scroll do documento.
export function ReadProgressTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const marks = [25, 50, 75, 100];
    const fired = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((doc.scrollTop / scrollable) * 100));
      for (const m of marks) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("read_progress", { slug, pct: m });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
