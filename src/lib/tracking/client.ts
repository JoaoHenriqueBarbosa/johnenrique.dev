"use client";

import type { EventName } from "./events";

// Client de tracking first-party. Sem cookies: session_id vive em sessionStorage
// (morre com a aba). Envio em batch via sendBeacon (fallback fetch keepalive).

const SESSION_KEY = "je_sid";
const ENDPOINT = "/api/track";
const FLUSH_DELAY = 800;
const MAX_BATCH = 20;

type Payload = {
  name: EventName;
  path: string;
  props?: Record<string, unknown>;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

let queue: Payload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let sessionUsed = false;

function sessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "no-storage";
  }
}

function device(): "mobile" | "desktop" {
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

function locale(): string {
  return document.documentElement.lang === "pt-BR" ? "pt-BR" : "en";
}

function utm() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
  };
}

// referrer/utm só no 1º evento da sessão (a origem da chegada)
function firstTouch() {
  if (sessionUsed) return {};
  sessionUsed = true;
  return { referrer: document.referrer || null, ...utm() };
}

function send(events: object[]): void {
  const body = JSON.stringify({
    session_id: sessionId(),
    locale: locale(),
    device: device(),
    events,
  });
  const url = ENDPOINT;
  if (navigator.sendBeacon) {
    const ok = navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
    if (ok) return;
  }
  fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
}

function flush(): void {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!queue.length) return;
  const batch = queue;
  queue = [];
  send(batch);
}

export function track(name: EventName, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  // Nunca trackear a própria dashboard.
  if (window.location.pathname.startsWith("/dashboard")) return;
  queue.push({
    name,
    path: window.location.pathname,
    props,
    ...firstTouch(),
  });
  if (queue.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (!flushTimer) flushTimer = setTimeout(flush, FLUSH_DELAY);
}

let lifecycleBound = false;

// flush garantido ao sair/ocultar a página
export function bindFlushOnHide(): void {
  if (lifecycleBound || typeof window === "undefined") return;
  lifecycleBound = true;
  const onHide = () => flush();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onHide();
  });
  window.addEventListener("pagehide", onHide);
}
