import { HomePage } from "@/components/home-page";
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

  return <HomePage />;
}
