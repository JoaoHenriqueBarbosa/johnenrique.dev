import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CaseStudy() {
  const t = useTranslations("caseStudy");

  const beats = [
    { title: t("beat1Title"), text: t("beat1Text") },
    { title: t("beat2Title"), text: t("beat2Text") },
    { title: t("beat3Title"), text: t("beat3Text") },
  ];

  return (
    <section id="case-study" className="border-t">
      <div className="container max-w-5xl py-20 md:py-28">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          02 — {t("label")}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("intro")}</p>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {beats.map((beat, index) => (
            <article
              key={beat.title}
              className="rounded-lg border bg-card p-5"
            >
              <p className="font-mono text-[11px] text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2.5 text-base font-semibold tracking-tight">
                {beat.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {beat.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-muted-foreground">
          {t("closing")}
        </p>
        <p className="mt-4">
          <Link
            href={{ pathname: "/blog/[slug]", params: { slug: "fiscal-rs" } }}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("cta")}
            <span aria-hidden className="ml-1">
              →
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
