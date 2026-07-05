import { useLocale, useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { proof as enProof } from "@/content/en/repos";
import { proof as ptBRProof } from "@/content/pt-BR/repos";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const proof = locale === "pt-BR" ? ptBRProof : enProof;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="container relative max-w-5xl pt-32 pb-16 md:pt-44 md:pb-24">
        <p
          className="animate-rise flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wide text-muted-foreground uppercase"
          style={{ "--rise-delay": "0ms" } as React.CSSProperties}
        >
          <span className="flex items-center gap-2 text-success">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-success" />
            {t("availability")}
          </span>
          <span aria-hidden>·</span>
          <span>{t("location")}</span>
        </p>
        <h1
          className="animate-rise mt-7 text-5xl font-bold tracking-tighter text-balance sm:text-6xl md:text-7xl"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          {t("name")}
          <span className="block text-muted-foreground">{t("role")}</span>
        </h1>
        <p
          className="animate-rise mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          style={{ "--rise-delay": "120ms" } as React.CSSProperties}
        >
          {t("description")}
        </p>
        <p
          className="animate-rise mt-5 font-mono text-xs tracking-wide text-muted-foreground md:text-sm"
          style={{ "--rise-delay": "180ms" } as React.CSSProperties}
        >
          {t("stack")}
        </p>
        <div
          className="animate-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ "--rise-delay": "240ms" } as React.CSSProperties}
        >
          <a
            href={`mailto:${site.email}`}
            data-track="contact_intent"
            data-tp-method="mailto"
            data-tp-location="hero"
            className={cn(buttonVariants({ size: "lg" }), "px-6 font-semibold")}
          >
            {t("ctaPrimary")}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-track="outbound_click"
            data-tp-kind="github"
            data-tp-location="hero"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            {t("ctaSecondary")}
            <span aria-hidden className="ml-1.5 text-xs">
              ↗
            </span>
          </a>
        </div>
        <div
          className="animate-rise mt-16 border-t pt-6"
          style={{ "--rise-delay": "300ms" } as React.CSSProperties}
        >
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            {t("proofLabel")}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {proof.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="proof_click"
                  data-tp-label={item.label}
                  data-tp-href={item.href}
                  className="group font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}{" "}
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    {item.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
