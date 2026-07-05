import { useTranslations } from "next-intl";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/site";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" data-section="contact" className="border-t">
      <div className="container max-w-5xl py-20 md:py-28">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          03 — {t("label")}
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            data-track="contact_intent"
            data-tp-method="mailto"
            data-tp-location="contact"
            className="text-xl font-semibold tracking-tight underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-2xl md:text-3xl"
          >
            {site.email}
          </a>
          <CopyEmail copyLabel={t("copy")} copiedLabel={t("copied")} />
        </div>
        <p className="mt-10 font-mono text-xs text-muted-foreground">
          {t("or")}{" "}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            data-track="outbound_click"
            data-tp-kind="github"
            data-tp-location="contact"
            className="text-foreground underline-offset-4 hover:underline"
          >
            GitHub
          </a>{" "}
          ·{" "}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-track="outbound_click"
            data-tp-kind="linkedin"
            data-tp-location="contact"
            className="text-foreground underline-offset-4 hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
