-- Tracking events — append-only. Sem PII: session_id é aleatório por aba,
-- IP nunca é persistido (só country derivado no servidor).
CREATE TABLE IF NOT EXISTS events (
  id          BIGSERIAL PRIMARY KEY,
  ts          TIMESTAMPTZ NOT NULL DEFAULT now(),
  name        TEXT        NOT NULL,
  session_id  TEXT        NOT NULL,
  path        TEXT        NOT NULL DEFAULT '',
  locale      TEXT        NOT NULL DEFAULT 'en',
  referrer    TEXT,
  utm_source  TEXT,
  utm_medium  TEXT,
  utm_campaign TEXT,
  device      TEXT,
  country     TEXT,
  ua          TEXT,
  is_bot      BOOLEAN     NOT NULL DEFAULT false,
  props       JSONB       NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS events_ts_idx          ON events (ts DESC);
CREATE INDEX IF NOT EXISTS events_name_ts_idx     ON events (name, ts DESC);
CREATE INDEX IF NOT EXISTS events_session_idx     ON events (session_id);
CREATE INDEX IF NOT EXISTS events_ts_human_idx    ON events (ts DESC) WHERE is_bot = false;
