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
          <span className="grid size-7 place-items-center rounded-md bg-primary font-mono text-[11px] font-bold text-primary-foreground">
            JE
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {t("name")}
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link
            // @ts-expect-error hash anchor outside typed pathnames
            href="/#work"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {t("nav.work")}
          </Link>
          <Link
            href="/blog"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {t("nav.writing")}
          </Link>
          <Link
            href="/about"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            {t("nav.about")}
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
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
            className={cn(buttonVariants({ size: "sm" }), "font-semibold")}
          >
            {t("cta")}
          </a>
        </nav>
      </div>
    </header>
  );
}
