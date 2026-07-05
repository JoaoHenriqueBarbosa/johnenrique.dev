import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech";

function entry(
  enPath: string,
  lastModified?: Date
): MetadataRoute.Sitemap[number][] {
  const ptPath = `/pt-BR${enPath === "/" ? "" : enPath}`;
  const languages = {
    "en": `${BASE}${enPath}`,
    "pt-BR": `${BASE}${ptPath}`,
  };
  return [
    { url: `${BASE}${enPath}`, lastModified, alternates: { languages } },
    { url: `${BASE}${ptPath}`, lastModified, alternates: { languages } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogDir = path.join(process.cwd(), "src", "content", "en", "blog");
  const files = await fs.readdir(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  return [
    ...entry("/"),
    ...entry("/about"),
    ...entry("/blog"),
    ...posts.flatMap((slug) => entry(`/blog/${slug}`)),
  ];
}
