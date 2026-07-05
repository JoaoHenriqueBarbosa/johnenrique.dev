import { HomePage } from "@/components/home-page";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
      url: locale === "en" ? "/" : "/pt-BR",
      siteName: t("meta.title"),
    },
    alternates: {
      canonical: locale === "en" ? "/" : "/pt-BR",
      languages: {
        "en": "/",
        "pt-BR": "/pt-BR",
        "x-default": "/",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech";
  const url = locale === "en" ? base : `${base}/pt-BR`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          inLanguage: locale,
          url,
          mainEntity: {
            "@type": "Person",
            name: "John Enrique",
            alternateName: "João Henrique Barbosa",
            jobTitle: "Senior Full-Stack Engineer",
            email: `mailto:${site.email}`,
            url: base,
            image: `${base}/john-avatar.webp`,
            sameAs: [site.github, site.linkedin],
            address: { "@type": "PostalAddress", addressCountry: "BR" },
            knowsAbout: [
              "TypeScript",
              "React",
              "Next.js",
              "Rust",
              "Node.js",
              "PostgreSQL",
              "AI agents",
            ],
          },
        }}
      />
      <HomePage />
    </>
  );
}
