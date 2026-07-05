import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { repos, proof } from "@/content/en/repos";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech";

export const dynamic = "force-static";

export async function GET() {
  const blogDir = path.join(process.cwd(), "src", "content", "en", "blog");
  const files = await fs.readdir(blogDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const { data } = matter(
          await fs.readFile(path.join(blogDir, file), "utf8")
        );
        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title as string,
          description: data.description as string,
        };
      })
  );
  posts.sort((a, b) => a.title.localeCompare(b.title));

  const featured = repos.filter((r) => r.tier === "featured");
  const more = repos.filter((r) => r.tier === "more");

  const lines = [
    "# John Enrique — Senior Full-Stack Engineer",
    "",
    "> Personal site of John Enrique (João Henrique Barbosa, github.com/JoaoHenriqueBarbosa), a senior full-stack engineer in Brazil (UTC-3) open to senior remote roles. Nine years shipping web systems — TypeScript/Next.js, Rust and AI agent tooling. Every number on the site links to its public source; claims are verified against code before publishing.",
    "",
    `Proof of work: ${proof.map((p) => `${p.label} (${p.value})`).join(" · ")}.`,
    "",
    "The site is bilingual: English at the root, Brazilian Portuguese under /pt-BR.",
    "",
    "## Selected work",
    "",
    ...featured.map(
      (r) =>
        `- [${r.name}](${r.postSlug ? `${BASE}/blog/${r.postSlug}` : r.links[0].href}): ${r.tagline}. ${r.description ?? ""}`.trimEnd()
    ),
    "",
    "## Blog",
    "",
    ...posts.map(
      (p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.description}`
    ),
    "",
    "## All public repositories",
    "",
    ...more.map(
      (r) => `- [${r.name}](${r.links[0].href}): ${r.tagline}`
    ),
    "",
    "## Contact",
    "",
    "- Email: joaohenriquebarbosa21@gmail.com",
    "- GitHub: https://github.com/JoaoHenriqueBarbosa",
    "- LinkedIn: https://www.linkedin.com/in/john-enrique/",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
