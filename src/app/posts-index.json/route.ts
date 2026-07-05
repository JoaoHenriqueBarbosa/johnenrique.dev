import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech";

export async function GET() {
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

  return Response.json(posts);
}
