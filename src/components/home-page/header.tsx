import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("header");

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex h-14 max-w-5xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/john-avatar.webp"
            alt={t("name")}
            width={28}
            height={28}
            priority
            className="size-7 rounded-full object-cover ring-1 ring-border"
          />
          <span className="hidden text-sm font-semibold tracking-tight xs:inline">
            {t("name")}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-5">
          <Link
            // @ts-expect-error hash anchor outside typed pathnames
            href="/#work"
            className="hidden text-muted-foreground transition-colors hover:text-foreground xs:block"
          >
            {t("nav.work")}
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.writing")}
          </Link>
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("nav.about")}
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-track="outbound_click"
            data-tp-kind="github"
            data-tp-location="header"
            className="hidden text-muted-foreground transition-colors hover:text-foreground md:block"
          >
            {t("nav.github")}
            <span aria-hidden className="ml-0.5 text-xs">
              ↗
            </span>
          </a>
          <LocaleSwitcher />
          <a
            href={`mailto:${site.email}`}
            data-track="contact_intent"
            data-tp-method="mailto"
            data-tp-location="header"
            className={cn(buttonVariants({ size: "sm" }), "font-semibold")}
          >
            {t("cta")}
          </a>
        </nav>
      </div>
    </header>
  );
}
