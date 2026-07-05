"use client";

import { useEffect } from "react";
import { track } from "@/lib/tracking/client";

export function NotFoundTracker() {
  useEffect(() => {
    track("not_found", { url: window.location.pathname });
  }, []);
  return null;
}
