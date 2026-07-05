import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import { Link } from "@/i18n/navigation";
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
import { Projects } from "@/components/home-page/projects";

type Params = Promise<{ slug: string; locale: Locale }>;

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src", "content", "en", "blog");
  const files = await fs.readdir(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function BlogPost({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const commonT = await getTranslations("common");

  const contentDir = path.join(process.cwd(), "src", "content", locale, "blog");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!filePath.endsWith(".mdx")) {
    notFound();
  }

  try {
    const file = await fs.readFile(filePath, "utf8");
    const parsed = matter(file);
    const { content, data } = parsed;
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
                  <BreadcrumbLink href="/blog">
                    {commonT("blog")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{slug}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              {data.title}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
              {data.description}
            </p>
          </div>
        </section>
        <main className="container max-w-5xl flex-1 pb-12">
          <article className="remark max-w-none">
            <MDXRemote source={content} components={{ Projects, Link }} />
          </article>
          <hr className="my-6 border-t" />
          <p className="font-mono text-xs text-muted-foreground">
            {data.author} ·{" "}
            {data.date.toLocaleDateString(locale, { timeZone: "UTC" })}
          </p>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      notFound();
    }
    console.error(`Error reading file: ${filePath}`, error);
    throw error;
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const contentDir = path.join(process.cwd(), "src", "content", locale, "blog");
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!filePath.endsWith(".mdx")) {
    return {};
  }

  try {
    const file = await fs.readFile(filePath, "utf8");
    const { data } = matter(file);

    return {
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      openGraph: {
        title: data.title,
        description: data.description,
        type: "article",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
        publishedTime: data.date.toISOString(),
        authors: [data.author],
        images: data.cover
          ? [`${process.env.NEXT_PUBLIC_SITE_URL}/${data.cover}`]
          : [`${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`],
      },
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: data.cover
          ? [`${process.env.NEXT_PUBLIC_SITE_URL}/${data.cover}`]
          : [`${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`],
      },
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return {};
    }
    console.error(`Error reading file: ${filePath}`, error);
    throw error;
  }
}
