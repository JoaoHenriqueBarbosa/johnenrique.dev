import type { RepoItem, ProofItem } from "@/content/en/repos";

export const proof: ProofItem[] = [
  {
    label: "FinOpenPOS",
    value: "81★",
    href: "https://github.com/JoaoHenriqueBarbosa/FinOpenPOS",
  },
  {
    label: "fiscal-rs",
    value: "1.834 testes",
    href: "https://github.com/JoaoHenriqueBarbosa/fiscal-rs",
  },
  {
    label: "NestJS",
    value: "12 PRs mergeados",
    href: "https://github.com/nestjs/nest/pulls?q=is%3Apr+author%3AJoaoHenriqueBarbosa+is%3Amerged",
  },
  {
    label: "rust-agent-sdk",
    value: "793 testes",
    href: "https://github.com/JoaoHenriqueBarbosa/rust-agent-sdk",
  },
];

export const repos: RepoItem[] = [
  {
    name: "fiscal-rs",
    tier: "featured",
    tagline: "Mantenedor · toolchain Rust pra documentos fiscais (NF-e)",
    description:
      "Um port em Rust do sped-nfe (a biblioteca fiscal brasileira mais usada, 2.400+★ em PHP), publicado no crates.io e no npm — o pacote Node traz bindings nativos N-API pra sete plataformas, publicados via OIDC trusted publishing com provenance SLSA assinada. Eu reviso e mergeio as contribuições da comunidade e coordeno cada release.",
    metrics: [
      "1.834 testes · 94% cobertura",
      "11 PRs da comunidade mergeados",
      "crates.io + npm",
      "provenance SLSA",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/fiscal-rs" },
      { label: "crates.io", href: "https://crates.io/crates/fiscal" },
      { label: "npm", href: "https://www.npmjs.com/package/@fiscal-rs/node" },
      { label: "Docs", href: "https://fiscal-rs-docs.vercel.app/" },
    ],
    postSlug: "fiscal-rs",
  },
  {
    name: "FinOpenPOS",
    tier: "featured",
    tagline: "PDV open-source com módulo fiscal brasileiro completo",
    description:
      "Um PDV completo — produtos, clientes, pedidos, caixa — mais emissão de NF-e/NFC-e: motor de impostos (ICMS/PIS/COFINS/IPI), assinatura digital de XML, integração SEFAZ via mTLS, contingência. Next.js 16, React 19, tRPC v11, Drizzle e PostgreSQL embarcado via PGLite — zero dependência externa pra rodar.",
    metrics: ["81 estrelas", "54 forks", "roda com um comando"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/FinOpenPOS" },
      { label: "Demo ao vivo", href: "https://fin-open-pos.vercel.app/" },
    ],
    postSlug: "finopenpos",
  },
  {
    name: "rust-agent-sdk",
    tier: "featured",
    tagline: "Porte em Rust do claude-agent-sdk da Anthropic",
    description:
      "Dirige a CLI do Claude como subprocesso pelo protocolo stream-json, com gestão de sessão completa: fork, resume, import de transcript, sumários incrementais e um SessionStore plugável — in-memory, Postgres e Redis — todos passando a mesma suíte de conformidade, validados contra bancos reais.",
    metrics: ["793 testes", "3 backends de storage", "deps feature-gated"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/rust-agent-sdk",
      },
    ],
    postSlug: "rust-agent-sdk",
  },
  {
    name: "Contribuições upstream",
    tier: "featured",
    tagline: "PRs mergeados no core do NestJS e no sped-nfe",
    description:
      "Doze pull requests mergeados no NestJS, aprovados pelo mantenedor do framework — mais o PR #1313 no sped-nfe: 370 testes que levaram a cobertura da biblioteca PHP de 40% pra 86,5% enquanto eu a portava pra Rust.",
    metrics: ["NestJS: 12 PRs mergeados", "sped-nfe: +370 testes upstream"],
    links: [
      {
        label: "PRs no NestJS",
        href: "https://github.com/nestjs/nest/pulls?q=is%3Apr+author%3AJoaoHenriqueBarbosa+is%3Amerged",
      },
      {
        label: "sped-nfe #1313",
        href: "https://github.com/nfephp-org/sped-nfe/pull/1313",
      },
    ],
    postSlug: "upstream-contributions",
  },
  {
    name: "ccr",
    tier: "more",
    tagline: "Assistente de código IA nativo do terminal, do zero em Rust",
    metrics: ["171 testes", "8,2k LOC"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/ccr" }],
    postSlug: "ccr",
  },
  {
    name: "agent-42",
    tier: "more",
    tagline: "Agente de código mínimo — o loop, exposto",
    metrics: ["~70 linhas de lógica"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/agent-42" }],
    postSlug: "agent-42",
  },
  {
    name: "maya",
    tier: "more",
    tagline: "Reatividade fine-grained em Go/WASM — experimento concluído",
    metrics: ["149 testes", "conclusão medida"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/maya" }],
    postSlug: "maya",
  },
  {
    name: "pardal",
    tier: "more",
    tagline: "Layout engine estilo Clay que renderiza PDF, em TypeScript",
    metrics: ["npm · em produção"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/pardal" },
      { label: "npm", href: "https://www.npmjs.com/package/pardal" },
    ],
    postSlug: "pardal",
  },
  {
    name: "cobogo",
    tier: "more",
    tagline: "Layout engine agnóstico de renderer pra Rust (port do Clay)",
    metrics: ["core sem deps", "crates.io"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/cobogo" },
      { label: "crates.io", href: "https://crates.io/crates/cobogo" },
    ],
    postSlug: "cobogo",
  },
  {
    name: "MemBot",
    tier: "more",
    tagline: "App de journaling com IA — minha prova pública de LangGraph",
    metrics: ["6 estrelas", "LangGraph StateGraph"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/MemBot" },
      { label: "Demo ao vivo", href: "https://membot.vercel.app" },
    ],
    postSlug: "membot",
  },
  {
    name: "tabletop-p2p",
    tier: "more",
    tagline: "Virtual tabletop 3D low-poly, peer-to-peer, em Rust/Bevy",
    metrics: ["WebRTC · sem servidor de jogo"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/tabletop-p2p" },
    ],
    postSlug: "tabletop-p2p",
  },
  {
    name: "btkick",
    tier: "more",
    tagline: "Chuta Bluetooth teimoso até conectar — CLI + TUI Linux/BlueZ",
    metrics: ["crates.io"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/btkick" },
      { label: "crates.io", href: "https://crates.io/crates/btkick" },
    ],
    postSlug: "btkick",
  },
  {
    name: "stockprecog",
    tier: "more",
    tagline: "Estudo quant de invalidação honesta em ações da B3",
    metrics: ["DOI no Zenodo", "26 testes"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/stockprecog" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.20706701" },
    ],
    postSlug: "stockprecog",
  },
  {
    name: "physics-lab",
    tier: "more",
    tagline: "Simulações em GPU: buracos negros, Schrödinger, testes de Bell",
    metrics: ["9 simulações", "GLSL + Python"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/physics-lab" },
    ],
    postSlug: "physics-lab",
  },
  {
    name: "termo.txt",
    tier: "more",
    tagline: "Meu site pessoal em estilo terminal com um Wordle PT-BR",
    metrics: ["xterm.js · event sourcing"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/termo.txt" },
    ],
    postSlug: "termo-txt",
  },
  {
    name: "perceptrons",
    tier: "more",
    tagline: "Redes neurais do zero, desenhadas e treinadas no browser",
    metrics: ["só numpy", "frontend React"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/perceptrons" },
    ],
    postSlug: "perceptrons",
  },
  {
    name: "ijexa",
    tier: "more",
    tagline: "O toque de Ijexá sintetizado em Python puro",
    metrics: ["DSP · samples reais"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/ijexa" }],
    postSlug: "ijexa",
  },
  {
    name: "week-schedule",
    tier: "more",
    tagline: "Agenda semanal com drag and drop feito na mão",
    metrics: ["React 19 · Zustand"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/week-schedule" },
    ],
    postSlug: "week-schedule",
  },
  {
    name: "fiscal-rs-docs",
    tier: "more",
    tagline: "Site de documentação do fiscal-rs — Fumadocs, 29 páginas",
    metrics: ["21 diagramas mermaid"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/fiscal-rs-docs" },
      { label: "Site", href: "https://fiscal-rs-docs.vercel.app/" },
    ],
    postSlug: "fiscal-rs",
  },
  {
    name: "johnenrique.tech",
    tier: "more",
    tagline: "Este site — reconstruído em público",
    metrics: ["Next 16 · 100% estático"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/johnenrique.tech",
      },
    ],
    postSlug: "johnenrique-tech",
  },
  {
    name: "comprehensive-media-player",
    tier: "more",
    tagline: "Clone do Windows Media Player Legacy em Rust (Dioxus)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/comprehensive-media-player",
      },
    ],
  },
  {
    name: "alpine-kanban",
    tier: "more",
    tagline: "Kanban em Alpine.js — reatividade no simples",
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/alpine-kanban" },
    ],
  },
  {
    name: "finj",
    tier: "more",
    tagline: "Experimento em TypeScript",
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/finj" }],
  },
  {
    name: "site-cinema",
    tier: "archive",
    tagline: "Site responsivo de rede de cinema (2021)",
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/site-cinema" },
    ],
  },
  {
    name: "Simple-searchable-list",
    tier: "archive",
    tagline: "list.js + Material Design Lite (2018)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/Simple-searchable-list",
      },
    ],
  },
  {
    name: "Gerador-de-classes-php",
    tier: "archive",
    tagline: "Gerador de classes PHP (2018)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/Gerador-de-classes-php",
      },
    ],
  },
  {
    name: "TemaTransversal-Genero",
    tier: "archive",
    tagline: "Proto-fórum com opinião de especialistas e pesquisa (2018)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/TemaTransversal-Genero",
      },
    ],
  },
  {
    name: "AulaSpring",
    tier: "archive",
    tagline: "Exercícios de Spring (2018)",
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/AulaSpring" },
    ],
  },
  {
    name: "abridor-de-loot",
    tier: "archive",
    tagline: "Abridor de loot de Tibia em Pascal (2016) — onde começou",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/abridor-de-loot",
      },
    ],
  },
];
