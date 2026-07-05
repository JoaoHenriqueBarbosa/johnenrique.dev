import { pool } from "@/lib/db";
import type { EventName } from "./events";

// Insert direto de um evento server-side (fetch de llms.txt, posts-index, etc).
// Nunca lança para não derrubar a resposta principal.
export async function trackServer(
  name: EventName,
  opts: {
    path?: string;
    ua?: string | null;
    country?: string | null;
    props?: Record<string, unknown>;
  } = {}
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO events (name, session_id, path, is_bot, ua, country, props)
       VALUES ($1, $2, $3, true, $4, $5, $6)`,
      [
        name,
        "server",
        opts.path ?? "",
        opts.ua?.slice(0, 512) ?? null,
        opts.country ?? null,
        JSON.stringify(opts.props ?? {}),
      ]
    );
  } catch {
    // swallow — analytics não pode quebrar a rota
  }
}
