// Contrato de eventos — fonte única compartilhada entre client e API.
// Alterou aqui? Atualize TRACKING.md também.

export const EVENT_NAMES = [
  "page_view",
  "not_found",
  "read_time",
  "section_view",
  "proof_click",
  "project_click",
  "story_click",
  "show_more",
  "contact_intent",
  "outbound_click",
  "read_progress",
  "locale_switch",
  "webmcp_tool_call",
  "llms_txt_fetch",
  "posts_index_fetch",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export const EVENT_NAME_SET: ReadonlySet<string> = new Set(EVENT_NAMES);

export type TrackEvent = {
  name: EventName;
  session_id: string;
  path: string;
  locale: string;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  device?: "mobile" | "desktop";
  props?: Record<string, unknown>;
  // preenchido pela API a partir de req.url quando o evento é server-side
  ts?: string;
};
