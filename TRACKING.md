# Tracking Plan — johnenrique.tech

Analytics first-party: eventos enviados a `POST /api/track`, persistidos num Postgres na VPS, visualizados em `/dashboard` (autenticada).

## Objetivo do site (norte do tracking)

O site é um portfólio de engenheiro sênior. A conversão que importa é **intenção de contato** (clicar/copiar o e-mail). Todo o resto mede o caminho até lá:

```
chegada → engajamento (work / case study / blog / proof) → intenção de contato
```

Público secundário: **agentes de IA** (WebMCP, llms.txt, posts-index) — medir se agentes estão consumindo o site é um diferencial do próprio portfólio.

## Princípios

- **Sem cookies, sem PII.** `session_id` aleatório em `sessionStorage` (morre com a aba). IP nunca é armazenado — só o país derivado (header da Vercel). LGPD-friendly, sem banner.
- **Nomes em `snake_case`**, um evento = uma intenção clara. Propriedades específicas em `props` (JSONB).
- **Envio via `navigator.sendBeacon`** (fallback `fetch keepalive`) com fila + flush — não bloqueia navegação.
- Cada evento leva o envelope comum; o servidor enriquece com `country` e `ua`.

## Envelope comum (todo evento)

| Campo | Origem | Descrição |
|---|---|---|
| `name` | client | nome do evento |
| `session_id` | client | UUID por aba (sessionStorage) |
| `path` | client | pathname atual (sem locale prefix) |
| `locale` | client | `en` \| `pt-BR` |
| `referrer` | client | `document.referrer` (só no 1º pageview da sessão) |
| `utm_source/medium/campaign` | client | da URL de chegada |
| `device` | client | `mobile` \| `desktop` (viewport < 768px) |
| `country` | server | `x-vercel-ip-country` |
| `ua` | server | user-agent bruto (p/ separar bots) |
| `props` | client | payload específico do evento |
| `ts` | server | timestamp da inserção |

## Eventos

### Navegação

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `page_view` | load + navegação SPA | — | alcance, páginas mais vistas |
| `not_found` | render da página 404 | `{ url }` | links quebrados, rotas fantasma |
| `read_time` | `pagehide` (sendBeacon) | `{ seconds }` | tempo real de atenção por página (timer pausado com aba oculta) |

### Engajamento na home

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `section_view` | seção 50% visível, 1×/pageview (IntersectionObserver) | `{ section: "work" \| "case-study" \| "contact" }` | até onde o visitante desce; etapa do funil |
| `proof_click` | clique nos links de prova do hero (estrelas, testes, PRs) | `{ label, href }` | recrutador validando as claims — sinal fortíssimo de interesse |
| `project_click` | clique em link externo de projeto (GitHub/demo/crates) | `{ project, label, tier: "featured" \| "more" \| "archive" }` | quais projetos vendem |
| `story_click` | clique em "story →" p/ post do blog | `{ slug, from: "work" \| "case-study" }` | interesse em profundidade narrativa |
| `show_more` | expandir "show all projects" | — | apetite por explorar o portfólio inteiro |

### Conversão

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `contact_intent` | clique em `mailto:` OU copiar e-mail | `{ method: "mailto" \| "copy", location: "header" \| "hero" \| "contact" \| "footer" }` | **A conversão.** `location` diz qual CTA converte |
| `outbound_click` | clique em GitHub/LinkedIn/source (não-projeto) | `{ kind: "github" \| "linkedin" \| "repo", location }` | canais paralelos de contato/validação |

### Blog

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `read_progress` | scroll atinge 25/50/75/100% do artigo, 1×/marco | `{ slug, pct }` | se os posts prendem leitura (100% = leu de verdade) |

### Idioma

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `locale_switch` | clique no switcher | `{ from, to }` | demanda real por PT vs EN |

### Agentes de IA

| Evento | Quando | `props` | Intenção que mede |
|---|---|---|---|
| `webmcp_tool_call` | agente chama tool WebMCP no browser | `{ tool, query? }` | agentes de IA usando o site como fonte |
| `llms_txt_fetch` | **server-side** no route handler de `/llms.txt` | `{ ua }` | crawlers/agentes lendo o resumo |
| `posts_index_fetch` | **server-side** em `/posts-index.json` (exceto fetch interno do WebMCP) | `{ ua }` | idem |

## O que NÃO rastrear (decidido)

- Movimentos de mouse, heatmaps, session replay — invasivo e sem pergunta a responder.
- Cliques em navegação interna do header (page_view já cobre o destino).
- Identidade persistente entre sessões (fingerprinting) — retorno de visitante não vale o custo de privacidade.

## Dashboard (`/dashboard`, autenticada por senha → cookie HMAC)

- **Visão geral**: sessões e pageviews por dia (30d), % mobile, países, locales, top referrers/UTM.
- **Funil**: sessões → viu `work` → viu `contact` → `contact_intent` (com taxa de cada etapa).
- **Conversão**: `contact_intent` por método e por `location` (qual CTA trabalha).
- **Projetos**: ranking por `project_click` + `story_click` + `proof_click`.
- **Blog**: leitura por post (marcos de progresso, tempo médio via `read_time`).
- **Agentes de IA**: chamadas WebMCP por tool, fetches de llms.txt/posts-index por UA.
- **Live**: últimos 50 eventos crus.

## Infra

- **Postgres**: VPS (Dokploy, `postgres:18`), porta externa dedicada, database `tracking`. Tabela única `events` (append-only) + índices por `ts`, `(name, ts)`, `session_id`. Agregação em SQL na leitura — volume de portfólio não justifica rollups.
- **Escrita**: `/api/track` aceita batch (`{ events: [...] }`), valida nome contra a lista deste plano, limita tamanhos, responde 204. Runtime Node (pg via TCP).
- **Env**: `TRACKING_DATABASE_URL` (Vercel + local), `DASHBOARD_PASSWORD` + `DASHBOARD_SECRET` (HMAC do cookie).
