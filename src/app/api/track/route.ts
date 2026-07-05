import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { EVENT_NAME_SET } from "@/lib/tracking/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_EVENTS = 30;
const MAX_STR = 512;
const MAX_PROPS_BYTES = 4_000;

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora|pinterest|vkshare|whatsapp|telegram|slack|discord|headless|lighthouse|gtmetrix|pagespeed|python-requests|curl|wget|axios|node-fetch|go-http/i;

function clip(v: unknown, max = MAX_STR): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  return s ? s.slice(0, max) : null;
}

type Incoming = {
  session_id?: unknown;
  locale?: unknown;
  device?: unknown;
  events?: unknown;
};

export async function POST(req: Request) {
  let body: Incoming;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const sessionId = clip(body.session_id, 64);
  const rawEvents = Array.isArray(body.events) ? body.events : [];
  if (!sessionId || rawEvents.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const locale = body.locale === "pt-BR" ? "pt-BR" : "en";
  const device = body.device === "mobile" ? "mobile" : "desktop";
  const country = req.headers.get("x-vercel-ip-country");
  const ua = clip(req.headers.get("user-agent"), MAX_STR);
  const isBot = ua ? BOT_RE.test(ua) : false;

  const rows: unknown[][] = [];
  for (const e of rawEvents.slice(0, MAX_EVENTS)) {
    if (!e || typeof e !== "object") continue;
    const ev = e as Record<string, unknown>;
    const name = clip(ev.name, 64);
    if (!name || !EVENT_NAME_SET.has(name)) continue;

    let props: Record<string, unknown> = {};
    if (ev.props && typeof ev.props === "object") {
      const json = JSON.stringify(ev.props);
      if (json.length <= MAX_PROPS_BYTES) props = ev.props as Record<string, unknown>;
    }

    rows.push([
      name,
      sessionId,
      clip(ev.path, MAX_STR) ?? "",
      locale,
      clip(ev.referrer, MAX_STR),
      clip(ev.utm_source, 128),
      clip(ev.utm_medium, 128),
      clip(ev.utm_campaign, 128),
      device,
      country,
      ua,
      isBot,
      JSON.stringify(props),
    ]);
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: "no valid events" }, { status: 400 });
  }

  const cols = 13;
  const values: unknown[] = [];
  const tuples = rows.map((row, i) => {
    const ph = row.map((_, j) => `$${i * cols + j + 1}`);
    values.push(...row);
    return `(${ph.join(",")})`;
  });

  await pool.query(
    `INSERT INTO events
       (name, session_id, path, locale, referrer, utm_source, utm_medium, utm_campaign, device, country, ua, is_bot, props)
     VALUES ${tuples.join(",")}`,
    values
  );

  return new NextResponse(null, { status: 204 });
}
