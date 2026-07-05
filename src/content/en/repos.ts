export type RepoTier = "featured" | "more" | "archive";

export type RepoItem = {
  name: string;
  tier: RepoTier;
  tagline: string;
  description?: string;
  metrics?: string[];
  links: { label: string; href: string }[];
  postSlug?: string;
};

export type ProofItem = {
  label: string;
  value: string;
  href: string;
};

export const proof: ProofItem[] = [
  {
    label: "FinOpenPOS",
    value: "81★",
    href: "https://github.com/JoaoHenriqueBarbosa/FinOpenPOS",
  },
  {
    label: "fiscal-rs",
    value: "1,834 tests",
    href: "https://github.com/JoaoHenriqueBarbosa/fiscal-rs",
  },
  {
    label: "NestJS",
    value: "12 merged PRs",
    href: "https://github.com/nestjs/nest/pulls?q=is%3Apr+author%3AJoaoHenriqueBarbosa+is%3Amerged",
  },
  {
    label: "rust-agent-sdk",
    value: "793 tests",
    href: "https://github.com/JoaoHenriqueBarbosa/rust-agent-sdk",
  },
];

export const repos: RepoItem[] = [
  {
    name: "fiscal-rs",
    tier: "featured",
    tagline: "Maintainer · Rust toolchain for Brazilian e-invoicing (NF-e)",
    description:
      "A Rust port of sped-nfe (the most-used Brazilian fiscal library, 2,400+★ in PHP), released on crates.io and npm — the Node package ships native N-API bindings for seven platforms, published via OIDC trusted publishing with signed SLSA provenance. I review and merge community contributions and coordinate every release.",
    metrics: [
      "1,834 tests · 94% coverage",
      "11 community PRs merged",
      "crates.io + npm",
      "SLSA provenance",
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
    tagline: "Open-source point of sale with a full Brazilian fiscal module",
    description:
      "A complete POS — products, customers, orders, cashier — plus NF-e/NFC-e electronic invoicing: tax engine (ICMS/PIS/COFINS/IPI), XML digital signature, SEFAZ integration over mTLS, contingency modes. Next.js 16, React 19, tRPC v11, Drizzle and embedded PostgreSQL via PGLite — zero external dependencies to run.",
    metrics: ["81 stars", "54 forks", "runs with one command"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/FinOpenPOS" },
      { label: "Live demo", href: "https://fin-open-pos.vercel.app/" },
    ],
    postSlug: "finopenpos",
  },
  {
    name: "rust-agent-sdk",
    tier: "featured",
    tagline: "Rust port of Anthropic's claude-agent-sdk",
    description:
      "Drives the Claude CLI as a subprocess over the stream-json protocol, with full session management: fork, resume, transcript import, incremental summaries, and a pluggable SessionStore — in-memory, Postgres and Redis — all passing one shared conformance suite, validated against real databases.",
    metrics: ["793 tests", "3 storage backends", "feature-gated deps"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/rust-agent-sdk",
      },
    ],
    postSlug: "rust-agent-sdk",
  },
  {
    name: "Upstream contributions",
    tier: "featured",
    tagline: "Merged PRs in NestJS core and sped-nfe",
    description:
      "Twelve pull requests merged into NestJS, approved by the framework's maintainer — plus PR #1313 into sped-nfe: 370 tests that took the PHP library's coverage from 40% to 86.5% while I ported it to Rust.",
    metrics: ["NestJS: 12 merged PRs", "sped-nfe: +370 tests upstream"],
    links: [
      {
        label: "NestJS PRs",
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
    tagline: "Terminal-native AI coding assistant, from scratch in Rust",
    metrics: ["171 tests", "8.2k LOC"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/ccr" }],
    postSlug: "ccr",
  },
  {
    name: "agent-42",
    tier: "more",
    tagline: "Minimal autonomous coding agent — the loop, exposed",
    metrics: ["~70 lines of logic"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/agent-42" }],
    postSlug: "agent-42",
  },
  {
    name: "maya",
    tier: "more",
    tagline: "Fine-grained reactivity in Go/WASM — a completed experiment",
    metrics: ["149 tests", "measured conclusion"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/maya" }],
    postSlug: "maya",
  },
  {
    name: "pardal",
    tier: "more",
    tagline: "Clay-style layout engine that renders PDFs, in TypeScript",
    metrics: ["npm · in production"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/pardal" },
      { label: "npm", href: "https://www.npmjs.com/package/pardal" },
    ],
    postSlug: "pardal",
  },
  {
    name: "cobogo",
    tier: "more",
    tagline: "Renderer-agnostic UI layout engine for Rust (Clay port)",
    metrics: ["zero-dep core", "crates.io"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/cobogo" },
      { label: "crates.io", href: "https://crates.io/crates/cobogo" },
    ],
    postSlug: "cobogo",
  },
  {
    name: "MemBot",
    tier: "more",
    tagline: "AI journaling app — my LangGraph proof in public",
    metrics: ["6 stars", "LangGraph StateGraph"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/MemBot" },
      { label: "Live demo", href: "https://membot.vercel.app" },
    ],
    postSlug: "membot",
  },
  {
    name: "tabletop-p2p",
    tier: "more",
    tagline: "3D low-poly virtual tabletop, peer-to-peer, in Rust/Bevy",
    metrics: ["WebRTC · no game server"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/tabletop-p2p" },
    ],
    postSlug: "tabletop-p2p",
  },
  {
    name: "btkick",
    tier: "more",
    tagline: "Kick flaky Bluetooth into connecting — Linux/BlueZ CLI + TUI",
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
    tagline: "Honest-invalidation quant study on B3 equities",
    metrics: ["Zenodo DOI", "26 tests"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/stockprecog" },
      { label: "DOI", href: "https://doi.org/10.5281/zenodo.20706701" },
    ],
    postSlug: "stockprecog",
  },
  {
    name: "physics-lab",
    tier: "more",
    tagline: "GPU simulations: black holes, Schrödinger, Bell tests",
    metrics: ["9 simulations", "GLSL + Python"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/physics-lab" },
    ],
    postSlug: "physics-lab",
  },
  {
    name: "termo.txt",
    tier: "more",
    tagline: "My terminal-styled personal site with a PT-BR Wordle",
    metrics: ["xterm.js · event sourcing"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/termo.txt" },
    ],
    postSlug: "termo-txt",
  },
  {
    name: "perceptrons",
    tier: "more",
    tagline: "Neural networks from scratch, drawn and trained in the browser",
    metrics: ["numpy only", "React frontend"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/perceptrons" },
    ],
    postSlug: "perceptrons",
  },
  {
    name: "ijexa",
    tier: "more",
    tagline: "The Ijexá rhythm synthesized in pure Python",
    metrics: ["DSP · real samples"],
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/ijexa" }],
    postSlug: "ijexa",
  },
  {
    name: "week-schedule",
    tier: "more",
    tagline: "Weekly scheduler with hand-rolled drag and drop",
    metrics: ["React 19 · Zustand"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/week-schedule" },
    ],
    postSlug: "week-schedule",
  },
  {
    name: "fiscal-rs-docs",
    tier: "more",
    tagline: "Documentation site for fiscal-rs — Fumadocs, 29 pages",
    metrics: ["21 mermaid diagrams"],
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/fiscal-rs-docs" },
      { label: "Site", href: "https://fiscal-rs-docs.vercel.app/" },
    ],
    postSlug: "fiscal-rs",
  },
  {
    name: "johnenrique.tech",
    tier: "more",
    tagline: "This website — rebuilt in the open",
    metrics: ["Next 16 · 100% static"],
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
    tagline: "Windows Media Player Legacy clone in Rust (Dioxus)",
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
    tagline: "Kanban board on Alpine.js — reactivity kept simple",
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/alpine-kanban" },
    ],
  },
  {
    name: "finj",
    tier: "more",
    tagline: "TypeScript experiment",
    links: [{ label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/finj" }],
  },
  {
    name: "site-cinema",
    tier: "archive",
    tagline: "Responsive cinema-chain site (2021)",
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
    tagline: "PHP class generator (2018)",
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
    tagline: "Proto-forum with expert opinions and stats (2018)",
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
    tagline: "Spring classroom exercises (2018)",
    links: [
      { label: "GitHub", href: "https://github.com/JoaoHenriqueBarbosa/AulaSpring" },
    ],
  },
  {
    name: "abridor-de-loot",
    tier: "archive",
    tagline: "Tibia loot opener in Pascal (2016) — where it started",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/JoaoHenriqueBarbosa/abridor-de-loot",
      },
    ],
  },
];
