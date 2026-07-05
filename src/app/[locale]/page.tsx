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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`,
          width: 1200,
          height: 630,
          alt: t("meta.title"),
        },
      ],
      siteName: t("meta.title"),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/john.jpg`,
          width: 1200,
          height: 630,
          alt: t("meta.title"),
        },
      ],
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
