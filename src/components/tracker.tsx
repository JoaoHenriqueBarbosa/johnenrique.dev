"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track, bindFlushOnHide } from "@/lib/tracking/client";
import type { EventName } from "@/lib/tracking/events";

// Cliques delegados: qualquer elemento com data-track="<event>" dispara track()
// com as props derivadas dos data-tp-* (data-tp-foo="bar" => props.foo="bar").
function handleDelegatedClick(e: MouseEvent) {
  const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
  if (!el) return;
  const name = el.dataset.track as EventName;
  if (!name) return;
  const props: Record<string, string> = {};
  for (const [k, v] of Object.entries(el.dataset)) {
    if (k.startsWith("tp") && v != null) {
      const key = k.slice(2, 3).toLowerCase() + k.slice(3);
      props[key] = v;
    }
  }
  track(name, Object.keys(props).length ? props : undefined);
}

export function Tracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const enterTs = useRef<number>(0);

  // page_view por rota + read_time da rota anterior
  useEffect(() => {
    bindFlushOnHide();
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    enterTs.current = Date.now();
    track("page_view");
  }, [pathname]);

  // read_time: acumula só tempo com aba visível, envia no pagehide
  useEffect(() => {
    let visibleSince = document.visibilityState === "visible" ? Date.now() : 0;
    let acc = 0;

    const onVis = () => {
      if (document.visibilityState === "visible") {
        visibleSince = Date.now();
      } else if (visibleSince) {
        acc += Date.now() - visibleSince;
        visibleSince = 0;
      }
    };
    const onHide = () => {
      if (visibleSince) {
        acc += Date.now() - visibleSince;
        visibleSince = 0;
      }
      const seconds = Math.round(acc / 1000);
      if (seconds >= 2) track("read_time", { seconds });
      acc = 0;
    };

    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", onHide);
    };
  }, [pathname]);

  // cliques delegados
  useEffect(() => {
    document.addEventListener("click", handleDelegatedClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleDelegatedClick, { capture: true });
  }, []);

  return null;
}
