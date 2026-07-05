import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "next-intl";
import matter from "gray-matter";
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
import Image from "next/image";

type Params = Promise<{ slug: string; locale: Locale }>;

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src", "content", "en");
  const files = await fs.readdir(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const contentDir = path.join(process.cwd(), "src", "content", locale);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  const t = await getTranslations("common");

  if (!filePath.endsWith(".mdx")) {
    notFound();
  }

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(source);
    return (
      <div className="flex flex-col min-h-dvh relative">
        <Header />
        <section className="relative w-full">
          <Image
            src="/holo-2.webp"
            alt="Hero Image"
            width={1120}
            height={630}
            quality={100}
            className="w-full object-cover object-center h-[350px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-10% to-60% from-muted/100 to-muted/0" />
          <div className="absolute inset-0 flex flex-col px-4 justify-center">
            <div className="container mx-auto">
              <div className="h-[98px]"></div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{slug}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-3xl mt-4 font-bold tracking-tight text-black md:text-5xl drop-shadow-xl">
                {data.title}
              </h1>
              <p className="mt-4 text-black md:text-xl drop-shadow-xl">
                {data.description}
              </p>
            </div>
          </div>
        </section>
        <main className="flex-1 container mx-auto z-20 max-w-6xl">
          <div className="px-4 pb-8">
            <article className="prose dark:prose-invert max-w-none remark">
              <MDXRemote source={content} />
            </article>
          </div>
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
  const contentDir = path.join(process.cwd(), "src", "content", locale);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!filePath.endsWith(".mdx")) {
    return {};
  }

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data } = matter(source);
    const t = await getTranslations({ locale, namespace: "common" });

    return {
      title: `${data.title} | ${t("meta.title")}`,
      description: data.description || t("meta.keywords"),
      keywords: data.keywords ? data.keywords.join(", ") : t("meta.keywords"),
      openGraph: {
        title: `${data.title} | ${t("meta.title")}`,
        description: data.description || t("meta.keywords"),
        type: "article",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${slug}`,
        publishedTime: data.date ? new Date(data.date).toISOString() : undefined,
        images: data.cover
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/${data.cover}`,
                width: 1200,
                height: 630,
                alt: data.title,
              },
            ]
          : [
              {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`,
                width: 1200,
                height: 630,
                alt: data.title,
              },
            ],
        siteName: t("meta.title"),
      },
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${slug}`,
      twitter: {
        card: "summary_large_image",
        title: `${data.title} | ${t("meta.title")}`,
        description: data.description || t("meta.keywords"),
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`,
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
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
