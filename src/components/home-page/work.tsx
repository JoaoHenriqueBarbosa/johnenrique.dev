import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShowMore } from "@/components/show-more";
import { repos as enRepos, type RepoItem } from "@/content/en/repos";
import { repos as ptBRRepos } from "@/content/pt-BR/repos";

export function Work() {
  const t = useTranslations("work");
  const locale = useLocale();
  const repos = locale === "pt-BR" ? ptBRRepos : enRepos;

  const featured = repos.filter((r) => r.tier === "featured");
  const more = repos.filter((r) => r.tier === "more");
  const archive = repos.filter((r) => r.tier === "archive");

  return (
    <section id="work" className="border-t">
      <div className="container max-w-5xl py-20 md:py-28">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground/70 uppercase">
          01 — {t("label")}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-12">
          {featured.map((item) => (
            <FeaturedItem key={item.name} item={item} storyLabel={t("story")} />
          ))}
        </div>
        <ShowMore label={t("showAll", { count: more.length + archive.length })}>
          <div className="mt-14">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground/70 uppercase">
              {t("allLabel")}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item) => (
                <MiniItem key={item.name} item={item} storyLabel={t("story")} />
              ))}
            </div>
            <p className="mt-10 font-mono text-[11px] tracking-widest text-muted-foreground/70 uppercase">
              {t("archiveLabel")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {archive.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.tagline}
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                    <span aria-hidden className="ml-1 text-[10px]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ShowMore>
      </div>
    </section>
  );
}

function FeaturedItem({
  item,
  storyLabel,
}: {
  item: RepoItem;
  storyLabel: string;
}) {
  return (
    <article className="grid gap-4 border-t py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10 md:py-10">
      <div>
        <h3 className="font-mono text-lg font-semibold tracking-tight">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
          {item.tagline}
        </p>
      </div>
      <div>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {item.description}
        </p>
        {item.metrics && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.metrics.map((metric) => (
              <li
                key={metric}
                className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-foreground/90"
              >
                {metric}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {item.postSlug && (
            <li>
              <Link
                href={{
                  pathname: "/blog/[slug]",
                  params: { slug: item.postSlug },
                }}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {storyLabel}
                <span aria-hidden className="ml-1">
                  →
                </span>
              </Link>
            </li>
          )}
          {item.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {link.label}
                <span aria-hidden className="ml-1 text-xs">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MiniItem({
  item,
  storyLabel,
}: {
  item: RepoItem;
  storyLabel: string;
}) {
  return (
    <article className="flex flex-col justify-between rounded-lg border bg-card p-4 transition-colors hover:border-input">
      <div>
        <h3 className="font-mono text-sm font-semibold tracking-tight">
          {item.name}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {item.tagline}
        </p>
        {item.metrics && (
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/80">
            {item.metrics.join(" · ")}
          </p>
        )}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {item.postSlug && (
          <Link
            href={{
              pathname: "/blog/[slug]",
              params: { slug: item.postSlug },
            }}
            className="font-mono text-[11px] font-medium text-primary underline-offset-4 hover:underline"
          >
            {storyLabel} →
          </Link>
        )}
        {item.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label} ↗
          </a>
        ))}
      </p>
    </article>
  );
}
