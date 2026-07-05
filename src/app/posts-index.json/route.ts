import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { trackServer } from "@/lib/tracking/server";

export const dynamic = "force-dynamic";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech";

export async function GET(req: Request) {
  const locales = ["en", "pt-BR"] as const;
  const posts = [];

  for (const locale of locales) {
    const dir = path.join(process.cwd(), "src", "content", locale, "blog");
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const { data } = matter(await fs.readFile(path.join(dir, file), "utf8"));
      const slug = file.replace(/\.mdx$/, "");
      posts.push({
        locale,
        slug,
        title: data.title,
        description: data.description,
        keywords: data.keywords ?? [],
        url: `${BASE}${locale === "en" ? "" : "/pt-BR"}/blog/${slug}`,
      });
    }
  }

  // Pula o fetch interno do WebMCP (mesma origem); registra só acessos diretos
  // de crawlers/agentes (sem header same-origin).
  if (req.headers.get("sec-fetch-site") !== "same-origin") {
    const ua = req.headers.get("user-agent");
    trackServer("posts_index_fetch", {
      path: "/posts-index.json",
      ua,
      country: req.headers.get("x-vercel-ip-country"),
      props: { ua: ua?.slice(0, 200) ?? null },
    });
  }

  return Response.json(posts, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
