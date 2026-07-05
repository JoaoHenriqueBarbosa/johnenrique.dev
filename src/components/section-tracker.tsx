"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking/client";

// Dispara section_view quando uma seção com [data-section] fica 50% visível,
// uma vez por carga de página.
export function SectionTracker() {
  useEffect(() => {
    const seen = new Set<string>();
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = (entry.target as HTMLElement).dataset.section;
          if (!section || seen.has(section)) continue;
          seen.add(section);
          track("section_view", { section });
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return null;
}
