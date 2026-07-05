import { promises as fs } from "fs";
import path from "path";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import { Header } from "@/components/home-page/header";
import { Footer } from "@/components/home-page/footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import matter from "gray-matter";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
}

async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), "src", "content", locale, "blog");
  const files = await fs.readdir(contentDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const parsed = matter(
          await fs.readFile(path.join(contentDir, file), "utf8")
        );

        return {
          slug: file.replace(/\.mdx$/, ""),
          ...parsed.data,
        } as BlogPost;
      })
  );
  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime() ||
      a.title.localeCompare(b.title)
  );
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogPage");
  const commonT = await getTranslations("common");
  const blogPosts = await getBlogPosts(locale);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <section className="border-b">
        <div className="container max-w-5xl pt-28 pb-10 md:pt-32">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{commonT("home")}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("blogTitle")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            {t("blogTitle")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
            {t("blogDescription")}
          </p>
        </div>
      </section>
      <main className="container max-w-5xl flex-1 py-10">
        <ul className="grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <li
              key={post.slug}
              className="rounded-lg border bg-card transition-colors hover:border-input"
            >
              <Link
                href={{
                  pathname: "/blog/[slug]",
                  params: { slug: post.slug },
                }}
                className="block p-6"
              >
                <h2 className="text-lg font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <p className="mt-3 font-mono text-xs text-primary">
                  {commonT("readMore")} →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return {
    title: t("blogTitle"),
    description: t("blogDescription"),
  };
}
