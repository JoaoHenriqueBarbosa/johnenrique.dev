import { pool } from "@/lib/db";

// Todas as leituras excluem bots por padrão (is_bot=false), exceto as métricas
// de agentes de IA, que são justamente sobre não-humanos.
const HUMAN = "is_bot = false";

export type Overview = {
  sessions: number;
  pageviews: number;
  contactIntents: number;
  mobilePct: number;
  avgReadSeconds: number;
};

export async function getOverview(days: number): Promise<Overview> {
  const { rows } = await pool.query(
    `SELECT
       COUNT(DISTINCT session_id)                                         AS sessions,
       COUNT(*) FILTER (WHERE name = 'page_view')                         AS pageviews,
       COUNT(*) FILTER (WHERE name = 'contact_intent')                    AS contact_intents,
       COUNT(DISTINCT session_id) FILTER (WHERE device = 'mobile')        AS mobile_sessions,
       COALESCE(AVG((props->>'seconds')::numeric)
                FILTER (WHERE name = 'read_time'), 0)                     AS avg_read
     FROM events
     WHERE ${HUMAN} AND ts > now() - ($1 || ' days')::interval`,
    [days]
  );
  const r = rows[0];
  const sessions = Number(r.sessions);
  return {
    sessions,
    pageviews: Number(r.pageviews),
    contactIntents: Number(r.contact_intents),
    mobilePct: sessions ? Math.round((Number(r.mobile_sessions) / sessions) * 100) : 0,
    avgReadSeconds: Math.round(Number(r.avg_read)),
  };
}

export async function getDailySeries(days: number) {
  const { rows } = await pool.query(
    `SELECT
       date_trunc('day', ts)::date            AS day,
       COUNT(DISTINCT session_id)             AS sessions,
       COUNT(*) FILTER (WHERE name='page_view') AS pageviews
     FROM events
     WHERE ${HUMAN} AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY 1`,
    [days]
  );
  return rows.map((r) => ({
    day: r.day.toISOString().slice(0, 10),
    sessions: Number(r.sessions),
    pageviews: Number(r.pageviews),
  }));
}

// Funil: sessões → viu work → viu contact → contact_intent
export async function getFunnel(days: number) {
  const { rows } = await pool.query(
    `WITH s AS (
       SELECT session_id,
         bool_or(name='section_view' AND props->>'section'='work')    AS saw_work,
         bool_or(name='section_view' AND props->>'section'='contact') AS saw_contact,
         bool_or(name='contact_intent')                               AS converted
       FROM events
       WHERE ${HUMAN} AND ts > now() - ($1 || ' days')::interval
       GROUP BY session_id
     )
     SELECT
       COUNT(*)                          AS total,
       COUNT(*) FILTER (WHERE saw_work)     AS work,
       COUNT(*) FILTER (WHERE saw_contact)  AS contact,
       COUNT(*) FILTER (WHERE converted)    AS converted
     FROM s`,
    [days]
  );
  const r = rows[0];
  return {
    total: Number(r.total),
    work: Number(r.work),
    contact: Number(r.contact),
    converted: Number(r.converted),
  };
}

export async function getContactBreakdown(days: number) {
  const { rows } = await pool.query(
    `SELECT props->>'location' AS location, props->>'method' AS method, COUNT(*) AS n
     FROM events
     WHERE ${HUMAN} AND name='contact_intent'
       AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1,2 ORDER BY n DESC`,
    [days]
  );
  return rows.map((r) => ({
    location: r.location ?? "?",
    method: r.method ?? "?",
    n: Number(r.n),
  }));
}

export async function getTopProjects(days: number) {
  const { rows } = await pool.query(
    `SELECT
       COALESCE(props->>'project', props->>'label') AS project,
       COUNT(*) FILTER (WHERE name='project_click') AS clicks,
       COUNT(*) FILTER (WHERE name='story_click')   AS stories,
       COUNT(*) FILTER (WHERE name='proof_click')   AS proofs
     FROM events
     WHERE ${HUMAN} AND name IN ('project_click','story_click','proof_click')
       AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY (COUNT(*)) DESC LIMIT 20`,
    [days]
  );
  return rows.map((r) => ({
    project: r.project ?? "?",
    clicks: Number(r.clicks),
    stories: Number(r.stories),
    proofs: Number(r.proofs),
  }));
}

export async function getDimension(days: number, expr: string) {
  const { rows } = await pool.query(
    `SELECT ${expr} AS k, COUNT(DISTINCT session_id) AS n
     FROM events
     WHERE ${HUMAN} AND ts > now() - ($1 || ' days')::interval AND ${expr} IS NOT NULL
     GROUP BY 1 ORDER BY n DESC LIMIT 12`,
    [days]
  );
  return rows.map((r) => ({ k: String(r.k), n: Number(r.n) }));
}

export async function getReferrers(days: number) {
  const { rows } = await pool.query(
    `SELECT
       COALESCE(NULLIF(regexp_replace(referrer, '^https?://([^/]+).*$', '\\1'), ''), 'direct') AS host,
       COUNT(DISTINCT session_id) AS n
     FROM events
     WHERE ${HUMAN} AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY n DESC LIMIT 12`,
    [days]
  );
  return rows.map((r) => ({ host: r.host, n: Number(r.n) }));
}

export async function getBlogReads(days: number) {
  const { rows } = await pool.query(
    `SELECT
       props->>'slug' AS slug,
       COUNT(*) FILTER (WHERE (props->>'pct')::int >= 25)  AS started,
       COUNT(*) FILTER (WHERE (props->>'pct')::int >= 100) AS finished
     FROM events
     WHERE ${HUMAN} AND name='read_progress'
       AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1 ORDER BY started DESC LIMIT 20`,
    [days]
  );
  return rows.map((r) => ({
    slug: r.slug ?? "?",
    started: Number(r.started),
    finished: Number(r.finished),
  }));
}

// Agentes de IA — aqui NÃO filtramos bots (é o público-alvo)
export async function getAiAgents(days: number) {
  const { rows } = await pool.query(
    `SELECT name, props->>'tool' AS tool, COUNT(*) AS n
     FROM events
     WHERE name IN ('webmcp_tool_call','llms_txt_fetch','posts_index_fetch')
       AND ts > now() - ($1 || ' days')::interval
     GROUP BY 1,2 ORDER BY n DESC`,
    [days]
  );
  return rows.map((r) => ({
    name: r.name as string,
    tool: r.tool as string | null,
    n: Number(r.n),
  }));
}

export async function getRecent(limit = 50) {
  const { rows } = await pool.query(
    `SELECT ts, name, path, locale, device, country, is_bot, props
     FROM events ORDER BY ts DESC LIMIT $1`,
    [limit]
  );
  return rows.map((r) => ({
    ts: r.ts.toISOString(),
    name: r.name as string,
    path: r.path as string,
    locale: r.locale as string,
    device: r.device as string | null,
    country: r.country as string | null,
    isBot: r.is_bot as boolean,
    props: r.props as Record<string, unknown>,
  }));
}
