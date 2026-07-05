"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function CopyEmail() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(site.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-input hover:text-foreground"
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-success" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {copied ? t("copied") : t("copy")}
    </button>
  );
}
