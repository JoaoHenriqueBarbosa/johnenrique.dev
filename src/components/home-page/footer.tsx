import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t">
      <div className="container flex max-w-5xl flex-col items-start justify-between gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p className="font-mono text-xs">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <p className="flex items-center gap-4 font-mono text-xs">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t("source")}
          </a>
        </p>
      </div>
    </footer>
  );
}
