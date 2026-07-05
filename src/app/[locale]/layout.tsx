import type { PropsWithChildren } from "react";
import "@/globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { WebMCP } from "@/components/web-mcp";
import { Tracker } from "@/components/tracker";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import type { Viewport } from "next";

const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans-base",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-base",
});

export const viewport: Viewport = {
  themeColor: "#0e0f13",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://johnenrique.tech"
  ),
  icons: {
    icon: [
      { url: "/icons/16.ico", sizes: "16x16" },
      { url: "/icons/32.ico", sizes: "32x32" },
      { url: "/icons/48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/96.png", type: "image/png", sizes: "96x96" },
      { url: "/icons/192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/180.png", type: "image/png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        {/* Client islands only need the locale, never message strings */}
        <NextIntlClientProvider messages={{}}>{children}</NextIntlClientProvider>
        <WebMCP />
        <Tracker />
        <Analytics />
      </body>
    </html>
  );
}
