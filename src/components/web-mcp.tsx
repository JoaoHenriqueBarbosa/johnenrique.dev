"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";
import { proof } from "@/content/en/repos";
import { track } from "@/lib/tracking/client";

type WebMCPTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (inputs: Record<string, unknown>) => Promise<string> | string;
};

type ModelContext = {
  registerTool: (tool: WebMCPTool) => void | Promise<void>;
};

type Post = {
  locale: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  url: string;
};

let postsCache: Post[] | null = null;

async function loadPosts(): Promise<Post[]> {
  if (!postsCache) {
    const res = await fetch("/posts-index.json");
    postsCache = (await res.json()) as Post[];
  }
  return postsCache;
}

export function WebMCP() {
  useEffect(() => {
    // document.modelContext is the current API; navigator.modelContext was
    // deprecated in Chrome 150 and is kept as a legacy fallback.
    const ctx = (
      "modelContext" in document
        ? (document as Document & { modelContext: ModelContext })
            .modelContext
        : "modelContext" in navigator
          ? (navigator as Navigator & { modelContext: ModelContext })
              .modelContext
          : null
    ) as ModelContext | null;
    if (!ctx || typeof ctx.registerTool !== "function") return;

    const register = async () => {
      await ctx.registerTool({
        name: "get_contact",
        description:
          "Get John Enrique's contact information: email, GitHub and LinkedIn.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: () => (
          track("webmcp_tool_call", { tool: "get_contact" }),
          [
            `Email: ${site.email}`,
            `GitHub: ${site.github}`,
            `LinkedIn: ${site.linkedin}`,
            `Website: https://johnenrique.tech`,
          ].join("\n")
        ),
      });

      await ctx.registerTool({
        name: "get_profile",
        description:
          "Get John Enrique's professional profile: role, availability, location, stack and verifiable proof of work.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: () => (
          track("webmcp_tool_call", { tool: "get_profile" }),
          [
            "Name: John Enrique (João Henrique Barbosa)",
            "Role: Senior Full-Stack Engineer — 9 years shipping web systems end to end",
            "Availability: open to senior remote roles",
            "Location: Brazil (UTC-3)",
            "Stack: TypeScript, React/Next.js, Rust, Node, PostgreSQL, AI agents",
            `Proof of work: ${proof
              .map((p) => `${p.label} — ${p.value} (${p.href})`)
              .join("; ")}`,
            "Full picture: https://johnenrique.tech/llms.txt",
          ].join("\n")
        ),
      });

      await ctx.registerTool({
        name: "search_blog_posts",
        description:
          "Search John Enrique's blog posts (one authorial story per public repository, plus general engineering writing) by keyword. Returns matching titles, descriptions and URLs.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              minLength: 1,
              description:
                "Keywords to search for, e.g. 'rust', 'layout engine', 'fiscal'",
            },
            locale: {
              type: "string",
              enum: ["en", "pt-BR"],
              default: "en",
              description: "Language of posts to search",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: true },
        execute: async (inputs) => {
          const query = String(inputs.query ?? "").toLowerCase().trim();
          const locale = inputs.locale === "pt-BR" ? "pt-BR" : "en";
          track("webmcp_tool_call", { tool: "search_blog_posts", query: query.slice(0, 80) });
          if (!query) return "Empty query.";
          const posts = await loadPosts();
          const terms = query.split(/\s+/);
          const matches = posts.filter((p) => {
            if (p.locale !== locale) return false;
            const haystack = [p.slug, p.title, p.description, ...p.keywords]
              .join(" ")
              .toLowerCase();
            return terms.some((t) => haystack.includes(t));
          });
          if (!matches.length) {
            return `No posts matched "${query}". Full list: https://johnenrique.tech/llms.txt`;
          }
          return matches
            .map((p) => `${p.title}\n${p.description}\n${p.url}`)
            .join("\n\n");
        },
      });
    };

    register().catch(() => {});
  }, []);

  return null;
}
